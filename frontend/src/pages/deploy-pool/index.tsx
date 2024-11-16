"use client";

import React, { useState } from "react";
import { ChevronRight, ArrowLeftRight } from "lucide-react";
import { Card, CardContent } from "@/components/UI/Card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/Select/Select";
import { Input } from "@/components/UI/Input/Input";
import { ethers } from "ethers";
import entropyAbi from "@/utils/abis/entropyAbi.json";

// Assuming these imports are available in your project
import poolfactoryAbi from "@/utils/abis/poolfactoryAbi.json";
import {
  BASE_SEPOLIA_CHAIN_ID,
  chains,
  OPTIMISM_SEPOLIA_CHAIN_ID,
} from "@/utils/helper";

export default function DeployPool() {
  const [poolName, setPoolName] = useState("");
  const [formData, setFormData] = useState({
    sourceChainId: "",
    sourceToken: "",
    destChainId: "",
    destToken: "",
    factoryAddress: "",
  });
  const [isPoolDeployed, setIsPoolDeployed] = useState(false);

  const handleChainSelect = (chainId: string, isSource: boolean) => {
    const selectedChain = chains.find((c) => c.id.toString() === chainId);

    if (isSource) {
      setFormData((prev) => ({
        ...prev,
        sourceChainId: chainId,
        sourceToken: "",
        factoryAddress: selectedChain?.factoryAddress || "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        destChainId: chainId,
        destToken: "",
      }));
    }
  };

  const handleTokenSelect = (tokenAddress: string, isSource: boolean) => {
    if (isSource) {
      setFormData((prev) => ({
        ...prev,
        sourceToken: tokenAddress,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        destToken: tokenAddress,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Deploying pools with:", { poolName, ...formData });
  };

  const selectedSourceChain = chains.find(
    (c) => c.id.toString() === formData.sourceChainId
  );
  const selectedDestChain = chains.find(
    (c) => c.id.toString() === formData.destChainId
  );

  const deployCrossChainPool = async () => {
    if (window.ethereum && window.ethereum._state.accounts.length !== 0) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log(signer);
      console.log(window.ethereum._state.accounts.length);
      const srcChainObject = chains.find(
        (chain) => chain.id === parseInt(formData.sourceChainId)
      );
      const destChainObject = chains.find(
        (chain) => chain.id === parseInt(formData.destChainId)
      );

      const contract = new ethers.Contract(
        srcChainObject?.factoryAddress!,
        poolfactoryAbi,
        signer
      );

      console.log("Source", srcChainObject);
      console.log("Destination", destChainObject);
      console.log(formData, "formData");

      if (
        (srcChainObject?.id === OPTIMISM_SEPOLIA_CHAIN_ID &&
          destChainObject?.id === BASE_SEPOLIA_CHAIN_ID) ||
        (srcChainObject?.id === BASE_SEPOLIA_CHAIN_ID &&
          destChainObject?.id === OPTIMISM_SEPOLIA_CHAIN_ID)
      ) {
        const entropyAddress =
          srcChainObject?.id === OPTIMISM_SEPOLIA_CHAIN_ID
            ? "0x4821932D0CDd71225A6d914706A621e0389D7061"
            : "0x41c9e39574F40Ad34c79f1C99B66A45eFB830d4c";

        const entropyContract = new ethers.Contract(
          entropyAddress,
          entropyAbi,
          signer
        );

        const entropyProvider = await entropyContract.getDefaultProvider();
        const fees = await entropyContract.getFee(entropyProvider);

        console.log("Fees", fees);
        const tx = await contract.deployCCPoolsCreate2(
          destChainObject?.factoryAddress!,
          formData.sourceToken,
          formData.destToken,
          formData.destChainId,
          poolName,
          {
            gasLimit: 3000000,
            value: BigInt(fees),
          }
        );

        await tx.wait(1);
        setIsPoolDeployed(true);
      } else {
        const tx = await contract.deployCCPoolsCreate2(
          destChainObject?.factoryAddress!,
          formData.sourceToken,
          formData.destToken,
          formData.destChainId,
          poolName,
          {
            gasLimit: 3000000,
          }
        );

        await tx.wait(1);

        setIsPoolDeployed(true);
      }

      // Uncomment these lines if you want to wait for the transaction to be mined
      // const receipt = await tx.wait()
      // const deployedPoolAddress = receipt.events[0].args.deployedPool
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full max-w-4xl p-6 space-y-8 text-gray-100 bg-gray-800 rounded-lg">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-blue-400">
            Deploy Cross-Chain Pool
          </h1>
          <p className="text-gray-400">
            Create synchronized liquidity pools across different networks
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="text"
            value={poolName}
            onChange={(e) => setPoolName(e.target.value)}
            placeholder="Enter pool name"
            className="w-full text-gray-900"
          />

          <div className="grid md:grid-cols-2 gap-6">
            {/* Source Chain Selection */}
            <div className="space-y-4">
              <label className="text-sm font-medium block text-gray-200">
                Source Chain &amp; Token
              </label>
              <Select onValueChange={(value) => handleChainSelect(value, true)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select source chain" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200">
                  {chains.map((chain) => (
                    <SelectItem
                      key={chain.id}
                      value={chain.id.toString()}
                      className="text-gray-900"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={chain.logo}
                          alt={chain.name}
                          className="w-6 h-6"
                        />
                        {chain.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedSourceChain && (
                <Select
                  onValueChange={(value) => handleTokenSelect(value, true)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select source token" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200">
                    {selectedSourceChain.tokens.map((token) => (
                      <SelectItem
                        key={token.address}
                        value={token.address}
                        className="text-gray-900"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={token.logo}
                            alt={token.symbol}
                            className="w-6 h-6"
                          />
                          {token.name} ({token.symbol})
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Destination Chain Selection */}
            <div className="space-y-4">
              <label className="text-sm font-medium block text-gray-200">
                Destination Chain &amp; Token
              </label>
              <Select
                onValueChange={(value) => handleChainSelect(value, false)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select destination chain" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200">
                  {chains
                    .filter(
                      (chain) => chain.id.toString() !== formData.sourceChainId
                    )
                    .map((chain) => (
                      <SelectItem
                        key={chain.id}
                        value={chain.id.toString()}
                        className="text-gray-900"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={chain.logo}
                            alt={chain.name}
                            className="w-6 h-6"
                          />
                          {chain.name}
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              {selectedDestChain && (
                <Select
                  onValueChange={(value) => handleTokenSelect(value, false)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select destination token" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200">
                    {selectedDestChain.tokens.map((token) => (
                      <SelectItem
                        key={token.address}
                        value={token.address}
                        className="text-gray-900"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={token.logo}
                            alt={token.symbol}
                            className="w-6 h-6"
                          />
                          {token.name} ({token.symbol})
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>

          {/* Visual Flow */}
          <div className="flex items-center justify-center gap-4 py-4">
            <div className="px-4 py-2 bg-gray-700 rounded-lg border border-gray-600">
              {selectedSourceChain?.name || "Source Chain"}
            </div>
            <ArrowLeftRight className="text-blue-400" />
            <div className="px-4 py-2 bg-gray-700 rounded-lg border border-gray-600">
              {selectedDestChain?.name || "Destination Chain"}
            </div>
          </div>

          <button
            type="submit"
            disabled={
              !formData.sourceToken ||
              !formData.destToken ||
              !formData.factoryAddress ||
              !poolName
            }
            className="w-full py-4 px-6 text-lg font-semibold text-white rounded-lg shadow-lg
                     bg-gradient-to-r from-blue-500 to-indigo-600
                     hover:from-blue-600 hover:to-indigo-700
                     focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
                     transition-all duration-300 ease-in-out
                     disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center justify-center"
            onClick={deployCrossChainPool}
          >
            {isPoolDeployed ? (
              <span>Pool Deployed Successfully. Wait for 10-15 mins</span>
            ) : (
              <span>Deploy Pool</span>
            )}
            <ChevronRight className="w-6 h-6 ml-2" />
          </button>
        </form>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          <Card className="bg-gray-700">
            <CardContent className="p-4">
              <h3 className="font-medium mb-2 text-gray-300">
                Selected Details
              </h3>
              <div className="space-y-1 text-sm text-gray-400">
                <p>
                  Source Chain: {selectedSourceChain?.name || "Not selected"}
                </p>
                <p>
                  Source Token:{" "}
                  {formData.sourceToken
                    ? `${formData.sourceToken.slice(
                        0,
                        6
                      )}...${formData.sourceToken.slice(-4)}`
                    : "Not selected"}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-700">
            <CardContent className="p-4">
              <h3 className="font-medium mb-2 text-gray-300">
                Deployment Info
              </h3>
              <div className="space-y-1 text-sm text-gray-400">
                <p>
                  Factory Address:{" "}
                  {formData.factoryAddress
                    ? `${formData.factoryAddress.slice(
                        0,
                        6
                      )}...${formData.factoryAddress.slice(-4)}`
                    : "Not selected"}
                </p>
                <p>Expected time: 2-10 minutes for both pools</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

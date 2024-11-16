"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/UI/Button";
import unifiedBridge from "../../utils/abis/unifiedBridge.json";
import crossChainPoolAbi from "../../utils/abis/crossChainPoolAbi.json";
import { ethers } from "ethers";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/UI/Card";
import { Input } from "@/components/UI/input";
import { Label } from "@/components/UI/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";
import {
  chains,
  checkIfPolygonAggLayer,
  getPoolAddress,
  SEPOLIA_CHAIN_ID,
  UNIFIED_BRIDGE,
} from "@/utils/helper";
import { useAccount } from "wagmi";

export default function Bridge() {
  const [sourceChain, setSourceChain] = useState("");
  const [destChain, setDestChain] = useState("");
  const [sourceToken, setSourceToken] = useState("");
  const [destToken, setDestToken] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBridgeSuccess, setIsBridgeSuccess] = useState(false);
  const { address } = useAccount();

  useEffect(() => {
    if (sourceChain) {
      setSourceToken("");
    }
  }, [sourceChain]);

  useEffect(() => {
    if (destChain) {
      setDestToken("");
    }
  }, [destChain]);

  const handleBridge = async () => {
    setIsLoading(true);
    // Simulate bridge transaction
    console.log(sourceChain, destChain, sourceToken, destToken, amount);
    const isPolygonAggLayer = checkIfPolygonAggLayer(
      parseInt(sourceChain),
      parseInt(destChain),
      sourceToken,
      destToken
    );

    if (isPolygonAggLayer) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const aggLayerContract = new ethers.Contract(
        UNIFIED_BRIDGE,
        unifiedBridge,
        provider.getSigner()
      );

      const destinationNetworkId =
        parseInt(sourceChain) === SEPOLIA_CHAIN_ID ? 1 : 0;

      const tokenAddress = "0x0000000000000000000000000000000000000000";
      const forceUpdateGlobalExitRoot = true;

      const permitData = "0x";

      const amountToPass = ethers.utils.parseUnits(amount, 18);

      const txn = await aggLayerContract.bridgeAsset(
        destinationNetworkId,
        address,
        amountToPass,
        tokenAddress,
        forceUpdateGlobalExitRoot,
        permitData,
        {
          value: amountToPass,
          gasLimit: 3000000,
        }
      );

      await txn.wait(1);

      setIsLoading(false);
      setIsBridgeSuccess(true);
    } else {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();

      const poolAddress = getPoolAddress(parseInt(sourceChain));

      console.log(poolAddress);

      const erc20Abi = [
        "function approve(address spender, uint256 amount) external returns (bool)",
        "function decimals() external view returns (uint8)",
      ];

      console.log(sourceToken);

      const tokenContract = new ethers.Contract(
        sourceToken,
        erc20Abi,
        provider.getSigner()
      );

      const tokenDecimals = await tokenContract.decimals();
      const poolContract = new ethers.Contract(
        poolAddress!,
        crossChainPoolAbi,
        signer
      );

      const amountToPass = ethers.utils.parseUnits(
        amount,
        parseInt(tokenDecimals.toString())
      );
      console.log(amountToPass);

      console.log(address);

      const ccipFees = await poolContract.getCcipFeesForBridging(
        amountToPass,
        address!,
        {
          gasLimit: 10000000,
        }
      );

      const approval = await tokenContract.approve(
        poolAddress!,
        ethers.constants.MaxUint256,
        {
          gasLimit: 10000000,
        }
      );

      await approval.wait(1);

      const txn = await poolContract.bridge(amountToPass, address!, {
        gasLimit: 10000000,
        value: ccipFees,
      });

      await txn.wait(1);
      setIsBridgeSuccess(true);
      setIsLoading(false);
    }
  };

  const isValid =
    sourceChain &&
    destChain &&
    sourceToken &&
    destToken &&
    amount &&
    sourceChain !== destChain;

  return (
    <Card className="w-full max-w-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg border border-gray-700">
      <CardHeader className="space-y-1 bg-gray-800">
        <CardTitle className="text-2xl font-bold text-center text-gray-100">
          Cross-Chain Bridge
        </CardTitle>
        <CardDescription className="text-center text-gray-400">
          Transfer your tokens seamlessly across blockchains
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 bg-gray-900 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="source-chain" className="text-gray-300">
              Source Chain
            </Label>
            <Select value={sourceChain} onValueChange={setSourceChain}>
              <SelectTrigger
                id="source-chain"
                className="w-full bg-gray-800 border-gray-700 text-gray-100"
              >
                <SelectValue placeholder="Select source chain" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {chains.map((chain) => (
                  <SelectItem
                    key={chain.id}
                    value={chain.id.toString()}
                    className="text-gray-100"
                  >
                    <span className="flex items-center">
                      <Image
                        src={chain.logo}
                        alt={chain.name}
                        width={24}
                        height={24}
                        className="mr-2"
                      />
                      {chain.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dest-chain" className="text-gray-300">
              Destination Chain
            </Label>
            <Select value={destChain} onValueChange={setDestChain}>
              <SelectTrigger
                id="dest-chain"
                className="w-full bg-gray-800 border-gray-700 text-gray-100"
              >
                <SelectValue placeholder="Select destination chain" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {chains.map((chain) => (
                  <SelectItem
                    key={chain.id}
                    value={chain.id.toString()}
                    disabled={chain.id.toString() === sourceChain}
                    className="text-gray-100"
                  >
                    <span className="flex items-center">
                      <Image
                        src={chain.logo}
                        alt={chain.name}
                        width={24}
                        height={24}
                        className="mr-2"
                      />
                      {chain.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <div className="space-y-2">
            <Label htmlFor="source-token" className="text-gray-300">
              Source Token
            </Label>
            <Select
              value={sourceToken}
              onValueChange={setSourceToken}
              disabled={!sourceChain}
            >
              <SelectTrigger
                id="source-token"
                className="w-full bg-gray-800 border-gray-700 text-gray-100"
              >
                <SelectValue placeholder="Select source token" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {sourceChain &&
                  chains
                    .find((chain) => chain.id.toString() === sourceChain)
                    ?.tokens.map((token) => (
                      <SelectItem
                        key={token.address}
                        value={token.address}
                        className="text-gray-100"
                      >
                        <span className="flex items-center">
                          <Image
                            src={token.logo}
                            alt={token.name}
                            width={24}
                            height={24}
                            className="mr-2"
                          />
                          {token.name} ({token.symbol})
                        </span>
                      </SelectItem>
                    ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-gray-300">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500"
            />
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-700" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-gray-900 px-2 text-gray-500">To</span>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="dest-token" className="text-gray-300">
            Destination Token
          </Label>
          <Select
            value={destToken}
            onValueChange={setDestToken}
            disabled={!destChain}
          >
            <SelectTrigger
              id="dest-token"
              className="w-full bg-gray-800 border-gray-700 text-gray-100"
            >
              <SelectValue placeholder="Select destination token" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              {destChain &&
                chains
                  .find((chain) => chain.id.toString() === destChain)
                  ?.tokens.map((token) => (
                    <SelectItem
                      key={token.address}
                      value={token.address}
                      className="text-gray-100"
                    >
                      <span className="flex items-center">
                        <Image
                          src={token.logo}
                          alt={token.name}
                          width={24}
                          height={24}
                          className="mr-2"
                        />
                        {token.name} ({token.symbol})
                      </span>
                    </SelectItem>
                  ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-800">
        <Button
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleBridge}
          disabled={!isValid || isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <ArrowRight className="mr-2 h-4 w-4" />
          )}
          {isBridgeSuccess
            ? "Transaction Success ! Pls Wait for 45-50 mins for token bridge to complete"
            : "Bridge Tokens"}
        </Button>
      </CardFooter>
    </Card>
  );
}

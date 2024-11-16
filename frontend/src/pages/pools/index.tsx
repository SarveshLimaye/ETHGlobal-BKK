"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Loader2, Droplets } from "lucide-react";
import { Button } from "@/components/UI/Button";
import { ethers } from "ethers";
import poolfactoryAbi from "@/utils/abis/poolfactoryAbi.json";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/UI/Card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/UI/collapsible";
import { chains } from "@/utils/helper";

const RPC_URLS = {
  11155111: [
    process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL,
    "https://eth-sepolia.public.blastapi.io",
    "https://rpc.sepolia.org",
    "https://rpc2.sepolia.org",
  ],
  421614: [
    process.env.NEXT_PUBLIC_ARB_SEPOLIA_RPC_URL,
    "https://arb-sepolia.g.alchemy.com/v2/bg__eluDFhIa87eN1uuyYt0EPKNMljIe",
    "https://sepolia-rollup.arbitrum.io/rpc",
  ],
  84532: [
    process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL,
    "https://base-sepolia.blockpi.network/v1/rpc/public",
  ],
  11155420: [
    process.env.NEXT_PUBLIC_OPTIMISM_SEPOLIA_RPC_URL,
    "https://optimism-sepolia.blockpi.network/v1/rpc/public",
    "https://optimism-sepolia.g.alchemy.com/v2/bg__eluDFhIa87eN1uuyYt0EPKNMljIe",
  ],
};

const getFactoryAddresses = () => {
  return chains
    .filter((chain) => chain.factoryAddress && chain.factoryAddress !== "")
    .map((chain) => ({
      chainId: chain.id,
      chainName: chain.name,
      factoryAddress: chain.factoryAddress,
      logo: chain.logo,
    }));
};

const createProvider = async (chainId, currentRpcIndex = 0) => {
  const rpcUrls = RPC_URLS[chainId];
  if (!rpcUrls || currentRpcIndex >= rpcUrls.length) {
    throw new Error(`No more RPC URLs available for chain ID ${chainId}`);
  }

  const provider = new ethers.providers.JsonRpcProvider(
    rpcUrls[currentRpcIndex]
  );

  try {
    await provider.getNetwork();
    return provider;
  } catch (error) {
    console.warn(`RPC ${rpcUrls[currentRpcIndex]} failed, trying next one...`);
    return createProvider(chainId, currentRpcIndex + 1);
  }
};

export default function Pools() {
  const [poolsByChain, setPoolsByChain] = useState({});
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [openChains, setOpenChains] = useState<number[]>([]);

  const getPoolsForChain = async (factory) => {
    try {
      const provider = await createProvider(factory.chainId);
      const contract = new ethers.Contract(
        factory.factoryAddress,
        poolfactoryAbi,
        provider
      );

      const deployedPools = await contract.getDeployedPoolsInCurrentChain();
      return deployedPools.map((poolAddress, index) => ({
        poolAddress,
        chainId: factory.chainId,
        chainName: factory.chainName,
        logo: factory.logo,
        factoryAddress: factory.factoryAddress,
        index,
      }));
    } catch (err) {
      throw new Error(
        `Failed to fetch pools from ${factory.chainName}: ${err.message}`
      );
    }
  };

  const getAllPools = async () => {
    setLoading(true);
    setErrors({});
    const newPoolsByChain = {};
    const newErrors = {};

    const factories = getFactoryAddresses();

    await Promise.all(
      factories.map(async (factory) => {
        try {
          const chainPools = await getPoolsForChain(factory);
          newPoolsByChain[factory.chainId] = chainPools;
        } catch (err) {
          console.error(`Error fetching pools for ${factory.chainName}:`, err);
          newErrors[factory.chainId] = err.message;
        }
      })
    );

    setPoolsByChain(newPoolsByChain);
    setErrors(newErrors);
    setLoading(false);
  };

  useEffect(() => {
    getAllPools();
  }, []);

  const toggleChain = (chainId: number) => {
    setOpenChains((prev) =>
      prev.includes(chainId)
        ? prev.filter((id) => id !== chainId)
        : [...prev, chainId]
    );
  };

  const renderChainPools = (chainId) => {
    const pools = poolsByChain[chainId] || [];
    const error = errors[chainId];
    const chainInfo = chains.find((chain) => chain.id === chainId);

    if (error) {
      return (
        <div className="col-span-full">
          <div className="p-4 bg-red-900 text-red-100 rounded-lg text-center">
            Error loading pools for {chainInfo?.name}: {error}
          </div>
        </div>
      );
    }

    if (pools.length === 0) {
      return (
        <div className="col-span-full">
          <p className="text-gray-400 text-center">
            No pools found for {chainInfo?.name}
          </p>
        </div>
      );
    }

    return (
      <AnimatePresence>
        {pools.map((pool, index) => (
          <motion.div
            key={`${pool.chainId}-${pool.poolAddress}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="w-full bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Image
                    src={pool.logo}
                    alt={pool.chainName}
                    width={24}
                    height={24}
                    className="mr-2"
                  />
                  <h3 className="text-xl font-semibold text-gray-100">
                    {pool.chainName}
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="text-sm">
                    <span className="block text-center font-medium text-gray-300 mb-2">
                      Pool Address
                    </span>
                    <p className="break-all text-gray-100 bg-gray-900 p-3 rounded-lg text-center">
                      {pool.poolAddress}
                    </p>
                  </div>
                  <div className="text-sm">
                    <span className="block text-center font-medium text-gray-300 mb-2">
                      Factory Address
                    </span>
                    <p className="break-all text-gray-100 bg-gray-900 p-3 rounded-lg text-center">
                      {pool.factoryAddress}
                    </p>
                  </div>
                  <div className="flex justify-center items-center gap-4 text-sm mt-4">
                    <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full">
                      Pool #{pool.index + 1}
                    </span>
                    <span className="bg-blue-900 text-blue-100 px-3 py-1 rounded-full">
                      Chain ID: {pool.chainId}
                    </span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 ease-in-out transform hover:scale-105">
                    <Droplets className="mr-2 h-4 w-4" />
                    Supply Liquidity
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 mt-[80px]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Liquidity Pools</h1>
        <p className="text-xl text-center text-gray-400 mb-12">
          View and manage liquidity pools across multiple chains
        </p>
        <Button
          onClick={getAllPools}
          className="w-full max-w-md mx-auto mb-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            "Refresh Pools"
          )}
        </Button>

        <div className="space-y-8">
          {getFactoryAddresses().map((factory) => (
            <Collapsible
              key={factory.chainId}
              open={openChains.includes(factory.chainId)}
              onOpenChange={() => toggleChain(factory.chainId)}
            >
              <CollapsibleTrigger asChild>
                <div className="w-full bg-gray-800 hover:bg-gray-750 transition-all duration-300 cursor-pointer border border-gray-700 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={factory.logo}
                      alt={factory.chainName}
                      width={32}
                      height={32}
                    />
                    <h2 className="text-2xl font-semibold text-gray-100">
                      {factory.chainName} Pools
                    </h2>
                  </div>
                  <ChevronDown
                    className={`h-6 w-6 text-gray-400 transition-transform duration-300 ${
                      openChains.includes(factory.chainId) ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                  {renderChainPools(factory.chainId)}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>

        {loading && Object.keys(poolsByChain).length === 0 && (
          <div className="flex justify-center items-center min-h-[200px]">
            <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
          </div>
        )}
      </div>
    </div>
  );
}

import React from "react";

import { useAccount } from "wagmi";
import type { Token } from "@coinbase/onchainkit/token";
import Bridge from "@/components/Bridge/Bridge";

const Port = () => {
  const { address } = useAccount();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
      <Bridge />
    </div>
  );
};

export default Port;

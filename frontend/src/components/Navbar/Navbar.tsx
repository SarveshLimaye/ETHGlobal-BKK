import React from "react";
import { Button } from "@/components/UI/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/UI/Card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/UI/HoverCard";
import {
  Globe2,
  Workflow,
  Wallet2,
  Boxes,
  Blocks,
  Shield,
  Zap,
} from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Globe2 className="h-6 w-6 text-primary animate-float" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              CrossChainPort
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <HoverCard>
              <HoverCardTrigger>
                <a
                  href="#"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Port
                </a>
              </HoverCardTrigger>
              <HoverCardContent>
                Transfer tokens across chains seamlessly
              </HoverCardContent>
            </HoverCard>
            <HoverCard>
              <HoverCardTrigger>
                <a
                  href="#"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Pools
                </a>
              </HoverCardTrigger>
              <HoverCardContent>
                Explore and manage liquidity pools
              </HoverCardContent>
            </HoverCard>
            <HoverCard>
              <HoverCardTrigger>
                <a
                  href="#"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Analytics
                </a>
              </HoverCardTrigger>
              <HoverCardContent>
                Deep insights into cross-chain activities
              </HoverCardContent>
            </HoverCard>
            <Button
              variant="outline"
              className="flex items-center gap-2 group relative overflow-hidden"
            >
              <Wallet2 className="h-4 w-4 group-hover:rotate-12 transition-transform" />
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React from "react";
import { Button } from "@/components/UI/Button";
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

const Hero = () => {
  const features = [
    { icon: Shield, label: "Institutional Security" },
    { icon: Zap, label: "Lightning Fast" },
    { icon: Blocks, label: "Multi-Chain Support" },
    { icon: Wallet2, label: "Asset Protection" },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 blur-3xl opacity-20 w-96 h-96 bg-primary/30 rounded-full" />
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 blur-3xl opacity-20 w-96 h-96 bg-primary/30 rounded-full" />
      </div>

      <div className="container mx-auto px-4 py-24">
        <div className="space-y-8 text-center">
          {/* Badge */}
          <div className="inline-block animate-[fade-in-down_0.6s_ease-out_forwards]">
            <div className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 backdrop-blur-sm hover:bg-primary/20 transition-colors duration-300 cursor-pointer">
              <span className="flex items-center gap-2">
                <Globe2 className="h-4 w-4 animate-pulse" />
                Powering Cross-Chain Future
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <div className="space-y-4 animate-[fade-in_0.6s_ease-out_forwards]">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Bridge The Chain Gap
              </span>
              <br />
              <span className="text-foreground relative">
                Port With Confidence
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Seamlessly connect and transfer assets across multiple blockchains
              with institutional-grade security and lightning-fast finality
            </p>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto animate-[fade-in-up_0.6s_ease-out_forwards]">
            {features.map((feature, index) => (
              <HoverCard key={index}>
                <HoverCardTrigger>
                  <div className="px-4 py-2 rounded-full bg-primary/5 hover:bg-primary/10 border border-primary/10 transition-colors duration-300 flex items-center gap-2 cursor-pointer">
                    <feature.icon className="h-4 w-4 text-primary" />
                    <span className="text-sm text-foreground/80">
                      {feature.label}
                    </span>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex justify-between space-x-4">
                    <feature.icon className="h-12 w-12 text-primary" />
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">{feature.label}</h4>
                      <p className="text-sm text-muted-foreground">
                        Experience superior {feature.label.toLowerCase()} with
                        our advanced cross-chain technology.
                      </p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="inline-flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-[fade-in-up_0.6s_ease-out_forwards]">
            <Button size="lg" className="group relative overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 group-hover:translate-x-full duration-700 transition-transform" />
              <Workflow className="h-5 w-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
              Start Porting
            </Button>
            <Button size="lg" variant="outline" className="group">
              Explore Chains
              <Boxes className="h-5 w-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

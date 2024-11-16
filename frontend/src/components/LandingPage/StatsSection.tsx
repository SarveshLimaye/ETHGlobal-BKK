import React from "react";
import { Blocks, Zap, Shield } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: Blocks,
      value: "15+",
      label: "Supported Chains",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: Zap,
      value: "2000+",
      label: "Supported Tokens",
      color: "from-emerald-500 to-green-500",
    },
    {
      icon: Shield,
      value: "100%",
      label: "Success Rate",
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative p-8 rounded-xl bg-background/50 backdrop-blur-sm border border-primary/10 hover:border-primary/20 transition-all duration-300">
                <div className="flex flex-col items-center">
                  <div className="mb-6 p-3 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent group-hover:scale-110 transition-transform duration-500">
                    <stat.icon className={`h-10 w-10 text-primary`} />
                  </div>
                  <div className="space-y-2 text-center">
                    <div className="text-5xl font-bold text-primary">
                      {stat.value}
                    </div>
                    <div className="text-sm text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;

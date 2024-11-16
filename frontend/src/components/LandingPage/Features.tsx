import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/UI/Card";
import { Shield, Zap, Blocks } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Security First",
      description: "Enterprise-grade protection for your assets",
      items: [
        "Multi-signature validation",
        "Automated security audits",
        "Real-time monitoring",
      ],
      gradient: "from-blue-500/20 via-blue-500/5 to-transparent",
      iconColor: "text-blue-500",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized for speed and efficiency",
      items: [
        "Sub-minute finality",
        "Parallel processing",
        "Optimized routing",
      ],
      gradient: "from-amber-500/20 via-amber-500/5 to-transparent",
      iconColor: "text-amber-500",
    },
    {
      icon: Blocks,
      title: "Multi-Chain Support",
      description: "Extensive blockchain compatibility",
      items: [
        "Support for 15+ chains",
        "2000+ supported tokens",
        "Custom chain integration",
      ],
      gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
      iconColor: "text-emerald-500",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-primary/5" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />

      <div className="container relative mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Key Features
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience the next generation of cross-chain technology with our
            comprehensive feature set
          </p>
        </div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative border-primary/10 hover:border-primary/20 transition-all duration-300 backdrop-blur-sm bg-background/50"
            >
              {/* Card gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl`}
              />

              {/* Card content */}
              <CardHeader className="relative">
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-xl bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300 ${feature.iconColor}`}
                  >
                    <feature.icon className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-xl font-semibold">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground/90">
                      {feature.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="relative">
                <ul className="space-y-4">
                  {feature.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 group/item">
                      <div
                        className={`w-2 h-2 rounded-full ${feature.iconColor} opacity-50 group-hover/item:opacity-100 transition-all duration-300`}
                      />
                      <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors duration-300">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

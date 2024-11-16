import Image from "next/image";
import localFont from "next/font/local";
import Hero from "@/components/LandingPage/Hero";
import Features from "@/components/LandingPage/Features";
import StatsSection from "@/components/LandingPage/StatsSection";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <StatsSection />
    </>
  );
}

//@ts-nocheck

import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";

const OnBoarding = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [firstButtonState, setFirstButtonState] = useState("initial");
  const [secondButtonState, setSecondButtonState] = useState("initial");
  const router = useRouter();

  const handleSignIn = (buttonSetter) => {
    buttonSetter("signing-in");
    signIn()
      .then(() => buttonSetter("connected"))
      .catch(() => buttonSetter("initial"));
  };

  const renderSignInButton = (buttonState, buttonSetter) => {
    switch (buttonState) {
      case "signing-in":
        return <Loader2 className="h-4 w-4 animate-spin" />;
      case "connected":
        return <span className="text-green-500">Connected</span>;
      default:
        return (
          <div className="space-y-4 text-center">
            <Button
              variant="default"
              onClick={() => handleSignIn(buttonSetter)}
              className="w-full"
            >
              Get Started!
            </Button>
            <p className="text-lg dark:text-white text-gray-800">
              Connect your World ID!
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="w-full md:w-4/5 max-w-6xl flex flex-col md:flex-row items-center justify-between">
        <div className="w-full mb-8 md:mb-0">
          <img
            src="/assets/imageBg.png"
            alt="Background"
            className="w-full h-auto object-cover"
          />
        </div>

        <Card className="w-full md:w-2/5">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-6">
              {!session && (
                <>{renderSignInButton(firstButtonState, setFirstButtonState)}</>
              )}

              {session?.user && (
                <div className="flex flex-col items-start w-full">
                  <span className="text-sm dark:text-white text-gray-800">
                    Signed in as -
                  </span>
                  <span className="font-bold text-md dark:text-white text-gray-800">
                    {session.user.email ?? session.user.name}
                  </span>

                  <Button
                    variant="destructive"
                    onClick={() => signOut()}
                    className="mt-4"
                  >
                    Disconnect
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnBoarding;

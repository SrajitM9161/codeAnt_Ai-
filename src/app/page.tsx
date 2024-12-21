"use client"

import { useState } from "react";
import { FaGithub, FaGitlab, FaBitbucket, FaMicrosoft, FaChartPie } from "react-icons/fa";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const signInOptions = {
  SAAS: [
    { icon: FaGithub, label: "Sign in with GitHub" },
    { icon: FaBitbucket, label: "Sign in with Bitbucket" },
    { icon: FaMicrosoft, label: "Sign in with Azure DevOps" },
    { icon: FaGitlab, label: "Sign in with GitLab" },
  ],
  "Self Hosted": [
    { icon: FaGitlab, label: "Self Hosted GitLab" },
    { icon: FaMicrosoft, label: "Sign in with SSO" },
  ],
};

export default function SignInPage() {
  const [activeTab, setActiveTab] = useState<"SAAS" | "Self Hosted">("SAAS");
  const router = useRouter();

  return (
    <main className="flex min-h-screen">
      <div className="hidden md:block w-1/2 relative" style={{ background: "#FAFAFA" }}>
        <div className="absolute inset-0 flex items-center justify-center -translate-y-20">
          <div className="relative">
            <Card className="w-[447px] h-[170px] bg-white shadow-lg rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/codelogo.png"
                  alt="CodeAnt AI"
                  width={40}
                  height={40}
                  priority
                />
                <h3 className="text-lg font-semibold">
                  AI to Detect & Autofix Bad Code
                </h3>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold">30+</p>
                  <p className="text-sm text-gray-600">Language Support</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">10K+</p>
                  <p className="text-sm text-gray-600">Developers</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">100K+</p>
                  <p className="text-sm text-gray-600">Hours Saved</p>
                </div>
              </div>
            </Card>
            <Card className="absolute right-0 -bottom-20 w-[270px] bg-white shadow-lg rounded-3xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <FaChartPie className="text-purple-500" />
                    <span className="text-green-500">+14%</span>
                  </div>
                  <p className="text-xs text-gray-500">This week</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Issues Fixed</p>
                  <p className="text-xl font-bold">500K+</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
        <div className="absolute bottom-0 left-0">
          <Image
            src="/codelogo.png"
            alt="CodeAnt AI Logo"
            width={200}
            height={225}
            className="opacity-40"
            priority
          />
        </div>
      </div>
      <div className="w-full md:w-1/2 bg-white flex flex-col relative">
        <div className="flex-grow flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Image
                src="/codelogo.png"
                alt="CodeAnt AI"
                width={32}
                height={32}
                priority
              />
              <span className="text-xl font-semibold italic">CodeAnt AI</span>
            </div>
            <h1 className="text-2xl font-semibold text-center mb-8">
              Welcome to CodeAnt AI
            </h1>
            <div className="flex gap-2 p-1 mb-6 bg-gray-100 rounded-lg">
              {["SAAS", "Self Hosted"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as "SAAS" | "Self Hosted")}
                  className={`flex-1 py-2 px-4 rounded-md transition-all ${
                    activeTab === tab
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="space-y-3">
                {signInOptions[activeTab].map(({ icon: Icon, label }, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full h-12 justify-start px-4 bg-white hover:bg-gray-50"
                  >
                    <Icon className="mr-3" size={20} />
                    {label}
                  </Button>
                ))}
              </div>
              
              <Button 
                onClick={() => router.push('/Mainpage')}
                className="w-full mt-6 bg-blue-600 text-white hover:bg-blue-700"
              >
                Go to Dashboard
              </Button>
              
              <p className="text-center text-sm text-gray-600 mt-4">
                By signing up you agree to the <strong>Privacy Policy</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
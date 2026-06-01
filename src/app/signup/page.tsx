"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { FcGoogle } from "react-icons/fc";
import LoginForm from "@/components/Signup/LoginForm";
import SignupForm from "@/components/Signup/SignupForm";

const SignupAndLogin = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.backgroundColor = "#fff";

    const handleViewportResize = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener("resize", handleViewportResize);

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.backgroundColor = "";
      window.removeEventListener("resize", handleViewportResize);
    };
  }, []);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Login:", { email, password });
    setIsLoading(false);
  };

  const handleSignup = async (
    name: string,
    email: string,
    password: string,
  ) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Signup:", { name, email, password });
    setIsLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Google Sign In");
    setIsGoogleLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 0.6,
        }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header with animation */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-primary to-accent px-6 py-4 text-white text-center relative overflow-hidden"
          >
            <motion.div
              animate={{
                x: [-100, 400],
                rotate: [0, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full"
            />
            <motion.div
              animate={{
                x: [200, -100],
                rotate: [360, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -bottom-20 -right-10 w-60 h-60 bg-white/5 rounded-full"
            />
            <motion.h1
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-2xl font-bold relative z-10 text-black"
            >
              Welcome to GolpoStore
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm opacity-90 mt-1 relative z-10 text-black"
            >
              Your one-stop shopping destination
            </motion.p>
          </motion.div>

          <div className="px-6 py-5">
            <Tabs
              selectedIndex={tabIndex}
              onSelect={(index) => setTabIndex(index)}
            >
              <TabList className="flex gap-2 mb-6 border-b-0">
                <Tab className="flex-1 outline-none">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.02 }}
                    className={`w-full py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                      tabIndex === 0
                        ? "bg-primary text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Login
                  </motion.button>
                </Tab>
                <Tab className="flex-1 outline-none">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.02 }}
                    className={`w-full py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                      tabIndex === 1
                        ? "bg-primary text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Sign Up
                  </motion.button>
                </Tab>
              </TabList>

              <TabPanel>
                <AnimatePresence mode="wait">
                  <LoginForm onLogin={handleLogin} isLoading={isLoading} />
                </AnimatePresence>
              </TabPanel>

              <TabPanel>
                <AnimatePresence mode="wait">
                  <SignupForm onSignup={handleSignup} isLoading={isLoading} />
                </AnimatePresence>
              </TabPanel>
            </Tabs>

            {/* Google Sign In */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="px-3 bg-white text-gray-500"
                  >
                    Or continue with
                  </motion.span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading}
                className="mt-4 w-full flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGoogleLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <FcGoogle className="text-2xl" />
                    <span className="font-medium text-gray-700">
                      Continue with Google
                    </span>
                  </>
                )}
              </motion.button>
            </div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-center"
            >
              <p className="text-xs text-gray-500">
                By continuing, you agree to our Terms of Service and Privacy
                Policy
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupAndLogin;
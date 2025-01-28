import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, User } from "lucide-react";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Welcome Back
          </h1>
          <p className="text-center text-gray-500 mb-6">
            Log in to your account to continue
          </p>
          <CardContent>
            <form className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={20} />
                <Input
                  type="email"
                  placeholder="Email"
                  className="pl-10 py-3 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <Input
                  type="password"
                  placeholder="Password"
                  className="pl-10 py-3 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
              <div className="text-right">
                <a
                  href="#"
                  className="text-sm text-purple-600 hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
              <Button
                type="submit"
                className="w-full py-3 text-lg font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
              >
                Log In
              </Button>
            </form>
            <div className="text-center mt-6 text-gray-500">
              Don't have an account? {" "}
              <a
                href="#"
                className="text-purple-600 font-semibold hover:underline"
              >
                Sign Up
              </a>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;

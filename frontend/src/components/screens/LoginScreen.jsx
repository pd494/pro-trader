import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', email, password);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Welcome to ProTrader
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Invest in stocks, options, and ETFs
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-300">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-300">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg">
              Log In
            </Button>
          </form>
          <div className="text-center mt-6">
            <a href="#" className="text-sm text-green-500 hover:text-green-400">
              Don't have an account? Sign up
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
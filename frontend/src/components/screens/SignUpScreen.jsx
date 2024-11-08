import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function SignupScreen() {


  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await axios.post('http://localhost:8000/users/signup', {
            email: formData.email,
            password: formData.password,
            first_name: formData.firstName,
            last_name: formData.lastName,
        });

        const {token} = response.data;
        localStorage.setItem('token', token);
        navigate('/dashboard');
    }
    catch(error){
        console.error('Error during sign up:', error);

    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-white">Create Account</h1>
            <p className="mt-2 text-sm text-gray-400">Join TradeX and start investing today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-300">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 bg-gray-500 border-gray-700 text-grey placeholder-gray-100 focus:border-green-500 focus:ring-green-500"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium text-gray-300">First Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-100 focus:border-green-500 focus:ring-green-500"
                    placeholder="John"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium text-gray-300">Last Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-green-500 focus:ring-green-500"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-300">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-green-500 focus:ring-green-500"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
              </div>
              <p className="mt-2 text-sm text-gray-400">Must be at least 8 characters</p>
            </div>

            <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 group">
              Create Account
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/signin')}
                className="text-green-500 hover:text-green-400 font-medium transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export { SignupScreen };

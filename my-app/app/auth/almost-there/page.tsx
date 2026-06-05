'use client';
 
import React, { useState, useEffect } from 'react'; // <-- Lägg till useEffect här
import Button from '@/Components/Button';
import { useRouter } from "next/navigation";
 
// Vi behöver inte längre interfacet AlmostThereProps eftersom vi läser lokalt!
const AlmostThere = () => {
  const [email, setEmail] = useState(''); // <-- Skapa ett state för e-posten
 const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  });
 
  // Hämta e-posten från localStorage direkt när sidan laddas in
  useEffect(() => {
    const savedEmail = localStorage.getItem("verificationEmail");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);
 
  const handleComplete = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
 
    try {
      // 1. ÄNDRAT: Nu pekar anropet mot din skarpa Azure-URL från Scalar!
      const response = await fetch('https://lms-auth-rasmus-cvcpfxgmd8hwhuas.spaincentral-01.azurewebsites.net/api/Users/register-full', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          password: formData.password,
          email: email,
        }),
      });
 
      if (response.ok) {
        router.push("/auth/login");
      } else {
        const data = await response.json();
        alert("Registration failed: " + JSON.stringify(data));
      }
    } catch (error) {
      console.error('Anropet misslyckades:', error);
    }
  };
 
  return (
    <div className="flex min-h-screen w-full bg-white overflow-hidden">
     
      {/* VÄNSTER HALVA (50%) */}
      <div className="hidden lg:flex lg:w-1/2 bg-neutral-100 items-center justify-center overflow-hidden">
        <img
          src="/Shiko-login.svg"
          alt="Shiko Design"
          className="w-full h-full object-cover"
        />
      </div>
 
      {/* HÖGER HALVA (50%) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-white">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-bold mb-2 text-[#111827]">Almost there!</h2>
          <p className="text-gray-500 mb-8">Please complete your profile to get started.</p>
         
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-shiko-orange outline-none"
                  placeholder="John"
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-shiko-orange outline-none"
                  placeholder="Doe"
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                />
              </div>
            </div>
 
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-shiko-orange outline-none"
                placeholder="••••••••"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
 
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-shiko-orange outline-none"
                placeholder="••••••••"
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>
           
            
            <div className="pt-2">
              <Button onClick={handleComplete} variant="orange" size="md">Complete Registration</Button>
            </div>
          </div>
        </div>
      </div>
 
    </div>
  );
};
 
export default AlmostThere;
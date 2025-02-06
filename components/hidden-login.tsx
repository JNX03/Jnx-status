'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { loginUser } from '@/lib/auth';

export function HiddenLogin() {
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      try {
        await loginUser('admin@jnx03.com', password);
        router.push('/dashboard');
      } catch (error) {
        toast({
          title: "Login Failed",
          description: "Invalid password",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      onKeyDown={handleKeyDown}
      className="w-0 h-0 opacity-0 absolute"
      aria-hidden="true"
    />
  );
}


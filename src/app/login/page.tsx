'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === '1234') {
      localStorage.setItem('auth', 'true');
      router.push('/');
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-4 max-w-md mx-auto space-y-2">
      <input placeholder="Username" className="w-full border p-2" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" className="w-full border p-2" onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-blue-500 text-white px-3 py-1 rounded">Login</button>
    </form>
  );
}

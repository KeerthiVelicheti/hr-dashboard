'use client';
import { useState } from 'react';

export default function CreateUserModal() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!name || !email) {
      setError('All fields are required.');
      return;
    }
    alert(`User Created: ${name} (${email})`);
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="text-lg font-semibold mb-2">Create User</h2>
      <input className="border p-2 w-full mb-2" placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input className="border p-2 w-full mb-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      {error && <p className="text-red-500">{error}</p>}
      <button onClick={handleSubmit} className="bg-green-600 text-white px-3 py-1 rounded">Create</button>
    </div>
  );
}

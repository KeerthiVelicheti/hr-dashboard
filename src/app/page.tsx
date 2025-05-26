'use client';

import { useEffect, useState } from 'react';
import UserCard from '@/components/UserCard';
import FilterBar from '@/components/FilterBar';
import { getRandomDepartment } from '@/utils/generateDept';
import { motion } from 'framer-motion';

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  department: string;
  rating: number;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [filtered, setFiltered] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<{ departments: string[]; ratings: number[] }>({
    departments: [],
    ratings: [],
  });
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    const res = await fetch(`https://dummyjson.com/users?limit=10&skip=${page * 10}`);
    const data = await res.json();
    const enriched = data.users.map((u: any) => ({
      id: u.id,
      firstName: u.firstName,
      lastName: u.lastName,
      email: u.email,
      age: u.age,
      department: getRandomDepartment(),
      rating: Math.floor(Math.random() * 5) + 1,
    }));
    setUsers(prev => [...prev, ...enriched]);
    setFiltered(prev => [...prev, ...enriched]);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  useEffect(() => {
    let results = users.filter(user =>
      `${user.firstName} ${user.lastName} ${user.email} ${user.department}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    if (filters.departments.length > 0) {
      results = results.filter(user => filters.departments.includes(user.department));
    }
    if (filters.ratings.length > 0) {
      results = results.filter(user => filters.ratings.includes(user.rating));
    }

    setFiltered(results);
  }, [searchTerm, filters, users]);

  const departments = Array.from(new Set(users.map(u => u.department)));

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <FilterBar
        onSearch={setSearchTerm}
        onFilter={setFilters}
        availableDepartments={departments}
      />

      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {filtered.map(user => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <UserCard user={user} />
          </motion.div>
        ))}
      </motion.div>

      <div className="flex justify-center mt-6">
        <button
          onClick={() => setPage(prev => prev + 1)}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      </div>
    </div>
  );
}

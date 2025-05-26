'use client';

import { useState } from 'react';

type Props = {
  onSearch: (term: string) => void;
  onFilter: (filters: { departments: string[]; ratings: number[] }) => void;
  availableDepartments: string[];
};

export default function FilterBar({ onSearch, onFilter, availableDepartments }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const toggleDepartment = (dept: string) => {
    const updated = selectedDepartments.includes(dept)
      ? selectedDepartments.filter(d => d !== dept)
      : [...selectedDepartments, dept];
    setSelectedDepartments(updated);
    onFilter({ departments: updated, ratings: selectedRatings });
  };

  const toggleRating = (rating: number) => {
    const updated = selectedRatings.includes(rating)
      ? selectedRatings.filter(r => r !== rating)
      : [...selectedRatings, rating];
    setSelectedRatings(updated);
    onFilter({ departments: selectedDepartments, ratings: updated });
  };

  return (
    <div className="flex flex-col gap-4 bg-white dark:bg-gray-800 p-4 rounded shadow mb-4">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name, email, or department..."
        value={searchTerm}
        onChange={handleSearch}
        className="border border-gray-500 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded shadow focus:ring-2 focus:ring-indigo-500"
      />

      {/* Filter Section */}
      <div className="flex flex-wrap gap-4">
        {/* Department Filters */}
        <div>
          <p className="font-bold text-gray-800 dark:text-white mb-1">Filter by Department:</p>
          <div className="flex gap-2 flex-wrap">
            {availableDepartments.map(dept => (
              <button
                key={dept}
                onClick={() => toggleDepartment(dept)}
                className={`px-3 py-1 border rounded font-medium transition ${
                  selectedDepartments.includes(dept)
                    ? 'bg-blue-700 text-white'
                    : 'bg-gray-300 text-gray-800 hover:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Rating Filters */}
        <div>
          <p className="font-bold text-gray-800 dark:text-white mb-1">Filter by Rating:</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(rating => (
              <button
                key={rating}
                onClick={() => toggleRating(rating)}
                className={`px-3 py-1 border rounded font-medium transition ${
                  selectedRatings.includes(rating)
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-300 text-gray-800 hover:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
                }`}
              >
                {rating}⭐
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

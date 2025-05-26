'use client';

import RatingStars from './RatingStars';
import { useBookmarkStore } from '@/store/bookmarkStore';
import Link from 'next/link';

type Props = {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    department: string;
    rating: number;
  };
};

export default function UserCard({ user }: Props) {
  const { toggleBookmark, isBookmarked } = useBookmarkStore();

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded p-4 flex flex-col gap-2 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white">
      <div className="font-bold text-lg">
        {user.firstName} {user.lastName}
      </div>
      <div className="text-sm">{user.email}</div>
      <div className="text-sm">Age: {user.age}</div>
      <div className="text-sm">Dept: {user.department}</div>
      <RatingStars rating={user.rating} />
      <div className="flex gap-2 mt-2">
        <Link
          href={`/view/${user.id}`}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded inline-block text-center"
        >
          View
        </Link>
        <button
          className={`px-3 py-1 rounded ${
            isBookmarked(user.id)
              ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
              : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-black dark:text-white'
          }`}
          onClick={() => toggleBookmark(user)}
        >
          {isBookmarked(user.id) ? 'Bookmarked' : 'Bookmark'}
        </button>
        <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded">
          Promote
        </button>
      </div>
    </div>
  );
}

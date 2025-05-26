'use client';
import { useBookmarkStore } from '@/store/bookmarkStore';
import RatingStars from '@/components/RatingStars';
import Link from 'next/link';

export default function BookmarksPage() {
  const { bookmarks, removeBookmark } = useBookmarkStore();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">📌 Bookmarked Employees</h1>

        {bookmarks.length === 0 ? (
          <p className="text-gray-600">No employees bookmarked yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookmarks.map((user) => (
              <div
                key={user.id}
                className="bg-white shadow-md rounded p-4 flex flex-col gap-2 border"
              >
                <div className="font-semibold text-lg">
                  {user.firstName} {user.lastName}
                </div>
                <div className="text-sm text-gray-600">{user.email}</div>
                <div className="text-sm">Age: {user.age}</div>
                <div className="text-sm">Dept: {user.department}</div>
                <RatingStars rating={user.rating} />
                <div className="flex gap-2 mt-2 flex-wrap">
                  <Link
                    href={`/employee/${user.id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => removeBookmark(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Remove
                  </button>
                  <button className="bg-green-500 text-white px-3 py-1 rounded text-sm">
                    Promote
                  </button>
                  <button className="bg-purple-500 text-white px-3 py-1 rounded text-sm">
                    Assign to Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

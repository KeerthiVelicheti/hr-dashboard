import { getRandomDepartment } from '@/utils/generateDept';
import RatingStars from '@/components/RatingStars';
import EmployeeTabs from '@/components/EmployeeTabs';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const res = await fetch('https://dummyjson.com/users?limit=20');
  const data = await res.json();
  return data.users.map((user: any) => ({ id: user.id.toString() }));
}

async function getUser(id: string) {
  const res = await fetch(`https://dummyjson.com/users/${id}`);
  if (!res.ok) return null;
  const user = await res.json();
  return {
    ...user,
    department: getRandomDepartment(),
    rating: Math.floor(Math.random() * 5) + 1,
  };
}

export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await getUser(params.id);
  if (!user) return notFound();

  const performanceHistory = Array.from({ length: 5 }, (_, i) => ({
    year: 2019 + i,
    rating: Math.floor(Math.random() * 5) + 1,
  }));

  const badgeColor = (rating: number) => {
    if (rating >= 4) return 'bg-green-500';
    if (rating >= 2) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-3xl mx-auto bg-gray-900 p-6 rounded shadow-md border border-gray-800">
        <h2 className="text-2xl font-bold mb-4">Employee Details</h2>

        <div className="space-y-2 text-gray-300">
          <p><strong className="text-white">Name:</strong> {user.firstName} {user.lastName}</p>
          <p><strong className="text-white">Email:</strong> {user.email}</p>
          <p><strong className="text-white">Phone:</strong> {user.phone}</p>
          <p><strong className="text-white">Age:</strong> {user.age}</p>
          <p><strong className="text-white">Department:</strong> {user.department}</p>
          <p><strong className="text-white">Address:</strong> {user.address?.address}, {user.address?.city}</p>
          <p><strong className="text-white">Bio:</strong> Dedicated and passionate team member with a strong desire to grow and contribute.</p>

          <div className="flex items-center gap-2">
            <strong className="text-white">Rating:</strong>
            <RatingStars rating={user.rating} />
            <span className={`text-white text-sm px-2 py-1 rounded ${badgeColor(user.rating)}`}>
              {user.rating} / 5
            </span>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-white">Past Performance History</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-300">
            {performanceHistory.map((p, i) => (
              <li key={i}>
                {p.year}: <span className="font-medium">{p.rating} stars</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <EmployeeTabs />
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-white">Submit Feedback</h3>
          <form className="space-y-2">
            <textarea
              className="w-full border border-gray-700 bg-gray-800 text-white p-2 rounded"
              placeholder="Write your feedback..."
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
            >
              Submit
            </button>
          </form>
        </div>

        <a
          href="/"
          className="inline-block mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          Back to Dashboard
        </a>
      </div>
    </div>
  );
}

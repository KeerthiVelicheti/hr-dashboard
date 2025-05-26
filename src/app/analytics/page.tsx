'use client';

import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';
import { useBookmarkStore } from '@/store/bookmarkStore';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function AnalyticsPage() {
  const { bookmarks } = useBookmarkStore();

  // Mocked department data
  const departments = ['HR', 'Engineering', 'Sales', 'Marketing'];
  const deptRatings = departments.map((dept) => {
    const filtered = bookmarks.filter((u) => u.department === dept);
    const avg =
      filtered.reduce((sum, u) => sum + u.rating, 0) / (filtered.length || 1);
    return parseFloat(avg.toFixed(2));
  });

  const barData = {
    labels: departments,
    datasets: [
      {
        label: 'Average Rating by Department',
        data: deptRatings,
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
      },
    ],
  };

  const lineData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Bookmark Trend (Mock)',
        data: [3, 6, 8, bookmarks.length],
        fill: false,
        borderColor: '#6366F1',
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">📊 Analytics Dashboard</h1>

        <div className="bg-white p-4 rounded shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Department-wise Ratings</h2>
          <Bar data={barData} />
        </div>

        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">Bookmark Trend</h2>
          <Line data={lineData} />
        </div>
      </div>
    </div>
  );
}


import React, { useState } from 'react';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const fakeCategories = [
  { id: 1, name: 'Electronics', productCount: 120 },
  { id: 2, name: 'Fashion', productCount: 95 },
  { id: 3, name: 'Home & Kitchen', productCount: 78 },
  { id: 4, name: 'Sports', productCount: 45 },
  { id: 5, name: 'Books', productCount: 34 },
  { id: 6, name: 'Beauty', productCount: 67 },
];

function Categories() {
  const [search, setSearch] = useState('');

  const filteredCategories = fakeCategories.filter(cat =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  const total = fakeCategories.length;
  const topCategory = fakeCategories.reduce((max, item) => item.productCount > max.productCount ? item : max, fakeCategories[0]);
  const leastCategory = fakeCategories.reduce((min, item) => item.productCount < min.productCount ? item : min, fakeCategories[0]);

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Product Categories</h1>

   
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow text-gray-800 dark:text-white">
          <p className="text-sm">Total Categories</p>
          <h3 className="text-2xl font-bold">{total}</h3>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow text-gray-800 dark:text-white">
          <p className="text-sm">Top Category</p>
          <h3 className="text-lg font-bold">{topCategory.name} ({topCategory.productCount})</h3>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow text-gray-800 dark:text-white">
          <p className="text-sm">Least Products</p>
          <h3 className="text-lg font-bold">{leastCategory.name} ({leastCategory.productCount})</h3>
        </div>
      </div>

 
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
  
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow text-gray-800 dark:text-white">
          <h2 className="text-md font-semibold mb-4">Category Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={fakeCategories}
                dataKey="productCount"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {fakeCategories.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

     
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow text-gray-800 dark:text-white">
          <h2 className="text-md font-semibold mb-4">Products per Category</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={fakeCategories}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="productCount" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-4">
        <input
          type="text"
          placeholder="Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-xs">
              <th className="p-3">#</th>
              <th className="p-3">Category Name</th>
              <th className="p-3">Product Count</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((cat, index) => (
              <tr key={cat.id} className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="p-3 text-gray-700 dark:text-gray-300">{index + 1}</td>
                <td className="p-3 font-medium text-gray-900 dark:text-white">{cat.name}</td>
                <td className="p-3 text-gray-700 dark:text-gray-300">{cat.productCount}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 text-xs rounded font-semibold 
                    ${cat.productCount === 0
                      ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                      : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                    }`}>
                    {cat.productCount === 0 ? 'Empty' : 'Active'}
                  </span>
                </td>
              </tr>
            ))}
            {filteredCategories.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Categories;

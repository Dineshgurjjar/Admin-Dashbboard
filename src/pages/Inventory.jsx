
import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { FaBoxOpen, FaExclamationTriangle, FaBan } from 'react-icons/fa';

const fakeInventory = [
  { id: 1, name: 'Wireless Mouse', category: 'Electronics', stock: 45, price: 25.99 },
  { id: 2, name: 'Gaming Keyboard', category: 'Electronics', stock: 3, price: 89.99 },
  { id: 3, name: 'Water Bottle', category: 'Home', stock: 0, price: 9.99 },
  { id: 4, name: 'LED Monitor', category: 'Electronics', stock: 8, price: 149.99 },
  { id: 5, name: 'Notebook', category: 'Stationery', stock: 22, price: 2.49 },
  { id: 6, name: 'Sneakers', category: 'Footwear', stock: 5, price: 55.0 },
  { id: 7, name: 'Backpack', category: 'Fashion', stock: 12, price: 39.0 },
];

const categories = ['All', ...new Set(fakeInventory.map((item) => item.category))];

function Inventory() {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const filtered = fakeInventory.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());
    const matchCategory = filterCategory === 'All' || item.category === filterCategory;
    return matchSearch && matchCategory;
  });

  const totalItems = fakeInventory.length;
  const lowStock = fakeInventory.filter((item) => item.stock <= 5 && item.stock > 0).length;
  const outOfStock = fakeInventory.filter((item) => item.stock === 0).length;

  const chartData = fakeInventory.map((item) => ({
    name: item.name,
    stock: item.stock,
  }));

  const getStatus = (stock) => {
    if (stock === 0) return 'Out of Stock';
    if (stock <= 5) return 'Low Stock';
    return 'In Stock';
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Inventory</h1>

 
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center gap-3 shadow">
          <FaBoxOpen className="text-blue-500 text-2xl" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Total Products</p>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">{totalItems}</h3>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center gap-3 shadow">
          <FaExclamationTriangle className="text-yellow-500 text-2xl" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Low Stock</p>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">{lowStock}</h3>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center gap-3 shadow">
          <FaBan className="text-red-500 text-2xl" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Out of Stock</p>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">{outOfStock}</h3>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
        <h2 className="text-md font-semibold text-gray-800 dark:text-white mb-2">Stock Overview</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="stock" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by product or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        >
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

   
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-xs">
              <th className="p-3">#</th>
              <th className="p-3">Product</th>
              <th className="p-3">Category</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Price</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, index) => (
              <tr
                key={item.id}
                className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="p-3 text-gray-700 dark:text-gray-300">{index + 1}</td>
                <td className="p-3 font-medium text-gray-900 dark:text-white">{item.name}</td>
                <td className="p-3 text-gray-700 dark:text-gray-300">{item.category}</td>
                <td
                  className={`p-3 font-semibold ${
                    item.stock <= 5
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {item.stock}
                </td>
                <td className="p-3 text-gray-700 dark:text-gray-300">${item.price.toFixed(2)}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded 
                    ${
                      getStatus(item.stock) === 'In Stock'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                        : getStatus(item.stock) === 'Low Stock'
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                        : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                    }`}
                  >
                    {getStatus(item.stock)}
                  </span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-400 dark:text-gray-500">
                  No matching products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventory;

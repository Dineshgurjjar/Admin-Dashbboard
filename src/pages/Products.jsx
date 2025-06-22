import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1'];

export default function ProductPage() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Wireless Mouse', price: 25, stock: 120 },
    { id: 2, name: 'Headphones', price: 49, stock: 80 },
    { id: 3, name: 'Smart Watch', price: 99, stock: 60 },
    { id: 4, name: 'Laptop Stand', price: 30, stock: 150 },
    { id: 5, name: 'USB-C Hub', price: 18, stock: 200 },
  ]);

  const [form, setForm] = useState({ name: '', price: '', stock: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      name: form.name,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
    };
    setProducts([...products, newProduct]);
    setForm({ name: '', price: '', stock: '' });
  };

  const handleRemove = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded shadow space-y-6">
      <h2 className="text-2xl font-semibold">Product Management</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="p-2 border rounded dark:bg-gray-700"
        />
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price ($)"
          className="p-2 border rounded dark:bg-gray-700"
        />
        <input
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="p-2 border rounded dark:bg-gray-700"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="text-left px-4 py-2">#</th>
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">Price ($)</th>
              <th className="text-left px-4 py-2">Stock</th>
              <th className="text-left px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod, index) => (
              <tr key={prod.id} className="border-b dark:border-gray-600">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{prod.name}</td>
                <td className="px-4 py-2">${prod.price}</td>
                <td className="px-4 py-2">{prod.stock}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleRemove(prod.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

   
      <div className="grid md:grid-cols-2 gap-6">
     
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Stock Levels (Bar Chart)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={products}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="stock" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Stock Distribution (Pie Chart)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={products}
                dataKey="stock"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {products.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

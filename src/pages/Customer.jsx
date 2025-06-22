import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { FaUser, FaUserCheck, FaUserTimes } from 'react-icons/fa';

const customerData = [
  { id: 1, name: 'Alice Smith', email: 'alice@example.com', phone: '123-456-7890', status: 'Active', orders: 12 },
  { id: 2, name: 'Bob Johnson', email: 'bob@example.com', phone: '987-654-3210', status: 'Inactive', orders: 5 },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', phone: '555-123-4567', status: 'Active', orders: 22 },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', phone: '444-888-9999', status: 'Active', orders: 17 },
  { id: 5, name: 'Eric Cartman', email: 'eric@example.com', phone: '222-666-9999', status: 'Inactive', orders: 2 },
];

const chartData = [
  { month: 'Jan', customers: 30 },
  { month: 'Feb', customers: 45 },
  { month: 'Mar', customers: 50 },
  { month: 'Apr', customers: 80 },
  { month: 'May', customers: 70 },
  { month: 'Jun', customers: 90 },
];

function Customer() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredCustomers = customerData.filter((cust) => {
    const matchesSearch =
      cust.name.toLowerCase().includes(search.toLowerCase()) ||
      cust.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'All' || cust.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const total = customerData.length;
  const active = customerData.filter((c) => c.status === 'Active').length;
  const inactive = total - active;

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Customers</h1>

    
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <div className="flex items-center gap-3 text-gray-700 dark:text-white">
            <FaUser className="text-blue-500 text-2xl" />
            <div>
              <p className="text-sm">Total Customers</p>
              <h3 className="text-xl font-bold">{total}</h3>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <div className="flex items-center gap-3 text-gray-700 dark:text-white">
            <FaUserCheck className="text-green-500 text-2xl" />
            <div>
              <p className="text-sm">Active</p>
              <h3 className="text-xl font-bold">{active}</h3>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <div className="flex items-center gap-3 text-gray-700 dark:text-white">
            <FaUserTimes className="text-red-500 text-2xl" />
            <div>
              <p className="text-sm">Inactive</p>
              <h3 className="text-xl font-bold">{inactive}</h3>
            </div>
          </div>
        </div>
      </div>

  
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
        <h2 className="text-md font-semibold text-gray-800 dark:text-white mb-2">Customer Growth</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="month" stroke="#8884d8" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="customers" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

    
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded w-full sm:w-1/2 text-gray-800 dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border rounded w-full sm:w-auto text-gray-800 dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

   
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-xs">
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Orders</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((cust, index) => (
              <tr key={cust.id} className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="p-3 text-gray-700 dark:text-gray-300">{index + 1}</td>
                <td className="p-3 font-medium text-gray-900 dark:text-white">{cust.name}</td>
                <td className="p-3 text-gray-700 dark:text-gray-300">{cust.email}</td>
                <td className="p-3 text-gray-700 dark:text-gray-300">{cust.phone}</td>
                <td className="p-3 text-gray-700 dark:text-gray-300">{cust.orders}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded 
                    ${cust.status === 'Active'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                      : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'}`}
                  >
                    {cust.status}
                  </span>
                </td>
              </tr>
            ))}
            {filteredCustomers.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-400 dark:text-gray-500">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Customer;

import React from 'react'

export default function Reports() {
  const fakeData = [
    { id: 1, product: 'Wireless Mouse', orders: 120, revenue: 2400 },
    { id: 2, product: 'Bluetooth Headphones', orders: 95, revenue: 4750 },
    { id: 3, product: 'Smart Watch', orders: 80, revenue: 6400 },
    { id: 4, product: 'Laptop Stand', orders: 60, revenue: 1800 },
    { id: 5, product: 'USB-C Hub', orders: 70, revenue: 2100 },
  ];

  const totalOrders = fakeData.reduce((sum, item) => sum + item.orders, 0);
  const totalRevenue = fakeData.reduce((sum, item) => sum + item.revenue, 0);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">E-Business Reports</h2>
      
      <div className="mb-6">
        <p className="text-gray-700 dark:text-gray-300">Summary of sales performance and key product statistics for this month.</p>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
            <h3 className="text-sm text-gray-500 dark:text-gray-300">Total Orders</h3>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{totalOrders}</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
            <h3 className="text-sm text-gray-500 dark:text-gray-300">Total Revenue</h3>
            <p className="text-lg font-bold text-gray-900 dark:text-white">${totalRevenue}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Product Sales Report</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              <tr>
                <th className="px-4 py-2 text-left">Product</th>
                <th className="px-4 py-2 text-left">Orders</th>
                <th className="px-4 py-2 text-left">Revenue ($)</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 dark:text-gray-200">
              {fakeData.map((item) => (
                <tr key={item.id} className="border-b dark:border-gray-600">
                  <td className="px-4 py-2">{item.product}</td>
                  <td className="px-4 py-2">{item.orders}</td>
                  <td className="px-4 py-2">${item.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

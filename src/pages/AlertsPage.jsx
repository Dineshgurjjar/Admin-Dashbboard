import React from 'react';
import { BsExclamationTriangleFill, BsCheckCircleFill, BsInfoCircleFill } from 'react-icons/bs';

const alerts = [
  {
    id: 1,
    type: 'warning',
    title: 'Low Stock Warning',
    message: 'Product "Wireless Mouse" stock is below the threshold.',
    icon: <BsExclamationTriangleFill className="text-yellow-500 text-xl" />,
  },
  {
    id: 2,
    type: 'success',
    title: 'Order Shipped',
    message: 'Order #12345 has been successfully shipped.',
    icon: <BsCheckCircleFill className="text-green-500 text-xl" />,
  },
  {
    id: 3,
    type: 'info',
    title: 'New Customer Signup',
    message: 'A new user signed up with the email: user@example.com.',
    icon: <BsInfoCircleFill className="text-blue-500 text-xl" />,
  },
  {
    id: 4,
    type: 'warning',
    title: 'Payment Failed',
    message: 'Payment for Order #12367 failed. Please retry.',
    icon: <BsExclamationTriangleFill className="text-red-500 text-xl" />,
  }
];

export default function AlertsPage() {
  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Alerts</h2>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-all"
          >
            <div>{alert.icon}</div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white">{alert.title}</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{alert.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

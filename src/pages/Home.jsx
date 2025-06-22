import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill
} from 'react-icons/bs';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

const summaryData = [
  {
    title: 'Products',
    icon: <BsFillArchiveFill />,
    value: 300,
    color: 'text-indigo-500',
    route: '/products',
    growth: '+12%'
  },
  {
    title: 'Categories',
    icon: <BsFillGrid3X3GapFill />,
    value: 12,
    color: 'text-yellow-500',
    route: '/categories',
    growth: '-3%'
  },
  {
    title: 'Customers',
    icon: <BsPeopleFill />,
    value: 33,
    color: 'text-green-500',
    route: '/customers',
    growth: '+8%'
  },
  {
    title: 'Alerts',
    icon: <BsFillBellFill />,
    value: 42,
    color: 'text-red-500',
    route: '/alerts',
    growth: '+5%'
  }
];

const initialChartData = [
  { name: 'Jan', uv: 4000, pv: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398 },
  { name: 'Mar', uv: 2000, pv: 9800 },
  { name: 'Apr', uv: 2780, pv: 3908 },
  { name: 'May', uv: 1890, pv: 4800 },
  { name: 'Jun', uv: 2390, pv: 3800 },
  { name: 'Jul', uv: 3490, pv: 4300 }
];

const pieData = [
  { name: 'Electronics', value: 400 },
  { name: 'Clothing', value: 300 },
  { name: 'Home', value: 300 },
  { name: 'Others', value: 200 }
];
const pieColors = ['#6366f1', '#10b981', '#facc15', '#f43f5e'];

function generateRandomData() {
  return initialChartData.map((d) => ({
    ...d,
    uv: Math.floor(Math.random() * 5000),
    pv: Math.floor(Math.random() * 5000)
  }));
}

function downloadCSV(data) {
  const headers = Object.keys(data[0]).join(",");
  const rows = data.map(row => Object.values(row).join(",")).join("\n");
  const blob = new Blob([headers + "\n" + rows], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, "dashboard_data.csv");
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState(initialChartData);
  const [filter, setFilter] = useState("month");

  
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      setFilteredData(generateRandomData());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h3>
        <p className="text-gray-500 dark:text-gray-400">Overview of e-Business performance</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-300 dark:bg-gray-700 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {summaryData.map((card, index) => (
            <DashboardCard key={index} {...card} />
          ))}
        </div>
      )}

  
      {!loading && (
        <div className="flex justify-end gap-4 mb-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white dark:bg-gray-800 text-gray-700 dark:text-white px-3 py-2 rounded-md shadow"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>

          <button
            onClick={() => downloadCSV(filteredData)}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Export CSV
          </button>
        </div>
      )}

 
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {loading ? (
          <div className="h-72 bg-gray-300 dark:bg-gray-700 rounded-2xl animate-pulse" />
        ) : (
          <ChartCard title="Monthly Orders (Bar Chart)">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#6366f1" />
                <Bar dataKey="uv" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        )}

        {loading ? (
          <div className="h-72 bg-gray-300 dark:bg-gray-700 rounded-2xl animate-pulse" />
        ) : (
          <ChartCard title="Revenue Trends (Line Chart)">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#6366f1" strokeWidth={2} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loading ? (
          <div className="h-72 bg-gray-300 dark:bg-gray-700 rounded-2xl animate-pulse" />
        ) : (
          <ChartCard title="Sales Distribution (Pie Chart)">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={100}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        )}

        {loading ? (
          <div className="h-72 bg-gray-300 dark:bg-gray-700 rounded-2xl animate-pulse" />
        ) : (
          <ChartCard title="Growth Analysis (Area Chart)">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredData}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="uv" stroke="#6366f1" fillOpacity={1} fill="url(#colorUv)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        )}
      </div>
    </main>
  );
}

function DashboardCard({ title, icon, value, color, route, growth }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(route)}
      className="cursor-pointer bg-white dark:bg-gray-800 p-5 rounded-2xl shadow hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300">{title.toUpperCase()}</h4>
        <div className={`text-2xl ${color}`}>{icon}</div>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{value}</h1>
      <p className="text-sm text-gray-500 mt-1">{growth}</p>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
      <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">{title}</h4>
      <div className="w-full h-72">{children}</div>
    </div>
  );
}

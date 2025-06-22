import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsCalendarEvent,
  BsKanban,
  BsBarChartLine,
  BsFillGearFill
} from 'react-icons/bs';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const location = useLocation();

  return (
    <>
      {/* Overlay for mobile */}
      {openSidebarToggle && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={OpenSidebar}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-[#202123] text-white z-50
          transform transition-transform duration-300 ease-in-out
          ${openSidebarToggle ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center gap-2 text-xl font-bold text-white">
            <BsCart3 className="text-2xl" /> <span>LMS</span>
          </div>
          <button
            className="md:hidden text-gray-400 hover:text-red-500 text-2xl"
            onClick={OpenSidebar}
          >
            &times;
          </button>
        </div>

        {/* Menu container - scrollable */}
        <div className="flex-1 overflow-y-auto">
          <nav className="flex flex-col py-4 px-2 space-y-1 text-sm">
            <SidebarItem icon={<BsGrid1X2Fill />} label="Dashboard" to="/" currentPath={location.pathname} />
            <SidebarItem icon={<BsFillArchiveFill />} label="Products" to="/products" currentPath={location.pathname} />
            <SidebarItem icon={<BsFillGrid3X3GapFill />} label="Categories" to="/categories" currentPath={location.pathname} />
            <SidebarItem icon={<BsPeopleFill />} label="Customers" to="/customers" currentPath={location.pathname} />
            <SidebarItem icon={<BsListCheck />} label="Inventory" to="/inventory" currentPath={location.pathname} />
            <SidebarItem icon={<BsBarChartLine />} label="Reports" to="/reports" currentPath={location.pathname} />
            <SidebarItem icon={<BsCalendarEvent />} label="Calendar" to="/calendar" currentPath={location.pathname} />
            <SidebarItem icon={<BsKanban />} label="Kanban" to="/kanban" currentPath={location.pathname} />
          </nav>
        </div>

        {/* Settings - fixed at bottom */}
        <div className="p-4 border-t border-gray-700">
          <SidebarItem
            icon={<BsFillGearFill />}
            label="Settings"
            to="/settings"
            currentPath={location.pathname}
          />
        </div>
      </aside>
    </>
  );
}

function SidebarItem({ icon, label, to, currentPath }) {
  const isActive = currentPath === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all
      ${isActive
        ? 'bg-white text-black font-semibold'
        : 'hover:bg-[#343541] hover:text-white text-gray-300'}`}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

export default Sidebar;

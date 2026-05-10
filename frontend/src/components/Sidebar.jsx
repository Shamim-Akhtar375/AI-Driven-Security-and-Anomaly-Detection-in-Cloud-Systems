import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  Activity, 
  Database, 
  Settings, 
  Users, 
  LogOut,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: ShieldAlert, label: 'Threat Monitoring', path: '/monitoring' },
    { icon: Activity, label: 'AI Insights', path: '/insights' },
    { icon: Database, label: 'Log Analysis', path: '/logs' },
    { icon: Users, label: 'User Management', path: '/admin' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-72 bg-surface border-r border-white/5 p-6 flex flex-col z-50">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-neon-blue">
          <ShieldCheck className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Sentinel AI</h1>
          <p className="text-xs text-slate-500 font-medium">Cloud Security SOC</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <item.icon size={20} />
            <span className="flex-1">{item.label}</span>
            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5">
        <button className="nav-link w-full text-danger hover:bg-danger/5 hover:text-danger">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

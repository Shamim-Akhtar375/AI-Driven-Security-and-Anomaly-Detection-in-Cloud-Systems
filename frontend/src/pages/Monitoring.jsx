import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Activity, Filter, RefreshCw } from 'lucide-react';

const Monitoring = () => {
  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">Threat Monitoring</h2>
          <p className="text-slate-400 mt-1">Live active threat streams and behavioral alerts</p>
        </div>
        <div className="flex gap-4">
          <button className="btn-ghost flex items-center gap-2"><Filter size={18} /> Filters</button>
          <button className="btn-primary flex items-center gap-2"><RefreshCw size={18} /> Refresh Stream</button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="glass-card p-12 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-danger/10 text-danger rounded-full flex items-center justify-center mb-6 animate-pulse">
            <ShieldAlert size={40} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No High-Critical Threats Active</h3>
          <p className="text-slate-400 max-w-md">Your cloud infrastructure is currently stable. AI agents are monitoring 2,450+ signals per second.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { title: 'DDoS Protection', status: 'Active', color: 'success' },
                { title: 'Brute Force Shield', status: 'Active', color: 'success' },
                { title: 'WAF Filtering', status: 'Active', color: 'success' },
            ].map((system, i) => (
                <div key={i} className="glass-card p-6 border-l-4 border-l-success">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-400">{system.title}</span>
                        <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-md font-bold uppercase">{system.status}</span>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Monitoring;

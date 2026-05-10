import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  AlertTriangle, 
  Zap, 
  TrendingUp,
  Globe,
  Bell,
  Search,
  Filter
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';
import axios from 'axios';

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-card p-6 flex flex-col justify-between"
  >
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl bg-${color}/10 text-${color}`}>
        <Icon size={24} />
      </div>
      {trend && (
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${trend > 0 ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      )}
    </div>
    <div>
      <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-white">{value}</h3>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/dashboard/stats');
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats", error);
        // Fallback dummy data for demo if API fails
        setStats({
          total_threats: 124,
          risk_score: 42.5,
          anomaly_count: 58,
          total_logs: 15420,
          severity_distribution: { High: 12, Medium: 34, Low: 78 },
          threat_trend: [
            { time: '00:00', count: 5 },
            { time: '04:00', count: 12 },
            { time: '08:00', count: 8 },
            { time: '12:00', count: 25 },
            { time: '16:00', count: 15 },
            { time: '20:00', count: 30 },
          ]
        });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const COLORS = ['#ef4444', '#f59e0b', '#3b82f6'];

  if (loading) return <div className="p-8 text-white">Loading Security Data...</div>;

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">Security Overview</h2>
          <p className="text-slate-400 mt-1">Real-time cloud infrastructure monitoring</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search logs..." 
              className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary/50 transition-all w-64"
            />
          </div>
          <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white transition-all">
            <Filter size={20} />
          </button>
          <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white transition-all relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full ring-4 ring-background"></span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Threats" 
          value={stats.total_threats} 
          icon={Shield} 
          color="danger" 
          trend={12} 
        />
        <StatCard 
          title="Risk Score" 
          value={`${stats.risk_score}%`} 
          icon={AlertTriangle} 
          color="warning" 
          trend={-5} 
        />
        <StatCard 
          title="Anomalies Detected" 
          value={stats.anomaly_count} 
          icon={Zap} 
          color="info" 
          trend={24} 
        />
        <StatCard 
          title="Logs Processed" 
          value={stats.total_logs.toLocaleString()} 
          icon={TrendingUp} 
          color="success" 
          trend={8} 
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Trend Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 glass-card p-6"
        >
          <div className="flex justify-between items-center mb-8">
            <h4 className="text-lg font-semibold text-white">Threat Activity Timeline</h4>
            <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-slate-400 focus:outline-none">
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.threat_trend}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorCount)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Severity Distribution */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-6"
        >
          <h4 className="text-lg font-semibold text-white mb-8">Severity Distribution</h4>
          <div className="h-[300px] flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'High', value: stats.severity_distribution.High || 0 },
                    { name: 'Medium', value: stats.severity_distribution.Medium || 0 },
                    { name: 'Low', value: stats.severity_distribution.Low || 0 },
                  ]}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {COLORS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-4">
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-danger"></div><span className="text-xs text-slate-400">High</span></div>
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-warning"></div><span className="text-xs text-slate-400">Med</span></div>
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary"></div><span className="text-xs text-slate-400">Low</span></div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Geographic Map Mockup */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <div className="flex justify-between items-center mb-6">
                <h4 className="text-lg font-semibold text-white">Global Threat Vectors</h4>
                <Globe className="text-slate-500" size={20} />
            </div>
            <div className="relative h-[300px] bg-slate-900/50 rounded-xl overflow-hidden flex items-center justify-center border border-white/5">
                {/* Simplified visual map representation */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-no-repeat bg-contain bg-center filter invert"></div>
                <div className="relative w-full h-full">
                    {/* Simulated pulse points */}
                    <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-danger rounded-full animate-ping"></div>
                    <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-danger rounded-full"></div>
                    <div className="absolute top-1/3 left-2/3 w-3 h-3 bg-warning rounded-full animate-ping"></div>
                    <div className="absolute top-2/3 left-1/2 w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <div className="absolute bottom-4 left-4 flex gap-4 text-xs">
                    <div className="flex items-center gap-2"><span className="w-2 h-2 bg-danger rounded-full"></span> Active Attack</div>
                    <div className="flex items-center gap-2"><span className="w-2 h-2 bg-primary rounded-full"></span> Monitoring</div>
                </div>
            </div>
          </div>

          <div className="glass-card p-6">
             <div className="flex justify-between items-center mb-6">
                <h4 className="text-lg font-semibold text-white">Recent Security Alerts</h4>
                <button className="text-xs text-primary hover:underline">View All</button>
            </div>
            <div className="space-y-4">
                {[
                    { id: 1, msg: "Multiple failed login attempts from 192.168.1.45", time: "2 min ago", type: "Brute Force", sev: "High" },
                    { id: 2, msg: "Unusual traffic volume spike detected in West-1 region", time: "15 min ago", type: "Anomaly", sev: "Medium" },
                    { id: 3, msg: "New privileged user account created: 'admin_test'", time: "1 hour ago", type: "IAM Change", sev: "Low" },
                    { id: 4, msg: "Suspicious API request pattern to /v1/auth/login", time: "2 hours ago", type: "Exploit", sev: "High" },
                ].map((alert) => (
                    <div key={alert.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5">
                        <div className={`mt-1 w-2 h-2 rounded-full ${alert.sev === 'High' ? 'bg-danger shadow-[0_0_8px_rgba(239,68,68,0.5)]' : alert.sev === 'Medium' ? 'bg-warning' : 'bg-primary'}`}></div>
                        <div className="flex-1">
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-semibold text-white">{alert.type}</span>
                                <span className="text-[10px] text-slate-500">{alert.time}</span>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">{alert.msg}</p>
                        </div>
                    </div>
                ))}
            </div>
          </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  Download, 
  CheckCircle, 
  AlertCircle,
  Database,
  RefreshCw,
  Search
} from 'lucide-react';
import axios from 'axios';

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/v1/logs/');
      setLogs(response.data);
    } catch (error) {
      console.error("Error fetching logs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    try {
      await axios.post('http://localhost:8000/api/v1/logs/upload', formData);
      fetchLogs();
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  const generateSamples = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:8000/api/v1/logs/generate-sample');
      fetchLogs();
    } catch (error) {
      console.error("Generation failed", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter(log => 
    log.ip_address.includes(search) || log.threat_type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">Log Analysis</h2>
          <p className="text-slate-400 mt-1">Deep packet inspection and behavioral analysis</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={generateSamples}
            disabled={loading}
            className="btn-ghost flex items-center gap-2"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            Generate Simulation
          </button>
          <label className="btn-primary flex items-center gap-2 cursor-pointer">
            <Upload size={18} />
            {uploading ? 'Processing...' : 'Upload Logs'}
            <input type="file" className="hidden" onChange={handleFileUpload} accept=".csv" />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="glass-card p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="Search by IP or Threat Type..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary/50"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
                <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white"><Download size={18} /></button>
                <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white" onClick={fetchLogs}><RefreshCw size={18} /></button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-slate-400 text-sm">
                  <th className="pb-4 font-medium">Timestamp</th>
                  <th className="pb-4 font-medium">Source IP</th>
                  <th className="pb-4 font-medium">Location</th>
                  <th className="pb-4 font-medium">Traffic (KB)</th>
                  <th className="pb-4 font-medium">Analysis</th>
                  <th className="pb-4 font-medium">Confidence</th>
                  <th className="pb-4 font-medium text-right">Severity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log) => (
                    <tr key={log.id} className="group hover:bg-white/[0.02] transition-all">
                      <td className="py-4 text-xs text-slate-500">{new Date(log.timestamp).toLocaleString()}</td>
                      <td className="py-4 text-sm font-mono text-white">{log.ip_address}</td>
                      <td className="py-4 text-sm text-slate-400">{log.location}</td>
                      <td className="py-4 text-sm text-slate-400">{log.traffic_volume.toFixed(2)}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          {log.is_anomaly ? (
                            <AlertCircle size={14} className="text-danger" />
                          ) : (
                            <CheckCircle size={14} className="text-success" />
                          )}
                          <span className={`text-xs font-medium ${log.is_anomaly ? 'text-danger' : 'text-success'}`}>
                            {log.threat_type}
                          </span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${log.is_anomaly ? 'bg-danger' : 'bg-primary'}`}
                            style={{ width: `${log.confidence_score * 100}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="py-4 text-right">
                        <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md ${
                          log.severity === 'High' ? 'bg-danger/10 text-danger border border-danger/20' : 
                          log.severity === 'Medium' ? 'bg-warning/10 text-warning border border-warning/20' : 
                          'bg-success/10 text-success border border-success/20'
                        }`}>
                          {log.severity}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-12 text-center text-slate-500">
                      <Database className="mx-auto mb-4 opacity-20" size={48} />
                      <p>No logs found. Upload a CSV or generate simulation data.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logs;

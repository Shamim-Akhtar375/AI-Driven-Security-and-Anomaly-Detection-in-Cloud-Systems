import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Logs from './pages/Logs';
import Monitoring from './pages/Monitoring';
import Insights from './pages/Insights';

const App = () => {
  return (
    <Router>
      <div className="flex bg-background min-h-screen">
        <Sidebar />
        <main className="flex-1 ml-72">
          <div className="glow-bg"></div>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/monitoring" element={<Monitoring />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/logs" element={<Logs />} />
            {/* Fallback for other pages in demo */}
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;

import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Lightbulb, Zap, TrendingUp } from 'lucide-react';

const Insights = () => {
  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">AI Insights</h2>
          <p className="text-slate-400 mt-1">Predictive analysis and security posture recommendations</p>
        </div>
        <button className="btn-primary">Generate Weekly Report</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-6 border border-primary/20">
            <div className="flex items-center gap-3 mb-6">
                <BrainCircuit className="text-primary" size={24} />
                <h4 className="text-lg font-semibold text-white">Behavioral Forecasting</h4>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Based on the last 7 days of traffic, we predict a 15% increase in attempted SSH brute-force attacks in the coming week. We recommend updating your security groups to restrict Port 22.
            </p>
            <div className="h-48 bg-primary/5 rounded-xl border border-white/5 flex items-center justify-center">
                <TrendingUp size={48} className="text-primary/20" />
            </div>
        </div>

        <div className="glass-card p-6 border border-secondary/20">
            <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="text-secondary" size={24} />
                <h4 className="text-lg font-semibold text-white">Security Recommendations</h4>
            </div>
            <ul className="space-y-4">
                {[
                    'Enable MFA for all IAM users in the production environment.',
                    'Rotate API keys for the "DevOps-Bot" service account.',
                    'Upgrade ingress controller to version 1.9.4 to patch CVE-2024-3312.'
                ].map((tip, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-300">
                        <Zap size={16} className="text-secondary mt-1 shrink-0" />
                        <span>{tip}</span>
                    </li>
                ))}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default Insights;

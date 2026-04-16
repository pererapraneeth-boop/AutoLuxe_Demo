'use client';

import { useState } from 'react';
import { Landmark, Calculator, FileText, Upload, CheckCircle, ArrowRight, DollarSign, PieChart, Plus } from 'lucide-react';

export default function FinancePage() {
  const [amount, setAmount] = useState(40000);
  const [interest, setInterest] = useState(4.5);
  const [term, setTerm] = useState(60);

  const calculateEMI = () => {
    const monthlyRate = interest / 12 / 100;
    const emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
    return Math.round(emi);
  };

  return (
    <div className="finance-page animate-in slide-in-from-bottom-4 duration-500">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 className="title-large">Financing & Loan Module</h1>
          <p className="text-muted">Manage loan applications, calculate EMIs, and verify documents.</p>
        </div>
        <button className="button button-primary">
          <Plus size={18} />
          <span>Apply for New Loan</span>
        </button>
      </div>

      <div className="grid grid-cols-3">
         {/* EMI Calculator */}
         <div className="card glass">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
               <Calculator size={20} color="var(--primary)" />
               <h3 className="title-small">EMI Calculator</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
               <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                     <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Loan Amount ($)</label>
                     <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>${amount.toLocaleString()}</span>
                  </div>
                  <input type="range" min="5000" max="250000" step="1000" value={amount} onChange={(e) => setAmount(Number(e.target.value))} style={{ width: '100%', height: '6px' }} />
               </div>
               <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                     <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Interest Rate (%)</label>
                     <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{interest}%</span>
                  </div>
                  <input type="range" min="1" max="15" step="0.1" value={interest} onChange={(e) => setInterest(Number(e.target.value))} style={{ width: '100%', height: '6px' }} />
               </div>
               <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                     <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Term (Months)</label>
                     <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{term} mo</span>
                  </div>
                  <input type="range" min="12" max="84" step="12" value={term} onChange={(e) => setTerm(Number(e.target.value))} style={{ width: '100%', height: '6px' }} />
               </div>
            </div>

            <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--muted)', borderRadius: '12px', textAlign: 'center' }}>
               <p className="text-muted" style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Estimated Monthly Payment</p>
               <h2 className="title-large" style={{ color: 'var(--primary)' }}>${calculateEMI().toLocaleString()}</h2>
               <p style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>*Final terms subject to bank approval</p>
            </div>
         </div>

         {/* Loan Applications */}
         <div className="card glass" style={{ gridColumn: 'span 2' }}>
            <h3 className="title-small" style={{ marginBottom: '1.5rem' }}>Active Loan Applications</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               {[
                  { name: 'John Doe', vehicle: 'Tesla Model 3', bank: 'Chase Bank', amount: '$42,990', status: 'VERIFYING' },
                  { name: 'Sarah Smith', vehicle: 'BMW M4', bank: 'Bank of America', amount: '$82,500', status: 'SUBMITTED' }
               ].map((app, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.25rem', border: '1px solid var(--border)', borderRadius: '12px', background: 'var(--card)' }}>
                     <div style={{ padding: '0.75rem', background: 'rgba(37, 99, 235, 0.1)', borderRadius: '10px' }}>
                        <Landmark size={24} color="var(--primary)" />
                     </div>
                     <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: 'bold' }}>{app.name}</h4>
                        <p className="text-muted" style={{ fontSize: '0.85rem' }}>{app.vehicle} • {app.amount}</p>
                     </div>
                     <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{app.bank}</p>
                        <p className="text-muted" style={{ fontSize: '0.75rem' }}>Reference: #FL-2024-00{i+1}</p>
                     </div>
                     <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span className={`badge ${app.status === 'VERIFYING' ? 'badge-warning' : 'badge-danger'}`}>
                           {app.status}
                        </span>
                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                           <FileText size={16} color="var(--primary)" />
                           <Upload size={16} color="var(--secondary)" />
                        </div>
                     </div>
                     <ArrowRight size={18} color="var(--secondary)" />
                  </div>
               ))}
               
               <div style={{ marginTop: '1rem', padding: '1.25rem', border: '1px dashed var(--border)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255, 255, 255, 0.3)' }}>
                  <div style={{ padding: '0.5rem', background: 'var(--muted)', borderRadius: '8px' }}>
                     <PieChart size={20} color="var(--secondary)" />
                  </div>
                  <div style={{ flex: 1 }}>
                     <p style={{ fontWeight: '600', fontSize: '0.85rem' }}>Integration with Third-Party Lenders</p>
                     <p className="text-muted" style={{ fontSize: '0.75rem' }}>API documentation ready for Banking Partners</p>
                  </div>
                  <button className="button" style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', border: '1px solid var(--border)', background: 'var(--card)' }}>View API</button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

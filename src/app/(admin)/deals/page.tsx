'use client';

import { TrendingUp, FileText, Download, MoreVertical, Plus, Clock, Target, X, User, Car, DollarSign } from 'lucide-react';
import { mockDeals, Deal } from '@/lib/mockData';
import { useState } from 'react';

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>(mockDeals);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDeal, setNewDeal] = useState<Partial<Deal>>({
    customer: '',
    vehicle: '',
    amount: 0,
    status: 'NEGOTIATION',
    date: 'Just now'
  });

  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault();
    const dealToAdd: Deal = {
      ...newDeal as Deal,
      id: `d-${Date.now()}`,
    };
    setDeals([dealToAdd, ...deals]);
    setIsModalOpen(false);
    setNewDeal({ customer: '', vehicle: '', amount: 0, status: 'NEGOTIATION', date: 'Just now' });
  };

  return (
    <div className="deals-page animate-in slide-in-from-bottom-4 duration-500">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 className="title-large">Sales & Deal Management</h1>
          <p className="text-muted">Generate quotes, track pipelines, and manage invoices.</p>
        </div>
        <button className="button button-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          <span>New Sale / Deal</span>
        </button>
      </div>

      <div className="grid grid-cols-4" style={{ marginBottom: '2.5rem' }}>
         <div className="card glass">
            <p className="text-muted">Monthly Target</p>
            <h3 className="title-medium">$1,200,000</h3>
            <div style={{ marginTop: '0.5rem', height: '6px', background: 'var(--muted)', borderRadius: '10px', overflow: 'hidden' }}>
               <div style={{ width: '70%', height: '100%', background: 'var(--primary)' }} />
            </div>
         </div>
         <div className="card glass">
            <p className="text-muted">Total Sales (MTD)</p>
            <h3 className="title-medium">$842,500</h3>
         </div>
         <div className="card glass">
            <p className="text-muted">Average Deal Value</p>
            <h3 className="title-medium">$12,450</h3>
         </div>
         <div className="card glass">
            <p className="text-muted">Pipeline Value</p>
            <h3 className="title-medium">${deals.reduce((acc, d) => acc + d.amount, 0).toLocaleString()}</h3>
         </div>
      </div>

      <div className="grid grid-cols-3">
         <div className="card glass" style={{ gridColumn: 'span 2' }}>
            <h3 className="title-small" style={{ marginBottom: '1.5rem' }}>Active Deal Pipeline</h3>
            <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }}>
               {['Lead', 'Discovery', 'Negotiation', 'Proposal', 'Closing'].map((stage) => (
                  <div key={stage} style={{ minWidth: '220px', background: 'var(--muted)', borderRadius: '12px', padding: '1rem' }}>
                     <p style={{ fontWeight: '700', fontSize: '0.85rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stage}</p>
                     
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {deals.filter(d => {
                           if (stage === 'Negotiation') return d.status === 'NEGOTIATION';
                           if (stage === 'Closing') return d.status === 'CLOSED';
                           return false; // For mock simplicity
                        }).map(deal => (
                           <div key={deal.id} style={{ background: 'var(--card)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                              <p style={{ fontWeight: '600', fontSize: '0.9rem' }}>{deal.customer}</p>
                              <p className="text-muted" style={{ fontSize: '0.75rem' }}>{deal.vehicle}</p>
                              <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                 <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>${deal.amount.toLocaleString()}</span>
                                 <Clock size={16} color="var(--secondary)" />
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <div className="card glass">
            <h3 className="title-small" style={{ marginBottom: '1.5rem' }}>Recent Documents</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               {[1, 2, 3].map(i => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '10px' }}>
                     <div style={{ padding: '0.5rem', background: 'rgba(37, 99, 235, 0.1)', borderRadius: '8px' }}>
                        <FileText size={20} color="var(--primary)" />
                     </div>
                     <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: '600', fontSize: '0.85rem' }}>Invoice_#XJ{1000 + i}.pdf</p>
                        <p className="text-muted" style={{ fontSize: '0.75rem' }}>Mar 20, 2026</p>
                     </div>
                     <Download size={18} color="var(--secondary)" />
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* New Deal Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', zIndex: 1000, display: 'grid', placeItems: 'center', padding: '2rem' }} onClick={() => setIsModalOpen(false)}>
          <div style={{ background: 'var(--background)', width: '100%', maxWidth: '500px', borderRadius: '32px', overflow: 'hidden', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '2.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div>
                  <h2 className="title-medium">Create New Deal</h2>
                  <p className="text-muted">Initiate a formal sales proposition.</p>
               </div>
               <button onClick={() => setIsModalOpen(false)} style={{ background: 'var(--muted)', padding: '0.5rem', borderRadius: '50%' }}><X size={20} /></button>
            </div>
            
            <form onSubmit={handleCreateDeal} style={{ padding: '2.5rem' }}>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="form-group">
                     <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem', display: 'block' }}>CUSTOMER NAME</label>
                     <div style={{ position: 'relative' }}>
                        <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary)' }} />
                        <input className="input" style={{ paddingLeft: '3rem' }} placeholder="Enter client name" value={newDeal.customer} onChange={e => setNewDeal({...newDeal, customer: e.target.value})} required />
                     </div>
                  </div>
                  <div className="form-group">
                     <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem', display: 'block' }}>SELECTED VEHICLE</label>
                     <div style={{ position: 'relative' }}>
                        <Car size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary)' }} />
                        <input className="input" style={{ paddingLeft: '3rem' }} placeholder="e.g. Bugatti Chiron" value={newDeal.vehicle} onChange={e => setNewDeal({...newDeal, vehicle: e.target.value})} required />
                     </div>
                  </div>
                  <div className="form-group">
                     <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem', display: 'block' }}>DEAL AMOUNT ($)</label>
                     <div style={{ position: 'relative' }}>
                        <DollarSign size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary)' }} />
                        <input type="number" className="input" style={{ paddingLeft: '3rem' }} placeholder="0.00" value={newDeal.amount} onChange={e => setNewDeal({...newDeal, amount: parseInt(e.target.value)})} required />
                     </div>
                  </div>
               </div>

               <button type="submit" className="button button-primary" style={{ width: '100%', marginTop: '2.5rem', padding: '1.1rem' }}>Generate Deal Proposition</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

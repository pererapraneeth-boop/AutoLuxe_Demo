'use client';

import { Plus, Search, Filter, Mail, Phone, MessageSquare, Briefcase, X, User, Heart } from 'lucide-react';
import { mockLeads, Lead } from '@/lib/mockData';
import { useState } from 'react';

export default function CRMPage() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLead, setNewLead] = useState<Partial<Lead>>({
    customerName: '',
    email: '',
    phone: '',
    carInterest: '',
    status: 'NEW',
    date: 'Just now'
  });

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    const leadToAdd: Lead = {
      ...newLead as Lead,
      id: `l-${Date.now()}`,
    };
    setLeads([leadToAdd, ...leads]);
    setIsModalOpen(false);
    setNewLead({ customerName: '', email: '', phone: '', carInterest: '', status: 'NEW', date: 'Just now' });
  };

  return (
    <div className="crm-page animate-in slide-in-from-bottom-4 duration-500">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 className="title-large">Customer Relationship Management</h1>
          <p className="text-muted">Track leads, inquiries, and customer interactions.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="button button-primary" onClick={() => setIsModalOpen(true)}>
             <Plus size={18} />
             <span>New Discovery Lead</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3" style={{ marginBottom: '2rem' }}>
         {leads.map(lead => (
            <div key={lead.id} className="card glass">
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                     <div style={{ width: '48px', height: '48px', background: 'var(--primary)', color: 'white', borderRadius: '12px', display: 'grid', placeItems: 'center', fontWeight: 'bold', fontSize: '1.25rem' }}>
                        {lead.customerName.charAt(0)}
                     </div>
                     <div>
                        <h3 className="title-small">{lead.customerName}</h3>
                        <p className="text-muted" style={{ fontSize: '0.8rem' }}>Added 2 days ago</p>
                     </div>
                  </div>
                  <span className={`badge ${
                     lead.status === 'NEW' ? 'badge-warning' : 
                     lead.status === 'CONTACTED' ? 'badge-success' : 'badge-danger'
                  }`}>
                     {lead.status}
                  </span>
               </div>
               
               <div className="info-grid" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem' }}>
                     <Mail size={16} color="var(--secondary)" />
                     <span>{lead.email}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem' }}>
                     <Phone size={16} color="var(--secondary)" />
                     <span>{lead.phone}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem' }}>
                     <Briefcase size={16} color="var(--secondary)" />
                     <span>Interested in: {lead.carInterest}</span>
                  </div>
               </div>

               <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
                  <button className="button" style={{ flex: 1, padding: '0.6rem', border: '1px solid var(--border)', fontSize: '0.85rem' }}>
                     <MessageSquare size={16} />
                     <span>Chat</span>
                  </button>
                  <button className="button" style={{ flex: 1, padding: '0.6rem', border: '1px solid var(--border)', fontSize: '0.85rem' }}>
                     <Phone size={16} />
                     <span>Call</span>
                  </button>
               </div>
            </div>
         ))}
      </div>

      {/* New Lead Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(2, 6, 23, 0.6)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'grid', placeItems: 'center', padding: '2rem' }} onClick={() => setIsModalOpen(false)}>
          <div style={{ background: 'var(--background)', width: '100%', maxWidth: '500px', borderRadius: '32px', overflow: 'hidden', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '2.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div>
                  <h2 className="title-medium">New Discovery Lead</h2>
                  <p className="text-muted">Register a new client interaction.</p>
               </div>
               <button onClick={() => setIsModalOpen(false)} style={{ background: 'var(--muted)', padding: '0.5rem', borderRadius: '50%' }}><X size={20} /></button>
            </div>
            
            <form onSubmit={handleAddLead} style={{ padding: '2.5rem' }}>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="form-group">
                     <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem', display: 'block' }}>FULL NAME</label>
                     <div style={{ position: 'relative' }}>
                        <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary)' }} />
                        <input className="input" style={{ paddingLeft: '3rem' }} placeholder="Preferred Name" value={newLead.customerName} onChange={e => setNewLead({...newLead, customerName: e.target.value})} required />
                     </div>
                  </div>
                  <div className="form-group">
                     <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem', display: 'block' }}>EMAIL ADDRESS</label>
                     <div style={{ position: 'relative' }}>
                        <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary)' }} />
                        <input type="email" className="input" style={{ paddingLeft: '3rem' }} placeholder="client@example.com" value={newLead.email} onChange={e => setNewLead({...newLead, email: e.target.value})} required />
                     </div>
                  </div>
                  <div className="form-group">
                     <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem', display: 'block' }}>PHONE</label>
                     <div style={{ position: 'relative' }}>
                        <Phone size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary)' }} />
                        <input className="input" style={{ paddingLeft: '3rem' }} placeholder="+1 (555) 000-0000" value={newLead.phone} onChange={e => setNewLead({...newLead, phone: e.target.value})} required />
                     </div>
                  </div>
                  <div className="form-group">
                     <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem', display: 'block' }}>VEHICLE INTEREST</label>
                     <div style={{ position: 'relative' }}>
                        <Heart size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary)' }} />
                        <input className="input" style={{ paddingLeft: '3rem' }} placeholder="e.g. Rolls-Royce Ghost" value={newLead.carInterest} onChange={e => setNewLead({...newLead, carInterest: e.target.value})} required />
                     </div>
                  </div>
               </div>

               <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem' }}>
                  <button type="button" className="button" style={{ flex: 1, border: '1px solid var(--border)' }} onClick={() => setIsModalOpen(false)}>Discard</button>
                  <button type="submit" className="button button-primary" style={{ flex: 2, padding: '1rem' }}>Create Discovery Lead</button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

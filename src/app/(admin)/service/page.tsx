'use client';

import { Wrench, Calendar, Plus, Filter, Users, Car, CheckCircle, Search, MoreVertical, AlertCircle, TrendingUp, X, User } from 'lucide-react';
import { mockServiceJobs, ServiceJob } from '@/lib/mockData';
import { useState } from 'react';

export default function ServicePage() {
  const [jobs, setJobs] = useState<ServiceJob[]>(mockServiceJobs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newJob, setNewJob] = useState<Partial<ServiceJob>>({
    vehicleName: '',
    customerName: '',
    type: '',
    status: 'WAITING',
    technician: 'Assigned upon arrival'
  });

  const handleCreateServiceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const jobToAdd: ServiceJob = {
      ...newJob as ServiceJob,
      id: `S-${Date.now()}`,
    };
    setJobs([jobToAdd, ...jobs]);
    setIsModalOpen(false);
    setNewJob({ vehicleName: '', customerName: '', type: '', status: 'WAITING', technician: 'Assigned upon arrival' });
  };

  return (
    <div className="service-page animate-in slide-in-from-bottom-4 duration-500">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 className="title-large">Service & Maintenance Hub</h1>
          <p className="text-muted">Manage workshop appointments, repairs, and service histories.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="button button-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} />
            <span>New Service Order</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4" style={{ marginBottom: '2.5rem' }}>
         <div className="card glass">
            <p className="text-muted">Active Bays</p>
            <h3 className="title-medium">{jobs.filter(j => j.status === 'IN_PROGRESS').length} / 10</h3>
            <div style={{ height: '6px', background: 'var(--muted)', borderRadius: '10px', overflow: 'hidden', marginTop: '0.5rem' }}>
               <div style={{ width: `${(jobs.filter(j => j.status === 'IN_PROGRESS').length / 10) * 100}%`, height: '100%', background: 'var(--success)' }} />
            </div>
         </div>
         <div className="card glass">
            <p className="text-muted">Total Orders</p>
            <h3 className="title-medium">{jobs.length} Jobs</h3>
         </div>
         <div className="card glass">
            <p className="text-muted">Parts in Stock</p>
            <h3 className="title-medium">2,420 Items</h3>
         </div>
         <div className="card glass">
            <p className="text-muted">Service Rev (MTD)</p>
            <h3 className="title-medium">$56,800</h3>
         </div>
      </div>

      <div className="grid grid-cols-3">
         <div className="card glass" style={{ gridColumn: 'span 2' }}>
            <h3 className="title-small" style={{ marginBottom: '1.5rem' }}>Active Service Jobs</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
               {jobs.map(job => (
                  <div key={job.id} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.25rem', border: '1px solid var(--border)', borderRadius: '12px', background: 'var(--card)' }}>
                     <div style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '10px' }}>
                        <Wrench size={24} color="var(--success)" />
                     </div>
                     <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: 'bold' }}>{job.vehicleName}</h4>
                        <p className="text-muted" style={{ fontSize: '0.85rem' }}>Owner: {job.customerName} • Service ID: #{job.id}</p>
                     </div>
                     <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{job.type}</p>
                        <p className="text-muted" style={{ fontSize: '0.75rem' }}>Technician: {job.technician}</p>
                     </div>
                     <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                        <span className={`badge ${job.status === 'IN_PROGRESS' ? 'badge-warning' : job.status === 'WAITING' ? 'badge-danger' : 'badge-success'}`}>
                           {job.status}
                        </span>
                        <p style={{ fontSize: '0.75rem', color: 'var(--secondary)' }}>Due: Today 4:00 PM</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <div className="card glass">
            <h3 className="title-small" style={{ marginBottom: '1.5rem' }}>Parts Inventory Alerts</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '10px', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                  <AlertCircle size={20} color="var(--danger)" />
                  <div style={{ flex: 1 }}>
                     <p style={{ fontWeight: '600', fontSize: '0.85rem' }}>Engine Oil Filter (A52)</p>
                     <p className="text-muted" style={{ fontSize: '0.75rem' }}>8 items left (Min: 15)</p>
                  </div>
                  <button className="button" style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', border: '1px solid var(--border)', background: 'var(--card)' }}>Order</button>
               </div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--muted)', borderRadius: '10px' }}>
                  <CheckCircle size={20} color="var(--success)" />
                  <div style={{ flex: 1 }}>
                     <p style={{ fontWeight: '600', fontSize: '0.85rem' }}>Brake Pads (WV-24)</p>
                     <p className="text-muted" style={{ fontSize: '0.75rem' }}>45 items left (Min: 10)</p>
                  </div>
                  <TrendingUp size={16} color="var(--secondary)" />
               </div>
            </div>
            
            <button className="button" style={{ width: '100%', marginTop: '1.5rem', border: '1px solid var(--border)' }}>View All Inventory</button>
         </div>
      </div>

      {/* New Service Order Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', zIndex: 1000, display: 'grid', placeItems: 'center', padding: '2rem' }} onClick={() => setIsModalOpen(false)}>
          <div style={{ background: 'var(--background)', width: '100%', maxWidth: '500px', borderRadius: '32px', overflow: 'hidden', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '2.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div>
                  <h2 className="title-medium">New Service Order</h2>
                  <p className="text-muted">Create a digital workshop record.</p>
               </div>
               <button onClick={() => setIsModalOpen(false)} style={{ background: 'var(--muted)', padding: '0.5rem', borderRadius: '50%' }}><X size={20} /></button>
            </div>
            
            <form onSubmit={handleCreateServiceOrder} style={{ padding: '2.5rem' }}>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="form-group">
                     <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem', display: 'block' }}>CLIENT NAME</label>
                     <div style={{ position: 'relative' }}>
                        <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary)' }} />
                        <input className="input" style={{ paddingLeft: '3rem' }} placeholder="Owner details" value={newJob.customerName} onChange={e => setNewJob({...newJob, customerName: e.target.value})} required />
                     </div>
                  </div>
                  <div className="form-group">
                     <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem', display: 'block' }}>VEHICLE IDENTIFICATION</label>
                     <div style={{ position: 'relative' }}>
                        <Car size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary)' }} />
                        <input className="input" style={{ paddingLeft: '3rem' }} placeholder="e.g. BMW M5 CS" value={newJob.vehicleName} onChange={e => setNewJob({...newJob, vehicleName: e.target.value})} required />
                     </div>
                  </div>
                  <div className="form-group">
                     <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem', display: 'block' }}>SERVICE TYPE / ISSUE</label>
                     <div style={{ position: 'relative' }}>
                        <Wrench size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary)' }} />
                        <input className="input" style={{ paddingLeft: '3rem' }} placeholder="e.g. Suspension Overhaul" value={newJob.type} onChange={e => setNewJob({...newJob, type: e.target.value})} required />
                     </div>
                  </div>
               </div>

               <button type="submit" className="button button-primary" style={{ width: '100%', marginTop: '2.5rem', padding: '1.1rem' }}>Initiate Service Job</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

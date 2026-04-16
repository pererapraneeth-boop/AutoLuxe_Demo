'use client';

import { Calendar, Clock, Plus, Filter, Users, Car, CheckCircle, ChevronLeft, ChevronRight, X, User, MapPin } from 'lucide-react';
import { mockTestDrives, TestDrive } from '@/lib/mockData';
import { useState } from 'react';

export default function TestDrivesPage() {
  const [bookings, setBookings] = useState<TestDrive[]>(mockTestDrives);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBooking, setNewBooking] = useState<Partial<TestDrive>>({
    customerName: '',
    vehicleName: '',
    status: 'SCHEDULED',
  });

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const bookingToAdd: TestDrive = {
      ...newBooking as TestDrive,
      id: `T-${Date.now()}`,
      date: new Date().toISOString().split('T')[0], // Fallback date
      time: '10:30 AM' // Fallback time
    };
    setBookings([bookingToAdd, ...bookings]);
    setIsModalOpen(false);
    setNewBooking({ customerName: '', vehicleName: '', status: 'SCHEDULED' });
  };

  return (
    <div className="test-drives-page animate-in slide-in-from-bottom-4 duration-500">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 className="title-large">Test Drive Scheduling</h1>
          <p className="text-muted">Manage your {bookings.length + 5} scheduled test drives this week.</p>
        </div>
        <button className="button button-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          <span>New Booking</span>
        </button>
      </div>

      <div className="grid grid-cols-4" style={{ marginBottom: '2.5rem' }}>
         <div className="card glass">
            <h3 className="title-medium">Next Drive</h3>
            <p className="text-muted">In 45 minutes with John Doe</p>
         </div>
         <div className="card glass">
            <h3 className="title-medium">Today</h3>
            <p className="text-muted">{bookings.length} bookings total</p>
         </div>
         <div className="card glass">
            <h3 className="title-medium">Tomorrow</h3>
            <p className="text-muted">4 bookings total</p>
         </div>
         <div className="card glass">
            <h3 className="title-medium">Feedback</h3>
            <p className="text-muted">92% conversion rate</p>
         </div>
      </div>

      <div className="grid grid-cols-3">
         <div className="card glass" style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
               <h3 className="title-small">Upcoming Bookings Calendar View</h3>
               <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="button" style={{ padding: '0.5rem', border: '1px solid var(--border)' }}><ChevronLeft size={16} /></button>
                  <button className="button" style={{ padding: '0.5rem', border: '1px solid var(--border)' }}><ChevronRight size={16} /></button>
               </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               {bookings.map(drive => (
                  <div key={drive.id} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.25rem', border: '1px solid var(--border)', borderRadius: '12px', background: 'var(--card)' }}>
                     <div style={{ padding: '0.75rem', background: 'var(--muted)', borderRadius: '10px', textAlign: 'center', minWidth: '60px' }}>
                        <p style={{ fontSize: '0.7rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '0.2rem' }}>APR</p>
                        <p style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{drive.date.split('-')[2] || '08'}</p>
                     </div>
                     <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: 'bold' }}>{drive.customerName}</h4>
                        <p className="text-muted" style={{ fontSize: '0.85rem' }}>Booking ID: {drive.id}</p>
                     </div>
                     <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: '600' }}>
                           <Clock size={16} color="var(--primary)" />
                           <span>{drive.time || '10:30 AM - 11:30 AM'}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--secondary)' }}>
                           <Car size={16} />
                           <span>{drive.vehicleName} • VIN: 12345</span>
                        </div>
                     </div>
                     <div style={{ flex: 1, display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <span className={`badge ${drive.status === 'SCHEDULED' ? 'badge-warning' : 'badge-success'}`}>
                           {drive.status}
                        </span>
                        <div style={{ width: '32px', height: '32px', background: 'var(--muted)', borderRadius: '50%', display: 'grid', placeItems: 'center', fontWeight: 'bold' }}>
                          {drive.customerName?.charAt(0) || '?'}
                        </div>
                     </div>
                  </div>
               ))}
               <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--secondary)', fontSize: '0.9rem' }}>+5 more bookings scheduled for this week</div>
            </div>
         </div>

         <div className="card glass">
            <h3 className="title-small" style={{ marginBottom: '1.5rem' }}>Staff Availability</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
               {['Alice Johnson', 'Bob Smith', 'Charlie Agent'].map(staff => (
                  <div key={staff} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                     <div style={{ width: '36px', height: '36px', background: 'var(--muted)', borderRadius: '10px', display: 'grid', placeItems: 'center', fontWeight: 'bold' }}>{staff.charAt(0)}</div>
                     <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: '600', fontSize: '0.85rem' }}>{staff}</p>
                        <p style={{ color: 'var(--success)', fontSize: '0.75rem', fontWeight: 'bold' }}>Available</p>
                     </div>
                     <button className="button" style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', border: '1px solid var(--border)' }}>Assign</button>
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* New Booking Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(2, 6, 23, 0.7)', backdropFilter: 'blur(10px)', zIndex: 1000, display: 'grid', placeItems: 'center', padding: '2rem' }} onClick={() => setIsModalOpen(false)}>
          <div style={{ background: 'var(--background)', width: '100%', maxWidth: '500px', borderRadius: '32px', overflow: 'hidden', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '2.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div>
                  <h2 className="title-medium">Schedule Test Drive</h2>
                  <p className="text-muted">Confirm a preferred slot for a client.</p>
               </div>
               <button onClick={() => setIsModalOpen(false)} style={{ background: 'var(--muted)', padding: '0.5rem', borderRadius: '50%' }}><X size={20} /></button>
            </div>
            
            <form onSubmit={handleCreateBooking} style={{ padding: '2.5rem' }}>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="form-group">
                     <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem', display: 'block' }}>CLIENT NAME</label>
                     <div style={{ position: 'relative' }}>
                        <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary)' }} />
                        <input className="input" style={{ paddingLeft: '3rem' }} placeholder="John Doe" value={newBooking.customerName} onChange={e => setNewBooking({...newBooking, customerName: e.target.value})} required />
                     </div>
                  </div>
                  <div className="form-group">
                     <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem', display: 'block' }}>REQUESTED VEHICLE</label>
                     <div style={{ position: 'relative' }}>
                        <Car size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary)' }} />
                        <input className="input" style={{ paddingLeft: '3rem' }} placeholder="e.g. Porsche 911" value={newBooking.vehicleName} onChange={e => setNewBooking({...newBooking, vehicleName: e.target.value})} required />
                     </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                     <div className="form-group">
                        <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem', display: 'block' }}>DATE</label>
                        <input type="date" className="input" value={newBooking.date} onChange={e => setNewBooking({...newBooking, date: e.target.value})} required />
                     </div>
                     <div className="form-group">
                        <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem', display: 'block' }}>TIME SLOT</label>
                        <select className="input" value={newBooking.time} onChange={e => setNewBooking({...newBooking, time: e.target.value})} required>
                           <option value="">Select slot</option>
                           <option value="10:30 AM">10:30 AM</option>
                           <option value="01:30 PM">01:30 PM</option>
                           <option value="04:00 PM">04:00 PM</option>
                        </select>
                     </div>
                  </div>
               </div>

               <button type="submit" className="button button-primary" style={{ width: '100%', marginTop: '2.5rem', padding: '1.1rem' }}>Confirm & Notify Client</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

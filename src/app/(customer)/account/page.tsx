'use client';

import { useRouter } from 'next/navigation';
import { Car, User, Clock, Heart, Wrench, FileText, ChevronRight, Bell, Settings, CreditCard, Landmark, CheckCircle, ArrowUpRight, LogOut } from 'lucide-react';
import { mockLeads, mockTestDrives, mockServiceJobs } from '@/lib/mockData';

export default function CustomerAccountPage() {
  const router = useRouter();
  const customer = mockLeads[0]; // Self as customer demo
  
  return (
    <div className="account-dashboard animate-in slide-in-from-bottom-4 duration-500" style={{ maxWidth: '1400px', margin: '4rem auto', padding: '0 2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 className="title-large">Welcome Back, {customer.customerName.split(' ')[0]}!</h1>
          <p className="text-muted">Manage your dream collection, bookings, and vehicle care.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="button" style={{ padding: '0.75rem 1.5rem', border: '1px solid var(--border)', borderRadius: '10px' }}><Settings size={18} /> Settings</button>
          <button className="button button-primary" style={{ padding: '0.75rem 1.5rem', borderRadius: '10px' }}>Contact Concierge</button>
        </div>
      </div>

      <div className="grid grid-cols-4" style={{ gap: '2rem' }}>
         {/* Sidebar-style Profile Nav */}
         <div className="profile-sidebar" style={{ gridColumn: 'span 1' }}>
            <div className="card glass" style={{ padding: '2rem', textAlign: 'center', marginBottom: '1.5rem' }}>
               <div style={{ width: '80px', height: '80px', background: 'var(--primary)', borderRadius: '50%', margin: '0 auto 1.5rem', display: 'grid', placeItems: 'center', fontWeight: 'bold', fontSize: '2rem', color: 'white' }}>
                  {customer.customerName.charAt(0)}
               </div>
               <h3 className="title-small">{customer.customerName}</h3>
               <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '1.5rem' }}>Luxe Enthusiast Member</p>
               <button 
                  onClick={() => { localStorage.removeItem('user_role'); router.push('/login'); }}
                  className="button" 
                  style={{ width: '100%', border: '1px solid var(--border)', marginBottom: '1rem', color: 'var(--danger)', fontSize: '0.85rem' }}
                >
                  <LogOut size={16} /> Sign Out
                </button>
               <div style={{ textAlign: 'left', padding: '1rem', background: 'var(--muted)', borderRadius: '10px', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                     <span className="text-muted">Loyalty Status</span>
                     <span style={{ fontWeight: 'bold', color: 'var(--accent)' }}>Gold Level</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                     <span className="text-muted">Member Since</span>
                     <span style={{ fontWeight: 'bold' }}>Apr 2024</span>
                  </div>
               </div>
            </div>

            <div className="card glass" style={{ padding: '0.5rem' }}>
               <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <NavTab icon={<Heart size={18} />} label="My Favorites" count={4} active />
                  <NavTab icon={<Clock size={18} />} label="Test Drives" count={1} />
                  <NavTab icon={<CreditCard size={18} />} label="Finance" />
                  <NavTab icon={<Wrench size={18} />} label="Service Hub" count={2} />
                  <NavTab icon={<FileText size={18} />} label="Documents" />
               </nav>
            </div>
         </div>

         {/* Main content Area */}
         <div className="main-content" style={{ gridColumn: 'span 3' }}>
            <div className="grid grid-cols-2" style={{ gap: '2rem' }}>
               
               {/* Test Drive Card */}
               <div className="card glass">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                     <h3 className="title-small" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Clock size={20} color="var(--primary)" />
                        Upcoming Drive
                     </h3>
                     <span className="badge badge-warning">Scheduled</span>
                  </div>
                  <div style={{ display: 'flex', gap: '1.5rem', padding: '1.25rem', border: '1px solid var(--border)', borderRadius: '12px', background: 'var(--card)' }}>
                     <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.25rem' }}>APR 08 • 10:00 AM</p>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Tesla Model 3 Performance</h4>
                        <p className="text-muted" style={{ fontSize: '0.85rem' }}>Downtown Luxe Branch</p>
                     </div>
                     <ChevronRight size={24} color="var(--secondary)" />
                  </div>
                  <button className="button" style={{ width: '100%', marginTop: '1.5rem', border: '1px solid var(--border)' }}>View All Bookings</button>
               </div>

               {/* Finance Card */}
               <div className="card glass">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                     <h3 className="title-small" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Landmark size={20} color="var(--primary)" />
                        Loan status
                     </h3>
                  </div>
                  <div style={{ padding: '1.25rem', border: '1px solid var(--border)', borderRadius: '12px', background: 'var(--card)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                     <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.1)', display: 'grid', placeItems: 'center' }}>
                        <CheckCircle size={20} color="var(--success)" />
                     </div>
                     <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Eligibility Verified</p>
                        <p className="text-muted" style={{ fontSize: '0.75rem' }}>Preferred rates unlocked for your profile.</p>
                     </div>
                     <ArrowUpRight size={18} color="var(--secondary)" />
                  </div>
                  <button className="button" style={{ width: '100%', marginTop: '1.5rem', border: '1px solid var(--border)' }}>Check Pre-Approval</button>
               </div>
            </div>

            {/* Car of your dreams list */}
            <div className="card glass" style={{ marginTop: '2rem' }}>
               <h3 className="title-small" style={{ marginBottom: '1.5rem' }}>Saved from Showroom</h3>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                  {[1, 2].map(i => (
                     <div key={i} style={{ display: 'flex', gap: '1.5rem', padding: '1rem', border: '1px solid var(--border)', borderRadius: '12px' }}>
                        <div style={{ width: '120px', height: '80px', borderRadius: '8px', overflow: 'hidden' }}>
                           <img src={`https://images.unsplash.com/photo-${i === 1 ? '1560958089-b8a1929cea89' : '1617531653332-bd46c24f2068'}?auto=format&fit=crop&w=200`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                           <p style={{ fontWeight: 'bold', fontSize: '1rem' }}>{i === 1 ? 'Tesla Model 3' : 'BMW M4 Competition'}</p>
                           <p className="text-muted" style={{ fontSize: '0.8rem' }}>$42,990 • Low Mileage</p>
                           <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                              <button className="button" style={{ padding: '0.3rem 0.6rem', fontSize: '0.7rem', border: '1px solid var(--border)', borderRadius: '6px' }}>Reserve</button>
                              <button className="button" style={{ padding: '0.3rem 0.6rem', fontSize: '0.7rem', border: '1px solid var(--border)', borderRadius: '6px' }}>Compare</button>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

function NavTab({ icon, label, count, active = false }: { icon: any, label: string, count?: number, active?: boolean }) {
   return (
      <button style={{ 
         width: '100%', 
         padding: '0.85rem 1rem', 
         display: 'flex', 
         alignItems: 'center', 
         gap: '0.75rem', 
         borderRadius: '8px', 
         fontWeight: 600, 
         fontSize: '0.9rem',
         background: active ? 'var(--primary)' : 'transparent',
         color: active ? 'white' : 'var(--secondary)',
         textAlign: 'left'
      }}>
         {icon}
         <span style={{ flex: 1 }}>{label}</span>
         {count !== undefined && (
            <span style={{ 
               background: active ? 'rgba(255,255,255,0.2)' : 'var(--muted)', 
               padding: '0.1rem 0.5rem', 
               borderRadius: '6px', 
               fontSize: '0.7rem' 
            }}>{count}</span>
         )}
      </button>
   );
}

'use client';

import { Key, Plane, Coffee, ShieldCheck, Mail, Phone, Calendar, ArrowRight, UserCheck, Star } from 'lucide-react';

export default function ConciergePage() {
  return (
    <div className="concierge-page animate-in slide-in-from-right-4 duration-700">
      {/* Hero Section */}
      <section style={{ height: '400px', background: 'var(--foreground)', color: 'white', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
         <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(2, 6, 23, 0.9), transparent)', zIndex: 1 }} />
         <img src="https://images.unsplash.com/photo-1544669146-6dec4987247d?auto=format&fit=crop&q=80&w=1600" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
         
         <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '0 2rem', position: 'relative', zIndex: 2 }}>
            <span style={{ display: 'inline-block', background: 'var(--primary)', padding: '0.4rem 1rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '0.2em' }}>ELITE SERVICES</span>
            <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.1 }}>At Your Service, 24/7.</h1>
            <p className="text-muted" style={{ maxWidth: '500px', fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.7)' }}>A dedicated level of attention that goes beyond the sale. Personalized care for the world's most discerning drivers.</p>
         </div>
      </section>

      <section style={{ maxWidth: '1200px', margin: '6rem auto', padding: '0 2rem' }}>
         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'flex-start' }}>
            {/* Services List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
               <ConciergeService icon={<Key size={28} />} title="Global Acquisition" desc="If the car of your dreams isn't in our current collection, we'll find it—anywhere on the planet." />
               <ConciergeService icon={<Plane size={28} />} title="Home Delivery" desc="Besoke worldwide logistics delivering your vehicle directly to your doorstep, showroom-fresh." />
               <ConciergeService icon={<Coffee size={28} />} title="Experience Design" desc="Invite-only track days, factory tours in Maranello or Stuttgart, and private hospitality events." />
               <ConciergeService icon={<ShieldCheck size={28} />} title="Luxe Protection" desc="Exclusive insurance and warranty packages designed for the high-end collector." />
            </div>

            {/* Concierge Form Card */}
            <div className="card glass" style={{ padding: '3rem', position: 'sticky', top: '120px' }}>
               <h3 className="title-small" style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--primary)' }}>Direct Concierge Connect</h3>
               <p className="text-muted" style={{ marginBottom: '2.5rem' }}>Send a direct request to your private Client Advisor. Most inquiries are responded to within 60 minutes.</p>
               
               <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="form-group">
                     <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem', display: 'block' }}>FULL LEGAL NAME</label>
                     <input type="text" className="input" placeholder="e.g. Raymend Scott" />
                  </div>
                  <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                     <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem', display: 'block' }}>EMAIL ADDRESS</label>
                        <input type="email" className="input" placeholder="ray@nexova.com" />
                     </div>
                     <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem', display: 'block' }}>PHONE NUMBER</label>
                        <input type="tel" className="input" placeholder="+1 555-0100" />
                     </div>
                  </div>
                  <div className="form-group">
                     <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem', display: 'block' }}>SERVICE REQUEST</label>
                     <textarea className="input" style={{ minHeight: '120px', resize: 'none' }} placeholder="How can our concierge assist you today? (e.g. Sourcing, Financing, Delivery)" />
                  </div>
                  <button className="button button-primary" style={{ width: '100%', padding: '1rem', borderRadius: '12px' }}>Request Priority Callback <ArrowRight size={20} /></button>
               </form>
            </div>
         </div>
      </section>

      {/* Trust Badges */}
      <section style={{ background: 'var(--muted)', padding: '5rem 2rem' }}>
         <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'center', gap: '6rem' }}>
            <TrustItem icon={<UserCheck size={28} />} label="Vetted Personal Advisors" />
            <TrustItem icon={<Star size={28} />} label="24/7 Global Live Support" />
            <TrustItem icon={<Calendar size={28} />} label="Exclusive Access Guaranteed" />
         </div>
      </section>
    </div>
  );
}

function ConciergeService({ icon, title, desc }: { icon: any, title: string, desc: string }) {
   return (
      <div style={{ display: 'flex', gap: '2rem' }}>
         <div style={{ padding: '1rem', background: 'var(--card)', borderRadius: '16px', color: 'var(--primary)', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', display: 'inline-block', height: 'fit-content' }}>{icon}</div>
         <div>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>{title}</h4>
            <p className="text-muted" style={{ lineHeight: 1.6 }}>{desc}</p>
         </div>
      </div>
   );
}

function TrustItem({ icon, label }: { icon: any, label: string }) {
   return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 700, fontSize: '0.9rem', color: 'var(--secondary)' }}>
         <div style={{ color: 'var(--primary)' }}>{icon}</div>
         <span>{label}</span>
      </div>
   );
}

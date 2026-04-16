'use client';

import { History, Award, Globe, Users, ShieldCheck, ArrowRight } from 'lucide-react';

export default function HeritagePage() {
  return (
    <div className="heritage-page animate-in fade-in duration-700">
      {/* Hero Section */}
      <section style={{ height: '500px', background: 'var(--foreground)', color: 'white', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
         <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', zIndex: 1 }} />
         <img src="https://images.unsplash.com/photo-1517520287167-4bda64282b54?auto=format&fit=crop&q=80&w=1600" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
         
         <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%', padding: '0 2rem', position: 'relative', zIndex: 2 }}>
            <span style={{ display: 'inline-block', background: 'var(--accent)', color: 'var(--foreground)', padding: '0.4rem 1.2rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '0.3em' }}>OUR HERITAGE</span>
            <h1 style={{ fontSize: '4.5rem', fontWeight: 900, marginBottom: '1.5rem', lineHeight: 1 }}>A Journey of Excellence</h1>
            <p style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.8)', maxWidth: '700px', margin: '0 auto' }}>Since 1995, AutoLuxe has been the definitive destination for automotive connoisseurs and high-performance enthusiasts.</p>
         </div>
      </section>

      {/* Philosophy Section */}
      <section style={{ maxWidth: '1200px', margin: '6rem auto', padding: '0 2rem' }}>
         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <div>
               <h2 className="title-large" style={{ marginBottom: '2rem' }}>Defining the Future by Honoring the Past</h2>
               <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                  AutoLuxe was founded on a simple yet ambitious premise: to provide an automotive experience that matches the precision and beauty of the cars we represent. What started as a boutique showroom in London has evolved into a global authority on prestige motor vehicles.
               </p>
               <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                  Our heritage is not just about the years we've been in business, but the relationships we've built. We don't just sell cars; we curate collections and foster a community of individuals who appreciate the intersection of art and engineering.
               </p>
            </div>
            <div style={{ position: 'relative' }}>
               <div style={{ position: 'absolute', top: '-20px', left: '-20px', width: '100px', height: '100px', background: 'var(--primary)', opacity: 0.1, borderRadius: '20px', zIndex: 0 }} />
               <img src="https://images.unsplash.com/photo-1542362567-b058c02b9ac1?auto=format&fit=crop&q=80&w=800" style={{ width: '100%', height: '500px', objectFit: 'cover', borderRadius: '24px', position: 'relative', zIndex: 1, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)' }} />
            </div>
         </div>
      </section>

      {/* Values Grid */}
      <section style={{ background: 'var(--muted)', padding: '6rem 2rem' }}>
         <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
               <h2 className="title-large">Our Core Pillars</h2>
               <p className="text-muted">The values that drive every interaction at AutoLuxe.</p>
            </div>
            <div className="grid grid-cols-3" style={{ gap: '2rem' }}>
               <ValueCard icon={<Award size={32} />} title="Uncompromising Quality" desc="Every vehicle in our collection undergoes a rigorous 150-point Luxe-Certification process." />
               <ValueCard icon={<ShieldCheck size={32} />} title="Legacy of Trust" desc="Transparency is our foundation. We provide full provenance and service history for every machine." />
               <ValueCard icon={<Globe size={32} />} title="Global Presence" desc="With 12 strategic branches worldwide, your next masterpiece is never out of reach." />
            </div>
         </div>
      </section>

      {/* Call to Action */}
      <section style={{ padding: '8rem 2rem', textAlign: 'center' }}>
         <h2 className="title-large" style={{ marginBottom: '1.5rem' }}>Begin Your Own Legacy</h2>
         <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto 3rem' }}>Browse our current collection and find the vehicle that speaks to your history.</p>
         <button className="button button-primary" style={{ padding: '1rem 3rem', borderRadius: '12px' }}>Explore Showroom <ArrowRight size={20} /></button>
      </section>
    </div>
  );
}

function ValueCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
   return (
      <div className="card glass" style={{ padding: '3rem 2rem', textAlign: 'center', transition: 'transform 0.3s' }}>
         <div style={{ color: 'var(--primary)', marginBottom: '1.5rem', display: 'inline-block' }}>{icon}</div>
         <h3 className="title-small" style={{ marginBottom: '1rem' }}>{title}</h3>
         <p className="text-muted" style={{ lineHeight: 1.6 }}>{desc}</p>
      </div>
   );
}

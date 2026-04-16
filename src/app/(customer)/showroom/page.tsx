'use client';

import { Search, Filter, ArrowRight, Star, SlidersHorizontal, ChevronDown, Heart, X, CheckCircle2, Shield,Zap, Fuel, Settings2 } from 'lucide-react';
import { mockInventory, Vehicle } from '@/lib/mockData';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function ShowroomPage() {
  const searchParams = useSearchParams();
  const conditionFilter = searchParams.get('condition');
  
  const [selectedCar, setSelectedCar] = useState<Vehicle | null>(null);
  const [modalType, setModalType] = useState<'INQUIRY' | 'SPECS' | 'PREVIEW' | null>(null);
  const [inquiryStatus, setInquiryStatus] = useState<'IDLE' | 'SUBMITTING' | 'SUCCESS'>('IDLE');

  // New Filter States
  const [makeFilter, setMakeFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');

  const filteredInventory = mockInventory.filter(car => {
    const matchesCondition = !conditionFilter || car.condition === conditionFilter;
    const matchesMake = makeFilter === 'All' || car.make === makeFilter;
    const matchesYear = yearFilter === 'All' || car.year.toString() === yearFilter;
    
    let matchesPrice = true;
    if (priceFilter === 'Under $100k') matchesPrice = car.price < 100000;
    else if (priceFilter === '$100k - $500k') matchesPrice = car.price >= 100000 && car.price <= 500000;
    else if (priceFilter === 'Over $500k') matchesPrice = car.price > 500000;

    return matchesCondition && matchesMake && matchesYear && matchesPrice;
  });

  const uniqueMakes = ['All', ...new Set(mockInventory.map(c => c.make))];
  const uniqueYears = ['All', ...new Set(mockInventory.map(c => c.year.toString()))].sort().reverse();
  const priceRanges = ['All', 'Under $100k', '$100k - $500k', 'Over $500k'];

  const clearAllFilters = () => {
    setMakeFilter('All');
    setYearFilter('All');
    setPriceFilter('All');
  };

  const handleImageClick = (e: React.MouseEvent, car: Vehicle) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedCar(car);
    setModalType('PREVIEW');
  };

  const handleInquire = (e: React.MouseEvent, car: Vehicle) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedCar(car);
    setModalType('INQUIRY');
    setInquiryStatus('IDLE');
  };

  const handleSpecs = (e: React.MouseEvent, car: Vehicle) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedCar(car);
    setModalType('SPECS');
  };

  const submitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setInquiryStatus('SUBMITTING');
    setTimeout(() => {
      setInquiryStatus('SUCCESS');
    }, 1500);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedCar(null);
  };

  return (
    <div className="showroom-page animate-in fade-in duration-700">
      {/* Hero Section */}
      <section style={{ height: '500px', background: 'var(--foreground)', color: 'white', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
         <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to right, rgba(2, 6, 23, 0.9), transparent)', zIndex: 1 }} />
         <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1600" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
         
         <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '0 2rem', position: 'relative', zIndex: 2 }}>
            <span style={{ display: 'inline-block', background: 'var(--primary)', padding: '0.4rem 1rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '0.2em' }}>
               {conditionFilter === 'NEW' ? 'FACTORY FRESH' : conditionFilter === 'USED' ? 'CERTIFIED PRE-OWNED' : 'THE LUXE COLLECTION'}
            </span>
            <h1 style={{ fontSize: '3.5rem', fontWeight: 900, maxWidth: '600px', marginBottom: '1rem', lineHeight: 1.1 }}>
               {conditionFilter === 'NEW' ? 'Be the First to Drive' : conditionFilter === 'USED' ? 'Timeless Excellence' : 'Redefining the Drive'}
            </h1>
            <p className="text-muted" style={{ maxWidth: '500px', fontSize: '1.1rem', marginBottom: '2rem', color: 'rgba(255, 255, 255, 0.7)' }}>
               Discover precision-engineered performance and chauffeur-driven luxury from the world's most prestigious marques.
            </p>
         </div>
      </section>

      {/* Filter Bar */}
      <div style={{ background: 'var(--card)', padding: '1.5rem 2rem', borderBottom: '1px solid var(--border)', position: 'sticky', top: '73px', zIndex: 90 }}>
         <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                  <SlidersHorizontal size={18} />
                  <span>Filters</span>
               </div>
               <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ position: 'relative' }}>
                    <select className="select-premium" value={makeFilter} onChange={(e) => setMakeFilter(e.target.value)}>
                      {uniqueMakes.map(m => <option key={m} value={m}>{m === 'All' ? 'Make: All' : m}</option>)}
                    </select>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <select className="select-premium" value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}>
                      {uniqueYears.map(y => <option key={y} value={y}>{y === 'All' ? 'Year: All' : y}</option>)}
                    </select>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <select className="select-premium" value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
                      {priceRanges.map(p => <option key={p} value={p}>{p === 'All' ? 'Price: All' : p}</option>)}
                    </select>
                  </div>
                  <button 
                    onClick={clearAllFilters} 
                    style={{ 
                      padding: '0.6rem 1.25rem', 
                      border: '1px solid var(--border)', 
                      borderRadius: '9999px', 
                      background: 'var(--muted)', 
                      color: 'var(--foreground)', 
                      fontSize: '0.85rem', 
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                  >
                    Clear All
                  </button>
               </div>
            </div>
            <p className="text-muted" style={{ fontWeight: 600 }}>{filteredInventory.length} Precision Machines Found</p>
         </div>
      </div>

      {/* Car Grid */}
      <section style={{ maxWidth: '1400px', margin: '4rem auto', padding: '0 2rem' }}>
         <div className="grid grid-cols-3" style={{ gap: '2.5rem' }}>
            {filteredInventory.map(car => (
               <div key={car.id} className="card-outer" style={{ position: 'relative' }}>
                  <div className="card glass" style={{ padding: 0, overflow: 'hidden', border: 'none', background: 'transparent', boxShadow: 'none' }}>
                     <div 
                        onClick={(e) => handleImageClick(e, car)}
                        style={{ position: 'relative', height: '280px', borderRadius: '16px', overflow: 'hidden', marginBottom: '1.5rem', background: 'var(--muted)', cursor: 'zoom-in' }}
                     >
                        <img src={car.images[0]} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="car-img" />
                        <div style={{ position: 'absolute', top: '15px', left: '15px', background: 'white', padding: '0.3rem 0.7rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800, color: 'var(--foreground)' }}>
                           {car.condition}
                        </div>
                        <button className="heart-btn" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(255, 255, 255, 0.2)', padding: '0.5rem', borderRadius: '50%', color: 'white', transition: 'all 0.2s', border: 'none', cursor: 'pointer' }}>
                           <Heart size={20} />
                        </button>
                        <div style={{ position: 'absolute', bottom: '0', left: 0, width: '100%', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', color: 'white' }}>
                           <div>
                              <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>Asking Price</p>
                              <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>${car.price.toLocaleString()}</h3>
                           </div>
                           <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>{car.mileage} miles</p>
                        </div>
                     </div>
                     
                     <div style={{ padding: '0 0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                           <h2 className="title-small" style={{ fontSize: '1.25rem' }}>{car.year} {car.make} {car.model}</h2>
                           <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', fontWeight: 700 }}>
                              <Star size={16} fill="var(--accent)" color="var(--accent)" />
                              <span>4.9</span>
                           </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', color: 'var(--secondary)', fontSize: '0.85rem', fontWeight: 500, marginBottom: '1.5rem' }}>
                           <span>{car.fuelType}</span>
                           <span>•</span>
                           <span>{car.transmission}</span>
                           <span>•</span>
                           <span style={{ color: 'var(--primary)', fontWeight: 700 }}>Certified-Luxe</span>
                        </div>
                     </div>
                     
                     <div style={{ display: 'flex', gap: '0.75rem', padding: '0 0.5rem' }}>
                        <button 
                           onClick={(e) => handleInquire(e, car)}
                           className="button button-primary" 
                           style={{ flex: 1, padding: '0.75rem' }}
                        >
                           Inquire Now
                        </button>
                        <button 
                           onClick={(e) => handleSpecs(e, car)}
                           className="button" 
                           style={{ border: '1px solid var(--border)', padding: '0.75rem 1.25rem' }}
                        >
                           Specs
                        </button>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* Premium Modals */}
      {modalType && (
         <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(2, 6, 23, 0.8)', backdropFilter: 'blur(12px)', zIndex: 1000, display: 'grid', placeItems: 'center', padding: '2rem' }} onClick={closeModal}>
            <div 
               style={{ 
                  background: modalType === 'PREVIEW' ? 'transparent' : 'var(--background)', 
                  width: '100%', 
                  maxWidth: modalType === 'PREVIEW' ? '1200px' : '600px', 
                  borderRadius: modalType === 'PREVIEW' ? '0' : '32px', 
                  overflow: 'hidden', 
                  position: 'relative', 
                  boxShadow: modalType === 'PREVIEW' ? 'none' : '0 25px 50px -12px rgba(0, 0, 0, 0.5)' 
               }} 
               onClick={e => e.stopPropagation()}
            >
               <button onClick={closeModal} style={{ position: 'fixed', top: '2rem', right: '2rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '0.75rem', borderRadius: '50%', cursor: 'pointer', zIndex: 1100, backdropFilter: 'blur(10px)' }}>
                  <X size={24} />
               </button>

               {modalType === 'PREVIEW' ? (
                  <div style={{ width: '100%', height: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
                     <img 
                        src={selectedCar?.images[0]} 
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '16px', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }} 
                        className="animate-in zoom-in duration-300"
                     />
                     <div style={{ textAlign: 'center', color: 'white' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>{selectedCar?.year} {selectedCar?.make} {selectedCar?.model}</h2>
                        <p style={{ opacity: 0.7, fontSize: '1.1rem' }}>${selectedCar?.price.toLocaleString()} • {selectedCar?.condition} Condition</p>
                     </div>
                  </div>
               ) : modalType === 'INQUIRY' ? (
                  <div style={{ padding: '3rem' }}>
                     {inquiryStatus === 'SUCCESS' ? (
                        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                           <div style={{ display: 'inline-flex', padding: '1.5rem', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '50%', color: '#22c55e', marginBottom: '2rem' }}>
                              <CheckCircle2 size={48} />
                           </div>
                           <h2 className="title-large" style={{ marginBottom: '1rem' }}>Inquiry Received</h2>
                           <p className="text-muted" style={{ fontSize: '1.1rem', marginBottom: '2.5rem' }}>
                              Your interest in the **{selectedCar?.year} {selectedCar?.make} {selectedCar?.model}** has been logged. A concierge will contact you shortly.
                           </p>
                           <button onClick={closeModal} className="button button-primary" style={{ width: '100%', padding: '1rem' }}>Return to Showroom</button>
                        </div>
                     ) : (
                        <>
                           <h2 className="title-large" style={{ marginBottom: '0.5rem' }}>Inquire Interest</h2>
                           <p className="text-muted" style={{ marginBottom: '2.5rem' }}>Direct consultation for the {selectedCar?.make} {selectedCar?.model}.</p>
                           
                           <form onSubmit={submitInquiry} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                              <div className="form-group">
                                 <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem', display: 'block' }}>FULL NAME</label>
                                 <input className="input" placeholder="Enter your name" required />
                              </div>
                              <div className="form-group">
                                 <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem', display: 'block' }}>PHONE NUMBER</label>
                                 <input className="input" placeholder="+1 (555) 000-0000" required />
                              </div>
                              <div className="form-group">
                                 <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem', display: 'block' }}>MESSAGE (OPTIONAL)</label>
                                 <textarea className="input" style={{ minHeight: '100px', paddingTop: '1rem' }} placeholder="I am interested in this vehicle..."></textarea>
                              </div>
                              
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', background: 'var(--muted)', borderRadius: '12px', marginBottom: '1rem' }}>
                                 <Shield size={20} color="var(--primary)" />
                                 <p style={{ fontSize: '0.75rem', color: 'var(--secondary)' }}>Your data is protected under our global privacy standards.</p>
                              </div>

                              <button type="submit" className="button button-primary" style={{ padding: '1rem', borderRadius: '14px' }} disabled={inquiryStatus === 'SUBMITTING'}>
                                 {inquiryStatus === 'SUBMITTING' ? 'Processing...' : 'Submit Exclusive Inquiry'}
                              </button>
                           </form>
                        </>
                     )}
                  </div>
               ) : (
                  <div style={{ padding: '0' }}>
                     <div style={{ height: '240px', position: 'relative' }}>
                        <img src={selectedCar?.images[0]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, var(--background), transparent)' }} />
                        <div style={{ position: 'absolute', bottom: '2rem', left: '3rem' }}>
                           <h2 className="title-large" style={{ color: 'white' }}>{selectedCar?.year} {selectedCar?.make}</h2>
                           <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.25rem', fontWeight: 600 }}>{selectedCar?.model}</p>
                        </div>
                     </div>
                     
                     <div style={{ padding: '0 3rem 3rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1rem' }}>
                           <SpecItem icon={<Zap size={20} />} label="Performance" value="High Performance" />
                           <SpecItem icon={<Settings2 size={20} />} label="Transmission" value={selectedCar?.transmission || ''} />
                           <SpecItem icon={<Fuel size={20} />} label="Fuel Type" value={selectedCar?.fuelType || ''} />
                           <SpecItem icon={<ArrowRight size={20} />} label="Mileage" value={`${selectedCar?.mileage} Miles`} />
                        </div>
                        
                        <div style={{ marginTop: '2.5rem', padding: '1.5rem', background: 'var(--muted)', borderRadius: '16px' }}>
                           <h4 style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--primary)' }}>MANUFACTURER DESCRIPTION</h4>
                           <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>{selectedCar?.description}</p>
                        </div>
                        
                        <button onClick={closeModal} className="button button-primary" style={{ width: '100%', marginTop: '2rem', padding: '1rem' }}>Close Specifications</button>
                     </div>
                  </div>
               )}
            </div>
         </div>
      )}

      <style jsx>{`
         .card-outer:hover .car-img {
            transform: scale(1.08);
         }
         .heart-btn:hover {
            background: white !important;
            color: #ef4444 !important;
         }
      `}</style>
    </div>
  );
}

function FilterChip({ label }: { label: string }) {
   return (
      <button style={{ padding: '0.5rem 1rem', border: '1px solid var(--border)', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--card)' }}>
         {label}
         <ChevronDown size={16} color="var(--secondary)" />
      </button>
   );
}

function SpecItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
   return (
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
         <div style={{ color: 'var(--primary)' }}>{icon}</div>
         <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--secondary)' }}>{label}</p>
            <p style={{ fontWeight: 700 }}>{value}</p>
         </div>
      </div>
   );
}

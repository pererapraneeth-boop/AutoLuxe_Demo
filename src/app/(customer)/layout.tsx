'use client';

import { Inter } from 'next/font/google';
import '../globals.css';
import { 
  Car, 
  Search, 
  User, 
  Heart, 
  ShoppingBag,
  Menu,
  Phone,
  Mail,
  LogOut
} from 'lucide-react';
import Link from 'next/link';
import { AuthGuard } from '@/components/auth-guard';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

import { usePathname, useSearchParams } from 'next/navigation';

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const condition = searchParams.get('condition');

  const isActive = (path: string, cond?: string) => {
    if (cond) {
      return pathname === path && condition === cond;
    }
    return pathname === path && !condition;
  };

  return (
    <AuthGuard requiredRole="CUSTOMER">
      <div className={inter.className} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Bar */}
      <div style={{ background: 'var(--foreground)', color: 'white', padding: '0.5rem 2rem', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Phone size={14} /> +1 (800) LUXE-CAR</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Mail size={14} /> concierge@autoluxe.com</span>
         </div>
      </div>

      {/* Main Navbar */}
      <header className="glass" style={{ position: 'sticky', top: 0, zIndex: 100, padding: '1rem 2rem', borderBottom: '1px solid var(--border)' }}>
         <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/showroom" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
               <div style={{ width: '40px', height: '40px', borderRadius: '8px', overflow: 'hidden' }}>
                  <img src="/logo.png" alt="AutoLuxe Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
               </div>
               <h1 className="title-small" style={{ letterSpacing: '-0.025em', fontWeight: 800 }}>AUTOLUXE</h1>
            </Link>

            <nav style={{ display: 'flex', gap: '2.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
               <Link href="/showroom" style={{ color: isActive('/showroom') ? 'var(--primary)' : 'inherit', textDecoration: 'none' }}>Showroom</Link>
               <Link href="/showroom?condition=NEW" style={{ color: isActive('/showroom', 'NEW') ? 'var(--primary)' : 'inherit', textDecoration: 'none' }}>New Vehicles</Link>
               <Link href="/showroom?condition=USED" style={{ color: isActive('/showroom', 'USED') ? 'var(--primary)' : 'inherit', textDecoration: 'none' }}>Pre-Owned</Link>
               <Link href="/heritage" style={{ color: isActive('/heritage') ? 'var(--primary)' : 'inherit', textDecoration: 'none' }}>Our Heritage</Link>
               <Link href="/concierge" style={{ color: isActive('/concierge') ? 'var(--primary)' : 'inherit', textDecoration: 'none' }}>Concierge</Link>
            </nav>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
               <button style={{ padding: '0.4rem', color: 'var(--secondary)' }}><Search size={20} /></button>
               <Link href="/account" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  padding: '0.5rem 1.25rem', 
                  border: '1px solid var(--border)', 
                  borderRadius: '10px', 
                  fontSize: '0.85rem', 
                  fontWeight: 700 
               }}>
                  <User size={18} />
                  <span>Account Dashboard</span>
               </Link>
               <button 
                  onClick={() => { localStorage.removeItem('user_role'); window.location.href = '/login'; }}
                  className="button" 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem', 
                    color: '#ef4444', 
                    fontSize: '0.85rem', 
                    fontWeight: 700, 
                    background: 'rgba(239, 68, 68, 0.05)', 
                    padding: '0.5rem 0.75rem',
                    borderRadius: '8px' 
                  }}
                >
                  <LogOut size={18} />
                  <span>Logout</span>
               </button>
            </div>
         </div>
      </header>

      {/* Page Content */}
      <main style={{ flex: 1 }}>
         {children}
      </main>

      {/* Footer */}
      <footer style={{ background: 'var(--card)', borderTop: '1px solid var(--border)', padding: '4rem 2rem' }}>
         <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '4rem' }}>
            <div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', overflow: 'hidden' }}>
                     <img src="/logo.png" alt="AutoLuxe Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <h2 className="title-small">AUTOLUXE</h2>
               </div>
               <p className="text-muted" style={{ maxWidth: '300px', lineHeight: 1.6 }}>Providing a world-class automotive experience since 1995. Discover luxury, performance, and trust.</p>
            </div>
            <div>
               <h4 style={{ marginBottom: '1.5rem' }}>Quick Links</h4>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--secondary)' }}>
                  <span>Inventory</span>
                  <span>Financing</span>
                  <span>Service Center</span>
                  <span>Trade-In Value</span>
               </div>
            </div>
            <div>
               <h4 style={{ marginBottom: '1.5rem' }}>Support</h4>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--secondary)' }}>
                  <span>Contact Us</span>
                  <span>Book Test Drive</span>
                  <span>Privacy Policy</span>
                  <span>Terms Of Service</span>
               </div>
            </div>
            <div>
               <h4 style={{ marginBottom: '1.5rem' }}>Newsletter</h4>
               <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>Get the latest luxury car news.</p>
               <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input type="text" placeholder="Email Address" className="input" style={{ flex: 1 }} />
                  <button className="button button-primary" style={{ padding: '0.5rem 1rem' }}>Join</button>
               </div>
            </div>
         </div>
         <div style={{ maxWidth: '1400px', margin: '3rem auto 0', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', textAlign: 'center', color: 'var(--secondary)', fontSize: '0.8rem' }}>
            © 2026 AutoLuxe Motors Group. All rights reserved.
         </div>
      </footer>
    </div>
    </AuthGuard>
  );
}

'use client';

import { 
  LayoutDashboard, 
  Car, 
  Users, 
  FileText, 
  Calendar, 
  Settings, 
  Search, 
  Settings2,
  Package,
  Wrench,
  TrendingUp,
  LogOut,
  ShoppingBag
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AuthGuard } from '@/components/auth-guard';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <AuthGuard requiredRole="ADMIN">
      <div className="dashboard-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-header" style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="logo-box" style={{ width: '40px', height: '40px', borderRadius: '8px', overflow: 'hidden' }}>
              <img src="/logo.png" alt="AutoLuxe Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h2 className="title-small" style={{ letterSpacing: '-0.025em' }}>AutoLuxe Admin</h2>
          </div>

          <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Link href="/" className={`sidebar-link ${pathname === '/' ? 'active' : ''}`}>
              <LayoutDashboard size={20} />
              <span>Overview</span>
            </Link>
            <Link href="/inventory" className={`sidebar-link ${pathname === '/inventory' ? 'active' : ''}`}>
              <Car size={20} />
              <span>Inventory</span>
            </Link>
            <Link href="/crm" className={`sidebar-link ${pathname === '/crm' ? 'active' : ''}`}>
              <Users size={20} />
              <span>Customers / CRM</span>
            </Link>
            <Link href="/deals" className={`sidebar-link ${pathname === '/deals' ? 'active' : ''}`}>
              <TrendingUp size={20} />
              <span>Sales & Deals</span>
            </Link>
            <Link href="/test-drives" className={`sidebar-link ${pathname === '/test-drives' ? 'active' : ''}`}>
              <Calendar size={20} />
              <span>Bookings</span>
            </Link>
            <Link href="/service" className={`sidebar-link ${pathname === '/service' ? 'active' : ''}`}>
              <Wrench size={20} />
              <span>Service Dept</span>
            </Link>
            <Link href="/parts" className={`sidebar-link ${pathname === '/parts' ? 'active' : ''}`}>
              <Package size={20} />
              <span>Parts & Stock</span>
            </Link>
            <Link href="/reports" className={`sidebar-link ${pathname === '/reports' ? 'active' : ''}`}>
              <FileText size={20} />
              <span>Analytics</span>
            </Link>
          </nav>


          <div className="sidebar-footer" style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', marginTop: 'auto', paddingBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Link href="/settings" className={`sidebar-link ${pathname === '/settings' ? 'active' : ''}`}>
              <Settings2 size={20} />
              <span>Admin Settings</span>
            </Link>
            <button 
               onClick={() => { localStorage.removeItem('user_role'); window.location.href = '/login'; }}
               className="sidebar-link" 
               style={{ color: '#ef4444', width: '100%', justifyContent: 'flex-start', background: 'rgba(239, 68, 68, 0.05)', fontWeight: 'bold' }}
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Main View */}
        <main className="main-content">
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
             <div className="search-bar glass" style={{ padding: '0.5rem 1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.75rem', width: '400px' }}>
                <Search size={18} color="var(--secondary)" />
                <input type="text" placeholder="Search VIN, customer or lead ID..." style={{ border: 'none', background: 'none', outline: 'none', flex: 1, color: 'inherit' }} />
             </div>
             <div className="user-profile" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div className="notifications-bell" style={{ padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '10px', position: 'relative' }}>
                   <div style={{ width: '8px', height: '8px', background: 'var(--danger)', borderRadius: '50%', position: 'absolute', top: '4px', right: '4px', border: '2px solid var(--card)' }} />
                   <Settings size={20} color="var(--secondary)" />
                 </div>
                <div className="avatar" style={{ width: '40px', height: '40px', background: 'var(--muted)', borderRadius: '10px', display: 'grid', placeItems: 'center', fontWeight: 'bold' }}>JD</div>
             </div>
          </header>
          {children}
        </main>
      </div>

      <style jsx global>{`
        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          color: var(--secondary);
          font-weight: 500;
          transition: all 0.2s ease;
        }
        .sidebar-link:hover {
          background-color: var(--muted);
          color: var(--foreground);
          transform: translateX(4px);
        }
        .sidebar-link.active {
          background-color: var(--primary);
          color: white !important;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
        }
      `}</style>
    </AuthGuard>
  );
}

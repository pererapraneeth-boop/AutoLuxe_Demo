'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Car, Lock, User, ArrowRight, ShieldCheck, Mail, AlertCircle, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Mock authentication delay for premium feel
    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('user_role', 'ADMIN');
        localStorage.setItem('user_name', 'Super Admin');
        router.push('/');
      } else if (username === 'raymend' && password === 'nexova123') {
        localStorage.setItem('user_role', 'CUSTOMER');
        localStorage.setItem('user_name', 'Raymend');
        router.push('/showroom');
      } else {
        setError('Invalid credentials. Please try again or contact support.');
        setLoading(false);
      }
    }, 1200);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)', display: 'grid', placeItems: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Background Decor */}
      <div style={{ position: 'absolute', top: '10%', left: '10%', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(37, 99, 235, 0.05)', filter: 'blur(80px)', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.05)', filter: 'blur(80px)', zIndex: 0 }} />

      <div style={{ width: '100%', maxWidth: '440px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', width: '80px', height: '80px', borderRadius: '18px', overflow: 'hidden', marginBottom: '1.5rem', boxShadow: '0 10px 25px rgba(37, 99, 235, 0.2)' }}>
            <img src="/logo.png" alt="AutoLuxe official logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <h1 className="title-large" style={{ letterSpacing: '-0.025em' }}>Welcome to AutoLuxe</h1>
          <p className="text-muted">Precision management for the world's finest automobiles.</p>
        </div>

        <div className="card glass" style={{ padding: '2.5rem', borderRadius: '24px' }}>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="form-group">
               <label style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.75rem', display: 'block' }}>ACCOUNT USERNAME</label>
               <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--secondary)' }}><User size={18} /></div>
                  <input 
                    className="input" 
                    placeholder="Enter username" 
                    style={{ paddingLeft: '3rem' }} 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
               </div>
            </div>

            <div className="form-group">
               <label style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.75rem', display: 'block' }}>SECURE PASSWORD</label>
               <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--secondary)' }}><Lock size={18} /></div>
                  <input 
                    type="password" 
                    className="input" 
                    placeholder="••••••••" 
                    style={{ paddingLeft: '3rem' }} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
               </div>
            </div>

            {error && (
              <div style={{ color: 'var(--danger)', fontSize: '0.85rem', background: 'rgba(239, 68, 68, 0.05)', padding: '0.75rem 1rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <button 
              type="submit" 
              className="button button-primary" 
              style={{ width: '100%', padding: '1rem', borderRadius: '12px', fontSize: '1rem' }}
              disabled={loading}
            >
              {loading ? <Loader2 size={24} className="animate-spin" /> : <>Sign Into AutoLuxe <ArrowRight size={20} /></>}
            </button>
          </form>

          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
             <p className="text-muted" style={{ fontSize: '0.8rem', textAlign: 'center' }}>Having trouble signing in? <span style={{ color: 'var(--primary)', fontWeight: 700 }}>Contact Concierge</span></p>
             <div style={{ padding: '1rem', background: 'var(--muted)', borderRadius: '12px', fontSize: '0.7rem' }}>
                <p style={{ color: 'var(--secondary)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '4px' }}><ShieldCheck size={12} /> SECURED SYSTEM ACCESS</p>
                <p className="text-muted">This workstation is actively monitored. Unauthorized access is strictly prohibited under our SaaS Terms of Service.</p>
             </div>
          </div>
        </div>
        
        <p style={{ textAlign: 'center', marginTop: '2.5rem', color: 'var(--secondary)', fontSize: '0.75rem' }}>© 2026 AUTOLUXE MOTORS GROUP • GLOBAL CDMS v1.02</p>
      </div>

      <style jsx>{`
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

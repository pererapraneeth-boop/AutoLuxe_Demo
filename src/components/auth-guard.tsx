'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export function AuthGuard({ children, requiredRole }: { children: React.ReactNode, requiredRole?: 'ADMIN' | 'CUSTOMER' }) {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const userRole = localStorage.getItem('user_role');
    const isLoginPage = pathname === '/login';

    if (!userRole && !isLoginPage) {
      router.push('/login');
      return;
    }

    if (requiredRole && userRole !== requiredRole) {
      // If customer tries to access admin, send to showroom
      if (userRole === 'CUSTOMER' && requiredRole === 'ADMIN') {
        router.push('/showroom');
        return;
      }
      // If admin tries to access customer, send to admin dashboard
      if (userRole === 'ADMIN' && requiredRole === 'CUSTOMER') {
        router.push('/');
        return;
      }
    }

    setAuthorized(true);
  }, [pathname, router, requiredRole]);

  if (!authorized && pathname !== '/login') {
    return (
      <div style={{ height: '100vh', display: 'grid', placeItems: 'center', background: 'var(--background)' }}>
        <Loader2 className="animate-spin" size={48} color="var(--primary)" />
      </div>
    );
  }

  return <>{children}</>;
}

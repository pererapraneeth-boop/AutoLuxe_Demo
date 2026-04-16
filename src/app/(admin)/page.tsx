'use client';

import { 
  TrendingUp, 
  Users, 
  Car, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  AreaChart,
  Area
} from 'recharts';
import { mockStats, mockSalesData, mockLeads, mockInventory } from '@/lib/mockData';

export default function Dashboard() {
  return (
    <div className="dashboard-content animate-in slide-in-from-bottom-4 duration-500">
      {/* Welcome Header */}
      <div className="welcome-section" style={{ marginBottom: '2rem' }}>
        <h1 className="title-large">Good Morning, Admin 👋</h1>
        <p className="text-muted">Here's what's happening across your 3 branches today.</p>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-4" style={{ marginBottom: '2.5rem' }}>
        {mockStats.map((stat, i) => (
          <div key={i} className="card glass">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div className="icon-wrap" style={{ 
                padding: '0.6rem', 
                borderRadius: '10px', 
                background: stat.color === 'blue' ? 'rgba(37, 99, 235, 0.1)' : 
                           stat.color === 'green' ? 'rgba(16, 185, 129, 0.1)' : 
                           stat.color === 'amber' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(139, 92, 246, 0.1)'
              }}>
                {stat.label.includes('Inventory') && <Car size={20} color="var(--primary)" />}
                {stat.label.includes('Revenue') && <DollarSign size={20} color="var(--success)" />}
                {stat.label.includes('Leads') && <Users size={20} color="var(--accent)" />}
                {stat.label.includes('Deliveries') && <TrendingUp size={20} color="#8b5cf6" />}
              </div>
              <span style={{ 
                fontSize: '0.75rem', 
                fontWeight: 'bold', 
                color: stat.trend.startsWith('+') ? 'var(--success)' : 'var(--danger)',
                display: 'flex',
                alignItems: 'center',
                gap: '2px'
              }}>
                {stat.trend} {stat.trend.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              </span>
            </div>
            <p className="text-muted" style={{ fontWeight: '500' }}>{stat.label}</p>
            <h3 className="title-medium" style={{ marginTop: '0.25rem' }}>{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3" style={{ gap: '1.5rem' }}>
        {/* Main Sales Chart */}
        <div className="card glass grid-cols-2" style={{ gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div>
              <h3 className="title-small">Revenue Overview</h3>
              <p className="text-muted">6-month performance analysis</p>
            </div>
            <select className="input" style={{ width: 'auto', padding: '0.4rem 1rem', fontSize: '0.8rem' }}>
               <option>Last 6 Months</option>
               <option>Year to Date</option>
            </select>
          </div>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockSalesData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--secondary)', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--secondary)', fontSize: 12}} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip 
                   contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', boxShadow: 'var(--shadow-lg)' }}
                   itemStyle={{ color: 'var(--primary)', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Leads */}
        <div className="card glass">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 className="title-small">Recent High-Intent Leads</h3>
            <button className="text-muted" style={{ fontWeight: '600', fontSize: '0.75rem' }}>View All</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {mockLeads.map((lead) => (
              <div key={lead.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: '40px', height: '40px', background: 'var(--muted)', borderRadius: '50%', display: 'grid', placeItems: 'center', fontWeight: 'bold' }}>
                  {lead.customerName.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: '600', fontSize: '0.9rem' }}>{lead.customerName}</p>
                  <p className="text-muted" style={{ fontSize: '0.75rem' }}>Interested in: {lead.carInterest}</p>
                </div>
                <span className={`badge ${
                  lead.status === 'NEW' ? 'badge-warning' : 
                  lead.status === 'CONTACTED' ? 'badge-success' : 'badge-danger'
                }`}>
                  {lead.status}
                </span>
              </div>
            ))}
          </div>
          
          <div className="cta-box" style={{ marginTop: '1.5rem', background: 'var(--muted)', padding: '1rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
             <Clock size={16} color="var(--primary)" />
             <p style={{ fontSize: '0.8rem', fontWeight: '500' }}>3 leads require immediate follow-up</p>
          </div>
        </div>
      </div>

      {/* Inventory & Stock Alert */}
      <div className="grid grid-cols-1" style={{ marginTop: '1.5rem' }}>
         <div className="card glass">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
               <h3 className="title-small">Inventory Distribution</h3>
            </div>
            <div style={{ display: 'flex', gap: '2rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
               {mockInventory.map(car => (
                  <div key={car.id} style={{ minWidth: '280px', flex: 1 }}>
                     <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '160px', marginBottom: '1rem' }}>
                        <img src={car.images[0]} alt={car.make} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', top: '10px', right: '10px' }} className={`badge ${car.status === 'AVAILABLE' ? 'badge-success' : 'badge-warning'}`}>
                           {car.status}
                        </div>
                     </div>
                     <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{car.year} {car.make} {car.model}</h4>
                     <p className="text-muted" style={{ fontWeight: '600' }}>${car.price.toLocaleString()}</p>
                  </div>
               ))}
            </div>
         </div>
      </div>
      
      <style jsx>{`
        .animate-in {
          animation: slideIn 0.5s ease-out;
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

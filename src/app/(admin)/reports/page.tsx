'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';
import { DollarSign, TrendingUp, Users, Car, Download, Calendar } from 'lucide-react';
import { mockSalesData } from '@/lib/mockData';

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const distributionData = [
  { name: 'Sedans', value: 45 },
  { name: 'SUVs', value: 32 },
  { name: 'EVs', value: 18 },
  { name: 'Luxury', value: 5 },
];

export default function ReportsPage() {
  return (
    <div className="reports-page animate-in slide-in-from-bottom-4 duration-500">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 className="title-large">Reports & Advanced Analytics</h1>
          <p className="text-muted">Track revenue growth, inventory turnover, and staff performance KPIs.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="button" style={{ border: '1px solid var(--border)' }}>
            <Calendar size={18} />
            <span>Select Range</span>
          </button>
          <button className="button button-primary">
            <Download size={18} />
            <span>Export PDF Report</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3" style={{ marginBottom: '2rem' }}>
         {/* Monthly Revenue Comparison */}
         <div className="card glass" style={{ gridColumn: 'span 2' }}>
            <h3 className="title-small" style={{ marginBottom: '1.5rem' }}>Monthly Revenue Growth</h3>
            <div style={{ height: '350px' }}>
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockSalesData}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `$${v/1000}k`} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid var(--border)' }} />
                    <Area type="monotone" dataKey="revenue" stroke="#2563eb" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Inventory Distribution */}
         <div className="card glass">
            <h3 className="title-small" style={{ marginBottom: '1.5rem' }}>Portfolio Distribution</h3>
            <div style={{ height: '240px' }}>
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie
                        data={distributionData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                     >
                        {distributionData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                     </Pie>
                     <Tooltip />
                  </PieChart>
               </ResponsiveContainer>
            </div>
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
               {distributionData.map((item, index) => (
                  <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '10px', height: '10px', background: COLORS[index], borderRadius: '50%' }} />
                        <span style={{ fontSize: '0.85rem' }}>{item.name}</span>
                     </div>
                     <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{item.value}%</span>
                  </div>
               ))}
            </div>
         </div>
      </div>

      <div className="grid grid-cols-2">
         {/* Sales Agent Performance */}
         <div className="card glass">
            <h3 className="title-small" style={{ marginBottom: '1.5rem' }}>Agent Performance (Unit Sales)</h3>
            <div style={{ height: '300px' }}>
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockSalesData}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} />
                     <YAxis axisLine={false} tickLine={false} />
                     <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid var(--border)' }} />
                     <Bar dataKey="sales" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Quick Facts */}
         <div className="grid grid-cols-1">
            <div className="card glass" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
               <div style={{ padding: '1rem', background: 'rgba(37, 99, 235, 0.1)', borderRadius: '12px' }}>
                  <TrendingUp size={24} color="#2563eb" />
               </div>
               <div>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--secondary)' }}>Conversion Rate</h4>
                  <h2 className="title-medium">32.4%</h2>
               </div>
            </div>
            <div className="card glass" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '1rem' }}>
               <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px' }}>
                  <Users size={24} color="#10b981" />
               </div>
               <div>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--secondary)' }}>New Leads Today</h4>
                  <h2 className="title-medium">24</h2>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

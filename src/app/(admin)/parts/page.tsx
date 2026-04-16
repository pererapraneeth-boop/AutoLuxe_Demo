'use client';

import { Package, Search, Plus, Filter, AlertTriangle, ArrowRight, Trash, Edit, BarChart3, X, Archive, Hash, Tag, DollarSign, Layers } from 'lucide-react';
import { mockParts, Part } from '@/lib/mockData';
import { useState } from 'react';

export default function PartsPage() {
  const [parts, setParts] = useState<Part[]>(mockParts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingPart, setEditingPart] = useState<Part | null>(null);
  const [partToDelete, setPartToDelete] = useState<Part | null>(null);
  const [formData, setFormData] = useState<Partial<Part>>({
    name: '',
    category: 'General',
    partNumber: '',
    stock: 0,
    alertLevel: 5,
    price: 0
  });

  const handleOpenAdd = () => {
    setEditingPart(null);
    setFormData({ name: '', category: 'General', partNumber: '', stock: 0, alertLevel: 5, price: 0 });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (part: Part) => {
    setEditingPart(part);
    setFormData(part);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (part: Part) => {
    setPartToDelete(part);
    setIsDeleteModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPart) {
      setParts(parts.map(p => p.id === editingPart.id ? { ...p, ...formData as Part } : p));
    } else {
      const newPart: Part = {
        ...formData as Part,
        id: `P-${Date.now()}`
      };
      setParts([newPart, ...parts]);
    }
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (partToDelete) {
      setParts(parts.filter(p => p.id !== partToDelete.id));
      setIsDeleteModalOpen(false);
      setPartToDelete(null);
    }
  };

  return (
    <div className="parts-page animate-in slide-in-from-bottom-4 duration-500">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 className="title-large">Spare Parts & Accessories</h1>
          <p className="text-muted">Manage inventory for parts, track stock levels, and set alerts.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="button button-primary" onClick={handleOpenAdd}>
            <Plus size={18} />
            <span>Add New Part</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4" style={{ marginBottom: '2.5rem' }}>
         <div className="card glass">
            <p className="text-muted">Total SKU Volume</p>
            <h3 className="title-medium">{parts.length}</h3>
         </div>
         <div className="card glass">
            <p className="text-muted">Stock Value</p>
            <h3 className="title-medium">${parts.reduce((acc, p) => acc + (p.price * p.stock), 0).toLocaleString()}</h3>
         </div>
         <div className="card glass" style={{ border: `1px solid ${parts.some(p => p.stock <= p.alertLevel) ? 'var(--danger)' : 'var(--border)'}` }}>
            <p className="text-muted">Low Stock Alerts</p>
            <h3 className="title-medium" style={{ color: parts.some(p => p.stock <= p.alertLevel) ? 'var(--danger)' : 'inherit' }}>
               {parts.filter(p => p.stock <= p.alertLevel).length} Items
            </h3>
         </div>
         <div className="card glass">
            <p className="text-muted">Orders Pending</p>
            <h3 className="title-medium">5</h3>
         </div>
      </div>

      <div className="card glass" style={{ padding: '0' }}>
         <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
            <div className="search-bar" style={{ display: 'flex', gap: '0.5rem', background: 'var(--muted)', padding: '0.5rem 1rem', borderRadius: '10px' }}>
               <Search size={18} color="var(--secondary)" />
               <input type="text" placeholder="Search Part SKU..." style={{ border: 'none', background: 'none' }} />
            </div>
            <button className="button" style={{ border: '1px solid var(--border)' }}><Filter size={18} /> Filters</button>
         </div>

         <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
               <thead>
                  <tr style={{ background: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>
                     <th style={{ padding: '1.25rem', textAlign: 'left', fontSize: '0.85rem' }}>PART NAME / SKU</th>
                     <th style={{ padding: '1.25rem', textAlign: 'left', fontSize: '0.85rem' }}>CATEGORY</th>
                     <th style={{ padding: '1.25rem', textAlign: 'left', fontSize: '0.85rem' }}>STOCK LEVEL</th>
                     <th style={{ padding: '1.25rem', textAlign: 'left', fontSize: '0.85rem' }}>PRICE</th>
                     <th style={{ padding: '1.25rem', textAlign: 'right', fontSize: '0.85rem' }}>ACTIONS</th>
                  </tr>
               </thead>
               <tbody>
                  {parts.map(part => (
                     <tr key={part.id} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '1.25rem' }}>
                           <p style={{ fontWeight: '600' }}>{part.name}</p>
                           <p className="text-muted" style={{ fontSize: '0.75rem' }}>SKU: {part.partNumber}</p>
                        </td>
                        <td style={{ padding: '1.25rem' }}>
                           <span className="badge" style={{ background: 'var(--muted)', color: 'var(--secondary)' }}>{part.category}</span>
                        </td>
                        <td style={{ padding: '1.25rem' }}>
                           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                              <div style={{ flex: 1, height: '6px', width: '100px', background: 'var(--muted)', borderRadius: '10px', overflow: 'hidden' }}>
                                 <div style={{ 
                                    width: `${Math.min((part.stock / 50) * 100, 100)}%`, 
                                    height: '100%', 
                                    background: part.stock <= part.alertLevel ? 'var(--danger)' : 'var(--success)' 
                                 }} />
                              </div>
                              <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{part.stock}</span>
                           </div>
                        </td>
                        <td style={{ padding: '1.25rem', fontWeight: 'bold' }}>${part.price.toLocaleString()}</td>
                        <td style={{ padding: '1.25rem', textAlign: 'right' }}>
                           <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                              <button onClick={() => handleOpenEdit(part)} style={{ padding: '0.4rem', border: '1px solid var(--border)', borderRadius: '6px' }}><Edit size={14} /></button>
                              <button onClick={() => handleDeleteClick(part)} style={{ padding: '0.4rem', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--danger)' }}><Trash size={14} /></button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* Part Modal (Add/Edit) */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', zIndex: 1000, display: 'grid', placeItems: 'center', padding: '2rem' }} onClick={() => setIsModalOpen(false)}>
          <div style={{ background: 'var(--background)', width: '100%', maxWidth: '500px', borderRadius: '32px', overflow: 'hidden', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '2.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div>
                  <h2 className="title-medium">{editingPart ? 'Update Accessory' : 'Register New Part'}</h2>
                  <p className="text-muted">Maintain precise inventory control.</p>
               </div>
               <button onClick={() => setIsModalOpen(false)} style={{ background: 'var(--muted)', padding: '0.5rem', borderRadius: '50%' }}><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSave} style={{ padding: '2.5rem' }}>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="form-group">
                     <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem', display: 'block' }}>COMPONENT NAME</label>
                     <div style={{ position: 'relative' }}>
                        <Archive size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary)' }} />
                        <input className="input" style={{ paddingLeft: '3rem' }} placeholder="e.g. Carbon Ceramic Rotors" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                     </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                     <div className="form-group">
                        <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem', display: 'block' }}>SKU / PART #</label>
                        <div style={{ position: 'relative' }}>
                           <Hash size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary)' }} />
                           <input className="input" style={{ paddingLeft: '3rem' }} placeholder="XX-000-00" value={formData.partNumber} onChange={e => setFormData({...formData, partNumber: e.target.value})} required />
                        </div>
                     </div>
                     <div className="form-group">
                        <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem', display: 'block' }}>UNIT PRICE ($)</label>
                        <div style={{ position: 'relative' }}>
                           <DollarSign size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary)' }} />
                           <input type="number" className="input" style={{ paddingLeft: '3rem' }} placeholder="0.00" value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})} required />
                        </div>
                     </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                     <div className="form-group">
                        <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem', display: 'block' }}>CATEGORY</label>
                        <div style={{ position: 'relative' }}>
                           <Tag size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary)' }} />
                           <input className="input" style={{ paddingLeft: '3rem' }} placeholder="Braking" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required />
                        </div>
                     </div>
                     <div className="form-group">
                        <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem', display: 'block' }}>INITIAL STOCK</label>
                        <div style={{ position: 'relative' }}>
                           <Layers size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary)' }} />
                           <input type="number" className="input" style={{ paddingLeft: '3rem' }} placeholder="0" value={formData.stock} onChange={e => setFormData({...formData, stock: parseInt(e.target.value)})} required />
                        </div>
                     </div>
                  </div>
               </div>

               <button type="submit" className="button button-primary" style={{ width: '100%', marginTop: '2.5rem', padding: '1.1rem' }}>
                  {editingPart ? 'Commit Inventory Update' : 'Initialize Stock Unit'}
               </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', zIndex: 1001, display: 'grid', placeItems: 'center', padding: '2rem' }}>
          <div style={{ background: 'var(--background)', width: '100%', maxWidth: '400px', borderRadius: '24px', padding: '2.5rem', textAlign: 'center', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }}>
            <div style={{ width: '64px', height: '64px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '50%', display: 'grid', placeItems: 'center', margin: '0 auto 1.5rem' }}>
               <Trash size={28} color="var(--danger)" />
            </div>
            <h3 className="title-small" style={{ marginBottom: '0.5rem' }}>Decommission Part?</h3>
            <p className="text-muted" style={{ marginBottom: '2rem' }}>Are you sure you want to remove <strong>{partToDelete?.name}</strong> from the records? This action is permanent.</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
               <button className="button" style={{ flex: 1, border: '1px solid var(--border)' }} onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
               <button className="button" style={{ flex: 1, background: 'var(--danger)', color: 'white' }} onClick={confirmDelete}>Confirm Deletion</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

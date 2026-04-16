'use client';

import { Plus, Filter, Search, MoreHorizontal, Edit3, Trash, ExternalLink, X, Upload } from 'lucide-react';
import { mockInventory, Vehicle } from '@/lib/mockData';
import { useState } from 'react';

export default function InventoryPage() {
  const [inventory, setInventory] = useState<Vehicle[]>(mockInventory);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);
  const [editingVehicleId, setEditingVehicleId] = useState<string | null>(null);

  const openDeleteConfirmation = (car: Vehicle) => {
    setVehicleToDelete(car);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (vehicleToDelete) {
      setInventory(inventory.filter(v => v.id !== vehicleToDelete.id));
      setIsDeleteModalOpen(false);
      setVehicleToDelete(null);
    }
  };
  const [newVehicle, setNewVehicle] = useState<Partial<Vehicle>>({
    make: '',
    model: '',
    year: 2024,
    price: 0,
    condition: 'NEW',
    status: 'AVAILABLE',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    mileage: 0,
    images: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800'],
    description: ''
  });

  const handleOpenAdd = () => {
    setEditingVehicleId(null);
    setNewVehicle({
      make: '', model: '', year: 2024, price: 0, condition: 'NEW', status: 'AVAILABLE',
      fuelType: 'Gasoline', transmission: 'Automatic', mileage: 0,
      images: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800'],
      description: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (car: Vehicle) => {
    setEditingVehicleId(car.id);
    setNewVehicle({ ...car });
    setIsModalOpen(true);
  };

  const handleSaveVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingVehicleId) {
      setInventory(inventory.map(v => v.id === editingVehicleId ? { ...newVehicle } as Vehicle : v));
    } else {
      const vehicleToAdd: Vehicle = {
        ...newVehicle as Vehicle,
        id: `v-${Date.now()}`,
      };
      setInventory([vehicleToAdd, ...inventory]);
    }
    setIsModalOpen(false);
  };

  const removeVehicle = (id: string) => {
    setInventory(inventory.filter(v => v.id !== id));
  };

  return (
    <div className="inventory-page animate-in slide-in-from-bottom-4 duration-500">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 className="title-large">Vehicle Inventory</h1>
          <p className="text-muted">Manage your {inventory.length} vehicles across all branches.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="button" style={{ border: '1px solid var(--border)', background: 'var(--card)' }}>
             <Filter size={18} />
             <span>Filters</span>
          </button>
          <button className="button button-primary" onClick={handleOpenAdd}>
             <Plus size={18} />
             <span>Add New Vehicle</span>
          </button>
        </div>
      </div>

      <div className="card glass" style={{ padding: '0' }}>
         <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
               <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                     <th style={{ padding: '1.25rem 1.5rem', fontWeight: '600', color: 'var(--secondary)', fontSize: '0.85rem' }}>VEHICLE</th>
                     <th style={{ padding: '1.25rem 1.5rem', fontWeight: '600', color: 'var(--secondary)', fontSize: '0.85rem' }}>VIN</th>
                     <th style={{ padding: '1.25rem 1.5rem', fontWeight: '600', color: 'var(--secondary)', fontSize: '0.85rem' }}>STATUS</th>
                     <th style={{ padding: '1.25rem 1.5rem', fontWeight: '600', color: 'var(--secondary)', fontSize: '0.85rem' }}>PRICE</th>
                     <th style={{ padding: '1.25rem 1.5rem', fontWeight: '600', color: 'var(--secondary)', fontSize: '0.85rem' }}>ACTION</th>
                  </tr>
               </thead>
               <tbody>
                  {inventory.map(car => (
                     <tr key={car.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }}>
                        <td style={{ padding: '1rem 1.5rem' }}>
                           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                              <img src={car.images[0]} style={{ width: '60px', height: '40px', borderRadius: '6px', objectFit: 'cover' }} />
                              <div>
                                 <p style={{ fontWeight: '600', fontSize: '0.95rem' }}>{car.year} {car.make} {car.model}</p>
                                 <p className="text-muted" style={{ fontSize: '0.75rem' }}>{car.condition} • {car.fuelType}</p>
                              </div>
                           </div>
                        </td>
                        <td style={{ padding: '1rem 1.5rem', fontSize: '0.85rem', fontFamily: 'monospace' }}>WVWZZZAU712345</td>
                        <td style={{ padding: '1rem 1.5rem' }}>
                           <span className={`badge ${car.status === 'AVAILABLE' ? 'badge-success' : 'badge-warning'}`}>
                              {car.status}
                           </span>
                        </td>
                        <td style={{ padding: '1rem 1.5rem', fontWeight: 'bold' }}>
                           ${car.price.toLocaleString()}
                        </td>
                        <td style={{ padding: '1rem 1.5rem' }}>
                           <div style={{ display: 'flex', gap: '0.5rem' }}>
                              <button style={{ padding: '0.5rem' }} onClick={() => handleOpenEdit(car)}><Edit3 size={16} color="var(--secondary)" /></button>
                              <button style={{ padding: '0.5rem' }} onClick={() => openDeleteConfirmation(car)}><Trash size={16} color="var(--danger)" /></button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         <div style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)' }}>
            <p className="text-muted">Showing {inventory.length} of {inventory.length} vehicles</p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
               <button className="button" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', border: '1px solid var(--border)' }}>Prev</button>
               <button className="button" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', border: '1px solid var(--border)' }}>Next</button>
            </div>
         </div>
      </div>

      {/* Add/Edit Vehicle Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'grid', placeItems: 'center', padding: '2rem' }} onClick={() => setIsModalOpen(false)}>
          <div style={{ background: 'var(--background)', width: '100%', maxWidth: '700px', borderRadius: '24px', overflow: 'hidden', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '2rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <h2 className="title-medium">{editingVehicleId ? 'Edit Vehicle Details' : 'Add New Vehicle'}</h2>
               <button onClick={() => setIsModalOpen(false)}><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSaveVehicle} style={{ padding: '2rem' }}>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                  <div className="form-group">
                     <label style={{ fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>MAKE</label>
                     <input className="input" placeholder="e.g. Rolls-Royce" value={newVehicle.make} onChange={e => setNewVehicle({...newVehicle, make: e.target.value})} required />
                  </div>
                  <div className="form-group">
                     <label style={{ fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>MODEL</label>
                     <input className="input" placeholder="e.g. Phantom" value={newVehicle.model} onChange={e => setNewVehicle({...newVehicle, model: e.target.value})} required />
                  </div>
                  <div className="form-group">
                     <label style={{ fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>YEAR</label>
                     <input type="number" className="input" value={newVehicle.year} onChange={e => setNewVehicle({...newVehicle, year: parseInt(e.target.value)})} required />
                  </div>
                  <div className="form-group">
                     <label style={{ fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>PRICE ($)</label>
                     <input type="number" className="input" value={newVehicle.price} onChange={e => setNewVehicle({...newVehicle, price: parseInt(e.target.value)})} required />
                  </div>
                  <div className="form-group">
                     <label style={{ fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>CONDITION</label>
                     <select className="input" value={newVehicle.condition} onChange={e => setNewVehicle({...newVehicle, condition: e.target.value as any})}>
                        <option value="NEW">NEW</option>
                        <option value="USED">USED</option>
                     </select>
                  </div>
                  <div className="form-group">
                     <label style={{ fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>MILEAGE</label>
                     <input type="number" className="input" value={newVehicle.mileage} onChange={e => setNewVehicle({...newVehicle, mileage: parseInt(e.target.value)})} />
                  </div>
               </div>

               <div style={{ background: 'var(--muted)', padding: '1.5rem', borderRadius: '16px', border: '2px dashed var(--border)', textAlign: 'center', marginBottom: '2rem' }}>
                  <Upload size={32} color="var(--secondary)" style={{ marginBottom: '0.5rem' }} />
                  <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>Click to upload vehicle images</p>
                  <p className="text-muted">High resolution JPG/PNG supported</p>
               </div>

               <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                  <button type="button" className="button" style={{ border: '1px solid var(--border)' }} onClick={() => setIsModalOpen(false)}>Cancel</button>
                  <button type="submit" className="button button-primary" style={{ padding: '0.75rem 2.5rem' }}>Register Vehicle</button>
               </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(2, 6, 23, 0.8)', backdropFilter: 'blur(8px)', zIndex: 1100, display: 'grid', placeItems: 'center', padding: '2rem' }} onClick={() => setIsDeleteModalOpen(false)}>
          <div style={{ background: 'var(--background)', width: '100%', maxWidth: '400px', borderRadius: '24px', padding: '2.5rem', textAlign: 'center', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'inline-flex', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '50%', color: 'var(--danger)', marginBottom: '1.5rem' }}>
               <Trash size={32} />
            </div>
            <h2 className="title-medium" style={{ marginBottom: '0.75rem' }}>Confirm Deletion</h2>
            <p className="text-muted" style={{ marginBottom: '2rem' }}>
               Are you sure you want to remove the **{vehicleToDelete?.year} {vehicleToDelete?.make} {vehicleToDelete?.model}** from the inventory? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
               <button className="button" style={{ flex: 1, border: '1px solid var(--border)' }} onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
               <button className="button" style={{ flex: 1, background: 'var(--danger)', color: 'white' }} onClick={confirmDelete}>Delete Vehicle</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

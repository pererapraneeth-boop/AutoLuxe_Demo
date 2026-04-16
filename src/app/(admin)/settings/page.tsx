'use client';

import { Settings, User, Bell, Shield, MapPin, Database, ChevronRight, Save, LogOut, Globe, Server, Check, Plus, X, Lock, Key, Copy, AlertCircle } from 'lucide-react';
import { useState } from 'react';

type TabType = 'account' | 'roles' | 'branches' | 'notifications' | 'api';

interface Branch {
  name: string;
  location: string;
  code: string;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('account');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Interactive States
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [branches, setBranches] = useState<Branch[]>([
    { name: 'Main Headquarter', location: 'Downtown District', code: 'HQ-01' },
    { name: 'West Side Showroom', location: 'Retail Corridor', code: 'BR-02' }
  ]);
  const [notificationState, setNotificationState] = useState({
    leads: true,
    inventory: true,
    service: false,
    system: true
  });
  const [apiKey, setApiKey] = useState('ak_live_51Mv9L' + Math.random().toString(36).substring(7) + '92Xy');
  const [copyFeedback, setCopyFeedback] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1200);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const handleRotateKey = () => {
    const confirm = window.confirm('Are you sure? Existing integrations using this key will immediately stop working.');
    if (confirm) {
      setApiKey('ak_live_51Mv9L' + Math.random().toString(36).substring(7) + '92Xy');
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <div className="animate-in fade-in duration-300">
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                <div className="form-group">
                   <label style={{ fontSize: '0.85rem', fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Full Name</label>
                   <input className="input" defaultValue="Super Admin" />
                </div>
                <div className="form-group">
                   <label style={{ fontSize: '0.85rem', fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Email Address</label>
                   <input className="input" defaultValue="admin@autoluxe.com" />
                </div>
                <div className="form-group">
                   <label style={{ fontSize: '0.85rem', fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Primary Branch</label>
                   <select className="input">
                      <option>Main Headquarter (Downtown)</option>
                      <option>South Park Branch</option>
                      <option>North Industrial Hub</option>
                   </select>
                </div>
                <div className="form-group">
                   <label style={{ fontSize: '0.85rem', fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Role</label>
                   <input className="input" defaultValue="Administrator" disabled />
                </div>
             </div>

             <div style={{ marginTop: '2.5rem', borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
                <h3 className="title-small" style={{ marginBottom: '1.5rem' }}>Two-Factor Authentication</h3>
                <div style={{ background: 'var(--muted)', padding: '1.25rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <div>
                      <p style={{ fontWeight: '600' }}>Secure your account</p>
                      <p className="text-muted" style={{ fontSize: '0.85rem' }}>Add an extra layer of security to your admin account.</p>
                   </div>
                   <button className="button" style={{ border: '1px solid var(--border)', background: 'var(--card)' }}>Enable 2FA</button>
                </div>
             </div>
             
             <button className="button" style={{ marginTop: '2.5rem', color: 'var(--danger)', border: '1px solid rgba(239, 68, 68, 0.2)', gap: '0.75rem' }}>
                <LogOut size={18} />
                <span>Delete Account Data</span>
             </button>
          </div>
        );
      case 'roles':
        return (
          <div className="animate-in fade-in duration-300">
             <p className="text-muted" style={{ marginBottom: '2rem' }}>Configure detailed system access for dealership staff.</p>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {['Administrator', 'Sales Manager', 'Service Technician', 'Inventory Specialist'].map(role => (
                   <div key={role} style={{ padding: '1.25rem', border: '1px solid var(--border)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                         <Shield size={20} color="var(--primary)" />
                         <span style={{ fontWeight: '600' }}>{role}</span>
                      </div>
                      <button 
                        className="button" 
                        style={{ fontSize: '0.75rem', border: '1px solid var(--border)' }}
                        onClick={() => { setSelectedRole(role); setIsRoleModalOpen(true); }}
                      >
                        Edit Permissions
                      </button>
                   </div>
                ))}
             </div>
          </div>
        );
      case 'branches':
        return (
          <div className="animate-in fade-in duration-300">
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {branches.map(branch => (
                   <div key={branch.code} className="card glass" style={{ border: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                         <h4 style={{ fontWeight: '700' }}>{branch.name}</h4>
                         <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--primary)' }}>{branch.code}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)', fontSize: '0.85rem' }}>
                         <MapPin size={16} />
                         <span>{branch.location}</span>
                      </div>
                   </div>
                ))}
             </div>
             <button 
                className="button" 
                style={{ marginTop: '2rem', border: '1px dashed var(--border)', width: '100%', padding: '1.5rem', background: 'rgba(37, 99, 235, 0.05)', color: 'var(--primary)' }}
                onClick={() => setIsBranchModalOpen(true)}
             >
                <Plus size={20} /> Add New Branch Location
             </button>
          </div>
        );
      case 'notifications':
        return (
          <div className="animate-in fade-in duration-300">
             <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {[
                   { key: 'leads', title: 'New Sales Leads', desc: 'Get notified when a customer inquires about a vehicle.' },
                   { key: 'inventory', title: 'Inventory Alerts', desc: 'Low stock warnings for spare parts and accessories.' },
                   { key: 'service', title: 'Service Reminders', desc: 'Alerts for upcoming maintenance appointments.' },
                   { key: 'system', title: 'System Updates', desc: 'Important platform and security notifications.' }
                ].map(pref => (
                   <div key={pref.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ flex: 1 }}>
                         <p style={{ fontWeight: '600' }}>{pref.title}</p>
                         <p className="text-muted" style={{ fontSize: '0.85rem' }}>{pref.desc}</p>
                      </div>
                      <div 
                        onClick={() => setNotificationState({...notificationState, [pref.key]: !notificationState[pref.key as keyof typeof notificationState]})}
                        style={{ 
                          width: '44px', 
                          height: '24px', 
                          background: notificationState[pref.key as keyof typeof notificationState] ? 'var(--primary)' : 'var(--muted)', 
                          borderRadius: '12px', 
                          position: 'relative', 
                          cursor: 'pointer',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                      >
                         <div style={{ 
                           position: 'absolute', 
                           left: notificationState[pref.key as keyof typeof notificationState] ? '22px' : '2px', 
                           top: '2px', 
                           width: '20px', 
                           height: '20px', 
                           background: 'white', 
                           borderRadius: '50%',
                           boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                           transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                         }} />
                      </div>
                   </div>
                ))}
             </div>
          </div>
        );
      case 'api':
        return (
          <div className="animate-in fade-in duration-300">
             <div className="card glass" style={{ border: '1px solid var(--border)', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                   <Globe size={24} color="var(--primary)" />
                   <div>
                      <h4 style={{ fontWeight: '700' }}>Production API Access</h4>
                      <p className="text-muted" style={{ fontSize: '0.8rem' }}>Connected to autoluxe-api-prod-v2</p>
                   </div>
                </div>
                <div style={{ background: 'var(--muted)', padding: '1rem', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'monospace' }}>
                   <span style={{ fontSize: '0.9rem', color: 'var(--secondary)' }}>{apiKey}</span>
                   <button 
                     onClick={handleCopyKey}
                     style={{ color: copyFeedback ? 'var(--success)' : 'var(--primary)', fontWeight: 'bold', background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
                   >
                      {copyFeedback ? <Check size={16} /> : <Copy size={16} />}
                      <span>{copyFeedback ? 'Copied!' : 'Copy'}</span>
                   </button>
                </div>
             </div>
             <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="button" style={{ flex: 1, border: '1px solid var(--border)' }}>View Documentation</button>
                <button 
                  className="button" 
                  style={{ flex: 1, border: '1px solid var(--border)', color: 'var(--danger)' }}
                  onClick={handleRotateKey}
                >
                  <AlertCircle size={18} />
                  <span>Rotate Secret Key</span>
                </button>
             </div>
          </div>
        );
    }
  };

  return (
    <div className="settings-page animate-in slide-in-from-bottom-4 duration-500">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
        <div>
          <h1 className="title-large">System Settings</h1>
          <p className="text-muted">Manage dealership branches, staff permissions, and global configurations.</p>
        </div>
        
        {showSuccess && (
          <div className="animate-in slide-in-from-top-4" style={{ background: 'var(--success)', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)' }}>
             <Check size={20} />
             <span>Settings Persisted Successfully</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-4" style={{ gap: '2rem' }}>
         <div className="card glass" style={{ height: 'fit-content' }}>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
               <button 
                  className={`sidebar-link ${activeTab === 'account' ? 'active' : ''}`} 
                  style={activeTab === 'account' ? activeLinkStyle : linkStyle}
                  onClick={() => setActiveTab('account')}
               >
                  <User size={18} />
                  <span>Account Details</span>
               </button>
               <button 
                  className={`sidebar-link ${activeTab === 'roles' ? 'active' : ''}`} 
                  style={activeTab === 'roles' ? activeLinkStyle : linkStyle}
                  onClick={() => setActiveTab('roles')}
               >
                  <Shield size={18} />
                  <span>Roles & Permissions</span>
               </button>
               <button 
                  className={`sidebar-link ${activeTab === 'branches' ? 'active' : ''}`} 
                  style={activeTab === 'branches' ? activeLinkStyle : linkStyle}
                  onClick={() => setActiveTab('branches')}
               >
                  <MapPin size={18} />
                  <span>Branch Management</span>
               </button>
               <button 
                  className={`sidebar-link ${activeTab === 'notifications' ? 'active' : ''}`} 
                  style={activeTab === 'notifications' ? activeLinkStyle : linkStyle}
                  onClick={() => setActiveTab('notifications')}
               >
                  <Bell size={18} />
                  <span>Notification Preferences</span>
               </button>
               <button 
                  className={`sidebar-link ${activeTab === 'api' ? 'active' : ''}`} 
                  style={activeTab === 'api' ? activeLinkStyle : linkStyle}
                  onClick={() => setActiveTab('api')}
               >
                  <Database size={18} />
                  <span>API & Integrations</span>
               </button>
            </nav>
         </div>

         <div className="card glass" style={{ gridColumn: 'span 3' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
               <h3 className="title-small" style={{ textTransform: 'capitalize' }}>{activeTab.replace('_', ' ')} Management</h3>
               <button 
                  className="button button-primary" 
                  onClick={handleSave}
                  disabled={isSaving}
               >
                  <Save size={18} />
                  <span>{isSaving ? 'Synching...' : 'Save Changes'}</span>
               </button>
            </div>

            {renderTabContent()}
         </div>
      </div>

      {/* Role Permissions Modal */}
      {isRoleModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(12px)', zIndex: 2000, display: 'grid', placeItems: 'center', padding: '2rem' }} onClick={() => setIsRoleModalOpen(false)}>
          <div style={{ background: 'var(--background)', width: '100%', maxWidth: '600px', borderRadius: '32px', overflow: 'hidden', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '2rem 2.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div>
                  <h2 className="title-medium">Edit Permissions</h2>
                  <p className="text-muted">Domain: <strong>{selectedRole}</strong></p>
               </div>
               <button onClick={() => setIsRoleModalOpen(false)} style={{ background: 'var(--muted)', padding: '0.5rem', borderRadius: '50%' }}><X size={20} /></button>
            </div>
            <div style={{ padding: '2.5rem' }}>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {[
                    { group: 'Inventory', action: 'Read/Write' },
                    { group: 'Sales & Deals', action: 'Write Only' },
                    { group: 'Customer CRM', action: 'Read Only' },
                    { group: 'Service Orders', action: 'Full Access' }
                  ].map(perm => (
                    <div key={perm.group} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--muted)', borderRadius: '12px' }}>
                       <span style={{ fontWeight: '600' }}>{perm.group} Management</span>
                       <select className="input" style={{ width: 'auto', padding: '0.3rem 1rem' }}>
                          <option>{perm.action}</option>
                          <option>Full Access</option>
                          <option>Read Only</option>
                          <option>No Access</option>
                       </select>
                    </div>
                  ))}
               </div>
               <button className="button button-primary" style={{ width: '100%', marginTop: '2.5rem' }} onClick={() => setIsRoleModalOpen(false)}>Commit Permission Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Branch Creation Modal */}
      {isBranchModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(12px)', zIndex: 2000, display: 'grid', placeItems: 'center', padding: '2rem' }} onClick={() => setIsBranchModalOpen(false)}>
          <div style={{ background: 'var(--background)', width: '100%', maxWidth: '500px', borderRadius: '32px', overflow: 'hidden', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '2rem 2.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div>
                  <h2 className="title-medium">Register New Branch</h2>
                  <p className="text-muted">Expand the dealership network.</p>
               </div>
               <button onClick={() => setIsBranchModalOpen(false)} style={{ background: 'var(--muted)', padding: '0.5rem', borderRadius: '50%' }}><X size={20} /></button>
            </div>
            <form style={{ padding: '2.5rem' }} onSubmit={(e) => {
              e.preventDefault();
              const target = e.target as any;
              setBranches([...branches, { name: target.name.value, location: target.location.value, code: 'BR-0' + (branches.length + 1) }]);
              setIsBranchModalOpen(false);
            }}>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="form-group">
                     <label className="text-muted" style={{ fontSize: '0.7rem', fontWeight: 800 }}>BRANCH NAME</label>
                     <input className="input" name="name" placeholder="e.g. Uptown Luxury Center" required />
                  </div>
                  <div className="form-group">
                     <label className="text-muted" style={{ fontSize: '0.7rem', fontWeight: 800 }}>LOCATION</label>
                     <input className="input" name="location" placeholder="e.g. 5th Avenue, NYC" required />
                  </div>
               </div>
               <button type="submit" className="button button-primary" style={{ width: '100%', marginTop: '2.5rem' }}>Provision Branch</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const linkStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  padding: '0.75rem 1rem',
  borderRadius: '8px',
  color: 'var(--secondary)',
  fontFamily: 'inherit',
  fontSize: '0.9rem',
  fontWeight: '500',
  textAlign: 'left',
  width: '100%',
  transition: 'all 0.2s',
  background: 'none',
  border: 'none',
  cursor: 'pointer'
};

const activeLinkStyle = {
  ...linkStyle,
  background: 'var(--primary)',
  color: 'white',
  boxShadow: 'var(--shadow-sm)'
};

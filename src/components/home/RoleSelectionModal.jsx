import React from 'react';
import Button from '../ui/Button';
import api from '../../Axios/axios';
import useAuthStore from '../../context/AuthContext';

const RoleSelectionModal = () => {
  const token = useAuthStore((s) => s.token);
  const setUserStore = useAuthStore((s) => s.setUser);

  const setRole = async (role) => {
    try {
      await api.post('/auth/set-role', { role }, { headers: { Authorization: `Bearer ${token}` } });
      const me = await api.get('/auth/me');
      setUserStore(me.data.user || me.data);
    } catch (e) {
      console.error(e);
      alert('Failed to set role');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-surface rounded-xl p-8 w-full max-w-md shadow-xl" style={{ borderColor: 'var(--palette-3)' }}>
        <h3 className="text-xl font-semibold mb-3">Welcome — choose your role</h3>
        <p className="text-sm text-gray-600 mb-6">
          Are you a Helpseeker (someone seeking legal help) or a Lawyer? You can sign up/login with Google or create local credentials.
        </p>
        <div className="flex gap-4">
          <Button variant="primary" onClick={() => setRole('helpseeker')} className="flex-1 px-4 py-2">
            Helper
          </Button>
          <Button variant="secondary" onClick={() => setRole('lawyer')} className="flex-1 px-4 py-2">
            Lawyer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionModal;
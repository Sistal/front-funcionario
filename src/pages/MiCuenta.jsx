import React, { useState, useEffect } from 'react';
import { PersonalInfoCard } from '../components/miCuenta/PersonalInfoCard.jsx';
import { SecurityCard } from '../components/miCuenta/SecurityCard.jsx';
import { AccountActionsCard } from '../components/miCuenta/AccountActionsCard.jsx';
import { getMyProfile } from '../api/funcionario.api';

export default function MiCuenta(){
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      setLoading(true);
      const data = await getMyProfile();
      setProfile(data);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
      <div className="min-h-screen bg-gray-50">
        <main className="ml-64 min-[1400px]:w-[90%] min-[1400px]:mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl text-gray-900">Mi cuenta</h2>
            <p className="text-gray-600">Administra tu información personal, credenciales y preferencias del sistema</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
              <p className="ml-3 text-gray-600">Cargando información...</p>
            </div>
          ) : (
            <div className="space-y-6">
              <PersonalInfoCard profile={profile} onUpdate={loadProfile} />
              <SecurityCard profile={profile} />
              <AccountActionsCard/>
            </div>
          )}
        </main>
      </div>
  );
}

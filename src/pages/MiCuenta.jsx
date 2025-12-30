import React from 'react';
import { PersonalInfoCard } from '../components/miCuenta/PersonalInfoCard.jsx';
import { SecurityCard } from '../components/miCuenta/SecurityCard.jsx';
import { PreferencesCard } from '../components/miCuenta/PreferencesCard.jsx';
import { ActivityHistoryCard } from '../components/miCuenta/ActivityHistoryCard.jsx';
import { AccountActionsCard } from '../components/miCuenta/AccountActionsCard.jsx';

export default function MiCuenta(){
  return (
      <div className="min-h-screen bg-gray-50">
        <main className="ml-64 min-[1400px]:w-[90%] min-[1400px]:mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl text-gray-900">Mi cuenta</h2>
            <p className="text-gray-600">Administra tu información personal, credenciales y preferencias del sistema</p>
          </div>

          <div className="space-y-6">
            <PersonalInfoCard/>
            <SecurityCard/>
            <PreferencesCard/>
            <ActivityHistoryCard/>
            <AccountActionsCard/>
          </div>
        </main>
      </div>
  );
}

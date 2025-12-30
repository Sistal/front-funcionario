import React from 'react';
import { CurrentBranchCard } from '../components/cambio/CurrentBranchCard.jsx';
import { NewBranchSelectionCard } from '../components/cambio/NewBranchSelectionCard.jsx';
import { BranchChangeReasonCard } from '../components/cambio/BranchChangeReasonCard.jsx';
import { ConfirmationRulesCard } from '../components/cambio/ConfirmationRulesCard.jsx';
import { BranchChangeActions } from '../components/cambio/BranchChangeActions.jsx';
import { BranchChangeHistoryTable } from '../components/cambio/BranchChangeHistoryTable.jsx';

export default function Sucursal() {
  return (
      <div className="min-h-screen bg-gray-50">
        <main className="ml-64 min-[1400px]:w-[90%] min-[1400px]:mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">Solicitud de cambio de sucursal</h2>
            <p className="text-gray-600">Solicita el cambio de tu sucursal de adscripción para futuras entregas y
              gestiones</p>
          </div>

          <div className="space-y-6 mb-8">
            <CurrentBranchCard/>
            <NewBranchSelectionCard/>
            <BranchChangeReasonCard/>
            <ConfirmationRulesCard/>
            <BranchChangeActions/>
          </div>

          <BranchChangeHistoryTable/>
        </main>
      </div>
  );
}

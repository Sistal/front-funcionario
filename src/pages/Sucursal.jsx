import React, { useEffect, useState } from 'react';
import { CurrentBranchCard } from '../components/cambio/CurrentBranchCard.jsx';
import { NewBranchSelectionCard } from '../components/cambio/NewBranchSelectionCard.jsx';
import { BranchChangeReasonCard } from '../components/cambio/BranchChangeReasonCard.jsx';
import { ConfirmationRulesCard } from '../components/cambio/ConfirmationRulesCard.jsx';
import { BranchChangeActions } from '../components/cambio/BranchChangeActions.jsx';
import { BranchChangeHistoryTable } from '../components/cambio/BranchChangeHistoryTable.jsx';
import { branchesApi } from '../api/branches.api.js';
import { getMyProfile } from '../api/funcionario.api.js';
import { useNavigate } from 'react-router-dom';

export default function Sucursal() {
  const navigate = useNavigate();
  const [currentBranch, setCurrentBranch] = useState(null);
  const [branches, setBranches] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    selectedBranchId: '',
    effectiveDate: '',
    reason: '',
    description: '',
  });

  useEffect(() => {
    loadBranchData();
  }, []);

  async function loadBranchData() {
    try {
      setLoading(true);
      const [profile, availableBranches, historyData] = await Promise.all([
        getMyProfile(),
        branchesApi.getAll(),
        branchesApi.getHistory(),
      ]);
      setCurrentBranch(profile?.sucursal || null);
      setBranches(Array.isArray(availableBranches) ? availableBranches : []);
      setHistory(Array.isArray(historyData) ? historyData : []);
    } catch (error) {
      console.error('Error loading branch data:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleFieldChange = (field) => (value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.selectedBranchId || !form.reason || !form.effectiveDate) {
      window.alert('Completa la sucursal, la fecha efectiva y el motivo');
      return;
    }

    try {
      setSubmitting(true);
      await branchesApi.requestChange({
        branchId: Number(form.selectedBranchId),
        effectiveDate: form.effectiveDate,
        reason: form.description || form.reason,
      });
      window.alert('Solicitud de cambio de sucursal enviada correctamente');
      await loadBranchData();
      setForm({
        selectedBranchId: '',
        effectiveDate: '',
        reason: '',
        description: '',
      });
    } catch (error) {
      console.error(error);
      window.alert(error.message || 'No se pudo enviar la solicitud');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('¿Está seguro que desea cancelar? Se perderán los cambios no guardados.')) {
      navigate(-1);
    }
  };

  return (
      <div className="min-h-screen bg-gray-50">
        <main className="ml-64 min-[1400px]:w-[90%] min-[1400px]:mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl text-gray-900">Solicitud de cambio de sucursal</h2>
            <p className="text-gray-600">Solicita el cambio de tu sucursal de adscripción para futuras entregas y
              gestiones</p>
          </div>

          <div className="space-y-6 mb-8">
            <CurrentBranchCard branch={currentBranch} loading={loading} />
            <NewBranchSelectionCard branches={branches} value={form.selectedBranchId} onChange={handleFieldChange('selectedBranchId')} />
            <BranchChangeReasonCard reason={form.reason} description={form.description} effectiveDate={form.effectiveDate} onReasonChange={handleFieldChange('reason')} onDescriptionChange={handleFieldChange('description')} onEffectiveDateChange={handleFieldChange('effectiveDate')} />
            <ConfirmationRulesCard/>
            <BranchChangeActions onSubmit={handleSubmit} onCancel={handleCancel} loading={submitting} />
          </div>

          <BranchChangeHistoryTable history={history} loading={loading} />
        </main>
      </div>
  );
}

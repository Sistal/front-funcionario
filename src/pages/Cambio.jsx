import { useEffect, useState } from "react";
import {RequestSelectionCard} from "../components/cambio/RequestSelectionCard";
import {ChangeReasonCard} from "../components/cambio/ChangeReasonCard";
import {NewSelectionCard} from "../components/cambio/NewSelectionCard";
import {EvidenceUploadCard} from "../components/cambio/EvidenceUploadCard";
import {FormActionsBar} from "../components/cambio/FormActionsBar";
import { deliveriesApi } from "../api/deliveries.api";
import { coreApi } from "../api/core.api";
import { requestsApi } from "../api/requests.api.js";
import { useNavigate } from "react-router-dom";

export default function Cambio(){
  const navigate = useNavigate();
  const [deliveries, setDeliveries] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [garments, setGarments] = useState([]);
  const [reasons, setReasons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    selectedRequestId: '',
    selectedReason: '',
    description: '',
    newSize: '',
    newGarment: '',
    uploadedFiles: [],
  });

  useEffect(() => {
    loadFormData();
  }, []);

  async function loadFormData() {
    try {
      setLoading(true);
      const [deliveriesData, sizesData, garmentsData, reasonsData] = await Promise.all([
        deliveriesApi.getAll(),
        coreApi.getTallas(),
        coreApi.getTiposPrenda(),
        coreApi.getMotivosCambio(),
      ]);

      setDeliveries(Array.isArray(deliveriesData) ? deliveriesData : []);
      setSizes(Array.isArray(sizesData) ? sizesData : []);
      setGarments(Array.isArray(garmentsData) ? garmentsData : []);
      setReasons(Array.isArray(reasonsData) ? reasonsData : []);
    } catch (error) {
      console.error('Error loading change request data:', error);
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

  const handleFilesChange = (files) => {
    setForm((current) => ({
      ...current,
      uploadedFiles: files,
    }));
  };

  const handleSubmit = async () => {
    try {
      const selectedDelivery = deliveries.find((delivery) => String(delivery.id || delivery.requestId) === String(form.selectedRequestId));
      if (!selectedDelivery) {
        window.alert('Debes seleccionar una solicitud base');
        return;
      }
      if (!form.selectedReason) {
        window.alert('Debes seleccionar un motivo');
        return;
      }
      if (!form.newSize) {
        window.alert('Debes seleccionar la nueva talla');
        return;
      }

      setSubmitting(true);
      await requestsApi.createCambioPrenda({
        prenda: form.newGarment || selectedDelivery.garments,
        reason: form.description || form.selectedReason,
        newSize: form.newSize,
      });

      window.alert('Solicitud de cambio enviada correctamente');
      navigate('/mis-solicitudes');
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
        {/* Main Content */}
        <main className="space-y-6 w-full min-[1400px]:w-[90%] min-[1400px]:mx-auto">
          <div>
            <div className="mb-8">
              <h2 className="text-gray-900 mb-2">Solicitud de cambio de talla / prenda</h2>
              <p className="text-gray-600">
                Solicita el cambio de una prenda entregada por talla incorrecta o defecto
              </p>
            </div>
            <div className="space-y-6">
              <RequestSelectionCard requests={deliveries} value={form.selectedRequestId} onChange={handleFieldChange('selectedRequestId')} loading={loading} />
              <ChangeReasonCard reasons={reasons} value={form.selectedReason} description={form.description} onReasonChange={handleFieldChange('selectedReason')} onDescriptionChange={handleFieldChange('description')} />
              <NewSelectionCard sizes={sizes} garments={garments} newSize={form.newSize} newGarment={form.newGarment} onSizeChange={handleFieldChange('newSize')} onGarmentChange={handleFieldChange('newGarment')} />
              <EvidenceUploadCard files={form.uploadedFiles} onFilesChange={handleFilesChange} />
              <FormActionsBar onSubmit={handleSubmit} onCancel={handleCancel} loading={submitting} />
            </div>
          </div>
        </main>
      </div>
  );
}
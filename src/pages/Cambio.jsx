import {RequestSelectionCard} from "../components/cambio/RequestSelectionCard";
import {ChangeReasonCard} from "../components/cambio/ChangeReasonCard";
import {NewSelectionCard} from "../components/cambio/NewSelectionCard";
import {EvidenceUploadCard} from "../components/cambio/EvidenceUploadCard";
import {FormActionsBar} from "../components/cambio/FormActionsBar";

export default function Cambio(){
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
              <RequestSelectionCard/>
              <ChangeReasonCard/>
              <NewSelectionCard/>
              <EvidenceUploadCard/>
              <FormActionsBar/>
            </div>
          </div>
        </main>
      </div>
  );
}
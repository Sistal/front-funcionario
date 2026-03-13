import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card.jsx';
import { Upload, X, FileText, Image as ImageIcon } from 'lucide-react';
import { requestsApi } from '../../api/requests.api.js';

export function EvidenceUploadCard({ files = [], onFilesChange }) {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e) => {
    if (e.target.files) {
      try {
        setUploading(true);
        const uploaded = await Promise.all(Array.from(e.target.files).map(async (file) => {
          const response = await requestsApi.uploadEvidence(file);
          return {
            id: response.fileId,
            name: response.name,
            type: file.type.startsWith('image/') ? 'image' : 'document',
            size: `${(file.size / 1024).toFixed(1)} KB`,
          };
        }));
        onFilesChange([...(files || []), ...uploaded]);
      } catch (error) {
        console.error(error);
        window.alert(error.message || 'No se pudo subir el archivo');
      } finally {
        setUploading(false);
        e.target.value = '';
      }
    }
  };

  const removeFile = (id) => onFilesChange(files.filter((f) => f.id !== id));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gray-900">4. Evidencia (opcional)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <span className="text-sm font-medium">Archivos adjuntos</span>
          <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
            <input type="file" id="file-upload" className="hidden" multiple accept="image/*,.pdf,.doc,.docx" onChange={handleFileUpload} />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                  <Upload className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-sm text-gray-700 mb-1">{uploading ? 'Subiendo archivos...' : 'Haga clic para cargar archivos o arrastre aquí'}</p>
                <p className="text-xs text-gray-500">PNG, JPG, PDF hasta 10MB</p>
              </div>
            </label>
          </div>
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            <span className="text-sm font-medium">Archivos cargados ({files.length})</span>
            {files.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded flex items-center justify-center border border-gray-200">
                    {file.type === 'image' ? <ImageIcon className="w-4 h-4 text-blue-600" /> : <FileText className="w-4 h-4 text-gray-600" />}
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">{file.size}</p>
                  </div>
                </div>
                <button onClick={() => removeFile(file.id)} className="p-1 hover:bg-gray-200 rounded transition-colors"><X className="w-4 h-4 text-gray-500" /></button>
              </div>
            ))}
          </div>
        )}

        <p className="text-xs text-gray-500">Adjunte fotografías de la prenda o documentos que respalden la solicitud de cambio</p>
      </CardContent>
    </Card>
  );
}

import http from '../lib/http';
import { ENV } from '../config/env';
import { funcionarioMock } from '../mocks/funcionario.mock';

const useMock = ENV.USE_MOCK;

// ==================== REGISTRO INICIAL ====================

/**
 * Registro de funcionario inicial por unidad de negocio
 * Endpoint: POST /api/v1/funcionarios/registro-inicial
 * Body: { id_empresa, id_segmento, id_sucursal }
 */
export function registerInitialFuncionario(data) {
  return http.post('/api/v1/funcionarios/registro-inicial', data);
}

// ==================== PERFIL DEL USUARIO ====================

/**
 * Obtener el perfil del funcionario autenticado
 * Endpoint: GET /api/v1/funcionarios/me
 * Retorna: FuncionarioResponse con datos completos del perfil
 */
export function getMyProfile() {
  if (useMock) return funcionarioMock.getMe();
  return http.get('/api/v1/funcionarios/me');
}

/**
 * Actualizar el perfil del funcionario autenticado
 * Endpoint: PUT /api/v1/funcionarios/me
 * Body: { nombres, apellido_paterno, apellido_materno, celular, telefono, email, direccion }
 */
export function updateMyProfile(data) {
  // if (useMock) return funcionarioMock.updateMe(data); // TODO: Implement in mock
  return http.put('/api/v1/funcionarios/me', data);
}

/**
 * Obtener estadísticas del dashboard del funcionario
 * Endpoint: GET /api/v1/funcionarios/me/stats
 * Retorna: { user_id, total_solicitudes, solicitudes_pendientes, entregas_proximas }
 */
export function getDashboardStats() {
  // if (useMock) return funcionarioMock.getStats(); // TODO: Implement in mock
  return http.get('/api/v1/funcionarios/me/stats');
}

/**
 * Actualizar preferencias del usuario
 * Endpoint: PUT /api/v1/funcionarios/me/preferencias
 */
export function updatePreferences(prefs) {
  if (useMock) return funcionarioMock.updatePreferences(prefs);
  return http.put('/api/v1/funcionarios/me/preferencias', prefs);
}

/**
 * Actualizar seguridad (email recuperación)
 * Endpoint: PUT /api/v1/funcionarios/me/seguridad
 */
export function updateSecurity(data) {
  if (useMock) return funcionarioMock.updateSecurity(data);
  return http.put('/api/v1/funcionarios/me/seguridad', data);
}

/**
 * Obtener historial de actividad
 * Endpoint: GET /api/v1/funcionarios/me/actividad
 */
export function getActivity() {
  if (useMock) return funcionarioMock.getActivity();
  return http.get('/api/v1/funcionarios/me/actividad');
}

// ==================== MEDIDAS CORPORALES ====================

/**
 * Obtener las medidas activas del funcionario autenticado
 * Endpoint: GET /api/v1/funcionarios/{id}/medidas
 * Nota: Requiere el ID del funcionario, se obtiene desde el perfil
 */
export function getMyMedidas() {
  return http.get(`/api/v1/funcionarios/medidas`);
}

/**
 * Crear medidas corporales para un funcionario
 * Endpoint: POST /api/v1/funcionarios/{id}/medidas
 * Body: { estatura_m, pecho_cm, cintura_cm, cadera_cm, manga_cm, fecha_inicio }
 */
export function createMyMedidas(funcionarioId, data) {
  return http.post(`/api/v1/funcionarios/${funcionarioId}/medidas`, data);
}

/**
 * Actualizar las medidas activas del funcionario
 * Endpoint: PUT /api/v1/funcionarios/{id}/medidas
 * Body: { estatura_m, pecho_cm, cintura_cm, cadera_cm, manga_cm, fecha_fin }
 */
export function updateMyMedidas(data) {
  return http.put(`/api/v1/funcionarios/medidas`, data);
}

/**
 * Obtener el historial completo de medidas
 * Endpoint: GET /api/v1/funcionarios/{id}/medidas/historial
 */
export function getMedidasHistorial(funcionarioId) {
  return http.get(`/api/v1/funcionarios/${funcionarioId}/medidas/historial`);
}

/**
 * Registrar medidas corporales iniciales para el funcionario autenticado
 * Endpoint: POST /api/v1/funcionarios/medidas
 */
export function registerInitialMedidas(data) {
  return http.post(`/api/v1/funcionarios/medidas`, data);
}

/**
 * Obtener historial de cambio de sucursal
 * Endpoint: GET /solicitudes/cambio-sucursal/historial
 */
export function getBranchChangeHistory() {
  return http.get(`/solicitudes/cambio-sucursal/historial`);
}

// ==================== SOLICITUDES ====================

/**
 * Obtener solicitudes recientes del dashboard
 */
export function getRecentRequests() {
  return http.get('/solicitudes/recent');
}

// ==================== ENTREGAS ====================

/**
 * Obtener próximas entregas del dashboard
 */
export function getUpcomingDeliveries() {
  return http.get('/api/v1/entregas/upcoming');
}

/**
 * Obtener próximas entregas del dashboard
 */
export function getMyEntregas() {
  return http.get('/entregas');
}

// ==================== CAMBIO DE SUCURSAL ====================

/**
 * Solicitar cambio de sucursal
 */
export function requestCambioSucursal(data) {
  return http.post('/solicitudes/cambio-sucursal', data);
}



// ==================== CRUD FUNCIONARIOS (ADMIN) ====================

/**
 * Crear un nuevo funcionario (requiere permisos admin)
 * Endpoint: POST /api/v1/funcionarios
 */
export function createFuncionario(data) {
  return http.post('/api/v1/funcionarios', data);
}

/**
 * Obtener todos los funcionarios (requiere permisos admin)
 * Endpoint: GET /api/v1/funcionarios
 */
export function getAllFuncionarios() {
  return http.get('/api/v1/funcionarios');
}

/**
 * Obtener un funcionario por ID (requiere permisos admin)
 * Endpoint: GET /api/v1/funcionarios/{id}
 */
export function getFuncionarioById(id) {
  return http.get(`/api/v1/funcionarios/${id}`);
}

/**
 * Actualizar un funcionario (requiere permisos admin)
 * Endpoint: PUT /api/v1/funcionarios/{id}
 */
export function updateFuncionario(id, data) {
  return http.put(`/api/v1/funcionarios/${id}`, data);
}

/**
 * Eliminar un funcionario (requiere permisos admin)
 * Endpoint: DELETE /api/v1/funcionarios/{id}
 */
export function deleteFuncionario(id) {
  return http.delete(`/api/v1/funcionarios/${id}`);
}

// ==================== BÚSQUEDAS Y FILTROS ====================

/**
 * Filtrar funcionarios con paginación
 * Endpoint: GET /api/v1/funcionarios/filter
 * Params: { rut_funcionario, email, id_empresa_cliente, id_sucursal, id_segmento, 
 *           id_estado, id_cargo, tallas_registradas, limit, offset }
 */
export function getFuncionariosByFilter(params) {
  const query = new URLSearchParams(params).toString();
  return http.get(`/api/v1/funcionarios/filter${query ? `?${query}` : ''}`);
}

/**
 * Buscar funcionario por RUT
 * Endpoint: GET /api/v1/funcionarios/rut/{rut}
 */
export function getFuncionarioByRut(rut) {
  return http.get(`/api/v1/funcionarios/rut/${rut}`);
}

/**
 * Listar funcionarios de una empresa
 * Endpoint: GET /api/v1/funcionarios/empresa/{id_empresa}
 */
export function getFuncionariosByEmpresa(idEmpresa) {
  return http.get(`/api/v1/funcionarios/empresa/${idEmpresa}`);
}

/**
 * Listar funcionarios de una sucursal
 * Endpoint: GET /api/v1/funcionarios/sucursal/{id_sucursal}
 */
export function getFuncionariosBySucursal(idSucursal) {
  return http.get(`/api/v1/funcionarios/sucursal/${idSucursal}`);
}

/**
 * Listar funcionarios de un segmento
 * Endpoint: GET /api/v1/funcionarios/segmento/{id_segmento}
 */
export function getFuncionariosBySegmento(idSegmento) {
  return http.get(`/api/v1/funcionarios/segmento/${idSegmento}`);
}

// ==================== ACTIVACIÓN/DESACTIVACIÓN ====================

/**
 * Activar un funcionario
 * Endpoint: PATCH /api/v1/funcionarios/{id}/activate
 */
export function activateFuncionario(id) {
  return http.patch(`/api/v1/funcionarios/${id}/activate`);
}

/**
 * Desactivar un funcionario
 * Endpoint: PATCH /api/v1/funcionarios/{id}/deactivate
 */
export function deactivateFuncionario(id) {
  return http.patch(`/api/v1/funcionarios/${id}/deactivate`);
}

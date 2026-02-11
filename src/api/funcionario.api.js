import http from '../lib/http';
import { ENV } from '../config/env';
import { funcionarioMock } from '../mocks/funcionario.mock';

const useMock = ENV.USE_MOCK;

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
export function getMyMedidas(funcionarioId) {
  return http.get(`/api/v1/funcionarios/${funcionarioId}/medidas`);
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
export function updateMyMedidas(funcionarioId, data) {
  return http.put(`/api/v1/funcionarios/${funcionarioId}/medidas`, data);
}

/**
 * Obtener el historial completo de medidas
 * Endpoint: GET /api/v1/funcionarios/{id}/medidas/historial
 */
export function getMedidasHistorial(funcionarioId) {
  return http.get(`/api/v1/funcionarios/${funcionarioId}/medidas/historial`);
}

// ==================== SOLICITUDES (NO IMPLEMENTADO EN BACKEND) ====================

/**
 * NOTA: Estos endpoints NO están implementados en el backend según API_CONTRACT.md
 * Se requiere implementación en ms-funcionario
 */

/**
 * Obtener solicitudes del funcionario autenticado
 * Endpoint esperado: GET /api/v1/funcionarios/me/solicitudes
 * Estado: ⚠️ NO IMPLEMENTADO EN BACKEND
 */
export function getMySolicitudes(params) {
  const query = new URLSearchParams(params).toString();
  return http.get(`/api/v1/solicitudes${query ? `?${query}` : ''}`);
}

/**
 * Crear una solicitud
 * Endpoint esperado: POST /api/v1/funcionarios/me/solicitudes
 * Estado: ⚠️ NO IMPLEMENTADO EN BACKEND
 */
export function createSolicitud(data) {
  return http.post('/api/v1/solicitudes', data);
}

/**
 * Obtener solicitudes recientes del dashboard
 * Endpoint esperado: GET /api/v1/funcionarios/me/solicitudes/recent
 * Estado: ⚠️ NO IMPLEMENTADO EN BACKEND
 */
export function getRecentRequests() {
  return http.get('/api/v1/solicitudes/recent');
}

// ==================== ENTREGAS/DESPACHOS (NO IMPLEMENTADO EN BACKEND) ====================

/**
 * NOTA: Estos endpoints NO están implementados en el backend según API_CONTRACT.md
 * Se requiere implementación en ms-funcionario
 */

/**
 * Obtener entregas/despachos del funcionario autenticado
 * Endpoint esperado: GET /api/v1/funcionarios/me/entregas
 * Estado: ⚠️ NO IMPLEMENTADO EN BACKEND
 */
export function getMyEntregas(params) {
  const query = new URLSearchParams(params).toString();
  return http.get(`/api/v1/entregas${query ? `?${query}` : ''}`);
}

/**
 * Obtener próximas entregas del dashboard
 * Endpoint esperado: GET /api/v1/funcionarios/me/entregas/upcoming
 * Estado: ⚠️ NO IMPLEMENTADO EN BACKEND
 */
export function getUpcomingDeliveries() {
  return http.get('/api/v1/entregas/upcoming');
}

// ==================== CAMBIO DE SUCURSAL (NO IMPLEMENTADO EN BACKEND) ====================

/**
 * Solicitar cambio de sucursal
 * Endpoint esperado: POST /api/v1/funcionarios/me/cambio-sucursal
 * Estado: ⚠️ NO IMPLEMENTADO EN BACKEND
 */
export function requestCambioSucursal(data) {
  return http.post('/api/v1/cambio-sucursal', data);
}

// ==================== NOTIFICACIONES (NO IMPLEMENTADO EN BACKEND) ====================

/**
 * NOTA: Estos endpoints NO están implementados en el backend según API_CONTRACT.md
 * Se requiere implementación en ms-funcionario
 */

/**
 * Obtener notificaciones del funcionario
 * Endpoint esperado: GET /api/v1/funcionarios/me/notifications
 * Estado: ⚠️ NO IMPLEMENTADO EN BACKEND
 */
export function getMyNotifications(params) {
  const query = new URLSearchParams(params).toString();
  return http.get(`/api/v1/notifications${query ? `?${query}` : ''}`);
}

/**
 * Marcar notificación como leída
 * Endpoint esperado: PATCH /api/v1/funcionarios/me/notifications/{id}/read
 * Estado: ⚠️ NO IMPLEMENTADO EN BACKEND
 */
export function markNotificationAsRead(notificationId) {
  return http.patch(`/api/v1/notifications/${notificationId}/read`);
}

/**
 * Marcar todas las notificaciones como leídas
 * Endpoint esperado: PATCH /api/v1/funcionarios/me/notifications/read-all
 * Estado: ⚠️ NO IMPLEMENTADO EN BACKEND
 */
export function markAllNotificationsAsRead() {
  return http.patch('/api/v1/notifications/read-all');
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

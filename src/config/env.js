/**
 * Configuración de variables de entorno
 * 
 * En desarrollo local: Lee las variables de import.meta.env (archivo .env)
 * En Docker: Lee las variables de window.__ENV__ (inyectadas en runtime por docker-entrypoint.sh)
 */

// Helper para obtener el valor desde Docker (runtime) o Vite (build time)
const getEnvValue = (key, defaultValue) => {
  // Primero intenta desde window.__ENV__ (Docker runtime)
  if (typeof window !== 'undefined' && window.__ENV__) {
    const value = window.__ENV__[key];
    if (value !== undefined && value !== null && value !== '') {
      return value === 'true' ? true : value === 'false' ? false : value;
    }
  }
  
  // Fallback a import.meta.env (desarrollo local)
  const envKey = `VITE_${key}`;
  const envValue = import.meta.env[envKey];
  if (envValue !== undefined) {
    return envValue;
  }
  
  return defaultValue;
};

export const ENV = {
  MODE: import.meta.env.MODE,
  API_AUTH_BASE: getEnvValue('API_AUTH_BASE', 'http://localhost:8080'),
  API_FUNCIONARIO_BASE: getEnvValue('API_FUNCIONARIO_BASE', 'http://localhost:8081'),
  LOGIN_URL: getEnvValue('LOGIN_URL', 'http://localhost:5173'),
  USE_MOCK: getEnvValue('USE_MOCK', 'true') === 'true' || getEnvValue('USE_MOCK', 'true') === true,
};

// Log de configuración en desarrollo
if (import.meta.env.DEV) {
  console.log('🔧 Configuración de entorno:', ENV);
}


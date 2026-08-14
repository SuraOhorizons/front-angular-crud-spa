export const environment = {
  production: false,
  // En desarrollo, proxy.conf.json reenvía /api hacia la API local de tareas
  apiUrl: '/api',
  resource: 'tasks',
  // En desarrollo, proxy.conf.json reenvía /chat-api hacia el backend de chat local
  chatApiUrl: '/chat-api',
};

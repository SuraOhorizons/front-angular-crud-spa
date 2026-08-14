export const environment = {
  production: true,
  // Base URL de la API publicada por nginx hacia el backend de tareas
  apiUrl: '/api',
  // Recurso que expone este CRUD dentro de la API
  resource: 'tasks',
  // Base URL de la API publicada por nginx hacia el backend de chat (rag-application / mock)
  chatApiUrl: '/chat-api',
};

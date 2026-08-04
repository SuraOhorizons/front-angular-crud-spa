# ohorizons_ms

SPA en Angular 19 para la demo funcional de Open Horizons. El frontend consume una API de tareas detrás de `/api`, por lo que puede ejecutarse de dos formas:

- Local rápida: contra PostgREST usando `docker compose`.
- Demo correcta en Open Horizons: como SPA desplegada en AKS, apuntando a un backend propio.

## Qué cambió para Open Horizons

- `nginx` ahora recibe `API_UPSTREAM` como variable de entorno.
- El frontend sigue usando `/api`, así evitamos CORS y no acoplamos la SPA a una URL fija.
- Se agregó `deploy/` con la base Kubernetes para publicarlo en el AKS existente.

## Estructura

```text
ohorizons_ms/
├── src/app/
│   ├── core/
│   │   ├── models/task.model.ts
│   │   └── services/task.service.ts
│   └── features/
│       ├── task-list/
│       └── task-form/
├── database/init.sql
├── docker-compose.yml
├── Dockerfile
├── nginx.conf
├── deploy/
│   ├── configmap.yaml
│   ├── deployment.yaml
│   ├── kustomization.yaml
│   └── service.yaml
└── .github/workflows/ci.yaml
```

## Demo local rápida

```bash
docker compose up --build
```

Servicios expuestos:

- App: `http://localhost:8080`
- PostgREST: `http://localhost:3000`
- Postgres: `localhost:5432`

## Desarrollo local del frontend

```bash
docker compose up postgres postgrest
npm install
npm start
```

`proxy.conf.json` mantiene `/api -> http://localhost:3000` para no cambiar la experiencia local.

## Despliegue en Open Horizons

La intención de este repo en la demo correcta es:

- Construir la imagen del frontend.
- Publicarla en el registro definido por la plataforma.
- Desplegarla en el AKS existente con los manifiestos de `deploy/`.
- Configurar `API_UPSTREAM` hacia el servicio interno del backend, por ejemplo `http://ohorizons-tasks-api:3000`.

El backend nuevo puede implementarse en un repositorio separado y solo debe exponer el contrato esperado por `TaskService` sobre `/api/tasks`.

## Contrato esperado por la SPA

Mientras mantengamos cambios mínimos en `ohorizons_ms`, el backend debe soportar:

- `GET /api/tasks?order=created_at.desc`
- `POST /api/tasks`
- `PATCH /api/tasks?id=eq.{id}`
- `DELETE /api/tasks?id=eq.{id}`

Si más adelante quieres, también puedo ayudarte a refactorizar la SPA para pasar este contrato a un REST más convencional (`/tasks/{id}`) antes de construir el backend definitivo.

## Siguiente paso recomendado

Crear el backend nuevo desde la golden path `golden-paths/h1-foundation/new-microservice`, desplegarlo en el mismo namespace del AKS y luego registrar ambos repositorios en Argo CD para que la demo quede operativa extremo a extremo.

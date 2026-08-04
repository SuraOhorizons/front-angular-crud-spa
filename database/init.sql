-- Esquema de ejemplo para el CRUD. El backend Express se conecta con `appuser`
-- (definido en docker-compose/DATABASE_URL), dueño de la tabla, así que no
-- hace falta ningún rol/grant adicional como el `web_anon` que requería PostgREST.

create table if not exists public.tasks (
    id bigint generated always as identity primary key,
    title text not null,
    notes text,
    done boolean not null default false,
    created_at timestamptz not null default now()
);

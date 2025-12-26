-- Drop the projects table and related objects since we're using static data now
DROP TRIGGER IF EXISTS update_projects_updated_at ON public.projects;
DROP TABLE IF EXISTS public.projects;
-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  year TEXT NOT NULL,
  tech TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'LIVE',
  github_url TEXT,
  live_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (anyone can view projects)
CREATE POLICY "Anyone can view projects" 
ON public.projects 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial project data
INSERT INTO public.projects (title, description, year, tech, status, display_order) VALUES
('NEURAL_SYNC', 'Real-time collaborative code editor with AI-assisted completions', '2024', ARRAY['React', 'TypeScript', 'WebSocket', 'OpenAI'], 'LIVE', 1),
('DATA_FORGE', 'Enterprise ETL pipeline with visual workflow builder', '2024', ARRAY['Node.js', 'PostgreSQL', 'Redis', 'Docker'], 'LIVE', 2),
('PULSE_API', 'High-performance GraphQL gateway with real-time subscriptions', '2023', ARRAY['Go', 'GraphQL', 'gRPC', 'Kubernetes'], 'ARCHIVED', 3),
('CRYPTO_VAULT', 'Secure password manager with zero-knowledge architecture', '2023', ARRAY['Rust', 'WebAssembly', 'Argon2', 'AES-256'], 'LIVE', 4);
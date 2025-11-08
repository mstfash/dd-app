/*
  # Create storage bucket for national IDs

  1. Storage
    - Create bucket 'national-ids' for storing national ID documents
    - Enable public access for verification purposes
    
  2. Security
    - Enable RLS policies for secure access
    - Allow authenticated users to read all files
    - Allow anyone to upload files during registration
*/

-- Create the storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('national-ids', 'national-ids', true);

-- Enable RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create policy to allow uploads during registration
CREATE POLICY "Allow public uploads to national-ids"
ON storage.objects FOR INSERT
TO public
WITH CHECK (
  bucket_id = 'national-ids'
);

-- Create policy to allow authenticated users to read files
CREATE POLICY "Allow authenticated users to read national-ids"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'national-ids');
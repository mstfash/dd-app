/*
  # Casino Players Registration Schema

  1. New Tables
    - `casino_players`
      - `id` (uuid, primary key)
      - `full_name` (text)
      - `email` (text, unique)
      - `phone_number` (text)
      - `registration_date` (timestamptz)
      - `national_id_url` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `casino_players` table
    - Add policies for:
      - Public registration
      - Public verification
      - Authenticated admin access

  3. Changes
    - Drop existing policies if they exist to avoid conflicts
    - Recreate policies with unique names
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "anyone_can_register" ON casino_players;
  DROP POLICY IF EXISTS "authenticated_users_can_read_all" ON casino_players;
  DROP POLICY IF EXISTS "public_can_verify_own_registration" ON casino_players;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

-- Create casino_players table if it doesn't exist
CREATE TABLE IF NOT EXISTS casino_players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone_number text NOT NULL,
  registration_date timestamptz NOT NULL DEFAULT now(),
  national_id_url text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_casino_players_email ON casino_players(email);
CREATE INDEX IF NOT EXISTS idx_casino_players_registration_date ON casino_players(registration_date);

-- Enable RLS
ALTER TABLE casino_players ENABLE ROW LEVEL SECURITY;

-- Create policies with unique names
CREATE POLICY "casino_players_insert_policy" 
ON casino_players FOR INSERT 
TO public 
WITH CHECK (true);

CREATE POLICY "casino_players_read_policy_auth" 
ON casino_players FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "casino_players_read_policy_public" 
ON casino_players FOR SELECT 
TO public 
USING (true);
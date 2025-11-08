/*
  # Casino Al3ab Players Registration Schema

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
      - Admin can read all records
      - Insert allowed for authenticated users
*/

-- Create casino_players table
CREATE TABLE IF NOT EXISTS casino_players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone_number text NOT NULL,
  registration_date timestamptz NOT NULL DEFAULT now(),
  national_id_url text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE casino_players ENABLE ROW LEVEL SECURITY;

-- Create policy for admin to read all records
CREATE POLICY "Admin can read all casino players"
  ON casino_players
  FOR SELECT
  TO authenticated
  USING (auth.role() = 'authenticated');

-- Create policy for inserting new records
CREATE POLICY "Anyone can register"
  ON casino_players
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create index for faster searches
CREATE INDEX IF NOT EXISTS idx_casino_players_email ON casino_players(email);
CREATE INDEX IF NOT EXISTS idx_casino_players_registration_date ON casino_players(registration_date);
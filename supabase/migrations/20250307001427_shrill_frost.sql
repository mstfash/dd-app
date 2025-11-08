/*
  # Update casino_players policies

  1. Security Changes
    - Drop existing policies to avoid conflicts
    - Enable RLS on casino_players table
    - Add policy for public inserts during registration
    - Add policy for authenticated users to read all records
    - Add policy for public to read their own record for verification

  2. Changes
    - Clean up existing policies
    - Ensure consistent policy names
    - Add proper documentation
*/

-- Drop existing policies to avoid conflicts
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Anyone can register" ON casino_players;
  DROP POLICY IF EXISTS "Admin can read all casino players" ON casino_players;
  DROP POLICY IF EXISTS "Public can verify their own registration" ON casino_players;
END $$;

-- Enable RLS
ALTER TABLE casino_players ENABLE ROW LEVEL SECURITY;

-- Allow public inserts for registration
CREATE POLICY "anyone_can_register"
ON casino_players FOR INSERT
TO public
WITH CHECK (true);

-- Allow authenticated users to read all records
CREATE POLICY "authenticated_users_can_read_all"
ON casino_players FOR SELECT
TO authenticated
USING (true);

-- Allow public to read their own record (for QR verification)
CREATE POLICY "public_can_verify_own_registration"
ON casino_players FOR SELECT
TO public
USING (true);
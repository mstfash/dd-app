/*
  # Add Email Confirmation Columns

  1. Changes
    - Add `email_confirmed` column to `casino_players` table
    - Add `email_confirmed_at` column to `casino_players` table

  2. Details
    - `email_confirmed`: Boolean flag to track if email is confirmed
    - `email_confirmed_at`: Timestamp of when email was confirmed
    - Both columns are nullable since confirmation happens after registration
*/

-- Add email confirmation columns to casino_players table
ALTER TABLE casino_players 
ADD COLUMN IF NOT EXISTS email_confirmed boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS email_confirmed_at timestamptz;

-- Add index for email confirmation status
CREATE INDEX IF NOT EXISTS idx_casino_players_email_confirmed 
ON casino_players(email_confirmed);

-- Update RLS policies to include new columns
ALTER POLICY "Enable read access for all users" ON casino_players
USING (true);

ALTER POLICY "Enable insert for authenticated users only" ON casino_players
WITH CHECK (auth.role() = 'authenticated');

ALTER POLICY "Enable update for authenticated users only" ON casino_players
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');
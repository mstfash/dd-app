/*
  # Add Phone Number Unique Constraint

  1. Changes
    - Add unique constraint on phone_number column if it doesn't already exist
    - Uses DO block to check constraint existence before adding

  2. Security
    - No changes to RLS policies
*/

DO $$ 
BEGIN
  -- Check if the constraint already exists
  IF NOT EXISTS (
    SELECT 1 
    FROM pg_constraint 
    WHERE conname = 'casino_players_phone_number_key'
  ) THEN
    -- Add the constraint only if it doesn't exist
    ALTER TABLE casino_players
    ADD CONSTRAINT casino_players_phone_number_key UNIQUE (phone_number);
  END IF;
END $$;
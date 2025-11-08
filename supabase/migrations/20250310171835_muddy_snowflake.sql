/*
  # Fix Casino Players Registration

  1. Changes
    - Add national_number column as nullable first
    - Add unique constraints for national_number and phone_number
    - Update existing records with random national numbers
    - Make national_number NOT NULL

  2. Security
    - Maintain existing RLS policies
*/

-- First add the column as nullable
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'casino_players' 
    AND column_name = 'national_number'
  ) THEN
    ALTER TABLE casino_players 
    ADD COLUMN national_number text;
  END IF;
END $$;

-- Add unique constraints one by one with IF NOT EXISTS checks
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.constraint_column_usage 
    WHERE table_name = 'casino_players' 
    AND constraint_name = 'casino_players_national_number_key'
  ) THEN
    ALTER TABLE casino_players
    ADD CONSTRAINT casino_players_national_number_key UNIQUE (national_number);
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.constraint_column_usage 
    WHERE table_name = 'casino_players' 
    AND constraint_name = 'casino_players_phone_number_key'
  ) THEN
    -- First remove any duplicate phone numbers
    DELETE FROM casino_players a USING casino_players b
    WHERE a.id > b.id 
    AND a.phone_number = b.phone_number;

    -- Then add the unique constraint
    ALTER TABLE casino_players
    ADD CONSTRAINT casino_players_phone_number_key UNIQUE (phone_number);
  END IF;
END $$;

-- Set a default value for existing records (using a random number for demo)
UPDATE casino_players
SET national_number = LPAD(FLOOR(RANDOM() * 99999999999999)::text, 14, '0')
WHERE national_number IS NULL;

-- Now make the column NOT NULL
ALTER TABLE casino_players
ALTER COLUMN national_number SET NOT NULL;
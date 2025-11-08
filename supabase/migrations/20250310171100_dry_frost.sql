/*
  # Add national number and unique constraints to casino players

  1. Changes
    - Add national_number column to casino_players table
    - Add unique constraints for national_number and phone_number
    - Handle any duplicate phone numbers by appending a suffix
    
  2. Security
    - No changes to RLS policies needed
*/

-- First add the column as nullable
ALTER TABLE casino_players 
ADD COLUMN national_number text;

-- Handle any duplicate phone numbers by appending a suffix
DO $$
DECLARE
    duplicate_record RECORD;
BEGIN
    FOR duplicate_record IN (
        SELECT phone_number, COUNT(*), array_agg(id) as ids
        FROM casino_players
        GROUP BY phone_number
        HAVING COUNT(*) > 1
    ) LOOP
        FOR i IN 2..array_length(duplicate_record.ids, 1) LOOP
            UPDATE casino_players
            SET phone_number = phone_number || '_' || i
            WHERE id = duplicate_record.ids[i];
        END LOOP;
    END LOOP;
END $$;

-- Now add unique constraints
ALTER TABLE casino_players
ADD CONSTRAINT casino_players_phone_number_key UNIQUE (phone_number);

ALTER TABLE casino_players
ADD CONSTRAINT casino_players_national_number_key UNIQUE (national_number);

-- Set a default value for existing records
UPDATE casino_players
SET national_number = LPAD(FLOOR(RANDOM() * 99999999999999)::text, 14, '0')
WHERE national_number IS NULL;

-- Make the column NOT NULL
ALTER TABLE casino_players
ALTER COLUMN national_number SET NOT NULL;
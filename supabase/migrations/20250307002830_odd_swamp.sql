/*
  # Add email confirmation fields to casino_players table

  1. Changes
    - Add email_confirmed boolean column with default false
    - Add email_confirmed_at timestamp column
    - Add confirmation_token text column for tracking confirmation status

  2. Security
    - Maintain existing RLS policies
*/

-- Add new columns for email confirmation
ALTER TABLE casino_players 
ADD COLUMN IF NOT EXISTS email_confirmed boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS email_confirmed_at timestamptz,
ADD COLUMN IF NOT EXISTS confirmation_token text;
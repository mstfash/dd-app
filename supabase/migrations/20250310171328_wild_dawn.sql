/*
  # Add test user for Casino Al3ab

  1. Changes
    - Insert a test user into casino_players table
    - User has all required fields populated
    
  2. Security
    - No changes to RLS policies needed
*/

INSERT INTO casino_players (
  full_name,
  email,
  phone_number,
  national_number,
  national_id_url,
  created_at
) VALUES (
  'Test User',
  'test@example.com',
  '01123456789',
  '29912129912129',
  'https://images.unsplash.com/photo-1580679568899-ea1679aa8f80?w=800&auto=format&fit=crop',
  NOW()
);
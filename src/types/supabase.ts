export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      casino_players: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone_number: string;
          registration_date: string;
          national_id_url: string;
          email_confirmed: boolean;
          email_confirmed_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          email: string;
          phone_number: string;
          registration_date?: string;
          national_id_url: string;
          created_at?: string;
          email_confirmed?: boolean;
          email_confirmed_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          phone_number?: string;
          registration_date?: string;
          national_id_url?: string;
          created_at?: string;
          email_confirmed?: boolean;
          email_confirmed_at?: string;
        };
      };
    };
  };
}

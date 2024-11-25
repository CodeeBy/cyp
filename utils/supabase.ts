import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://squbjdhybpyocuavjnao.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxdWJqZGh5YnB5b2N1YXZqbmFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwMzE0NTcsImV4cCI6MjA0NzYwNzQ1N30.doI54i_VCdpa-txHPi6I-OsgTwiD9T6dHXVposs4CnE"

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
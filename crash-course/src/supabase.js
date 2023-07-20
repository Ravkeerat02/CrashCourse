
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://svdgwdpazhzewzbpabnb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2ZGd3ZHBhemh6ZXd6YnBhYm5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk2NjE3NTMsImV4cCI6MjAwNTIzNzc1M30.SbgCOwdigN5NwGiY1ZnBzKR9vlXSzCC1Cpqf50iwI2g';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nvazukwdinclvqzwensp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52YXp1a3dkaW5jbHZxendlbnNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzNjgwMTUsImV4cCI6MjA4MTk0NDAxNX0.LJ59AZvRNgJjiEnusAzE5qBnG0DL-uxzkVJMXWu0Ltg';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const authService = {
    async register(email, password) {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        return data;
    },
    async login(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        // JWT used by backend MonitoringFilter to identify users
        localStorage.setItem('supabase_token', data.session.access_token);
        return data;
    },
    async logout() {
        try {
            await supabase.auth.signOut();
        } finally {
            localStorage.removeItem('supabase_token');
        }
    }
};
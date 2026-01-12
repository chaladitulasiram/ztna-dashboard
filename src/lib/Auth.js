import { createClient } from '@supabase/supabase-js';

// Derived from spring.security.oauth2.resourceserver.jwt.issuer-uri
const supabaseUrl = 'https://nvazukwdinclvqzwensp.supabase.co';
// Replace this with your actual 'anon' public key from the Supabase Dashboard
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
        // The access_token is used by the backend to validate against the jwk-set-uri
        localStorage.setItem('supabase_token', data.session.access_token);
        return data;
    },
    async logout() {
        await supabase.auth.signOut();
        localStorage.removeItem('supabase_token');
    }
};
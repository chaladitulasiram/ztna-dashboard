import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/auth';

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Check for active Supabase session
                const { data: { session }, error } = await supabase.auth.getSession();

                if (error) {
                    console.error('Session check error:', error);
                    setIsAuthenticated(false);
                } else if (session) {
                    // Valid session exists
                    setIsAuthenticated(true);
                    // Ensure token is in localStorage
                    localStorage.setItem('supabase_token', session.access_token);
                } else {
                    // No session found
                    setIsAuthenticated(false);
                    localStorage.removeItem('supabase_token');
                }
            } catch (err) {
                console.error('Auth check failed:', err);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT' || !session) {
                setIsAuthenticated(false);
                localStorage.removeItem('supabase_token');
            } else if (session) {
                setIsAuthenticated(true);
                localStorage.setItem('supabase_token', session.access_token);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    // Show loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 bg-cyan-500/30 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>
        );
    }

    // Redirect to auth if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;

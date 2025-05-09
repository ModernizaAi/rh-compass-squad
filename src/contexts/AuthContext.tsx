
import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

// Definição dos níveis de acesso
export type UserRole = 'basic' | 'manager' | 'admin';

type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  position: string;
  department: string;
  avatar_url: string | null;
  role: UserRole;
};

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<{ error: any | null }>;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any | null }>;
  updatePassword: (password: string) => Promise<{ error: any | null }>;
  updateUserRole: (userId: string, role: UserRole) => Promise<{ error: any | null }>;
  hasPermission: (requiredRole: UserRole) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("Auth state changed:", event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          // Use setTimeout to prevent potential deadlock with Supabase client
          setTimeout(async () => {
            await fetchProfile(currentSession.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    // Then check for existing session
    const initializeAuth = async () => {
      try {
        setLoading(true);
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
        setUser(data.session?.user ?? null);
        
        if (data.session?.user) {
          await fetchProfile(data.session.user.id);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }

      setProfile(data as Profile);
    } catch (error) {
      console.error("Error in fetchProfile:", error);
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      if (error) {
        console.error("Error signing up:", error);
        return { error };
      }

      return { error: null };
    } catch (error) {
      console.error("Exception during sign up:", error);
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Error signing in:", error);
        return { error };
      }

      return { error: null };
    } catch (error) {
      console.error("Exception during sign in:", error);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/auth");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });

      if (error) {
        console.error("Error resetting password:", error);
        return { error };
      }

      return { error: null };
    } catch (error) {
      console.error("Exception during password reset:", error);
      return { error };
    }
  };

  const updatePassword = async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        console.error("Error updating password:", error);
        return { error };
      }

      return { error: null };
    } catch (error) {
      console.error("Exception during password update:", error);
      return { error };
    }
  };

  // Função para atualizar o papel de um usuário (somente admins e gestores)
  const updateUserRole = async (userId: string, role: UserRole) => {
    try {
      // Verificar se o usuário atual tem permissão para atualizar roles
      if (!profile || (profile.role !== 'admin' && profile.role !== 'manager')) {
        return { 
          error: { message: "Sem permissão para atualizar níveis de acesso." } 
        };
      }
      
      // Gestores não podem promover para admin
      if (profile.role === 'manager' && role === 'admin') {
        return { 
          error: { message: "Gestores não podem promover usuários para administradores." } 
        };
      }
      
      const { error } = await supabase
        .from("profiles")
        .update({ role })
        .eq("id", userId);
        
      if (error) {
        console.error("Error updating user role:", error);
        return { error };
      }

      return { error: null };
    } catch (error) {
      console.error("Exception during role update:", error);
      return { error };
    }
  };
  
  // Verificar se o usuário tem permissão baseado no nível de acesso requerido
  const hasPermission = (requiredRole: UserRole): boolean => {
    if (!profile) return false;
    
    switch (profile.role) {
      case 'admin':
        return true; // Admins têm acesso a tudo
      case 'manager':
        return requiredRole !== 'admin'; // Gestores têm acesso a tudo exceto funções de admin
      case 'basic':
        return requiredRole === 'basic'; // Usuários básicos só têm acesso a funções básicas
      default:
        return false;
    }
  };

  const value = {
    session,
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    updateUserRole,
    hasPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

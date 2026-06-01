import type { AuthProvider } from 'react-admin';
import { supabase } from '../lib/supabase/client';

export const authProvider: AuthProvider = {
  async login({ username, password }) {
    const { error } = await supabase.auth.signInWithPassword({
      email: username,
      password,
    });
    if (error) throw error;
  },

  async logout() {
    await supabase.auth.signOut();
  },

  async checkAuth() {
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      throw new Error('Not authenticated');
    }
  },

  async checkError(error) {
    if (error?.status === 401 || error?.status === 403) {
      throw error;
    }
  },

  async getIdentity() {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      throw new Error('Not authenticated');
    }
    return {
      id: data.user.id,
      fullName: data.user.email ?? data.user.id,
    };
  },

  async getPermissions() {
    return [];
  },
};

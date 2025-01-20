import create from 'zustand';

interface AuthState {
  user: any | null;
  token: string | null;
  login: (userData: any, token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  login: (userData, token) => {
    console.log('Login en store:', userData); // Debug
    localStorage.setItem('token', token);
    set({ user: userData, token });
  },
  logout: () => {
    console.log('Logout en store'); // Debug
    localStorage.removeItem('token');
    set({ user: null, token: null });
  }
}));

export default useAuthStore;
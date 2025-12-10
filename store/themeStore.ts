import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ThemeState {
  isDark: boolean;
  mounted: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
  setMounted: (mounted: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      isDark: false,
      mounted: false,
      
      setMounted: (mounted: boolean) => {
        set({ mounted });
        
        // Apply theme on mount
        if (mounted && typeof window !== 'undefined') {
          const { isDark } = get();
          if (isDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      },
      
      toggleTheme: () => {
        set((state) => {
          const newIsDark = !state.isDark;
          
          // Update DOM
          if (typeof window !== 'undefined') {
            if (newIsDark) {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          }
          
          return { isDark: newIsDark };
        });
      },
      
      setTheme: (isDark: boolean) => {
        set({ isDark });
        
        // Update DOM
        if (typeof window !== 'undefined') {
          if (isDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ isDark: state.isDark }),
    }
  )
);


import { create } from 'zustand'

type TTheme = 'dark' | 'white'

type TThemeStore = {
    theme: TTheme
    changeTheme: (newTheme: TTheme) => void
}
  
export const useThemeStore = create<TThemeStore>()((set) => ({
    theme: 'dark',
    changeTheme: (newTheme) => set(() => ({ theme: newTheme })),
}))
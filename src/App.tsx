import { useEffect } from 'react';
import { Gateway } from '@/worlds';
import { useUniverseStore } from '@/store';

function App() {
  const theme = useUniverseStore((state) => state.theme);
  const reducedMotion = useUniverseStore((state) => state.reducedMotion);

  // Apply theme class to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Check for system reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches && !reducedMotion) {
      useUniverseStore.getState().setReducedMotion(true);
    }

    const handleChange = (e: MediaQueryListEvent) => {
      useUniverseStore.getState().setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [reducedMotion]);

  return <Gateway />;
}

export default App;

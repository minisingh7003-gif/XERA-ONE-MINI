import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useUniverseStore } from '@/store';
import { BufferLoader } from '@/components/effects';
import { SuperHeader } from '@/components/layout';
import { StudiosWorld } from './worlds/studios';
import { MaxWorld } from './worlds/max';
import { InfinityWorld } from './worlds/infinity';
import type { WorldId } from '@/types';

function App() {
  const theme = useUniverseStore((state) => state.theme);
  const reducedMotion = useUniverseStore((state) => state.reducedMotion);
  const hasEntered = useUniverseStore((state) => state.hasEntered);
  const enterUniverse = useUniverseStore((state) => state.enterUniverse);

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

  // Handle buffer loading complete
  const handleLoadingComplete = () => {
    enterUniverse();
  };

  // Show buffer loader if hasn't entered
  if (!hasEntered) {
    return <BufferLoader onComplete={handleLoadingComplete} />;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-white">
        <SuperHeader />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Navigate to="/max" replace />} />
            <Route path="/studios/*" element={<StudiosWorld />} />
            <Route path="/max/*" element={<MaxWorld />} />
            <Route path="/infinity/*" element={<InfinityWorld />} />
            <Route path="*" element={<Navigate to="/max" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;


import React, { useState } from 'react';
import { Sidebar, SidebarItem } from './components/Layout';
import { HomeIcon, DumbbellIcon, ClipboardListIcon, ChartBarIcon, SparklesIcon } from './components/Icons';
import Dashboard from './pages/Dashboard';
import Exercises from './pages/Exercises';
import Workouts from './pages/Workouts';
import Progress from './pages/Progress';
import AiCoach from './pages/AiCoach';
import { AppProvider } from './context/AppContext';

type Page = 'dashboard' | 'exercises' | 'workouts' | 'progress' | 'ai-coach';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard setActivePage={setActivePage} />;
      case 'exercises':
        return <Exercises />;
      case 'workouts':
        return <Workouts />;
      case 'progress':
        return <Progress />;
      case 'ai-coach':
          return <AiCoach />;
      default:
        return <Dashboard setActivePage={setActivePage} />;
    }
  };

  return (
    <AppProvider>
      <div className="flex h-screen bg-pink-50 text-gray-800">
        <Sidebar>
          <SidebarItem 
            icon={<HomeIcon />} 
            text="Dashboard" 
            active={activePage === 'dashboard'} 
            onClick={() => setActivePage('dashboard')} 
          />
          <SidebarItem 
            icon={<DumbbellIcon />} 
            text="Exercises" 
            active={activePage === 'exercises'}
            onClick={() => setActivePage('exercises')} 
          />
          <SidebarItem 
            icon={<ClipboardListIcon />} 
            text="Workouts" 
            active={activePage === 'workouts'}
            onClick={() => setActivePage('workouts')} 
          />
          <SidebarItem 
            icon={<ChartBarIcon />} 
            text="Progress" 
            active={activePage === 'progress'}
            onClick={() => setActivePage('progress')} 
          />
           <SidebarItem 
            icon={<SparklesIcon />} 
            text="AI Coach" 
            active={activePage === 'ai-coach'}
            onClick={() => setActivePage('ai-coach')} 
          />
        </Sidebar>
        <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </AppProvider>
  );
};

export default App;

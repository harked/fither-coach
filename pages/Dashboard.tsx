
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { DumbbellIcon, ClipboardListIcon, ChartBarIcon, SparklesIcon } from '../components/Icons';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';

interface DashboardProps {
    setActivePage: (page: 'dashboard' | 'exercises' | 'workouts' | 'progress' | 'ai-coach') => void;
}

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode; color: string; }> = ({ title, value, icon, color }) => (
    <div className="bg-white p-6 rounded-2xl shadow-md flex items-center">
        <div className={`p-3 rounded-full ${color}`}>
            {icon}
        </div>
        <div className="ml-4">
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

const NavCard: React.FC<{ title: string; description: string; icon: React.ReactNode; onClick: () => void; }> = ({ title, description, icon, onClick }) => (
    <div onClick={onClick} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow cursor-pointer flex flex-col justify-between">
        <div className="flex items-start">
            <div className="text-pink-500">{icon}</div>
            <h3 className="text-xl font-semibold ml-3">{title}</h3>
        </div>
        <p className="text-gray-600 mt-2">{description}</p>
    </div>
);

const Dashboard: React.FC<DashboardProps> = ({ setActivePage }) => {
    const { workoutPlans, measurements } = useAppContext();
    const lastMeasurement = measurements[measurements.length - 1];
    
    const chartData = measurements.slice(-5).map(m => ({
        name: new Date(m.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        Weight: m.weight,
    }));

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-4xl font-bold text-gray-800">Welcome Back!</h1>
                <p className="text-lg text-gray-500 mt-1">Ready to crush your goals today?</p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Workouts" value={workoutPlans.length.toString()} icon={<ClipboardListIcon />} color="bg-pink-100 text-pink-600" />
                <StatCard title="Current Weight" value={lastMeasurement?.weight ? `${lastMeasurement.weight} kg` : 'N/A'} icon={<ChartBarIcon />} color="bg-purple-100 text-purple-600" />
                <StatCard title="Waist" value={lastMeasurement?.waist ? `${lastMeasurement.waist} cm` : 'N/A'} icon={<ChartBarIcon />} color="bg-blue-100 text-blue-600" />
                <StatCard title="Hips" value={lastMeasurement?.hips ? `${lastMeasurement.hips} cm` : 'N/A'} icon={<ChartBarIcon />} color="bg-green-100 text-green-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Recent Weight Progress</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                            <XAxis dataKey="name" tick={{ fill: '#6B7280' }} />
                            <YAxis tick={{ fill: '#6B7280' }} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'white',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '0.75rem',
                                }}
                            />
                            <Legend />
                            <Bar dataKey="Weight" fill="#f472b6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                 <div className="space-y-6">
                    <NavCard title="Explore Exercises" description="Browse our library of exercises." icon={<DumbbellIcon />} onClick={() => setActivePage('exercises')} />
                    <NavCard title="AI Coach" description="Get a personalized workout plan." icon={<SparklesIcon />} onClick={() => setActivePage('ai-coach')} />
                 </div>
            </div>
        </div>
    );
};

export default Dashboard;

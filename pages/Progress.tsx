
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProgressChart: React.FC<{ data: any[]; yKey: string; stroke: string; name: string; unit: string }> = ({ data, yKey, stroke, name, unit }) => (
    <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">{name} Progress</h3>
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tick={{ fill: '#6B7280' }} />
                <YAxis domain={['dataMin - 1', 'dataMax + 1']} tick={{ fill: '#6B7280' }} label={{ value: unit, angle: -90, position: 'insideLeft', fill: '#6B7280' }}/>
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '0.75rem',
                    }}
                    formatter={(value: number) => [`${value} ${unit}`, name]}
                />
                <Legend />
                <Line type="monotone" dataKey={yKey} name={name} stroke={stroke} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }}/>
            </LineChart>
        </ResponsiveContainer>
    </div>
);


const Progress: React.FC = () => {
    const { measurements, addMeasurement } = useAppContext();
    const [weight, setWeight] = useState('');
    const [waist, setWaist] = useState('');
    const [hips, setHips] = useState('');
    const [bodyFat, setBodyFat] = useState('');
    
    const chartData = measurements.map(m => ({
        ...m,
        date: new Date(m.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    }));
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newMeasurement = {
            weight: weight ? parseFloat(weight) : undefined,
            waist: waist ? parseFloat(waist) : undefined,
            hips: hips ? parseFloat(hips) : undefined,
            bodyFat: bodyFat ? parseFloat(bodyFat) : undefined,
        };
        if (Object.values(newMeasurement).some(v => v !== undefined)) {
            addMeasurement(newMeasurement);
            setWeight('');
            setWaist('');
            setHips('');
            setBodyFat('');
            alert('Measurement added successfully!');
        } else {
            alert('Please enter at least one measurement.');
        }
    };

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-4xl font-bold text-gray-800">Track Your Progress</h1>
                <p className="text-lg text-gray-500 mt-1">Visualize your journey and stay motivated.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ProgressChart data={chartData} yKey="weight" stroke="#ec4899" name="Weight" unit="kg" />
                <ProgressChart data={chartData} yKey="waist" stroke="#8b5cf6" name="Waist" unit="cm" />
                <ProgressChart data={chartData} yKey="hips" stroke="#3b82f6" name="Hips" unit="cm" />
                <ProgressChart data={chartData} yKey="bodyFat" stroke="#10b981" name="Body Fat" unit="%" />
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Log New Measurements</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
                    <div>
                        <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                        <input type="number" id="weight" value={weight} onChange={e => setWeight(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"/>
                    </div>
                     <div>
                        <label htmlFor="waist" className="block text-sm font-medium text-gray-700">Waist (cm)</label>
                        <input type="number" id="waist" value={waist} onChange={e => setWaist(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"/>
                    </div>
                     <div>
                        <label htmlFor="hips" className="block text-sm font-medium text-gray-700">Hips (cm)</label>
                        <input type="number" id="hips" value={hips} onChange={e => setHips(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"/>
                    </div>
                    <div>
                        <label htmlFor="bodyFat" className="block text-sm font-medium text-gray-700">Body Fat (%)</label>
                        <input type="number" id="bodyFat" value={bodyFat} onChange={e => setBodyFat(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"/>
                    </div>
                    <button type="submit" className="w-full bg-pink-500 text-white py-2.5 px-4 rounded-md font-semibold hover:bg-pink-600 transition-colors">
                        Save
                    </button>
                </form>
            </div>

        </div>
    );
};

export default Progress;

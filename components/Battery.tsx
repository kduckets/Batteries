// components/Battery.tsx
'use client';

import { useState, useRef } from 'react';

const Battery: React.FC = () => {
  const [batteryLevel1, setBatteryLevel1] = useState<number>(0);
  const [batteryLevel2, setBatteryLevel2] = useState<number>(0);

  const batteryRef1 = useRef<HTMLDivElement>(null);
  const batteryRef2 = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/save-battery-level', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ batteryLevel1, batteryLevel2 }),
    });

    if (response.ok) {
      console.log('Battery levels saved successfully!');
    } else {
      console.log('Failed to save battery levels.');
    }
  };

  const getBatteryColor = (level: number): string => {
    if (level > 60) return 'bg-green-500';
    if (level > 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, batteryRef: React.RefObject<HTMLDivElement>, setBatteryLevel: React.Dispatch<React.SetStateAction<number>>) => {
    if (batteryRef.current) {
      const rect = batteryRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newLevel = Math.min(Math.max((clickX / rect.width) * 100, 0), 100);
      setBatteryLevel(newLevel);
      handleSubmit(e);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Battery Levels</h1>
      {/* <form onSubmit={handleSubmit} className="mb-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
        >
          Save
        </button>
      </form> */}
      
      <div>
        <h2 className="text-xl font-semibold">Steph's Battery</h2>
        <div
          ref={batteryRef1}
          onClick={(e) => handleClick(e, batteryRef1, setBatteryLevel1)}
          className="w-72 h-12 bg-gray-300 relative cursor-pointer"
        >
          <div
            className={`${getBatteryColor(batteryLevel1)} h-full transition-all duration-300`}
            style={{ width: `${batteryLevel1}%` }}
          />
        </div>
        <p className="mt-2">{Math.round(batteryLevel1)}%</p>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Kev's Battery</h2>
        <div
          ref={batteryRef2}
          onClick={(e) => handleClick(e, batteryRef2, setBatteryLevel2)}
          className="w-72 h-12 bg-gray-300 relative cursor-pointer"
        >
          <div
            className={`${getBatteryColor(batteryLevel2)} h-full transition-all duration-300`}
            style={{ width: `${batteryLevel2}%` }}
          />
        </div>
        <p className="mt-2">{Math.round(batteryLevel2)}%</p>
      </div>
    </div>
  );
};

export default Battery;

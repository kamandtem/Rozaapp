import React from 'react';
import { motion } from 'motion/react';
import { toPersianDigits } from '../../services/jalali';
import { MenstrualPhase } from '../../types';

interface CycleWheelProps {
  currentDay: number; // e.g., 24
  totalDays: number; // e.g., 28
  activePhase: MenstrualPhase;
  onSelectPhase: (phase: MenstrualPhase) => void;
}

export const CycleWheel: React.FC<CycleWheelProps> = ({
  currentDay,
  totalDays = 28,
  activePhase,
  onSelectPhase,
}) => {
  const radius = 100;
  const strokeWidth = 24;
  const center = 130;

  // Calculate rotation angle for today's indicator
  const progressAngle = ((currentDay - 1) / totalDays) * 360;

  const phases = [
    { key: 'menstrual', label: 'قاعدگی', color: '#e11d48', range: 'روز ۱-۵' },
    { key: 'follicular', label: 'فولیکولار', color: '#10b981', range: 'روز ۶-۱۲' },
    { key: 'ovulation', label: 'تخمک‌گذاری', color: '#f59e0b', range: 'روز ۱۳-۱۶' },
    { key: 'luteal_pms', label: 'لوتئال / PMS', color: '#8b5cf6', range: 'روز ۱۷-۲۸' },
  ];

  return (
    <div className="relative w-64 h-64 mx-auto flex items-center justify-center my-2">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 260 260">
        {/* Background Ring */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#f0e4d8"
          strokeWidth={strokeWidth}
        />

        {/* Phase Arcs */}
        {/* Menstrual Arc (approx 18% of circle) */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#f43f5e"
          strokeWidth={strokeWidth}
          strokeDasharray="113 515"
          strokeDashoffset="0"
          className="cursor-pointer transition-opacity hover:opacity-80"
          onClick={() => onSelectPhase('menstrual')}
        />

        {/* Follicular Arc */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#10b981"
          strokeWidth={strokeWidth}
          strokeDasharray="157 471"
          strokeDashoffset="-120"
          className="cursor-pointer transition-opacity hover:opacity-80"
          onClick={() => onSelectPhase('follicular')}
        />

        {/* Ovulation Arc */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#f59e0b"
          strokeWidth={strokeWidth}
          strokeDasharray="90 538"
          strokeDashoffset="-282"
          className="cursor-pointer transition-opacity hover:opacity-80"
          onClick={() => onSelectPhase('ovulation')}
        />

        {/* Luteal / PMS Arc */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#8b5cf6"
          strokeWidth={strokeWidth}
          strokeDasharray="250 378"
          strokeDashoffset="-377"
          className="cursor-pointer transition-opacity hover:opacity-80"
          onClick={() => onSelectPhase('luteal_pms')}
        />
      </svg>

      {/* Center Display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-4">
        <span className="text-[11px] font-bold text-[#8a766c] block">امروز</span>
        <span className="text-3xl font-black text-[#3a2f27] my-0.5">
          روز {toPersianDigits(currentDay)}
        </span>
        <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#f6ede5] text-[#8e5241] border border-[#e5d8cb]">
          از {toPersianDigits(totalDays)} روز
        </span>
      </div>

      {/* Today indicator dot on circle */}
      <motion.div
        className="absolute w-5 h-5 rounded-full bg-white border-4 border-[#8e5241] shadow-md pointer-events-none"
        animate={{
          rotate: progressAngle,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        style={{
          transformOrigin: 'center center',
          top: 'calc(50% - 10px)',
          left: 'calc(50% - 10px)',
        }}
      >
        <div className="w-full h-full -translate-y-[100px]" />
      </motion.div>
    </div>
  );
};

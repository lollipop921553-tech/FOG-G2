import React from 'react';

interface BarChartProps {
    data: { name: string; value: number }[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    const chartHeight = 150;
    const barWidth = 30;
    const barMargin = 15;

    return (
        <div className="w-full h-full flex flex-col">
            <svg viewBox={`0 0 ${data.length * (barWidth + barMargin)} ${chartHeight + 30}`} className="flex-grow">
                {data.map((d, i) => {
                    const barHeight = (d.value / maxValue) * chartHeight;
                    return (
                        <g key={d.name} transform={`translate(${i * (barWidth + barMargin)}, 0)`}>
                            <rect
                                y={chartHeight - barHeight}
                                width={barWidth}
                                height={barHeight}
                                fill="url(#barGradient)"
                                rx="4"
                                className="transition-all duration-300"
                            />
                            <text
                                x={barWidth / 2}
                                y={chartHeight - barHeight - 5}
                                textAnchor="middle"
                                className="text-xs font-bold fill-current text-fog-dark dark:text-fog-light"
                            >
                                {d.value}
                            </text>
                            <text
                                x={barWidth / 2}
                                y={chartHeight + 15}
                                textAnchor="middle"
                                className="text-xs fill-current text-gray-500 dark:text-gray-400"
                            >
                                {d.name}
                            </text>
                        </g>
                    );
                })}
                 <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#2563eb" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};

export default BarChart;

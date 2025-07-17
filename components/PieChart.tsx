import React from 'react';

interface PieChartProps {
    data: { name: string; value: number; color: string }[];
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
    const total = data.reduce((acc, d) => acc + d.value, 0);
    let cumulative = 0;

    const paths = data.map(d => {
        const startAngle = (cumulative / total) * 360;
        cumulative += d.value;
        const endAngle = (cumulative / total) * 360;
        
        const startX = 50 + 40 * Math.cos(Math.PI * (startAngle - 90) / 180);
        const startY = 50 + 40 * Math.sin(Math.PI * (startAngle - 90) / 180);
        const endX = 50 + 40 * Math.cos(Math.PI * (endAngle - 90) / 180);
        const endY = 50 + 40 * Math.sin(Math.PI * (endAngle - 90) / 180);

        const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

        return `M 50,50 L ${startX},${startY} A 40,40 0 ${largeArcFlag},1 ${endX},${endY} Z`;
    });

    return (
        <div className="w-full h-full flex items-center justify-around">
            <svg viewBox="0 0 100 100" className="w-40 h-40">
                {paths.map((path, i) => (
                    <path key={i} d={path} fill={data[i].color} />
                ))}
            </svg>
            <div className="space-y-2">
                {data.map(d => (
                    <div key={d.name} className="flex items-center">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></span>
                        <span className="ml-2 text-sm text-fog-dark dark:text-fog-light">{d.name}</span>
                        <span className="ml-auto text-sm font-semibold text-gray-500 dark:text-gray-400">
                           {((d.value / total) * 100).toFixed(0)}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PieChart;

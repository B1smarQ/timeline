import React from 'react';
import { Type, RotateCcw } from 'lucide-react';
import { useAppStore } from '../store';

export const FontSizeControls: React.FC = () => {
    const { fontSize, setFontSize, resetProgress } = useAppStore();

    const sizes = [
        { key: 'small' as const, label: 'A', size: 'text-sm' },
        { key: 'medium' as const, label: 'A', size: 'text-base' },
        { key: 'large' as const, label: 'A', size: 'text-lg' },
    ];

    return (
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-2 border border-gray-700">
                <Type size={16} className="text-gray-400" />
                <div className="flex gap-1">
                    {sizes.map((size) => (
                        <button
                            key={size.key}
                            onClick={() => setFontSize(size.key)}
                            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${fontSize === size.key
                                ? 'bg-primary-600 text-white'
                                : 'text-gray-400 hover:text-white hover:bg-gray-700'
                                }`}
                        >
                            <span className={size.size}>{size.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <button
                onClick={resetProgress}
                className="bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white p-2 rounded-lg border border-gray-700 transition-colors"
                title="Reset Progress"
            >
                <RotateCcw size={16} />
            </button>
        </div>
    );
};
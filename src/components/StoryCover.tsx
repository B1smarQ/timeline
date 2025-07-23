import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Image } from 'lucide-react';

interface StoryCoverProps {
    cover: string;
    title: string;
    className?: string;
}

export const StoryCover: React.FC<StoryCoverProps> = ({
    cover,
    title,
    className = ''
}) => {
    const [imageError, setImageError] = React.useState(false);
    const [imageLoaded, setImageLoaded] = React.useState(false);

    // Reset states when cover changes
    React.useEffect(() => {
        setImageError(false);
        setImageLoaded(false);
    }, [cover]);

    const handleImageError = () => {
        console.warn(`Failed to load cover image: ${cover}`);
        setImageError(true);
    };

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    // Generate a gradient based on the title for consistent colors
    const generateGradient = (text: string) => {
        const colors = [
            'from-blue-600 to-purple-700',
            'from-green-600 to-teal-700',
            'from-red-600 to-pink-700',
            'from-yellow-600 to-orange-700',
            'from-indigo-600 to-blue-700',
            'from-purple-600 to-indigo-700',
            'from-teal-600 to-green-700',
            'from-orange-600 to-red-700',
        ];

        const hash = text.split('').reduce((a, b) => {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
        }, 0);

        return colors[Math.abs(hash) % colors.length];
    };

    const gradientClass = generateGradient(title);

    if (imageError || !cover) {
        // Fallback design with gradient and typography
        return (
            <motion.div
                className={`relative overflow-hidden rounded-lg bg-gradient-to-br ${gradientClass} ${className}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative h-full flex flex-col justify-between p-4 text-white">
                    <div className="flex justify-center">
                        <BookOpen size={32} className="opacity-80" />
                    </div>

                    <div className="text-center">
                        <h3 className="font-bold text-lg mb-1 leading-tight">{title}</h3>
                    </div>

                    <div className="flex justify-center opacity-60">
                        <div className="w-8 h-1 bg-white/40 rounded" />
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            className={`relative overflow-hidden rounded-lg bg-gray-800 ${className}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            {!imageLoaded && (
                <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} flex items-center justify-center`}>
                    <Image size={32} className="text-white/60" />
                </div>
            )}

            <img
                src={cover}
                alt={`Cover for ${title}`}
                className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                onError={handleImageError}
                onLoad={handleImageLoad}
            />

            {imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            )}

            {imageLoaded && (
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <h3 className="font-bold text-sm mb-1 leading-tight">{title}</h3>
                </div>
            )}
        </motion.div>
    );
};
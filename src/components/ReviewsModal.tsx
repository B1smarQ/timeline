import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { ParticleSystem } from './ParticleSystem';
import { reviewsData, reviewsConfig, Review } from '../data/reviewsData';
import { ReviewReader } from './ReviewReader';
import { useSound } from '../hooks/useSound';

interface ReviewsModalProps {
    show: boolean;
    onClose: () => void;
}

interface ReviewCardProps {
    review: Review;
    index: number;
    onOpenReview: (review: Review) => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, index, onOpenReview }) => {
    const { playSound } = useSound();

    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - Math.ceil(rating);

        return (
            <div className="flex items-center gap-1">
                {/* Full stars */}
                {Array.from({ length: fullStars }, (_, i) => (
                    <Star key={`full-${i}`} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}

                {/* Half star */}
                {hasHalfStar && (
                    <div className="relative">
                        <Star size={16} className="text-gray-600" />
                        <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                            <Star size={16} className="text-yellow-400 fill-yellow-400" />
                        </div>
                    </div>
                )}

                {/* Empty stars */}
                {Array.from({ length: emptyStars }, (_, i) => (
                    <Star key={`empty-${i}`} size={16} className="text-gray-600" />
                ))}

                <span className="ml-1 text-sm font-medium text-gray-300">
                    {rating.toFixed(1)}
                </span>
            </div>
        );
    };

    const truncateText = (text: string, maxLength: number = 200) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
    };

    const handleOpenReview = () => {
        playSound('click');
        onOpenReview(review);
    };

    return (
        <motion.div
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-600/30 p-6 h-full flex flex-col cursor-pointer hover:border-purple-500/40 transition-colors group"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{
                duration: reviewsConfig.fadeInDuration,
                delay: index * reviewsConfig.animationDelay
            }}
            onClick={handleOpenReview}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            {/* Header */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-200 transition-colors line-clamp-2">
                    {review.title}
                </h3>
                <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-400">by {review.author}</p>
                    {renderStars(review.rating)}
                </div>
            </div>

            {/* Content Preview */}
            <div className="flex-1 overflow-hidden">
                <p className="text-gray-300 leading-relaxed text-sm">
                    {truncateText(review.content)}
                </p>
            </div>

            {/* Read More Indicator */}
            <div className="mt-4 pt-4 border-t border-gray-600/30">
                <span className="text-xs text-purple-400 group-hover:text-purple-300 transition-colors">
                    Click to read full review →
                </span>
            </div>
        </motion.div>
    );
};

export const ReviewsModal: React.FC<ReviewsModalProps> = ({ show, onClose }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);
    const { playSound } = useSound();

    React.useEffect(() => {
        console.log(`📖 ReviewsModal show state: ${show}`);
    }, [show]);

    const totalPages = Math.ceil(reviewsData.length / reviewsConfig.reviewsPerPage);
    const currentReviews = reviewsData.slice(
        currentPage * reviewsConfig.reviewsPerPage,
        (currentPage + 1) * reviewsConfig.reviewsPerPage
    );

    const handleClose = () => {
        playSound('click');
        onClose();
    };

    const handlePageChange = (direction: 'prev' | 'next') => {
        playSound('click');
        if (direction === 'prev' && currentPage > 0) {
            setCurrentPage(currentPage - 1);
        } else if (direction === 'next' && currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleOpenReview = (review: Review) => {
        setSelectedReview(review);
    };

    const handleCloseReview = () => {
        setSelectedReview(null);
    };

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 bg-black/95 backdrop-blur-md z-[200] flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    onClick={handleClose}
                >
                    {/* Background Effects */}
                    <div className="absolute inset-0">
                        <ParticleSystem />
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-transparent to-purple-900/20" />
                    </div>

                    {/* Content Container */}
                    <motion.div
                        className="relative z-10 max-w-7xl w-full max-h-[90vh] overflow-hidden"
                        initial={{ scale: 0.9, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 50 }}
                        transition={{ duration: 0.6, type: "spring" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <motion.h1
                                    className="text-4xl md:text-5xl font-bold text-white glow-text mb-2"
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3, duration: 0.8 }}
                                >
                                    Reader Reviews
                                </motion.h1>
                                <motion.p
                                    className="text-lg text-gray-300"
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                >
                                    What others have said about this journey
                                </motion.p>
                                <motion.p
                                    className="text-lg text-gray-300"
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                >
                                    Reviews have been made on varying iterations of the story and might contain inaccuracies
                                </motion.p>
                            </div>

                            <motion.button
                                onClick={handleClose}
                                className="p-3 rounded-full bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-white transition-colors border border-gray-600/50"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.7, duration: 0.3 }}
                            >
                                <X size={20} />
                            </motion.button>
                        </div>

                        {/* Reviews Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 min-h-[500px]">
                            <AnimatePresence>
                                {currentReviews.map((review, index) => (
                                    <ReviewCard
                                        key={`${review.id}-${currentPage}`}
                                        review={review}
                                        index={index}
                                        onOpenReview={handleOpenReview}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <motion.div
                                className="flex justify-center items-center gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                            >
                                <motion.button
                                    onClick={() => handlePageChange('prev')}
                                    disabled={currentPage === 0}
                                    className="p-3 rounded-full bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-white transition-colors border border-gray-600/50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    whileHover={{ scale: currentPage === 0 ? 1 : 1.1 }}
                                    whileTap={{ scale: currentPage === 0 ? 1 : 0.9 }}
                                >
                                    <ChevronLeft size={20} />
                                </motion.button>

                                <span className="text-gray-300 text-sm">
                                    Page {currentPage + 1} of {totalPages}
                                </span>

                                <motion.button
                                    onClick={() => handlePageChange('next')}
                                    disabled={currentPage === totalPages - 1}
                                    className="p-3 rounded-full bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-white transition-colors border border-gray-600/50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    whileHover={{ scale: currentPage === totalPages - 1 ? 1 : 1.1 }}
                                    whileTap={{ scale: currentPage === totalPages - 1 ? 1 : 0.9 }}
                                >
                                    <ChevronRight size={20} />
                                </motion.button>
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            )}

            {/* Review Reader Modal */}
            <ReviewReader
                show={!!selectedReview}
                review={selectedReview}
                onClose={handleCloseReview}
            />
        </AnimatePresence>
    );
};
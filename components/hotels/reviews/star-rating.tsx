"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface StarRatingProps {
  totalStars?: number;
  setCurrentRating: (rating: number) => void;
}

export default function StarRating({
  totalStars = 5,
  setCurrentRating,
}: StarRatingProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleRating = (selectedRating: number) => {
    setRating(selectedRating);
    setCurrentRating(selectedRating);
  };

  const handleHover = (hoveredRating: number) => {
    setHoveredRating(hoveredRating);
  };

  return (
    <div className="flex space-x-1">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <Star
            key={index}
            filled={starValue <= (hoveredRating || rating)}
            onClick={() => handleRating(starValue)}
            onFocus={() => handleHover(starValue)}
            onBlur={() => handleHover(0)}
            onMouseEnter={() => handleHover(starValue)}
            onMouseLeave={() => handleHover(0)}
          />
        );
      })}
    </div>
  );
}

interface StarProps {
  filled: boolean;
  onClick: () => void;
  onFocus: () => void;
  onBlur: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function Star({
  filled,
  onClick,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
}: StarProps) {
  return (
    <motion.button
      className="focus:outline-none    rounded-full p-1"
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={filled ? "yellow" : "none"}
        stroke={filled ? "green" : "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8 "
        initial={{ opacity: 0.5 }}
        animate={{ opacity: filled ? 1 : 0.5 }}
        transition={{ duration: 0.2 }}
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </motion.svg>
    </motion.button>
  );
}

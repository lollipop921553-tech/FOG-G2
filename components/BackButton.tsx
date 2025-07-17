import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from './Icons';

interface BackButtonProps {
    onClick?: () => void;
    className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, className }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            navigate(-1);
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`flex items-center gap-2 mb-6 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-fog-accent dark:hover:text-fog-light transition-colors ${className}`}
        >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Back</span>
        </button>
    );
};

export default BackButton;

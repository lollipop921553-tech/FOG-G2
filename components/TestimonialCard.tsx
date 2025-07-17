import React from 'react';
import { Testimonial } from '../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-white dark:bg-fog-mid-dark p-8 rounded-xl shadow-lg dark:shadow-lg-dark flex flex-col h-full">
      <p className="text-gray-600 dark:text-gray-300 flex-grow">"{testimonial.quote}"</p>
      <div className="mt-6 flex items-center">
        <img className="h-12 w-12 rounded-full object-cover" src={testimonial.avatarUrl} alt={testimonial.name} />
        <div className="ml-4">
          <p className="font-semibold text-fog-dark dark:text-fog-light">{testimonial.name}</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
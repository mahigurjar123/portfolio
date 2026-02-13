import React, { useState } from 'react';

const Achievements = () => {
    const [showMore, setShowMore] = useState(false);

    const toggleContent = () => setShowMore(!showMore);

    return (
        <div className={`bg-zinc-700 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105 
            ${showMore ? 'max-h-[1000px]' : 'max-h-[400px]'} overflow-hidden transition-all duration-500 ease-in-out`}>
            <h3 className="text-2xl font-semibold mb-4 text-zinc-50">Achievements</h3>
            <ul className="list-disc pl-5 text-zinc-50/80 leading-relaxed">
                <li>Completed Flutter and Dart certification from SSI Digital with key learnings in state management and API integration.</li>
                <li>Developed multiple production-level Flutter applications including Brocr with 211 screens.</li>
                {showMore && (
                    <>
                        <li>Successfully integrated Razorpay payment gateway in Brocr app for wallet top-ups.</li>
                        <li>Built responsive web and desktop applications alongside mobile apps using Flutter.</li>
                        <li>Excelled academically with strong performance throughout education.</li>
                    </>
                )}
            </ul>
            <button
                onClick={toggleContent}
                className="mt-4 px-4 py-2 text-white rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 backdrop-blur-md 
               transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:opacity-90"
            >
                {showMore ? 'Show Less' : 'Read More'}
            </button>
        </div>
    );
};

export default Achievements;
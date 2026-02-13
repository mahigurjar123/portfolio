import React, { useState } from 'react';

const ProfessionalJourney = () => {
    const [showMore, setShowMore] = useState(false);

    const toggleContent = () => setShowMore(!showMore);

    return (
        <div className={`bg-zinc-700 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105 
            ${showMore ? 'max-h-[1000px]' : 'max-h-[400px]'} overflow-hidden transition-all duration-500 ease-in-out`}>
            <h3 className="text-2xl font-semibold mb-4 text-zinc-50">Professional Journey</h3>
            <ul className="list-disc pl-5 text-zinc-50/80 leading-relaxed">
                <li>Currently working as Flutter Developer at I-Engage (PSPL Advertising Pvt. Ltd.) since Feb 2025.</li>
                <li>Previously worked as Flutter Developer at Systos Technology, Indore (Nov 2023 - Jan 2025).</li>
                {showMore && (
                    <>
                        <li>Developed multiple Flutter applications including VIX Digital OTT Platform, Dainik Pradesh-Prakash, CarSee, and Brocr.</li>
                        <li>Experienced in GetX, Provider, and Riverpod for state management.</li>
                        <li>Integrated Firebase, REST APIs, and payment gateways (Razorpay/Stripe) in various projects.</li>
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

export default ProfessionalJourney;
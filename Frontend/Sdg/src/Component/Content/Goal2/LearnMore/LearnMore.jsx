// LearnMore.jsx
import React from 'react';
import Navbar from '../Navbar/Navbar';
const LearnMore = () => {
  return (
   <> <Navbar/>
    <section className="min-h-screen px-6 py-12 bg-yellow-400 text-gray-800">
      <h1 className="text-4xl font-bold mt-6 mb-6 text-center">Why "No One Sleeps Hungry"?</h1>
      
      <div className="max-w-3xl mx-auto text-lg leading-relaxed space-y-6">
        <p>
          Zero Hunger is a mission to ensure that no one in our community goes to bed on an empty stomach.
          Every day, surplus food from homes, restaurants, and events is wasted — while many people struggle to find their next meal.
        </p>

        <p>
          We connect people who have excess food with those in need, through easy donation and request forms.
          Our volunteers ensure food is picked up on time, safely packaged, and delivered to verified recipients.
        </p>

        <p>
          You can play a crucial role — whether by donating food, becoming a delivery partner, or spreading awareness.
          Together, we can make sure everyone has enough to eat.
        </p>
        <p>
          Zero Hunger is a mission to ensure that no one in our community goes to bed on an empty stomach.
          Every day, surplus food from homes, restaurants, and events is wasted — while many people struggle to find their next meal.
        </p>

        <p>
          We connect people who have excess food with those in need, through easy donation and request forms.
          Our volunteers ensure food is picked up on time, safely packaged, and delivered to verified recipients.
        </p>

        <p>
          You can play a crucial role — whether by donating food, becoming a delivery partner, or spreading awareness.
          Together, we can make sure everyone has enough to eat.
        </p>

        <div className="text-center mt-10">
          <a
            href="/card2"
            className="inline-block bg-yellow-400 text-white font-semibold px-6 py-2 rounded hover:bg-yellow-500 transition"
          >
            Go Back Home
          </a>
        </div>
      </div>
    </section>
    </>
  );
};

export default LearnMore;

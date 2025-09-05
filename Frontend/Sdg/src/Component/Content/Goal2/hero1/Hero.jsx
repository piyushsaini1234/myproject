import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import hunger1 from "../../../../assets/hunger_img1.png";
import hunger2 from "../../../../assets/hunger_img2.jpg";
import hunger3 from "../../../../assets/hunger_img3.jpg";
import hunger4 from "../../../../assets/hunger_img4.jpg";

const bgImages = [hunger1, hunger2, hunger3, hunger4];

function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % bgImages.length);
    }, 3000); // Rotate every 3 seconds

    return () => clearInterval(interval);
  }, []);
 
  return (
   
      <section
        className="py-20 px-6 text-center text-white bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${bgImages[currentImage]})`,
          opacity:1,
        }}
      >
        <div className=" bg-opacity-60 p-8 rounded-xl max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-300 mb-6">
            No one Sleeps Hungry
          </h2>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-8 rounded-full text-base sm:text-lg transition duration-300">
           
             <Link to="/learnMore"> Learn More</Link>
          </button>
        </div>
      </section>
    
  );
}

export default Hero;

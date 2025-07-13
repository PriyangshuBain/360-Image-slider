import React, { useState, useEffect } from 'react';
import { X, Download } from 'lucide-react';

interface CarouselItem {
  id: number;
  thumbnail: string;
  fullImage: string;
  alt: string;
}

function App() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<CarouselItem | null>(null);

  // Sample dragon images (using placeholder images from Pexels)
  const carouselItems: CarouselItem[] = [
    {
      id: 1,
      thumbnail: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=300',
      fullImage: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1600',
      alt: 'Dragon Artwork 1'
    },
    {
      id: 2,
      thumbnail: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=300',
      fullImage: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=1600',
      alt: 'Dragon Artwork 2'
    },
    {
      id: 3,
      thumbnail: 'https://images.pexels.com/photos/1068523/pexels-photo-1068523.jpeg?auto=compress&cs=tinysrgb&w=300',
      fullImage: 'https://images.pexels.com/photos/1068523/pexels-photo-1068523.jpeg?auto=compress&cs=tinysrgb&w=1600',
      alt: 'Dragon Artwork 3'
    },
    {
      id: 4,
      thumbnail: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=300',
      fullImage: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1600',
      alt: 'Dragon Artwork 4'
    },
    {
      id: 5,
      thumbnail: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=300',
      fullImage: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=1600',
      alt: 'Dragon Artwork 5'
    },
    {
      id: 6,
      thumbnail: 'https://images.pexels.com/photos/1181622/pexels-photo-1181622.jpeg?auto=compress&cs=tinysrgb&w=300',
      fullImage: 'https://images.pexels.com/photos/1181622/pexels-photo-1181622.jpeg?auto=compress&cs=tinysrgb&w=1600',
      alt: 'Dragon Artwork 6'
    },
    {
      id: 7,
      thumbnail: 'https://images.pexels.com/photos/1693095/pexels-photo-1693095.jpeg?auto=compress&cs=tinysrgb&w=300',
      fullImage: 'https://images.pexels.com/photos/1693095/pexels-photo-1693095.jpeg?auto=compress&cs=tinysrgb&w=1600',
      alt: 'Dragon Artwork 7'
    },
    {
      id: 8,
      thumbnail: 'https://images.pexels.com/photos/1738986/pexels-photo-1738986.jpeg?auto=compress&cs=tinysrgb&w=300',
      fullImage: 'https://images.pexels.com/photos/1738986/pexels-photo-1738986.jpeg?auto=compress&cs=tinysrgb&w=1600',
      alt: 'Dragon Artwork 8'
    },
    {
      id: 9,
      thumbnail: 'https://images.pexels.com/photos/1730877/pexels-photo-1730877.jpeg?auto=compress&cs=tinysrgb&w=300',
      fullImage: 'https://images.pexels.com/photos/1730877/pexels-photo-1730877.jpeg?auto=compress&cs=tinysrgb&w=1600',
      alt: 'Dragon Artwork 9'
    },
    {
      id: 10,
      thumbnail: 'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=300',
      fullImage: 'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=1600',
      alt: 'Dragon Artwork 10'
    }
  ];

  const openLightbox = (item: CarouselItem) => {
    setCurrentImage(item);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentImage(null);
    document.body.style.overflow = 'unset'; // Restore scrolling
  };

  const downloadImage = async () => {
    if (!currentImage) return;
    
    try {
      const response = await fetch(currentImage.fullImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `dragon-artwork-${currentImage.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback: open image in new tab
      window.open(currentImage.fullImage, '_blank');
    }
  };

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && lightboxOpen) {
        closeLightbox();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  return (
    <div className="min-h-screen bg-gray-300 relative overflow-hidden">
      {/* Grid background pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            repeating-linear-gradient(to right, transparent 0 100px, #25283b22 100px 101px),
            repeating-linear-gradient(to bottom, transparent 0 100px, #25283b22 100px 101px)
          `
        }}
      />

      {/* Background overlay */}
      <div 
        className="absolute top-[10%] left-1/2 transform -translate-x-1/2 w-full max-w-[1400px] h-[90%] pointer-events-none bg-contain bg-no-repeat bg-top opacity-10"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1200")'
        }}
      />

      {/* Main banner */}
      <div className="banner relative w-full h-screen text-center overflow-hidden">
        {/* 3D Carousel */}
        <div 
          className="slider absolute w-[200px] h-[250px] top-[10%] left-1/2 transform -translate-x-1/2 z-20"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'perspective(1000px)',
            animation: 'autoRun 20s linear infinite'
          }}
        >
          {carouselItems.map((item, index) => (
            <div
              key={item.id}
              className="carousel-item absolute inset-0 cursor-pointer transition-all duration-300 ease-in-out rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 hover:z-30"
              style={{
                '--position': index + 1,
                '--quantity': carouselItems.length,
                transform: `rotateY(calc((${index + 1} - 1) * (360 / ${carouselItems.length}) * 1deg)) translateZ(550px)`
              } as React.CSSProperties}
              onClick={() => openLightbox(item)}
            >
              <img
                src={item.thumbnail}
                alt={item.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="content absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[1400px] h-max pb-24 flex flex-wrap justify-between items-center z-10">
          <h1 
            className="text-[16rem] leading-none text-[#25283B] relative font-black"
            style={{ fontFamily: "'Arial Black', sans-serif" }}
          >
            CSS ONLY
            <span 
              className="absolute inset-0 text-transparent"
              style={{
                WebkitTextStroke: '2px #df1919',
                zIndex: 2
              }}
            >
              CSS ONLY
            </span>
          </h1>
          <div className="author text-right max-w-[200px] font-['Poppins',sans-serif]">
            <h2 className="text-5xl">Web Design</h2>
            <p className="font-bold"></p>
          </div>
        </div>

        {/* Model overlay */}
        <div 
          className="model absolute bottom-0 left-0 w-full h-[75vh] z-10 bg-no-repeat bg-top opacity-30"
          style={{
            backgroundImage: 'url("https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800")',
            backgroundSize: 'auto 130%',
            backgroundPosition: 'top center'
          }}
        />
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div 
          className={`fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[1000] transition-opacity duration-300 ${
            lightboxOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-8 text-white text-4xl font-bold transition-colors duration-300 hover:text-gray-300 z-[1001] cursor-pointer"
          >
            <X size={40} />
          </button>

          {/* Image */}
          {currentImage && (
            <>
              <img
                src={currentImage.fullImage}
                alt={currentImage.alt}
                className="max-w-[90%] max-h-[90vh] object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Download button */}
              <button
                onClick={downloadImage}
                className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-[#df1919] hover:bg-[#c00d0d] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-3 transition-colors duration-300 cursor-pointer z-[1001]"
              >
                <Download size={20} />
                Download Image
              </button>
            </>
          )}
        </div>
      )}

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

        @keyframes autoRun {
          from {
            transform: perspective(1000px) rotateX(-16deg) rotateY(0deg);
          }
          to {
            transform: perspective(1000px) rotateX(-16deg) rotateY(360deg);
          }
        }

        .carousel-item:hover {
          transform: rotateY(calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg)) translateZ(550px) scale(1.05) !important;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5) !important;
        }

        @media screen and (max-width: 1023px) {
          .slider {
            width: 160px !important;
            height: 200px !important;
            left: calc(50% - 80px) !important;
          }
          .carousel-item {
            transform: rotateY(calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg)) translateZ(300px) !important;
          }
          .carousel-item:hover {
            transform: rotateY(calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg)) translateZ(300px) scale(1.05) !important;
          }
          .content h1 {
            text-align: center;
            width: 100%;
            text-shadow: 0 10px 20px #000;
            font-size: 7rem !important;
          }
          .author {
            color: #fff;
            padding: 20px;
            text-shadow: 0 10px 20px #000;
            z-index: 2;
            max-width: unset;
            width: 100%;
            text-align: center;
            padding: 0 30px;
          }
        }

        @media screen and (max-width: 767px) {
          .slider {
            width: 100px !important;
            height: 150px !important;
            left: calc(50% - 50px) !important;
          }
          .carousel-item {
            transform: rotateY(calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg)) translateZ(180px) !important;
          }
          .carousel-item:hover {
            transform: rotateY(calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg)) translateZ(180px) scale(1.05) !important;
          }
          .content h1 {
            font-size: 5rem !important;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ImageZoom({ images, currentImage, onClose }) {
  // Find the current image index and use it as initial state
  const initialIndex = images.findIndex(img => img === currentImage);
  const [currentIndex, setCurrentIndex] = useState(initialIndex !== -1 ? initialIndex : 0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowLeft') {
      handlePrevious();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      onClick={onClose}
    >
      {/* Close Button */}
      <Button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white border-0 rounded-full w-12 h-12 flex items-center justify-center"
        aria-label="Close image"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </Button>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white border-0 rounded-full w-12 h-12 flex items-center justify-center"
            aria-label="Previous image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Button>

          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white border-0 rounded-full w-12 h-12 flex items-center justify-center"
            aria-label="Next image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </>
      )}

      {/* Main Image */}
      <div 
        className="relative w-full mx-4"
        style={{ maxWidth: '90vw', maxHeight: '80vh', height: '80vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[currentIndex]}
          alt={`Auction image ${currentIndex + 1}`}
          fill
          className="object-contain rounded-lg"
          priority
        />
      </div>

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2 max-w-4xl overflow-x-auto px-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                index === currentIndex 
                  ? 'border-white' 
                  : 'border-transparent hover:border-white hover:border-opacity-50'
              }`}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

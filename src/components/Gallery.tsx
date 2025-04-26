'use client';

import { useState } from 'react';

// Sample gallery images
const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    alt: 'Mountain landscape with lake',
    category: 'nature'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&w=600&q=80',
    alt: 'Futuristic architecture',
    category: 'architecture'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80',
    alt: 'Sunset over the ocean',
    category: 'nature'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=600&q=80',
    alt: 'Forest in fog',
    category: 'nature'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=600&q=80',
    alt: 'Cat portrait',
    category: 'animals'
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80',
    alt: 'Starry night mountains',
    category: 'nature'
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1486728297118-82a07bc48a28?auto=format&fit=crop&w=600&q=80',
    alt: 'Modern building interior',
    category: 'architecture'
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?auto=format&fit=crop&w=600&q=80',
    alt: 'Wolf in the wild',
    category: 'animals'
  }
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<{id: number; src: string; alt: string; category: string} | null>(null);

  const categories = ['all', 'nature', 'architecture', 'animals'];

  const filteredImages = activeCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Gallery</h2>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full transition-colors ${
                activeCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map(image => (
            <div
              key={image.id}
              className="relative group overflow-hidden rounded-lg cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white p-4">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-4xl max-h-[90vh]"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={selectedImage.src.replace('w=600', 'w=1200')}
                alt={selectedImage.alt}
                className="max-w-full max-h-[80vh] object-contain"
              />
              <div className="absolute top-0 right-0 m-4">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="bg-black/70 p-4 mt-2 rounded">
                <h3 className="text-white text-xl font-bold">{selectedImage.alt}</h3>
                <p className="text-gray-300 mt-1">Category: {selectedImage.category.charAt(0).toUpperCase() + selectedImage.category.slice(1)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

// Sample data for inspiration gallery
const inspirationData = {
  trending: [
    {
      id: 'trend1',
      title: 'Neon City',
      artist: 'Alex Chen',
      image: 'https://images.unsplash.com/photo-1569982175971-d92b01cf8694?auto=format&fit=crop&w=800&q=80',
      category: 'environments',
      likes: 1243,
    },
    {
      id: 'trend2',
      title: 'Crystal Formations',
      artist: 'Maria Rodriguez',
      image: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&w=800&q=80',
      category: 'abstract',
      likes: 982,
    },
    {
      id: 'trend3',
      title: 'Mechanical Heart',
      artist: 'James Wilson',
      image: 'https://images.unsplash.com/photo-1624397640148-949b1732bb0a?auto=format&fit=crop&w=800&q=80',
      category: 'mechanical',
      likes: 876,
    },
    {
      id: 'trend4',
      title: 'Forest Guardian',
      artist: 'Sophia Lee',
      image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&w=800&q=80',
      category: 'characters',
      likes: 754,
    },
  ],
  featured: {
    artist: {
      name: 'Elena Petrova',
      bio: 'Digital sculptor and 3D environment artist with over 10 years of experience in the gaming industry. Known for hyper-realistic natural environments and innovative lighting techniques.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      portfolio: 'https://example.com/elena',
    },
    works: [
      {
        id: 'feat1',
        title: 'Ancient Temple',
        image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=800&q=80',
        category: 'environments',
        description: 'Detailed recreation of an ancient temple with dynamic lighting and weathering effects.',
      },
      {
        id: 'feat2',
        title: 'Ocean Depths',
        image: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&w=800&q=80',
        category: 'environments',
        description: 'Underwater scene with procedurally generated coral formations and realistic water caustics.',
      },
      {
        id: 'feat3',
        title: 'Mountain Pass',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
        category: 'environments',
        description: 'High-altitude mountain environment with dynamic weather system and volumetric clouds.',
      },
    ],
  },
  categories: [
    {
      id: 'environments',
      name: 'Environments',
      count: 243,
      image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'characters',
      name: 'Characters',
      count: 187,
      image: 'https://images.unsplash.com/photo-1560850038-f95de6e715b3?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'abstract',
      name: 'Abstract',
      count: 156,
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'mechanical',
      name: 'Mechanical',
      count: 129,
      image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'scifi',
      name: 'Sci-Fi',
      count: 112,
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'vehicles',
      name: 'Vehicles',
      count: 98,
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    },
  ],
  collections: [
    {
      id: 'coll1',
      title: 'Futuristic Architecture',
      curator: 'Design Collective',
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80',
      itemCount: 24,
    },
    {
      id: 'coll2',
      title: 'Organic Forms',
      curator: 'Nature Institute',
      image: 'https://images.unsplash.com/photo-1550184658-ff6132a71714?auto=format&fit=crop&w=800&q=80',
      itemCount: 18,
    },
    {
      id: 'coll3',
      title: 'Retro Gaming',
      curator: 'Pixel Pioneers',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
      itemCount: 32,
    },
  ],
};

// Card component for trending items
function TrendingCard({ item }: { item: typeof inspirationData.trending[0] }) {
  return (
    <motion.div 
      className="relative group overflow-hidden rounded-xl"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="aspect-w-1 aspect-h-1 w-full">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="text-xl font-bold">{item.title}</h3>
        <p className="text-sm text-gray-300">by {item.artist}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs px-2 py-1 bg-blue-600 rounded-full">{item.category}</span>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <span className="ml-1 text-sm">{item.likes}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Category card component
function CategoryCard({ category }: { category: typeof inspirationData.categories[0] }) {
  return (
    <motion.div 
      className="relative overflow-hidden rounded-xl h-40"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <img 
        src={category.image} 
        alt={category.name} 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="text-xl font-bold">{category.name}</h3>
        <p className="text-sm">{category.count} models</p>
      </div>
    </motion.div>
  );
}

// Collection card component
function CollectionCard({ collection }: { collection: typeof inspirationData.collections[0] }) {
  return (
    <motion.div 
      className="bg-gray-800 rounded-xl overflow-hidden"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="aspect-w-16 aspect-h-9">
        <img 
          src={collection.image} 
          alt={collection.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-white">{collection.title}</h3>
        <p className="text-sm text-gray-300">Curated by {collection.curator}</p>
        <p className="text-xs text-gray-400 mt-2">{collection.itemCount} items</p>
      </div>
    </motion.div>
  );
}

// Featured artist component
function FeaturedArtist({ featured }: { featured: typeof inspirationData.featured }) {
  return (
    <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl overflow-hidden">
      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <div className="relative w-32 h-32 mx-auto md:mx-0">
            <img 
              src={featured.artist.avatar} 
              alt={featured.artist.name} 
              className="w-full h-full object-cover rounded-full border-4 border-white/20"
            />
            <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
              Featured
            </div>
          </div>
          <div className="mt-4 text-center md:text-left">
            <h3 className="text-2xl font-bold text-white">{featured.artist.name}</h3>
            <a 
              href={featured.artist.portfolio} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block mt-2 text-blue-300 hover:text-blue-100 transition-colors"
            >
              View Portfolio →
            </a>
          </div>
        </div>
        
        <div className="md:w-2/3">
          <p className="text-gray-300 mb-6">{featured.artist.bio}</p>
          
          <h4 className="text-white font-semibold mb-4">Featured Works</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {featured.works.map((work) => (
              <div key={work.id} className="relative overflow-hidden rounded-lg group">
                <img 
                  src={work.image} 
                  alt={work.title} 
                  className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-2 text-white transform translate-y-full group-hover:translate-y-0 transition-transform">
                  <h5 className="text-sm font-bold">{work.title}</h5>
                  <p className="text-xs text-gray-300 line-clamp-2">{work.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Filter tabs component
function FilterTabs({ activeFilter, setActiveFilter }: { 
  activeFilter: string; 
  setActiveFilter: (filter: string) => void;
}) {
  const filters = ['All', 'Trending', 'Featured', 'New'];
  
  return (
    <div className="flex overflow-x-auto space-x-2 pb-2 mb-6">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
            activeFilter === filter
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          onClick={() => setActiveFilter(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default function InspirationPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-24 pb-16">
        {/* Hero section */}
        <section className="relative h-80 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&w=2000&q=80" 
              alt="3D inspiration" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Inspiration Gallery
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Discover exceptional 3D artwork from talented artists around the world. 
              Get inspired and elevate your own creative projects.
            </motion.p>
          </div>
        </section>
        
        <div className="container mx-auto px-4 mt-12">
          {/* Loading state */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              {/* Filter tabs */}
              <FilterTabs activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
              
              {/* Trending section */}
              <section className="mb-16">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Trending Now</h2>
                  <Link href="/inspiration/trending" className="text-blue-400 hover:text-blue-300 transition-colors">
                    View all →
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {inspirationData.trending.map((item) => (
                    <TrendingCard key={item.id} item={item} />
                  ))}
                </div>
              </section>
              
              {/* Featured artist section */}
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-white mb-6">Featured Artist</h2>
                <FeaturedArtist featured={inspirationData.featured} />
              </section>
              
              {/* Categories section */}
              <section className="mb-16">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Browse Categories</h2>
                  <Link href="/inspiration/categories" className="text-blue-400 hover:text-blue-300 transition-colors">
                    View all →
                  </Link>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {inspirationData.categories.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                  ))}
                </div>
              </section>
              
              {/* Collections section */}
              <section className="mb-16">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Curated Collections</h2>
                  <Link href="/inspiration/collections" className="text-blue-400 hover:text-blue-300 transition-colors">
                    View all →
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {inspirationData.collections.map((collection) => (
                    <CollectionCard key={collection.id} collection={collection} />
                  ))}
                </div>
              </section>
              
              {/* Call to action */}
              <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to showcase your work?</h2>
                <p className="text-white/80 max-w-2xl mx-auto mb-6">
                  Join our community of 3D artists and share your creations with the world.
                  Get feedback, find inspiration, and connect with other creators.
                </p>
                <button className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-full transition-colors">
                  Submit Your Work
                </button>
              </section>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
}

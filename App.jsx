import React, { useState, useEffect } from 'react';
import { Camera, X, Menu, Mail, ExternalLink, ChevronRight, ChevronLeft } from 'lucide-react';

const InstagramIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const TwitterIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

/* =============================================================================
  HOW TO USE GOOGLE DRIVE PHOTOS:
  1. Upload your photo to Google Drive.
  2. Right-click the photo -> "Share" -> Change access to "Anyone with the link".
  3. Copy the link. It will look like this: 
     https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing
  4. Extract the "YOUR_FILE_ID" part.
  5. Use this format for the url below:
     https://drive.google.com/uc?export=view&id=YOUR_FILE_ID
  =============================================================================
*/

const MOCK_PHOTOS = [
  { id: 1, url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80', title: 'Urban Geometry', category: 'Architecture' },
  { id: 2, url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80', title: 'Neon Nights', category: 'Street' },
  { id: 3, url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80', title: 'Morning Mist', category: 'Nature' },
  { id: 4, url: 'https://images.unsplash.com/photo-1506744626753-1fa4454ca334?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80', title: 'Valley of Shadows', category: 'Landscape' },
  { id: 5, url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80', title: 'Monochrome Portrait', category: 'Portrait' },
  { id: 6, url: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80', title: 'Brutalism', category: 'Architecture' },
  { id: 7, url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80', title: 'Minimalist Interior', category: 'Interior' },
  { id: 8, url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80', title: 'Foggy Horizon', category: 'Nature' },
  { id: 9, url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80', title: 'The Gaze', category: 'Portrait' },
  { id: 10, url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80', title: 'Glass & Steel', category: 'Architecture' },
  { id: 11, url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80', title: 'Aqua Reflection', category: 'Landscape' },
  { id: 12, url: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80', title: 'Alpine Serenity', category: 'Nature' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('work');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(MOCK_PHOTOS.map(p => p.category))];
  const filteredPhotos = selectedCategory === 'All' 
    ? MOCK_PHOTOS 
    : MOCK_PHOTOS.filter(p => p.category === selectedCategory);

  // Handle keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') showNextImage();
      if (e.key === 'ArrowLeft') showPrevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const showNextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % filteredPhotos.length);
  };

  const showPrevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 font-sans selection:bg-black selection:text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-40 top-0 bg-[#fafafa]/90 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('work')}>
            <Camera className="w-6 h-6 stroke-[1.5]" />
            <span className="text-xl tracking-tighter font-semibold uppercase">Studio<span className="text-zinc-400">Lens</span></span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 text-sm font-medium tracking-widest uppercase">
            {['work', 'about', 'contact'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative py-2 transition-colors duration-300 ${
                  activeTab === tab ? 'text-black' : 'text-zinc-400 hover:text-black'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black animate-in slide-in-from-left duration-300" />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-[#fafafa] border-b border-zinc-200 px-6 py-8 flex flex-col gap-6 shadow-xl">
            {['work', 'about', 'contact'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setMobileMenuOpen(false);
                }}
                className={`text-2xl font-light tracking-widest uppercase text-left ${
                  activeTab === tab ? 'text-black font-medium' : 'text-zinc-400'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="pt-28 pb-20 px-6 max-w-7xl mx-auto min-h-[85vh]">
        
        {/* WORK / GALLERY VIEW */}
        {activeTab === 'work' && (
          <div className="animate-in fade-in duration-700">
            <header className="mb-16 md:mb-24 mt-8 md:mt-16 max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-light tracking-tighter leading-tight mb-6">
                Capturing light, <br className="hidden md:block"/>space, and time.
              </h1>
              <p className="text-lg md:text-xl text-zinc-500 font-light leading-relaxed">
                A contemporary collection of visual stories. Selected works spanning architecture, nature, and human subjects.
              </p>
            </header>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-6 mb-12 border-b border-zinc-200 pb-4">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`text-sm uppercase tracking-widest transition-all duration-300 pb-4 -mb-[17px] border-b-2 ${
                    selectedCategory === category ? 'border-black text-black' : 'border-transparent text-zinc-400 hover:text-black'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Masonry Layout using CSS Columns */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {filteredPhotos.map((photo, idx) => (
                <div 
                  key={photo.id} 
                  className="break-inside-avoid relative group cursor-pointer overflow-hidden bg-zinc-100"
                  onClick={() => setLightboxIndex(idx)}
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay Info on Hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <span className="text-white/80 text-xs uppercase tracking-widest mb-1">{photo.category}</span>
                    <h3 className="text-white text-xl font-medium tracking-tight">{photo.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ABOUT VIEW */}
        {activeTab === 'about' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl mx-auto mt-12 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="aspect-[3/4] bg-zinc-200 overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1554046920-90dcac824b45?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Photographer Portrait" 
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-light tracking-tighter mb-8">The Observer</h2>
              <div className="space-y-6 text-zinc-600 font-light text-lg leading-relaxed">
                <p>
                  I am a visual artist and photographer specializing in structural minimalism and environmental portraiture. My work explores the intersection of human design and natural landscapes.
                </p>
                <p>
                  Based in the city, but constantly moving. Every frame is an attempt to distill chaos into a moment of perfect, balanced silence.
                </p>
                <div className="pt-8 border-t border-zinc-200 mt-8">
                  <p className="text-black uppercase tracking-widest text-sm font-medium mb-4">Exhibitions & Awards</p>
                  <ul className="space-y-3 text-sm">
                    <li className="flex justify-between"><span>Contemporary Visions</span> <span className="text-zinc-400">2025</span></li>
                    <li className="flex justify-between"><span>LensCulture Street Awards</span> <span className="text-zinc-400">2024</span></li>
                    <li className="flex justify-between"><span>Minimalist Photography Guild</span> <span className="text-zinc-400">2023</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONTACT VIEW */}
        {activeTab === 'contact' && (
          <div className="animate-in fade-in duration-700 max-w-2xl mx-auto mt-12 md:mt-32 text-center">
            <h2 className="text-5xl md:text-7xl font-light tracking-tighter mb-8">Let's Connect</h2>
            <p className="text-xl text-zinc-500 font-light mb-16">
              Available for commissions, exhibitions, and collaborative projects worldwide.
            </p>
            
            <a href="mailto:hello@studiolens.com" className="inline-flex items-center gap-3 text-2xl md:text-4xl border-b-2 border-black pb-2 hover:text-zinc-500 hover:border-zinc-500 transition-colors duration-300">
              hello@studiolens.com <ExternalLink className="w-6 h-6 md:w-8 md:h-8" />
            </a>

            <div className="flex justify-center gap-8 mt-24">
              <a href="#" className="p-4 bg-zinc-100 rounded-full hover:bg-black hover:text-white transition-all duration-300">
                <InstagramIcon className="w-6 h-6" />
              </a>
              <a href="#" className="p-4 bg-zinc-100 rounded-full hover:bg-black hover:text-white transition-all duration-300">
                <TwitterIcon className="w-6 h-6" />
              </a>
              <a href="#" className="p-4 bg-zinc-100 rounded-full hover:bg-black hover:text-white transition-all duration-300">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between text-xs uppercase tracking-widest text-zinc-400">
          <p>&copy; {new Date().getFullYear()} StudioLens. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Powered by Vision</p>
        </div>
      </footer>

      {/* FULLSCREEN LIGHTBOX */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-in fade-in duration-300 backdrop-blur-xl">
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50 p-2"
            onClick={() => setLightboxIndex(null)}
          >
            <X className="w-8 h-8 stroke-[1.5]" />
          </button>

          {/* Navigation Buttons */}
          <button 
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50 p-4"
            onClick={(e) => { e.stopPropagation(); showPrevImage(); }}
          >
            <ChevronLeft className="w-10 h-10 stroke-1" />
          </button>
          
          <button 
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50 p-4"
            onClick={(e) => { e.stopPropagation(); showNextImage(); }}
          >
            <ChevronRight className="w-10 h-10 stroke-1" />
          </button>

          {/* Image Container */}
          <div 
            className="w-full h-full flex flex-col items-center justify-center p-4 md:p-12"
            onClick={() => setLightboxIndex(null)} // Click outside to close
          >
            <img 
              src={filteredPhotos[lightboxIndex].url} 
              alt={filteredPhotos[lightboxIndex].title}
              className="max-w-full max-h-[85vh] object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
            />
            
            {/* Image Metadata */}
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-white" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-2xl md:text-3xl font-light tracking-tight">{filteredPhotos[lightboxIndex].title}</h3>
              <p className="text-white/50 text-sm uppercase tracking-widest mt-2">{filteredPhotos[lightboxIndex].category}</p>
            </div>
            
            {/* Image Counter */}
            <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-white/50 text-sm font-light tracking-widest">
              {lightboxIndex + 1} / {filteredPhotos.length}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}


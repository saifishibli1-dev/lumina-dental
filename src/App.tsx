/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { PageId, TreatmentItem } from './types';
import { TREATMENTS } from './data/clinicData';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileBottomBar from './components/MobileBottomBar';
import ScrollProgress from './components/ScrollProgress';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import TreatmentsPage from './pages/TreatmentsPage';
import TreatmentDetailPage from './pages/TreatmentDetailPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import BookAppointmentPage from './pages/BookAppointmentPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedTreatment, setSelectedTreatment] = useState<TreatmentItem>(TREATMENTS[0]);
  const [preselectedTreatmentTitle, setPreselectedTreatmentTitle] = useState<string>('');

  // Synchronize hash in URL for smooth back/forward browser navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = [
        'home',
        'about',
        'treatments',
        'treatment-details',
        'gallery',
        'contact',
        'book-appointment',
      ];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTreatment = (treatment: TreatmentItem) => {
    setSelectedTreatment(treatment);
  };

  const handlePreselectTreatmentForBooking = (title: string) => {
    setPreselectedTreatmentTitle(title);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBFD] text-slate-800 font-sans">
      {/* Scroll Progress Bar at the top */}
      <ScrollProgress />

      {/* Sticky Header with 3-zone contract */}
      <Header currentPage={currentPage} onNavigate={navigateTo} />

      {/* Main Content Area */}
      <main className="grow">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onSelectTreatment={handleSelectTreatment}
            onPreselectTreatmentForBooking={handlePreselectTreatmentForBooking}
          />
        )}

        {currentPage === 'about' && <AboutPage onNavigate={navigateTo} />}

        {currentPage === 'treatments' && (
          <TreatmentsPage
            onNavigate={navigateTo}
            onSelectTreatment={handleSelectTreatment}
            onPreselectTreatmentForBooking={handlePreselectTreatmentForBooking}
          />
        )}

        {currentPage === 'treatment-details' && (
          <TreatmentDetailPage
            treatment={selectedTreatment}
            onNavigate={navigateTo}
            onSelectTreatment={handleSelectTreatment}
            onPreselectTreatmentForBooking={handlePreselectTreatmentForBooking}
          />
        )}

        {currentPage === 'gallery' && <GalleryPage onNavigate={navigateTo} />}

        {currentPage === 'contact' && <ContactPage onNavigate={navigateTo} />}

        {currentPage === 'book-appointment' && (
          <BookAppointmentPage
            onNavigate={navigateTo}
            preselectedTreatment={preselectedTreatmentTitle}
          />
        )}
      </main>

      {/* High-end quiet Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Mobile Sticky Bottom CTA (<15% height) */}
      <MobileBottomBar onNavigate={navigateTo} />
    </div>
  );
}

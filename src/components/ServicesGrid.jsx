// src/components/ServicesGrid.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery, setAiAnswer, setAiLoading, clearAiAnswer } from '../store/servicesSlice';
import { askGeminiAssistant } from '../services/geminiService';
import { UserCheck, FileText, Landmark, ArrowUpRight } from 'lucide-react';

const servicesList = [
  {
    id: 'cnic',
    title: 'Citizen Identity & CNIC',
    prompt: 'How do I apply for a new CNIC, update family registration, or get a birth certificate online?',
    tag: 'Popular',
    icon: UserCheck,
    description: 'Apply for new identity card, updates, family registration, and birth certificates.'
  },
  {
    id: 'passport',
    title: 'Passport & Immigration',
    prompt: 'How can I renew my passport, track visa status, and book an online appointment schedule?',
    tag: 'Essential',
    icon: FileText,
    description: 'Renew passports, track visa status, and book appointment schedules online.'
  },
  {
    id: 'tax',
    title: 'Tax & Revenue Portal',
    prompt: 'What are the steps to file income tax returns and verify active taxpayer list (ATL) status?',
    tag: null,
    icon: Landmark,
    description: 'File income tax returns, verify active taxpayer list (ATL), and make online payments.'
  }
];

export default function ServicesGrid() {
  const dispatch = useDispatch();

  const handleCardClick = async (service) => {
    // 1. Search Bar me service title/query set karein
    dispatch(setSearchQuery(service.title));
    
    // 2. Smooth Scroll to Hero Search Bar
    const searchElement = document.getElementById('hero-search-input');
    if (searchElement) {
      searchElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // 3. Trigger AI Loading & Fetch
    dispatch(setAiLoading(true));
    dispatch(clearAiAnswer());

    const response = await askGeminiAssistant(service.prompt);

    dispatch(setAiAnswer(response));
    dispatch(setAiLoading(false));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {servicesList.map((service) => {
          const IconComponent = service.icon;

          return (
            <div
              key={service.id}
              onClick={() => handleCardClick(service)}
              className="cursor-pointer border border-slate-800 p-6 rounded-2xl bg-slate-900/60 transition-all duration-200 hover:border-blue-500 hover:shadow-lg flex flex-col justify-between group"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="p-3 bg-blue-600/10 text-blue-400 rounded-xl border border-blue-500/20">
                    <IconComponent size={22} />
                  </div>
                  {service.tag && (
                    <span className="text-[11px] font-semibold bg-slate-800 text-blue-300 px-2.5 py-1 rounded-full border border-slate-700">
                      {service.tag}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">{service.description}</p>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300 border-t border-slate-800/80 pt-4 font-semibold">
                <span>Access Service</span>
                <ArrowUpRight size={16} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
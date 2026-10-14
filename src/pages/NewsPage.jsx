// src/pages/NewsPage.jsx
import React, { useEffect, useState } from 'react';
import { fetchAINews } from '../services/newsServices';
import { Bell, RefreshCw, Calendar, Building2, Tag, AlertCircle } from 'lucide-react';

export default function NewsPage() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAINews();
      setNewsList(data);
    } catch (err) {
      setError("Gemini API call failed. Check your API key or endpoint rate limits.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Bell size={16} />
            <span>Live AI Generated Alerts</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">News & Public Announcements</h1>
          <p className="text-slate-400 text-sm mt-1">
            Real-time public news fetched directly from Gemini AI on every request.
          </p>
        </div>

        <button
          onClick={loadNews}
          disabled={loading}
          className="self-start sm:self-auto flex items-center gap-2 bg-slate-900 border border-slate-700 hover:border-blue-500 text-slate-200 text-xs font-medium px-4 py-2.5 rounded-xl transition-all disabled:opacity-50 hover:text-white"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin text-blue-400' : ''} />
          <span>Generate New News</span>
        </button>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-400 text-xs">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="p-6 bg-slate-900/40 border border-slate-800/80 rounded-2xl animate-pulse">
              <div className="h-4 bg-slate-800 rounded w-1/4 mb-4"></div>
              <div className="h-6 bg-slate-800 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-slate-800 rounded w-full mb-2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {newsList.map((item, index) => (
            <div
              key={item.id || index}
              className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl hover:border-blue-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-full border border-blue-500/20">
                    <Tag size={12} />
                    {item.category || 'General'}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400 text-xs">
                    <Calendar size={12} />
                    {item.date || 'Today'}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 leading-snug">{item.title}</h3>
                <p className="text-slate-300 text-xs leading-relaxed mb-6">{item.summary}</p>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
                <Building2 size={14} className="text-slate-500" />
                <span>{item.department || 'Ministry of Public Services'}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
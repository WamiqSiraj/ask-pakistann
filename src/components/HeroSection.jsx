import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowUp, ArrowRight, LoaderCircle, X, ExternalLink, Sparkles } from 'lucide-react';
import { setSearchQuery, setAiAnswer, setAiLoading, clearAiAnswer } from '../store/servicesSlice';
import { askGeminiAssistant } from '../services/geminiService';
const examples = [
    'How do I renew my CNIC?',
    'How do I apply for a Pakistani passport?',
    'How can I check my FBR tax filer status?',
    'How do I register a new business?',
    'Where can I find government jobs?',
    'How do I get a domicile certificate?',
    'How do I verify my driving licence?',
    'How do I apply for a birth certificate?'
];
export default function HeroSection() {
    const dispatch = useDispatch(); const { searchQuery, aiAnswer, aiLoading } = useSelector(s => s.services);
    const [lastQuestion, setLastQuestion] = useState('');
    const submit = async (q) => { const question = (q ?? searchQuery).trim(); if (!question || aiLoading) return; dispatch(setSearchQuery(question)); setLastQuestion(question); dispatch(clearAiAnswer()); dispatch(setAiLoading(true)); try { dispatch(setAiAnswer(await askGeminiAssistant(question))) } catch { dispatch(setAiAnswer('The assistant is unavailable right now. Please try again later.')) } finally { dispatch(setAiLoading(false)) } };
    return <section className="ap-hero"><div className="ap-container ap-hero-inner"><div className="ap-hero-art" aria-hidden="true"><span>✳</span><span>✳</span><span>✳</span></div>
        <div className="ap-eyebrow"><span className="ap-eyebrow-dot" /> YOUR GUIDE TO PUBLIC SERVICES</div>
        <h1>Hello, <em>Pakistan.</em></h1><p className="ap-subhead">Whatever you need from public services,<br className="ap-desktop-break" /> start here.</p>
        <form className="ap-search" onSubmit={e => { e.preventDefault(); submit() }}><label htmlFor="ask-question">Describe what you need</label><div className="ap-search-line"><textarea id="ask-question" rows="2" value={searchQuery} onChange={e => dispatch(setSearchQuery(e.target.value))} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit() } }} placeholder="Ask a question about services in Pakistan..." /><button disabled={aiLoading || !searchQuery.trim()} type="submit" title="Ask question" aria-label="Ask question">{aiLoading ? <LoaderCircle className="ap-spin" size={22} /> : <ArrowUp size={23} />}</button></div><div className="ap-search-note">No account required · Avoid entering sensitive personal information</div></form>
        <div className="ap-examples"><div className="ap-examples-header">Not sure where to start? <span>Try a question</span></div><div className="ap-example-list">{examples.map((q, i) => <button key={q} onClick={() => submit(q)} disabled={aiLoading}><span className="ap-example-number">{String(i + 1).padStart(2, '0')}</span><span>{q}</span><ArrowRight size={17} /></button>)}</div></div>
        {(aiLoading || aiAnswer) && <div className="ap-response" role="status" aria-live="polite"><div className="ap-response-title"><span><Sparkles size={18} /> Guidance for your question</span><button onClick={() => dispatch(clearAiAnswer())} aria-label="Dismiss answer"><X size={18} /></button></div>{lastQuestion && <h3>{lastQuestion}</h3>}{aiLoading ? <p><LoaderCircle className="ap-spin ap-inline" size={18} /> Preparing guidance...</p> : <div className="ap-response-text">{aiAnswer}</div>}<div className="ap-answer-warning">AI-generated guidance may be inaccurate or outdated. Check the responsible authority's official website before acting or making payments.</div><a href="https://www.pakistan.gov.pk/" target="_blank" rel="noopener noreferrer" className="ap-official-link">Visit Pakistan's government portal <ExternalLink size={14} /></a></div>}
    </div></section>
}
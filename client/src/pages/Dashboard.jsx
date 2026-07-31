import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import api from '../utils/api';
import { ClipboardDocumentIcon, CheckIcon, SparklesIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

const glass = {
    background: 'rgba(15,23,42,0.75)',
    border: '1px solid rgba(255,255,255,0.08)',
    backdropFilter: 'blur(18px)',
};

const gradientBtn = {
    background: 'linear-gradient(90deg, #4F7CFF, #8B5CF6, #D946EF)',
    boxShadow: '0 8px 32px -6px rgba(139,92,246,0.5)',
};

const Dashboard = () => {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [copied, setCopied] = useState('');

    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setLoading(true);
        try {
            const { data } = await api.post('/ai/generate-email', { prompt });
            setResult(data);
            toast.success('Successfully generated!');
        } catch (error) {
            toast.error('Failed to generate. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        toast.success('Copied to clipboard!');
        setTimeout(() => setCopied(''), 2000);
    };

    const ResultCard = ({ title, content, type }) => (
        <div
            className="rounded-2xl p-6 mb-4 transition-all duration-300 hover:-translate-y-0.5"
            style={glass}
        >
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-white text-sm">{title}</h3>
                <button
                    onClick={() => copyToClipboard(content, type)}
                    className="text-[#B6C2E2] hover:text-[#4F7CFF] transition-colors"
                    title="Copy"
                >
                    {copied === type ? (
                        <CheckIcon className="w-5 h-5 text-emerald-400" />
                    ) : (
                        <ClipboardDocumentIcon className="w-5 h-5" />
                    )}
                </button>
            </div>
            <p className="text-sm text-[#B6C2E2] leading-relaxed whitespace-pre-wrap">{content}</p>
        </div>
    );

    return (
        <div className="relative min-h-screen bg-[#050816] font-sans text-white overflow-hidden">
            {/* ---------- Background layers ---------- */}
            <div
                className="pointer-events-none fixed inset-0 -z-30"
                style={{
                    background:
                        'radial-gradient(ellipse 80% 60% at 50% -10%, #121631 0%, #090B1F 45%, #050816 100%)',
                }}
            />
            <div
                className="pointer-events-none fixed -top-40 left-1/4 -z-20 h-[38rem] w-[38rem] rounded-full opacity-30 blur-[120px]"
                style={{ background: 'radial-gradient(circle, #4F7CFF 0%, transparent 70%)' }}
            />
            <div
                className="pointer-events-none fixed -top-20 right-0 -z-20 h-[34rem] w-[34rem] rounded-full opacity-20 blur-[130px]"
                style={{ background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)' }}
            />
            <div
                className="pointer-events-none fixed inset-0 -z-10 opacity-[0.04]"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
                    backgroundSize: '64px 64px',
                    maskImage: 'radial-gradient(ellipse 70% 60% at 50% 20%, black 40%, transparent 90%)',
                }}
            />

            {/* ---------- Content ---------- */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10 py-10">
                <div className="flex items-center gap-3 mb-10">
                    <img src="/logo.png" alt="MailForge AI" className="h-11 w-11 rounded-xl object-cover" />
                    <span className="text-lg font-semibold tracking-tight">
                        MailForge <span className="text-[#4F7CFF]">AI</span>
                    </span>
                </div>
                <div className="mb-8">
                    <div
                        className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-[#B6C2E2] mb-4"
                        style={glass}
                    >
                        <SparklesIcon className="h-3.5 w-3.5 text-[#8B5CF6]" />
                        AI Outreach Studio
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        New{' '}
                        <span
                            className="bg-clip-text text-transparent"
                            style={{ backgroundImage: 'linear-gradient(90deg, #4F7CFF, #8B5CF6)' }}
                        >
                            Campaign
                        </span>
                    </h1>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Input Section */}
                    <div
                        className="w-full lg:w-1/3 rounded-[24px] p-6 flex flex-col"
                        style={glass}
                    >
                        <h2 className="text-sm font-semibold text-white mb-4">Prospect Context</h2>
                        <form onSubmit={handleGenerate} className="flex-1 flex flex-col">
                            <label className="text-xs font-medium text-[#B6C2E2] mb-2">Context / Prompt</label>
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                className="flex-1 w-full rounded-xl p-3.5 text-sm text-white placeholder:text-[#B6C2E2]/40 resize-none outline-none transition-shadow focus:ring-2 focus:ring-[#4F7CFF]/50"
                                style={{
                                    background: 'rgba(5,8,22,0.5)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    minHeight: '220px',
                                }}
                                placeholder="Tell us about your prospect, company, role, and what you want to offer. Mailforge AI will write a personalized email, follow-up, and LinkedIn DM for you..."
                            />
                            <button
                                type="submit"
                                disabled={loading || !prompt.trim()}
                                className="mt-4 w-full text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:scale-[1.02]"
                                style={gradientBtn}
                            >
                                {loading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Generating...
                                    </span>
                                ) : (
                                    <>
                                        <PaperAirplaneIcon className="h-4 w-4" />
                                        Generate Output
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Output Section */}
                    <div className="w-full lg:w-2/3 flex flex-col">
                        {result ? (
                            <div>
                                <h2 className="text-sm font-semibold text-white mb-4">AI Results</h2>
                                <ResultCard title="Subject Line" content={result.subject} type="subject" />
                                <ResultCard title="Cold Email" content={result.emailBody} type="email" />
                                <ResultCard title="LinkedIn DM" content={result.LinkedInDM || result.linkedInDM || ''} type="linkedin" />
                                <ResultCard title="Follow-up Email" content={result.followUpEmail} type="followup" />
                            </div>
                        ) : (
                            <div
                                className="flex-1 flex flex-col items-center justify-center text-center rounded-[24px] py-20"
                                style={glass}
                            >
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(79,124,255,0.15), rgba(139,92,246,0.15))',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                    }}
                                >
                                    <ClipboardDocumentIcon className="w-8 h-8 text-[#4F7CFF]" />
                                </div>
                                <p className="text-sm text-[#B6C2E2]">Add your prospect details and let Mailforge AI create your complete outreach sequence.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
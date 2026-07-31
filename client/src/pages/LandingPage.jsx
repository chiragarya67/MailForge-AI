import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    ArrowRightIcon,
    PlayIcon,
    SparklesIcon,
    PaperAirplaneIcon,
    EnvelopeIcon,
    ClockIcon,
    BoltIcon,
    ChartBarIcon,
    DocumentTextIcon,
} from '@heroicons/react/24/outline';

const LandingPage = () => {
    const { user } = useAuth();

    const pills = ['Personalized', 'AI Powered', 'Multi Channel', 'No Credit Card'];

    const features = [
        {
            name: 'Lightning Fast Generation',
            description: 'Generate highly custom cold emails in seconds using state-of-the-art AI.',
            icon: BoltIcon,
        },
        {
            name: 'Omnichannel Outreach',
            description: 'Get an email, a follow-up, and a LinkedIn DM perfectly synced for your prospect.',
            icon: DocumentTextIcon,
        },
        {
            name: 'Higher Conversion Rates',
            description: 'Personalized copy ensures higher open rates and better reply outcomes.',
            icon: ChartBarIcon,
        },
    ];

    const glass = {
        background: 'rgba(15,23,42,0.75)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(18px)',
    };

    const gradientBtn = {
        background: 'linear-gradient(90deg, #4F7CFF, #8B5CF6, #D946EF)',
        boxShadow: '0 8px 32px -6px rgba(139,92,246,0.5)',
    };

    return (
        <div className="relative min-h-screen bg-[#050816] font-sans text-white overflow-hidden">
            {/* ---------- Global background layers ---------- */}
            <div
                className="pointer-events-none fixed inset-0 -z-30"
                style={{
                    background:
                        'radial-gradient(ellipse 80% 60% at 50% -10%, #121631 0%, #090B1F 45%, #050816 100%)',
                }}
            />
            <div
                className="pointer-events-none fixed -top-40 left-1/4 -z-20 h-[38rem] w-[38rem] rounded-full opacity-40 blur-[120px]"
                style={{ background: 'radial-gradient(circle, #4F7CFF 0%, transparent 70%)' }}
            />
            <div
                className="pointer-events-none fixed -top-20 right-0 -z-20 h-[34rem] w-[34rem] rounded-full opacity-30 blur-[130px]"
                style={{ background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)' }}
            />
            <div
                className="pointer-events-none fixed top-[60%] left-1/2 -z-20 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full opacity-20 blur-[140px]"
                style={{ background: 'radial-gradient(circle, #D946EF 0%, transparent 70%)' }}
            />
            <div
                className="pointer-events-none fixed inset-0 -z-10 opacity-[0.05]"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
                    backgroundSize: '64px 64px',
                    maskImage: 'radial-gradient(ellipse 70% 60% at 50% 20%, black 40%, transparent 90%)',
                }}
            />
            <div className="pointer-events-none fixed inset-0 -z-10">
                {[
                    { top: '18%', left: '8%', size: 3, delay: '0s' },
                    { top: '30%', left: '92%', size: 2, delay: '0.6s' },
                    { top: '65%', left: '5%', size: 2, delay: '1.2s' },
                    { top: '78%', left: '85%', size: 3, delay: '0.3s' },
                    { top: '10%', left: '55%', size: 2, delay: '0.9s' },
                    { top: '48%', left: '78%', size: 2, delay: '1.5s' },
                ].map((p, i) => (
                    <span
                        key={i}
                        className="absolute rounded-full bg-white/70 animate-pulse"
                        style={{
                            top: p.top,
                            left: p.left,
                            width: p.size,
                            height: p.size,
                            animationDelay: p.delay,
                            animationDuration: '3s',
                            boxShadow: '0 0 8px 2px rgba(255,255,255,0.5)',
                        }}
                    />
                ))}
            </div>

            {/* ---------- Navbar ---------- */}
            <nav className="relative z-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center gap-2">
                            <div
                                className="flex h-8 w-8 items-center justify-center rounded-lg"
                                style={{ background: 'linear-gradient(135deg, #4F7CFF, #8B5CF6)' }}
                            >
                                <img src="/logo.png" alt="MailForge AI" className="h-8 w-8 rounded-lg object-cover" />
                            </div>
                            <span className="text-lg font-semibold tracking-tight">
                                MailForge <span className="text-[#4F7CFF]">AI</span>
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            {user ? (
                                <Link
                                    to="/dashboard"
                                    className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:scale-[1.03]"
                                    style={{ ...gradientBtn, boxShadow: '0 0 24px rgba(139,92,246,0.35)' }}
                                >
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="rounded-full px-4 py-2 text-sm font-medium text-[#B6C2E2] transition-colors hover:text-white"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:scale-[1.03]"
                                        style={{ ...gradientBtn, boxShadow: '0 0 24px rgba(139,92,246,0.35)' }}
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* ---------- Hero ---------- */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-14 pb-24 lg:pt-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div
                            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-[#B6C2E2] mb-8"
                            style={glass}
                        >
                            <SparklesIcon className="h-3.5 w-3.5 text-[#8B5CF6]" />
                            AI-Powered Cold Email Generator
                        </div>

                        <h1 className="text-5xl md:text-6xl xl:text-[3.85rem] font-bold tracking-tight leading-[1.08] mb-7">
                            Write Cold Emails
                            <br />
                            That{' '}
                            <span
                                className="bg-clip-text text-transparent"
                                style={{ backgroundImage: 'linear-gradient(90deg, #4F7CFF, #8B5CF6)' }}
                            >
                                Actually Get Replies
                            </span>
                        </h1>

                        <p className="text-lg text-[#B6C2E2] leading-relaxed max-w-xl mb-10">
                            Generate personalized Email, Follow-up, and LinkedIn DM in seconds using AI.
                            Simply enter your prospect&apos;s context and let AI create high-converting outreach.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 mb-9">
                            <Link
                                to={user ? '/dashboard' : '/signup'}
                                className="group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.03]"
                                style={gradientBtn}
                            >
                                Start Generating Free
                                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>

                            <button
                                type="button"
                                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.03]"
                                style={glass}
                            >
                                <PlayIcon className="h-4 w-4" />
                                Watch Demo
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {pills.map((p) => (
                                <span
                                    key={p}
                                    className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium text-[#B6C2E2]"
                                    style={{ background: 'rgba(15,23,42,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}
                                >
                                    <span className="text-[#4F7CFF]">✓</span>
                                    {p}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Right column — floating glass cards */}
                    <div className="relative h-[520px] hidden lg:block">
                        <div
                            className="absolute top-6 right-0 w-[420px] rounded-[28px] p-6 animate-[float_6s_ease-in-out_infinite]"
                            style={{
                                ...glass,
                                boxShadow:
                                    '0 0 0 1px rgba(79,124,255,0.15), 0 20px 60px -12px rgba(79,124,255,0.25), 0 0 80px -20px rgba(139,92,246,0.35)',
                            }}
                        >
                            <div className="flex items-center gap-2 mb-5">
                                <div
                                    className="flex h-7 w-7 items-center justify-center rounded-lg"
                                    style={{ background: 'linear-gradient(135deg, #4F7CFF, #8B5CF6)' }}
                                >
                                    <EnvelopeIcon className="h-3.5 w-3.5 text-white" />
                                </div>
                                <span className="text-sm font-medium text-white">AI Generated Email</span>
                                <SparklesIcon className="h-4 w-4 text-[#8B5CF6] ml-auto" />
                            </div>

                            <div className="space-y-3 text-sm">
                                <p className="text-[#B6C2E2]">
                                    <span className="text-white/50">Subject: </span>
                                    Quick idea to help {'{{company}}'} grow
                                </p>
                                <div
                                    className="rounded-2xl p-4 space-y-2.5 text-[#B6C2E2] leading-relaxed"
                                    style={{ background: 'rgba(5,8,22,0.5)', border: '1px solid rgba(255,255,255,0.06)' }}
                                >
                                    <p>Hi {'{{first_name}}'},</p>
                                    <p>
                                        I noticed {'{{company}}'} is working on {'{{specific_initiative}}'}.
                                        We helped {'{{similar_company}}'} achieve {'{{result}}'} with a
                                        similar approach.
                                    </p>
                                    <p>Open to a quick 15-min chat next week?</p>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
                                style={gradientBtn}
                            >
                                <PaperAirplaneIcon className="h-3.5 w-3.5" />
                                Send Email
                            </button>
                        </div>

                        <div
                            className="absolute top-0 left-0 w-40 rounded-2xl px-4 py-3.5 flex items-center gap-2.5 animate-[float_7s_ease-in-out_infinite]"
                            style={{ ...glass, boxShadow: '0 12px 32px -8px rgba(0,0,0,0.5)', animationDelay: '0.4s' }}
                        >
                            <EnvelopeIcon className="h-4 w-4 text-[#4F7CFF]" />
                            <span className="text-xs font-medium text-white">Email</span>
                        </div>

                        <div
                            className="absolute top-[220px] left-[-24px] w-44 rounded-2xl px-4 py-3.5 flex items-center gap-2.5 animate-[float_8s_ease-in-out_infinite]"
                            style={{ ...glass, boxShadow: '0 12px 32px -8px rgba(0,0,0,0.5)', animationDelay: '1.1s' }}
                        >
                            <ClockIcon className="h-4 w-4 text-[#8B5CF6]" />
                            <span className="text-xs font-medium text-white">Follow-up</span>
                        </div>

                        <div
                            className="absolute bottom-4 left-8 w-48 rounded-2xl px-4 py-3.5 flex items-center gap-2.5 animate-[float_6.5s_ease-in-out_infinite]"
                            style={{ ...glass, boxShadow: '0 12px 32px -8px rgba(0,0,0,0.5)', animationDelay: '0.7s' }}
                        >
                            <span
                                className="flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold text-white"
                                style={{ background: '#4F7CFF' }}
                            >
                                in
                            </span>
                            <span className="text-xs font-medium text-white">LinkedIn DM</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ---------- Feature Section ---------- */}
            <div className="relative z-10 py-24 border-t border-white/[0.06]">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="text-center mb-16 max-w-2xl mx-auto">
                        <div
                            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-[#B6C2E2] mb-6"
                            style={glass}
                        >
                            <SparklesIcon className="h-3.5 w-3.5 text-[#8B5CF6]" />
                            Why teams switch to MailForge
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                            Everything you need to{' '}
                            <span
                                className="bg-clip-text text-transparent"
                                style={{ backgroundImage: 'linear-gradient(90deg, #4F7CFF, #8B5CF6)' }}
                            >
                                close more deals
                            </span>
                        </h2>
                        <p className="text-[#B6C2E2] text-lg leading-relaxed">
                            Built for sales teams who demand performance.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {features.map((feature) => (
                            <div
                                key={feature.name}
                                className="relative rounded-[24px] p-8 transition-all duration-300 hover:-translate-y-1"
                                style={glass}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow =
                                        '0 0 0 1px rgba(79,124,255,0.2), 0 20px 50px -12px rgba(139,92,246,0.35)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <div
                                    className="h-12 w-12 rounded-2xl flex items-center justify-center mb-6"
                                    style={{ background: 'linear-gradient(135deg, rgba(79,124,255,0.15), rgba(139,92,246,0.15))', border: '1px solid rgba(255,255,255,0.08)' }}
                                >
                                    <feature.icon className="h-6 w-6 text-[#4F7CFF]" aria-hidden="true" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2.5">{feature.name}</h3>
                                <p className="text-[#B6C2E2] leading-relaxed text-sm">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ---------- CTA Section ---------- */}
            <div className="relative z-10 px-6 lg:px-10 pb-24">
                <div
                    className="relative max-w-5xl mx-auto rounded-[32px] px-8 py-16 text-center overflow-hidden"
                    style={glass}
                >
                    <div
                        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
                        style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 0%, rgba(139,92,246,0.25), transparent 70%)' }}
                    />
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                        Ready to scale your outreach?
                    </h2>
                    <p className="text-[#B6C2E2] text-lg leading-relaxed max-w-xl mx-auto mb-10">
                        Start generating personalized, high-converting cold email sequences in seconds.
                    </p>
                    <Link
                        to={user ? '/dashboard' : '/signup'}
                        className="group inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.03]"
                        style={gradientBtn}
                    >
                        Create Free Account
                        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>

            {/* ---------- Footer ---------- */}
            <footer className="relative z-10 border-t border-white/[0.06] py-10">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2">
                        <div
                            className="flex h-6 w-6 items-center justify-center rounded-md"
                            style={{ background: 'linear-gradient(135deg, #4F7CFF, #8B5CF6)' }}
                        >
                            <img src="/logo.png" alt="MailForge AI" className="h-6 w-6 rounded-md object-cover" />
                        </div>
                        <span className="text-sm font-semibold text-white">
                            MailForge <span className="text-[#4F7CFF]">AI</span>
                        </span>
                    </div>
                    <p className="text-[#B6C2E2]/60 text-xs">
                        © {new Date().getFullYear()} MailForge. All rights reserved.
                    </p>
                </div>
            </footer>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-14px); }
                }
                @media (prefers-reduced-motion: reduce) {
                    * { animation: none !important; }
                }
            `}</style>
        </div>
    );
};

export default LandingPage;
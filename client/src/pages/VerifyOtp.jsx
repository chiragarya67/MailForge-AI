import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { SparklesIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const glass = {
    background: 'rgba(15,23,42,0.75)',
    border: '1px solid rgba(255,255,255,0.08)',
    backdropFilter: 'blur(18px)',
};

const gradientBtn = {
    background: 'linear-gradient(90deg, #4F7CFF, #8B5CF6, #D946EF)',
    boxShadow: '0 8px 32px -6px rgba(139,92,246,0.5)',
};

const inputStyle = {
    background: 'rgba(5,8,22,0.5)',
    border: '1px solid rgba(255,255,255,0.08)',
};

const VerifyOtp = () => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { login } = useAuth();
    const email = location.state?.email;

    if (!email) {
        navigate('/signup');
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.post('/auth/verifymail', { email, otp });
            login(data);
            toast.success('Email verified successfully!');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Verification failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-[#050816] font-sans text-white overflow-hidden flex flex-col justify-center py-12 px-4 sm:px-6">
            {/* ---------- Background layers ---------- */}
            <div
                className="pointer-events-none fixed inset-0 -z-30"
                style={{
                    background:
                        'radial-gradient(ellipse 80% 60% at 50% -10%, #121631 0%, #090B1F 45%, #050816 100%)',
                }}
            />
            <div
                className="pointer-events-none fixed -top-40 left-1/2 -translate-x-1/2 -z-20 h-[36rem] w-[36rem] rounded-full opacity-30 blur-[120px]"
                style={{ background: 'radial-gradient(circle, #D946EF 0%, transparent 70%)' }}
            />
            <div
                className="pointer-events-none fixed -bottom-32 left-0 -z-20 h-[30rem] w-[30rem] rounded-full opacity-25 blur-[130px]"
                style={{ background: 'radial-gradient(circle, #4F7CFF 0%, transparent 70%)' }}
            />
            <div
                className="pointer-events-none fixed inset-0 -z-10 opacity-[0.04]"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
                    backgroundSize: '64px 64px',
                    maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black 40%, transparent 90%)',
                }}
            />

            {/* ---------- Content ---------- */}
            <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex flex-col items-center mb-8">
                    <div
                        className="flex h-11 w-11 items-center justify-center rounded-xl mb-5"
                        style={{ background: 'linear-gradient(135deg, #4F7CFF, #8B5CF6)' }}
                    >
                        <SparklesIcon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-lg font-semibold tracking-tight mb-2">
                        MailForge <span className="text-[#4F7CFF]">AI</span>
                    </span>
                    <h2 className="text-2xl font-bold tracking-tight text-white mb-2">Verify your email</h2>
                    <p className="text-sm text-[#B6C2E2] text-center">
                        We sent a code to <span className="font-medium text-white">{email}</span>
                    </p>
                    <p className="mt-2 text-xs text-[#B6C2E2]/80 text-center">
                        If you do not see the OTP, please check your spam or junk folder.
                    </p>
                </div>
            </div>

            <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="rounded-[28px] py-8 px-6 sm:px-10" style={glass}>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="flex items-center justify-center gap-1.5 text-sm font-medium text-[#B6C2E2] mb-3">
                                <EnvelopeIcon className="h-4 w-4 text-[#8B5CF6]" />
                                Enter 6-digit OTP
                            </label>
                            <input
                                type="text"
                                required
                                maxLength={6}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="block w-full px-3 py-3.5 rounded-xl text-white placeholder-[#B6C2E2]/30 outline-none transition-shadow text-center text-2xl tracking-[0.5em] font-mono focus:ring-2 focus:ring-[#4F7CFF]/50"
                                style={inputStyle}
                                placeholder="000000"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || otp.length !== 6}
                            className="w-full flex justify-center py-3 px-4 rounded-xl text-sm font-semibold text-white transition-all duration-200 disabled:opacity-40 hover:enabled:scale-[1.02]"
                            style={gradientBtn}
                        >
                            {loading ? 'Verifying...' : 'Verify Email'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VerifyOtp;
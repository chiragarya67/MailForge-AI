import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../utils/api';
import { EyeIcon, EyeSlashIcon, SparklesIcon } from '@heroicons/react/24/outline';

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

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.post('/auth/register', { username: name, email, password });
            toast.success(data.message);
            navigate('/verify-otp', { state: { userId: data.userId, email } });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
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
                className="pointer-events-none fixed -top-40 right-1/4 -z-20 h-[36rem] w-[36rem] rounded-full opacity-35 blur-[120px]"
                style={{ background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)' }}
            />
            <div
                className="pointer-events-none fixed -bottom-32 left-0 -z-20 h-[32rem] w-[32rem] rounded-full opacity-25 blur-[130px]"
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
                    <h2 className="text-2xl font-bold tracking-tight text-white">Create your account</h2>
                </div>
            </div>

            <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="rounded-[28px] py-8 px-6 sm:px-10" style={glass}>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-[#B6C2E2] mb-1.5">Full Name</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="block w-full px-3.5 py-2.5 rounded-xl text-sm text-white placeholder-[#B6C2E2]/40 outline-none transition-shadow focus:ring-2 focus:ring-[#4F7CFF]/50"
                                style={inputStyle}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#B6C2E2] mb-1.5">Email address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full px-3.5 py-2.5 rounded-xl text-sm text-white placeholder-[#B6C2E2]/40 outline-none transition-shadow focus:ring-2 focus:ring-[#4F7CFF]/50"
                                style={inputStyle}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#B6C2E2] mb-1.5">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full px-3.5 py-2.5 pr-11 rounded-xl text-sm text-white placeholder-[#B6C2E2]/40 outline-none transition-shadow focus:ring-2 focus:ring-[#4F7CFF]/50"
                                    style={inputStyle}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((visible) => !visible)}
                                    className="absolute inset-y-0 right-0 flex items-center px-3 text-[#B6C2E2] hover:text-white transition-colors"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-3 px-4 rounded-xl text-sm font-semibold text-white transition-all duration-200 disabled:opacity-50 hover:enabled:scale-[1.02]"
                            style={gradientBtn}
                        >
                            {loading ? 'Creating account...' : 'Sign up'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <span className="text-[#B6C2E2]">Already have an account? </span>
                        <Link to="/login" className="font-medium text-[#4F7CFF] hover:text-[#8B5CF6] transition-colors">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
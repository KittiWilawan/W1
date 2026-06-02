import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const Register = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-gray-900 font-sans">
            <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 md:p-10">

                <div className="text-center mb-8">
                    <Link
                        href="/"
                        className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition duration-200 flex items-center space-x-1 text-sm font-semibold"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>กลับ</span>
                    </Link>
                    <h2 className="text-lg font-bold text-gray-900">Community Connect</h2>
                    <h1 className="text-2xl font-bold text-gray-900 mt-1">สมัครสมาชิก</h1>
                </div>

                <form className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1.5" htmlFor="email">
                            อีเมลผู้ใช้งาน
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="example@email.com"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-200 focus:border-sky-300 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1.5" htmlFor="password">
                            รหัสผ่าน
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="********"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-200 focus:border-sky-300 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1.5" htmlFor="confirm-password">
                            ยืนยันรหัสผ่าน
                        </label>
                        <input
                            id="confirm-password"
                            type="password"
                            placeholder="********"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-200 focus:border-sky-300 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1.5" htmlFor="tel">
                            เบอร์มือถือ
                        </label>
                        <input
                            id="tel"
                            type="tel"
                            inputMode="numeric"
                            // value={phone}
                            maxLength={10}
                            placeholder="088-888-8888"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-200 focus:border-sky-300 transition"
                        // onChange={(e) => {
                        //     const onlyNums = e.target.value.replace(/[^0-9]/g,'');
                        //     setPhone(onlyNums)
                        // }}
                        />
                    </div>

                    <button type="submit" className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-lg transition duration-200 mt-2 shadow-md">
                        <a href='./' >
                            สมัครสมาชิก
                        </a>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
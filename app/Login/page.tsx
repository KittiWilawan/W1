import React from 'react';
import { SiLine, SiGoogle } from 'react-icons/si';

const LoginCard = () => {
    return (
        <div className="bg-white p-10 rounded-2xl shadow-2xl border border-gray-100 w-full max-w-md">
            <div className="text-center mb-8">
                <h2 className="text-lg font-bold text-gray-900">Community Connect</h2>
                <h1 className="text-2xl font-bold text-gray-900 mt-1">ลงชื่อเข้าใช้งาน</h1>
                <p className="text-sm text-gray-600 mt-2">เลือกช่องทางที่คุณสะดวกเพื่อเริ่มต้น</p>
            </div>

            <div className="space-y-4 mb-8">
                
                <button className="w-full flex items-center justify-center space-x-3 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2.5 rounded-lg transition duration-200">
                    <SiLine className="w-6 h-6" />
                    <span>เข้าสู่ระบบด้วย LINE</span>
                </button>

                <button className="w-full flex items-center justify-center space-x-3 bg-white hover:bg-gray-100 text-gray-700 font-medium px-6 py-2.5 rounded-lg border border-gray-300 transition duration-200 shadow-sm">
                    <SiGoogle className="w-5 h-5" />
                    <span>เข้าสู่ระบบด้วย Google</span>
                </button>
            </div>

            <div className="flex items-center mb-6">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-sm text-gray-400 font-medium">หรือ</span>
                <div className="flex-grow border-t border-gray-200"></div>
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

                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center space-x-2 text-gray-700 cursor-pointer">
                        <input type="checkbox" className="form-checkbox h-4 w-4 text-sky-600 rounded border-gray-300 focus:ring-sky-500" />
                        <span>จดจำฉัน</span>
                    </label>
                    <a href="/forgot-password" className="text-sky-700 font-semibold hover:text-sky-800 transition">
                        ลืมรหัสผ่าน?
                    </a>
                </div>

                <button type="submit" className="w-full bg-navy-800 hover:bg-navy-800 text-white font-semibold px-6 py-3 rounded-lg transition duration-200 mt-2 shadow-md">
                    <label className="items-center space-x-2 text-gray-500 cursor-pointer">
                        เข้าสู่ระบบ
                    </label>
                </button>
            </form>

            <div className="text-center mt-10 text-sm text-gray-600">
                ยังไม่มีบัญชี?{' '}
                <a href="/Register" className="text-sky-700 font-bold hover:text-sky-800 transition">
                    สมัครใช้งานฟรี
                </a>
            </div>

        </div>
    );
};

export default LoginCard;
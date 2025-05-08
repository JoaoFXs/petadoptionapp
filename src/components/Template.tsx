'use client'
import React, { useState } from 'react';
import Link from 'next/link';
interface TemplateProps {
    children?: React.ReactNode
    loading?: boolean;
}

export const Template: React.FC<TemplateProps> = ({ children, loading = false }: TemplateProps) => {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    )
}

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPerfilOpen, setIsPerfilOpen] = useState(false); // State to track if the profile menu is open
    const [userImage, setUserImage] = useState('https://contributors-img.web.app/image?repo=JoaoFXs/climasync'); // Placeholder for user image
    const [isAdmin, setIsAdmin] = useState(true); // State to track if the user is an admin
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const openPerfilMenu = () => setIsPerfilOpen(!isPerfilOpen); // Function to open the profile menu
    
    return (
        <header className="bg-green-200 text-green-900 shadow-md">
      
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
                {/* Logo */}
                <Link href='/'>
                <div className="text-2xl font-semibold">Paw House</div>
                </Link>
                {/* Navbar */}
                <RenderIf condition={isAdmin}>
                    <nav className="hidden md:flex  items-center  space-x-6">
                        <a href="#pets-management" className="hover:text-yellow-400 transition-all duration-300">Manage Pets</a>
                        <a href="#adoption-requests" className="hover:text-yellow-400 transition-all duration-300">Adoption Requests</a>
                        <a href="#users-management" className="hover:text-yellow-400 transition-all duration-300">Manage Users</a>
                        <a href="#adoption-report" className="hover:text-yellow-400 transition-all duration-300">Adoption Reports</a>
                        <a href="#settings" className="hover:text-yellow-400 transition-all duration-300">Settings</a>

                        <button onClick={openPerfilMenu} className="focus:outline-none min-w-10 min-h-10">
                            <img
                                src={userImage}
                                alt="Avatar"
                               className="w-10 h-10 rounded-full border-2 border-green-900 object-cover flex-shrink-0"
                            />
                        </button>
                    </nav>
                </RenderIf>

                <RenderIf condition={!isAdmin}>
                    <nav className="hidden md:flex items-center space-x-6">
                        <a href="#available-pets" className="hover:text-yellow-400 transition-all duration-300">Available Pets</a>
                        <a href="#adoption-status" className="hover:text-yellow-400 transition-all duration-300">Adoption Status</a>
                        <a href="#profile" className="hover:text-yellow-400 transition-all duration-300">My Profile</a>
                        <a href="#favorites" className="hover:text-yellow-400 transition-all duration-300">Favorite Pets</a>

                        <button className="focus:outline-none min-w-10 min-h-10">
                            <img
                                src={userImage}
                                alt="Avatar"
                                className="w-10 h-10 rounded-full border-2 border-green-900 object-cover"
                            />
                        </button>
                    </nav>
                </RenderIf>

                {/* Mobile Menu Button */}
                <button onClick={toggleMenu} className="md:hidden text-green-900 focus:outline-none">
                    <div className="w-9 h-10 cursor-pointer flex flex-col items-center justify-center">
                        <div className={`w-[50%] h-[2px] bg-green-900 rounded-sm transition-all duration-300 origin-left translate-y-[0.45rem] ${isMenuOpen ? 'rotate-[-45deg]' : ''}`}></div>
                        <div className={`w-[50%] h-[2px] bg-green-900 rounded-md transition-all duration-300 origin-center ${isMenuOpen ? 'hidden' : ''}`}></div>
                        <div className={`w-[50%] h-[2px] bg-green-900 rounded-md transition-all duration-300 origin-left -translate-y-[0.45rem] ${isMenuOpen ? 'rotate-[45deg]' : ''}`}></div>
                    </div>
                </button>
            </div>

            {/* Mobile Menu */}

            <RenderIf condition={!isAdmin}>
            {isMenuOpen && (
                <div className="md:hidden bg-green-300 p-4 space-y-4 text-green-900">
                    <a href="#" className="block hover:text-yellow-400">Available Pets</a>
                    <a href="#about" className="block hover:text-yellow-400">Adoption Status</a>
                    <a href="#services" className="block hover:text-yellow-400">My Profile</a>
                    <a href="#contact" className="block hover:text-yellow-400">Favorite Pets</a>
                </div>
            )}
          </RenderIf>
          <RenderIf condition={isAdmin}>
          {isMenuOpen && (
                <div className="md:hidden bg-green-300 p-4 space-y-4 text-green-900">
                    <a href="#" className="block hover:text-yellow-400">Manage Pets</a>
                    <a href="#about" className="block hover:text-yellow-400">Adoption Requests</a>
                    <a href="#services" className="block hover:text-yellow-400">Manage Users</a>
                    <a href="#contact" className="block hover:text-yellow-400">Adoption Reports</a>
                    <a href="#contact" className="block hover:text-yellow-400">Settings</a>
                </div>
            )}
          </RenderIf>

          {isPerfilOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end">
                <div className="w-64 bg-white shadow-lg p-4 h-full z-50">
                    <button 
                        onClick={openPerfilMenu} 
                        className="text-gray-500 hover:text-black mb-4 ml-auto block"
                    >
                        ✖️
                    </button>
                    <div className="flex flex-col items-center">
                        <img src={userImage} alt="Avatar" className="w-24 h-24 rounded-full mb-4" />
                        <h3 className="text-xl font-semibold">João Felix</h3>
                        <p className="text-sm text-gray-600 mb-4">joao@email.com</p>
                        <nav className="w-full">
                            <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">My Profile</a>
                            <a href="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</a>
                            <button className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">Exit</button>
                        </nav>
                    </div>
                </div>
            </div>
        )}

        </header>
    );
};

const Footer = () => {
    return (
      <footer className="bg-yellow-100 text-green-900 items-center py-6 border-t border-green-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4">
            <p className="text-center text-sm">Developed by João Felix, &copy; 2025. All rights reserved.</p>
        </div>
    </footer>
    );
};

interface RenderIfProps {
    condition?: boolean;
    children: React.ReactNode;
}
export const RenderIf: React.FC<RenderIfProps> = ({ condition = true, children }) => {
    if (condition) {
        return <>{children}</>;
    }
    return null;
};

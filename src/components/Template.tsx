'use client'
import React, { useState } from 'react';
import { NavBar } from './tools';
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
    const [isAdmin, setIsAdmin] = useState(false); // State to track if the user is an admin
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const openPerfilMenu = () => setIsPerfilOpen(!isPerfilOpen); // Function to open the profile menu
    
    return (
        <header className="bg-green-200 text-green-900 shadow-md">
      
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
                {/* Logo */}
                <Link href='/'>
                <div className="text-2xl font-semibold">Paw House</div>
                </Link>
                {/* Navbar - Use component navBar in tools*/}
                <NavBar userImage={userImage} openPerfilMenu={openPerfilMenu} condition={isAdmin}/>
         
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
                    <div className="w-72 bg-white shadow-2xl p-6 h-full z-50 rounded-l-2xl transition-all duration-300">
                    
                    {/* Botão de fechar */}
                    <button 
                        onClick={openPerfilMenu} 
                        className="text-green-600 hover:text-green-800 ml-auto block mb-4"
                        title="Close menu"
                    >
                        <div className="w-9 h-9 flex items-center justify-center cursor-pointer 
                                        rounded-full transition-all duration-200 ease-in-out 
                                        hover:bg-green-100 hover:scale-110 hover:shadow-md">
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M3 9h13a5 5 0 0 1 0 10H7M3 9l4-4M3 9l4 4"/>
                        </svg>
                        </div>
                    </button>

                    {/* Avatar e informações do usuário */}
                    <div className="flex flex-col items-center">
                        <div className="relative group w-24 h-24 mb-4">
                        <img
                            src={userImage}
                            alt="Avatar"
                            className="w-full h-full object-cover rounded-full border-4 border-yellow-300 
                                    shadow-xl transition duration-300 group-hover:brightness-90"
                        />

                        {/* Ícone de lápis */}
                        <button
                            className="absolute bottom-1 right-1 bg-yellow-300 text-green-800 
                                    p-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 
                                    transition-opacity duration-300 hover:bg-yellow-400"
                            title="Alterar imagem"
                        >
                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                    d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 
                                    8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 
                                    3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5
                                    m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
                            </svg>
                        </button>
                        </div>

                        <h3 className="text-xl font-semibold text-green-800">João Felix</h3>
                        <p className="text-sm text-gray-600 mb-4">joao@email.com</p>

                        {/* Navegação */}
                        <nav className="w-full">
                        <a href="/profile" className="block px-4 py-2 rounded-md text-green-700 hover:bg-green-50 transition">
                            My Profile
                        </a>
                        <a href="/settings" className="block px-4 py-2 rounded-md text-green-700 hover:bg-green-50 transition">
                            Configurations
                        </a>
                        <button className="w-full text-left px-4 py-2 text-red-500 rounded-md hover:bg-red-50 transition">
                            Exit
                        </button>
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

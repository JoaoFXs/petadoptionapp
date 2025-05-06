'use client'
import React, { useState } from 'react';
interface TemplateProps{
    children?: React.ReactNode
    loading?: boolean;
}

export const  Template: React.FC<TemplateProps> = ({children, loading=false}: TemplateProps) =>{
    return(
        <div className="flex flex-col min-h-screen">
            <Header/>
                <Footer/>
        </div>
    )
}

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false); // State to track if the user is an admin
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
    return (
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto flex items-center justify-between p-4">
          {/* Logo */}
          <div className="text-2xl font-semibold">Paw house</div>
        
          {/* Navbar */}
          <RenderIf condition={isAdmin}>
            <nav className="hidden md:flex space-x-6">
                <a href="#pets-management" className="hover:text-blue-300 transition-all duration-300">Manage Pets</a>
                <a href="#adoption-requests" className="hover:text-blue-300 transition-all duration-300">Adoption Requests</a>
                <a href="#users-management" className="hover:text-blue-300 transition-all duration-300">Manage Users</a>
                <a href="#adoption-report" className="hover:text-blue-300 transition-all duration-300">Adoption Reports</a>
                <a href="#settings" className="hover:text-blue-300 transition-all duration-300">Settings</a>
             
                <button className="focus:outline-none">
                    <img 
                    src="https://via.placeholder.com/40" 
                    alt="Avatar" 
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    />
               </button>
            </nav>
         </RenderIf>
         
         <RenderIf condition={!isAdmin}>
            <nav className="hidden md:flex items-center space-x-6">
                <a href="#available-pets" className="hover:text-blue-300 transition-all duration-300">Available Pets</a>
                <a href="#adoption-status" className="hover:text-blue-300 transition-all duration-300">Adoption Status</a>
                <a href="#profile" className="hover:text-blue-300 transition-all duration-300">My Profile</a>
                <a href="#favorites" className="hover:text-blue-300 transition-all duration-300">Favorite Pets</a>

                <button className="focus:outline-none">
                    <img 
                    src="https://via.placeholder.com/40" 
                    alt="Avatar" 
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    />
               </button>
            </nav>
        </RenderIf>



          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden text-white focus:outline-none">
            <div className="w-9 h-10 cursor-pointer flex flex-col items-center justify-center">
                <div className={`w-[50%] h-[2px] bg-white rounded-sm transition-all duration-300 origin-left translate-y-[0.45rem] ${isMenuOpen ? 'rotate-[-45deg]' : ''}`}></div>
                <div className={`w-[50%] h-[2px] bg-white rounded-md transition-all duration-300 origin-center ${isMenuOpen ? 'hidden' : ''}`}></div>
                <div className={`w-[50%] h-[2px] bg-white rounded-md transition-all duration-300 origin-left -translate-y-[0.45rem] ${isMenuOpen ? 'rotate-[45deg]' : ''}`}></div>
            </div>
        </button>
        
        </div>
  
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-blue-700 p-4 space-y-4">
            <a href="#" className="block text-white">Home</a>
            <a href="#about" className="block text-white">About</a>
            <a href="#services" className="block text-white">Services</a>
            <a href="#contact" className="block text-white">Contact</a>
          </div>
        )}
      </header>
    );
  };

  const Footer = () => {
    return (
      <footer className="bg-blue-800 text-white py-6 mt-12">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4"/>
        <p className="text-center text-sm mt-4">Developed by João Felix,&copy; 2025. All rights reserved.</p>
      </footer>
    );
  };

  interface RenderIfProps {
    condition?: boolean;   
    children: React.ReactNode;
 }
  export const RenderIf: React.FC<RenderIfProps> = ({condition = true, children}) => {
    if(condition){
        return children;
    }
    return false;
}
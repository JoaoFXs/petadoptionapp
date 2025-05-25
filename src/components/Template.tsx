'use client'
import React, { useState, useEffect  } from 'react';
import { ToastContainer } from 'react-toastify';
import { NavBar, NavBarMobile } from './tools';
import Link from 'next/link';
import { useAuth } from '@/resources';
import { useRouter } from 'next/navigation';
import { User, UserSessionToken } from '@/resources/user/user.resource';

interface TemplateProps {
    children?: React.ReactNode
    loading?: boolean;
}

export const Template: React.FC<TemplateProps> = ({ children, loading = false }: TemplateProps) => {
    
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header />
            <main className="flex-1">{children}
            </main>
            <Footer />
             <ToastContainer
                position="top-right"
                autoClose={8000}
                hideProgressBar={false}
                draggable={false}
                closeOnClick={true}
                pauseOnHover={true}
                />
        </div>
    )
}

/**
 * Header component for the application.
 *
 * Renders the main navigation bar, logo, user avatar, and profile menu.
 * Handles user authentication state, profile image display, and navigation.
 * Supports both desktop and mobile layouts, including a responsive menu.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered header component.
 *
 * @example
 * ```tsx
 * <Header />
 * ```
 *
 * @remarks
 * - Uses `useAuth` for authentication/session management.
 * - Displays user avatar and profile information if logged in.
 * - Provides navigation links and logout functionality.
 * - Integrates with `NavBar`, `NavBarMobile`, and `RenderIf` components.
 */
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPerfilOpen, setIsPerfilOpen] = useState(false); // State to track if the profile menu is open
    const [userImage, setUserImage] = useState<string>('https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'); // Placeholder for user image'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'
    const [isAdmin, setIsAdmin] = useState(false); // State to track if the user is an admin
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const openPerfilMenu = () => setIsPerfilOpen(!isPerfilOpen); // Function to open the profile menu
    
    
    const auth = useAuth();
    const user = auth.getUserSession();
    const router = useRouter();
    /**
     * Logs the user out by invalidating the current authentication session
     * and redirects them to the login page.
     *
     * @remarks
     * This function calls `auth.invalidateSession()` to clear the user's session,
     * then navigates to the "/login" route using the router.
     */
    function logout(){
        auth.invalidateSession();
        router.push("/login");
    }

    useEffect(() => {
        viewUserImage();
    }, [user]);

    /**
     * Sets the user's image URL.
     * 
     * If the `user` object has a valid `url` property, this function sets the user's image to that URL.
     * Otherwise, it sets the user's image to a default avatar image.
     *
     * @remarks
     * This function assumes that `setUserImage` and `user` are available in the current scope.
     */
    function viewUserImage(){
            if(user?.url){
                setUserImage(user.url);
            } else {
                setUserImage('https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg');
            }
    }

    /**
     * Handles the logic for opening the user profile or redirecting to the login page.
     *
     * If the user's authentication session is valid, toggles the profile modal's open state.
     * Otherwise, redirects the user to the login page.
     *
     * @remarks
     * Relies on `auth.isSessionValid()` to check authentication status and uses `router.push` for navigation.
     *
     * @returns {void}
     */
    function openPerfilorLogin(){
        if(auth.isSessionValid()){
             setIsPerfilOpen(!isPerfilOpen);
        }else{
            router.push("/login");
        }
    }


    return (
        <header className="bg-green-200 text-green-900 shadow-md">
      
            <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
                {/* Logo */}
                <Link href='/'>
                    <div className="text-2xl font-semibold">Paw House</div>
                </Link>
                {/* Navbar */}

               <NavBar
                    userImage={userImage}
                    openPerfilMenu={openPerfilorLogin}
                    condition={isAdmin}
                    />
                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-x-2">

                        <button onClick={openPerfilMenu} className="focus:outline-none min-w-10 min-h-10">
                            <img
                                src={userImage}
                                alt="Avatar"
                               className="w-10 h-10 rounded-full border-2 border-green-900 object-cover flex-shrink-0"
                            />
                        </button>

                        <button onClick={toggleMenu} className="text-green-900 focus:outline-none">
                            <div className="w-9 h-10 cursor-pointer flex flex-col items-center justify-center">
                            <div
                                className={`w-[50%] h-[2px] bg-green-900 rounded-sm transition-all duration-300 origin-left translate-y-[0.45rem] ${
                                isMenuOpen ? 'rotate-[-45deg]' : ''
                                }`}
                            ></div>
                            <div
                                className={`w-[50%] h-[2px] bg-green-900 rounded-md transition-all duration-300 origin-center ${
                                isMenuOpen ? 'hidden' : ''
                                }`}
                            ></div>
                            <div
                                className={`w-[50%] h-[2px] bg-green-900 rounded-md transition-all duration-300 origin-left -translate-y-[0.45rem] ${
                                isMenuOpen ? 'rotate-[45deg]' : ''
                                }`}
                            ></div>
                            </div>
                        </button>
                </div>
            </div>

            {/* Mobile Menu  Use component navBarMobile in tools*/}
            <NavBarMobile userImage={userImage} openPerfilMenu={openPerfilMenu} condition={isAdmin} isMenuOpen={isMenuOpen} />
            
            <RenderIf condition={isPerfilOpen}>
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

                    {/* Avatar and user information */}
                    <div className="flex flex-col items-center">
                        <div className="relative group w-24 h-24 mb-4">
                        <img
                            src={userImage}
                            alt="Avatar"
                            className="w-full h-full object-cover rounded-full border-4 border-green-800 
                                    shadow-xl transition duration-300 group-hover:brightness-90"
                        />

                        {/* Pencil icon */}
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

                        <h3 className="text-xl font-semibold text-green-800">{user?.username}</h3>
                        <p className="text-sm text-gray-600 mb-4">{user?.email}</p>

                        {/* Navigation */}
                        <nav className="w-full">
                        <a href="/profile" className="block px-4 py-2 rounded-md text-green-700 hover:bg-green-50 transition">
                            My Profile
                        </a>
                        <a href="/settings" className="block px-4 py-2 rounded-md text-green-700 hover:bg-green-50 transition">
                            Settings
                        </a>
                            <button onClick={logout}
                                    className="block mx-auto mt-4 relative overflow-hidden rounded-md bg-red-700 px-5 py-2.5 text-white transition-all duration-300 
                                            [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:-translate-y-1 active:scale-x-90 active:scale-y-110"
                                >Exit</button>
                            
                        </nav>
                    </div>
                    </div>
                </div>
               
            </RenderIf>
        </header>
    );
};

/**
 * Footer component that displays the application's footer section.
 *
 * @returns {JSX.Element} The rendered footer element with developer credit and copyright.
 */
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
/**
 * Conditionally renders its children based on the provided `condition` prop.
 *
 * @param condition - A boolean value that determines whether the children should be rendered. Defaults to `true`.
 * @param children - The React nodes to render if `condition` is `true`.
 * @returns The children if `condition` is `true`, otherwise `null`.
 */
export const RenderIf: React.FC<RenderIfProps> = ({ condition = true, children }) => {
    if (condition) {
        return <>{children}</>;
    }
    return null;
};

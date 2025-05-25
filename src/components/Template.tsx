'use client'
import React, { useState, useEffect  } from 'react';
import { ToastContainer } from 'react-toastify';
import { MobileMenuButtons, DrawerComponent, NavBar, NavBarMobile  } from '@/components';
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
    const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to track if the profile menu is open
    const [userImage, setUserImage] = useState<string>('https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'); // Placeholder for user image'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'
    const [isAdmin, setIsAdmin] = useState(false); // State to track if the user is an admin
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const openDrawerMenu = () => setIsDrawerOpen(!isDrawerOpen); // Function to open the profile menu
    
    const auth = useAuth();
    const user = auth.getUserSession();
    const router = useRouter();
    //Function to logout
    function logout(){
        auth.invalidateSession();
        router.push("/login");
    }
    //UseEffect to start function viewUserImage when user change
    useEffect(() => {
        viewUserImage();
    }, [user]);
    //Function to set userImage
    function viewUserImage(){
            if(user?.url){
                setUserImage(user.url);
            } else {
                setUserImage('https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg');
            }
    }
   //Function to openPerfil or route to login
    function openPerfilorLogin(){
        if(auth.isSessionValid()){
             setIsDrawerOpen(!isDrawerOpen);
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
                {/* Navbar - Header*/}
               <NavBar
                    userImage={userImage}
                    openPerfilMenu={openPerfilorLogin}
                    condition={isAdmin}
                    />

                {/* Mobile Menu Buttons */}
                <MobileMenuButtons isMenuOpen={isMenuOpen} openPerfilMenu={openDrawerMenu} src={userImage} toggleMenu={toggleMenu}/>
                       
            </div>
            {/* Mobile Menu  Use component navBarMobile in tools*/}
            <NavBarMobile userImage={userImage} openPerfilMenu={openDrawerMenu} condition={isAdmin} isMenuOpen={isMenuOpen} />        

            {/*Drawer - Only drawer is activate */}
            <DrawerComponent condition={isDrawerOpen} email={user?.email} logout={logout} openDrawerMenu={openDrawerMenu} userImage={userImage} username={user?.username}/>      
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

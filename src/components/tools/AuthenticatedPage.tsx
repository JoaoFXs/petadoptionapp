'use client'

import Login from "@/app/login/page"; // Ajuste o caminho
import { useAuth } from "@/resources";
import { useState, useEffect } from "react";

interface AuthenticatedPageProps {
    children: React.ReactNode;
}

export const AuthenticatedPage: React.FC<AuthenticatedPageProps> = ({ children }) => {
    const auth = useAuth();
    const [showLogin, setShowLogin] = useState(false);
    
    // Verifica o estado de autenticação quando o componente é montado
    useEffect(() => {
        setShowLogin(!auth.isSessionValid());
    }, [auth]);

    // Fecha o modal quando o usuário está autenticado
    useEffect(() => {
        if (auth.isSessionValid() && showLogin) {
            setShowLogin(false);
        }
    }, [auth, showLogin]);

    // Se não estiver autenticado, mostra o modal sobre o conteúdo
    return (
        <div className="relative min-h-screen">
            {/* Conteúdo principal - desfocado quando o modal está aberto */}
            <div className={showLogin ? "blur-sm pointer-events-none" : ""}>
                {children}
            </div>
            
            {/* Modal de login */}
            <Login 
                isOpen={showLogin} 
                onClose={() => setShowLogin(false)} // Fecha o modal quando solicitado
            />
        </div>
    );
}
import { RenderIf } from "../Template"

export interface DrawerComponentProps{
    condition: boolean,
    openDrawerMenu: () => void,
    userImage: string,
    username: string | undefined ,
    email: string | undefined,
    logout: () => void

}

export const DrawerComponent: React.FC<DrawerComponentProps> = ({condition, openDrawerMenu, userImage, username, email, logout}: DrawerComponentProps) =>{
    return (
            <RenderIf condition={condition}>
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end">
                    <div className="w-72 bg-white shadow-2xl p-6 h-full z-50 rounded-l-2xl transition-all duration-300">
                    
                    {/* Botão de fechar */}
                    <button 
                        onClick={openDrawerMenu} 
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

                        <h3 className="text-xl font-semibold text-green-800">{username}</h3>
                        <p className="text-sm text-gray-600 mb-4">{email}</p>

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
    )
}
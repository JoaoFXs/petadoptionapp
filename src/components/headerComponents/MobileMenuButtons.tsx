interface MobileMenuButtonsProps{
     openPerfilMenu?: () => void,
     src?: string,
     isMenuOpen: boolean,
     toggleMenu?: () => void

}

export const MobileMenuButtons: React.FC<MobileMenuButtonsProps>  = ({openPerfilMenu, toggleMenu, isMenuOpen, src}:MobileMenuButtonsProps) => {
    return(
          <div className="md:hidden flex items-center gap-x-2">
                        {/* button image */}
                        <button onClick={openPerfilMenu} className="focus:outline-none min-w-10 min-h-10">
                            <img
                                src={src}
                                alt="Avatar"
                               className="w-10 h-10 rounded-full border-2 border-green-900 object-cover flex-shrink-0"
                            />
                        </button>
                        {/* hidden button mobile */}
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
    )
}
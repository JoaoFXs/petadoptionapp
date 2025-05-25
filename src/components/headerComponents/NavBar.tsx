

interface NavBarProps{  
    
    userImage?: string,
    openPerfilMenu?: () => void,
    condition?: boolean,
    isMenuOpen?: boolean

}

export const NavBar: React.FC<NavBarProps> = ({userImage, openPerfilMenu, condition}: NavBarProps) => {   
    return(
                     <nav className="hidden md:flex  items-center  space-x-6">
                        
                       {(condition ? navItemsAdmin : navItemsUser).map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="hover:text-yellow-400 transition-all duration-300"
                            >
                                {item.label}
                            </a>
                              
                      ))}

  
                      <button onClick={openPerfilMenu} className="focus:outline-none min-w-10 min-h-10">
                            <img
                                src={userImage}
                                alt="Avatar"
                               className="w-10 h-10 rounded-full border-2 border-green-900 object-cover flex-shrink-0"
                            />
                      </button>
                    </nav>
  )
}



export const NavBarMobile: React.FC<NavBarProps> = ({
  userImage,
  openPerfilMenu,
  condition,
  isMenuOpen
}) => {
  if (!isMenuOpen) return null; // ← only renders if the menu is open

  const navItems = condition ? navItemsAdmin : navItemsUser;

  return (   
    <div className="md:hidden bg-green-300 p-4 space-y-4 text-green-900">
      {navItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="block hover:text-yellow-400"
        >
          {item.label}
        </a>

      ))}
    </div>
  );
};



const navItemsAdmin = [
  { href: "#pets-management", label: "Manage Pets" },
  { href: "#adoption-requests", label: "Adoption Requests" },
  { href: "#users-management", label: "Manage Users" },
  { href: "#adoption-report", label: "Adoption Reports" },
  { href: "#settings", label: "Settings" },
];

const navItemsUser = [
  { href: "#available-pets", label: "Available Pets" },
  { href: "#adoption-status", label: "Adoption Status" },
  { href: "#my-profile", label: "My Profile" },
  { href: "#favorite-pets", label: "Favorite Pets" },
];
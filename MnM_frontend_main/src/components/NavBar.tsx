import { Music, Info, User, LogOut } from 'lucide-react';
import AuthModals from './AuthModal';
import { useAuth } from '../context/AuthContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';

const Navbar = ({ setPage }: { setPage: (page: string) => void }) => {
  const { isLoggedIn, user, logout } = useAuth();

  const UserDropdownMenu = ({ user, logout }: any) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center space-x-2 p-2 rounded-full bg-gray-200/10 hover:shadow-md">
          <User className="w-6 h-6 text-yellow-400" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        sideOffset={4}
        className="w-48 mt-2 bg-yellow-800 rounded-md shadow-lg text-yellow-300"
      >
        <DropdownMenuItem className="px-4 py-2 text-sm">
          <strong>{user?.username}</strong>
        </DropdownMenuItem>

        {/* User Info */}
        <DropdownMenuItem className="px-4 py-1 text-xs text-yellow-200">
           <span>{user?.gender}</span>, <span>{user?.birthDate}</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Logout Button */}
        <DropdownMenuItem
          className="px-4 py-2 flex items-center hover:bg-yellow-600 cursor-pointer"
          onClick={() => logout()}
        >
          <LogOut className="mr-2 w-4 h-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <nav className="z-50 py-2 px-4 backdrop-blur-sm sticky top-0 left-0 w-full flex justify-between items-center bg-transparent">
      <button onClick={() => setPage('home')} className="flex items-center space-x-2">
        <Music className="w-8 h-8 text-yellow-400" />
        <span className="text-2xl font-bold text-yellow-300">MnM</span>
      </button>
      
      <div className="flex items-center space-x-4">
        <button onClick={() => setPage('about')} className="text-md flex font-medium px-4 py-2 rounded-md">
          <Info className="w-6 h-6 text-yellow-400 mr-2" />
          <span className="hidden sm:block text-yellow-300">About Us</span>
        </button>

        {isLoggedIn ? (
          <UserDropdownMenu user={user} logout={logout} />
        ) : (
          <AuthModals />
        )}
      </div>
    </nav>
  );
};

export default Navbar;

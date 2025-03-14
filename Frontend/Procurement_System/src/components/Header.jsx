import Body from './Body';
import Logo from './Logo';
import Navbar from './Navbar';


export const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full h-14 bg-white bg-opacity-90 backdrop-blur-xl shadow-md border-b border-gray-200 dark:bg-gray-900 dark:bg-opacity-90 dark:border-gray-700 dark:text-white transition-all duration-300">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6 py-2 md:py-3">
                <Logo/>
                <Navbar />
            </div>
        </header>
    )
}

export default Header;
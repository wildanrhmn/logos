import HeaderItem from "./HeaderItem";

const Header = () => {
    const links = [
        { href: '/settings', label: 'settings', icon: '/settings.png', iconWidth: 27, iconHeight: 27 },
        { href: '/home', label: 'Home' },
        { href: '/archive', label: 'Archive' },
        { href: '/record', label: 'Record' },
        { href: '/notification', label: 'Notification' }
    ];
    return (
        <nav className='bg-secondary w-full py-4'>
            <div className='container mx-auto flex items-center justify-center sm:justify-start gap-4 flex-wrap'>
                <HeaderItem links={links} />
            </div>
        </nav>
    )
}

export default Header

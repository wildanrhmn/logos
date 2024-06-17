'use client';
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import useNotificationStore from "@/stores/notification";

const HeaderItem = ({ links }: { links: { href: string, label: string, icon?: string, iconWidth?: number, iconHeight?: number }[] }) => {
    const { isOpen, setIsOpen } = useNotificationStore();
    const currentPath = usePathname();
    return (
        <>
            {links.map(({ href, label, icon, iconWidth, iconHeight }) => (
                <Link key={href} href={href} className={clsx('p-2 rounded-full transition-all duration-300', {
                    'bg-[#CCBF9D]': currentPath === href,
                    'hover:bg-tertiary/85 bg-tertiary': currentPath !== href
                })}>
                    {icon ? (
                        <Image src={icon} alt={label} width={iconWidth} height={iconHeight} />
                    ) : (
                        <span className='py-2 px-12 rounded-3xl font-semibold text-sm sm:text-md'>{label}</span>
                    )}
                </Link>
            ))}
            <div onClick={() => setIsOpen(!isOpen)} className={clsx("py-2.5 transition-all duration-300 px-12 rounded-3xl font-semibold text-sm sm:text-md cursor-pointer", {
                'bg-[#CCBF9D]': isOpen,
                'hover:bg-tertiary/85 bg-tertiary': !isOpen
            })}>Notifications</div>
        </>
    )
}

export default HeaderItem
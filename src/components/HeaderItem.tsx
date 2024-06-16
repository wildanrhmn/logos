'use client';
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const HeaderItem = ({ links }: { links: { href: string, label: string, icon?: string, iconWidth?: number, iconHeight?: number }[] }) => {
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
        </>
    )
}

export default HeaderItem
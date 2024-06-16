"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { generatePagination } from "@/utils/generatePagination";
import { Icon } from "@iconify/react";

export default function Pagination({ totalPages }: { totalPages: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    const allPages = generatePagination(currentPage, totalPages);

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    return (
        <>
            <div className="inline-flex">
                <PaginationArrow
                    direction="left"
                    href={createPageURL(currentPage - 1)}
                    isDisabled={currentPage <= 1}
                />

                <div className="flex -space-x-px gap-3">
                    {allPages.map((page: any, index: any) => {
                        let position: "first" | "last" | "single" | "middle" | undefined;

                        if (index === 0) position = "first";
                        if (index === allPages.length - 1) position = "last";
                        if (allPages.length === 1) position = "single";
                        if (page === "...") position = "middle";

                        return (
                            <PaginationNumber
                                key={page}
                                href={createPageURL(page)}
                                page={page}
                                position={position}
                                isActive={currentPage === page}
                            />
                        );
                    })}
                </div>

                <PaginationArrow
                    direction="right"
                    href={createPageURL(currentPage + 1)}
                    isDisabled={currentPage >= totalPages}
                />
            </div>
        </>
    );
}

function PaginationNumber({
    page,
    href,
    isActive,
    position,
}: {
    page: number | string;
    href: string;
    position?: "first" | "last" | "middle" | "single";
    isActive: boolean;
}) {
    const className = clsx(
        "flex h-10 w-10  items-center justify-center text-sm border-2 border-tertiary font-semibold rounded-full",
        {
            "z-1 bg-[#CCBF9D] border-[#CCBF9D] text-black": isActive,
            "hover:bg-tertiary/80 bg-tertiary": !isActive && position !== "middle",
            "text-black/80": position === "middle",
        },
    );

    return isActive || position === "middle" ? (
        <div className={className}>{page}</div>
    ) : (
        <Link href={href} className={className}>
            {page}
        </Link>
    );
}

function PaginationArrow({
    href,
    direction,
    isDisabled,
}: {
    href: string;
    direction: "left" | "right";
    isDisabled?: boolean;
}) {
    const className = clsx(
        "flex h-10 w-10 items-center justify-center bg-tertiary font-semibold rounded-md border-2 border-tertiary",
        {
            "pointer-events-none text-black bg-tertiary/50": isDisabled,
            "hover:bg-tertiary/80": !isDisabled,
            "mr-2 md:mr-4": direction === "left",
            "ml-2 md:ml-4": direction === "right",
        },
    );

    const icon =
        direction === "left" ? (
            <Icon icon="formkit:arrowleft" className="w-4" />
        ) : (
            <Icon icon="formkit:arrowright" className="w-4" />
        );

    return isDisabled ? (
        <div className={className}>{icon}</div>
    ) : (
        <Link className={className} href={href}>
            {icon}
        </Link>
    );
}
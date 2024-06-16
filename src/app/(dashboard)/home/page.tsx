'use client';

import TenderTable from "@/components/TenderTable";
import placeholderData from "@/utils/placeholder-data.json";
import Pagination from "@/components/Pagination";
import { useSearchParams } from "next/navigation";

export default function HomePage() {
    //Dummy Data Pagination Implementation
    const itemsPerPage = 10;
    const totalPages = Math.ceil(placeholderData.length / itemsPerPage);
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return (
        <div className="mx-[3%]">
            <div className="w-full rounded-md overflow-x-scroll">
                <TenderTable tenders={placeholderData.slice(startIndex, endIndex)} />
            </div>
            <div className="flex items-center justify-center mt-5">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    )
}
import TenderTable from "@/components/TenderTable";
import placeholderData from "@/utils/placeholder-data.json";
import Pagination from "@/components/Pagination";
export const metadata = {
    title: "Homepage",
    description:
        "Logos - Homepage",
};

export default function HomePage() {
    return (
        <div className="mx-[3%]">
            <div className="w-full rounded-md overflow-x-scroll">
                <TenderTable tenders={placeholderData} />
            </div>
            <div className="flex items-center justify-center mt-5">
                {/* <Pagination totalPages={20} /> */}
            </div>
        </div>
    )
}
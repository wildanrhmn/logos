import TenderTable from "@/components/TenderTable";

export default function ArchivePage() {
    return (
        <div className="mx-[3%]">
            <div className="w-full rounded-md overflow-x-scroll">
                <TenderTable  />
            </div>
            <div className="flex items-center justify-center mt-5">
                {/* <Pagination totalPages={20} /> */}
            </div>
        </div>
    )
}
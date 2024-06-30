import TenderArchiveTable from "@/components/TenderArchiveTable";

export default async function ArchivePage() {
  return (
    <div>
      <div className="w-full rounded-md overflow-x-scroll lg:overflow-x-auto">
          <TenderArchiveTable />
      </div>
    </div>
  );
}

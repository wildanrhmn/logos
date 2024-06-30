import TenderTable from "@/components/TenderHomeTable";

export default async function HomePage() {
  return (
    <div>
      <div className="w-full rounded-md overflow-x-scroll lg:overflow-x-auto">
          <TenderTable />
      </div>
    </div>
  );
}

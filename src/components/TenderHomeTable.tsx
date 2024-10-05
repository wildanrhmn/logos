/** @format */

"use client";

// import useSWR from "swr";
import useUserStore from "@/stores/user";
import LoadingUI from "./LoadingUI";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import placeholderTenders from "@/utils/placeholder-tender.json";
import EmptyState from "./EmptyState";

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TenderHomeTable() {
  const { update } = useSession();
  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));
  
  // Using placeholder data instead of fetching
  const tenders = placeholderTenders;
  const isLoading = false;

  async function handleArchive(kode_tender: string) {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          if (user?.id) {
            setUser({
              ...user,
              archivedTenders: [...(user?.archivedTenders ?? []), kode_tender],
            });
            update({
              user: {
                ...user,
                archivedTenders: [...(user?.archivedTenders ?? []), kode_tender],
              },
            });
          }
          resolve(true);
        }, 1000);
      }),
      {
        loading: "Menyimpan proyek ke arsip...",
        success: "Proyek berhasil disimpan ke arsip",
        error: "Gagal menyimpan proyek ke arsip",
      }
    );
  }

  if (isLoading) return <LoadingUI />;

  return (
    <table className="w-full overflow-scroll">
      <thead>
        <tr className="text-sm font-semibold bg-tertiary">
          <th>No</th>
          <th className="min-w-96">Nama Proyek</th>
          <th>Penyelenggara</th>
          <th>Kode Kbli</th>
          <th>Kode Sbu</th>
          <th className="min-w-96">Lokasi</th>
          <th>Tanggal Pembuatan</th>
          <th>HPS</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {tenders && tenders.length > 0 ? (
          tenders
            .filter(
              (tender: any) =>
                !user?.archivedTenders?.includes(tender.kode_tender)
            )
            .map((tender: any, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className="whitespace-normal text-left">
                  {tender.nama_tender}
                </td>
                <td>{tender.instansi}</td>
                <td>{tender.kode_kbli === "N/A" ? "n/a" : tender.kode_kbli}</td>
                <td>{tender.kode_sbu === "N/A" ? "n/a" : tender.kode_sbu}</td>
                <td className="whitespace-normal text-left">
                  {tender.lokasi_pengerjaan}
                </td>
                <td>{tender.tanggal_pembuatan}</td>
                <td>{tender.nilai_hps_paket}</td>
                <td>
                  <svg
                    fill={
                      user?.archivedTenders?.includes(tender.kode_tender)
                        ? "#777777"
                        : "none"
                    }
                    className="cursor-pointer"
                    width="25px"
                    height="25px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#777777"
                    onClick={() => handleArchive(tender.kode_tender)}
                  >
                    <path
                      d="M5 6.2C5 5.07989 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.07989 3 8.2 3H15.8C16.9201 3 17.4802 3 17.908 3.21799C18.2843 3.40973 18.5903 3.71569 18.782 4.09202C19 4.51984 19 5.07989 19 6.2V21L12 16L5 21V6.2Z"
                      stroke="#777777"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </td>
              </tr>
            ))
        ) : (
          <tr>
            <td colSpan={9}>
              <EmptyState message="Tidak ada tender yang tersedia saat ini." />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

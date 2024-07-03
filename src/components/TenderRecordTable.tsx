/** @format */

"use client";

import useSWR from "swr";
import useUserStore from "@/stores/user";
import LoadingUI from "./LoadingUI";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TenderRecordTable() {
  const { update } = useSession();
  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/user/record/${user?.id}`,
    fetcher
  );

  async function handleUnrecord(kode_tender: string) {
    const updatedRecords =
      user?.recordedTenders?.filter(
        (tender: string) => tender !== kode_tender
      ) ?? [];

    toast.promise(
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/record/${user?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          records: updatedRecords,
        }),
      }).then(async (response) => {
        if (response.ok && user?.id) {
          setUser({ ...user, recordedTenders: updatedRecords });
          update({ user: { ...user, recordedTenders: updatedRecords } });
        }
      }),
      {
        loading: "Menghapus proyek dari rekaman...",
        success: "Proyek berhasil dihapus",
        error: "Gagal menghapus proyek",
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
          <th>Akhir Pendaftaran</th>
          <th>HPS</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.records.map((tender: any, index: number) => (
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
              <td>
                {
                  tender.tahapan_tender.find(
                    (tahap: any) => tahap.tahap === "Pembuktian Kualifikasi"
                  )?.sampai
                }
              </td>
              <td>{tender.nilai_hps_paket}</td>
              <td>
                <svg
                  fill={
                    user?.recordedTenders.includes(tender.kode_tender)
                      ? "#3CDB7F"
                      : "none"
                  }
                  className="cursor-pointer"
                  width="25px"
                  height="25px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => handleUnrecord(tender.kode_tender)}
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke={
                      user?.recordedTenders.includes(tender.kode_tender)
                        ? "#3CDB7F"
                        : "#777"
                    }
                    strokeWidth="1.5"
                  ></circle>
                  <path
                    d="M8.5 12.5L10.5 14.5L15.5 9.5"
                    stroke={
                      user?.recordedTenders.includes(tender.kode_tender)
                        ? "#FFFFFF"
                        : "#777"
                    }
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

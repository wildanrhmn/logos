/** @format */

"use client";

import { useState, useEffect } from "react";
import useUserStore from "@/stores/user";
import LoadingUI from "./LoadingUI";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import placeholderTenders from "@/utils/placeholder-tender.json";
import EmptyState from "./EmptyState";

export default function TenderRecordTable() {
  const { update } = useSession();
  const { user, setUser, unrecordTender } = useUserStore();
  const [recordedTenders, setRecordedTenders] = useState([]);

  useEffect(() => {
    // Filter placeholderTenders based on user's recordedTenders
    const filteredTenders = placeholderTenders.filter(tender =>
      user?.recordedTenders.includes(tender.kode_tender)
    );
    setRecordedTenders(filteredTenders as any);
  }, [user?.recordedTenders]);

  async function handleUnrecord(kode_tender: string) {
    toast.promise(
      new Promise((resolve) => {
        unrecordTender(kode_tender);
        resolve(null);
      }),
      {
        loading: "Menghapus proyek dari rekaman...",
        success: "Proyek berhasil dihapus dari rekaman",
        error: "Gagal menghapus proyek dari rekaman",
      }
    );
    update({ user });
  }

  if (!user) return <LoadingUI />;
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
        {recordedTenders && recordedTenders.length > 0 ? (
          recordedTenders.map((tender: any, index: number) => (
            <tr key={tender.kode_tender}>
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
                  fill="#3CDB7F"
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
                    stroke="#3CDB7F"
                    strokeWidth="1.5"
                  ></circle>
                  <path
                    d="M8.5 12.5L10.5 14.5L15.5 9.5"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={9}>
              <EmptyState message="Tidak ada tender yang direkam saat ini." />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

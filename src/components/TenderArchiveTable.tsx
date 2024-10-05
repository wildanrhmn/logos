/** @format */

"use client";

import { useState, useEffect } from "react";
import useUserStore from "@/stores/user";
import LoadingUI from "./LoadingUI";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import placeholderTenders from "@/utils/placeholder-tender.json";
import EmptyState from "./EmptyState";

export default function TenderArchiveTable() {
  const { update } = useSession();
  const { user, setUser, unarchiveTender, recordTender } = useUserStore();
  const [archivedTenders, setArchivedTenders] = useState([]);

  useEffect(() => {
    // Filter placeholderTenders based on user's archivedTenders
    const filteredTenders = placeholderTenders.filter(tender =>
      user?.archivedTenders.includes(tender.kode_tender)
    );
    setArchivedTenders(filteredTenders as any);
  }, [user?.archivedTenders]);

  async function handleUnarchive(kode_tender: string) {
    toast.promise(
      new Promise((resolve) => {
        unarchiveTender(kode_tender);
        resolve(null);
      }),
      {
        loading: "Menghapus proyek dari arsip...",
        success: "Proyek berhasil dihapus dari arsip",
        error: "Gagal menghapus proyek dari arsip",
      }
    );
    update({ user });
  }

  async function handleRecord(kode_tender: string) {
    toast.promise(
      new Promise((resolve) => {
        recordTender(kode_tender);
        resolve(null);
      }),
      {
        loading: "Merekam proyek...",
        success: "Proyek berhasil direkam",
        error: "Gagal merekam proyek",
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
        {archivedTenders && archivedTenders.length > 0 ? (
          archivedTenders.map((tender: any, index: number) => (
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
              <td className="flex gap-2">
                <svg
                  fill="#777777"
                  className="cursor-pointer"
                  width="25px"
                  height="25px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#777777"
                  onClick={() => handleUnarchive(tender.kode_tender)}
                >
                  <path
                    d="M5 6.2C5 5.07989 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.07989 3 8.2 3H15.8C16.9201 3 17.4802 3 17.908 3.21799C18.2843 3.40973 18.5903 3.71569 18.782 4.09202C19 4.51984 19 5.07989 19 6.2V21L12 16L5 21V6.2Z"
                    stroke="#777777"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <svg
                  fill={
                    user.recordedTenders.includes(tender.kode_tender)
                      ? "#3CDB7F"
                      : "none"
                  }
                  className="cursor-pointer"
                  width="25px"
                  height="25px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => handleRecord(tender.kode_tender)}
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke={
                      user.recordedTenders.includes(tender.kode_tender)
                        ? "#3CDB7F"
                        : "#777"
                    }
                    strokeWidth="1.5"
                  ></circle>
                  <path
                    d="M8.5 12.5L10.5 14.5L15.5 9.5"
                    stroke={
                      user.recordedTenders.includes(tender.kode_tender)
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
          ))
        ) : (
          <tr>
            <td colSpan={9}>
              <EmptyState message="Tidak ada tender yang diarsipkan saat ini." />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

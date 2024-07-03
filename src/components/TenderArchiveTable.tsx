/** @format */

"use client";

import useSWR from "swr";
import useUserStore from "@/stores/user";
import LoadingUI from "./LoadingUI";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TenderArchiveTable() {
  const { update } = useSession();
  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/user/archive/${user?.id}`,
    fetcher
  );

  async function handleUnarchive(kode_tender: string) {
    const updatedArchives =
      user?.archivedTenders.filter(
        (tender: string) => tender !== kode_tender
      ) ?? [];

    toast.promise(
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/archive/${user?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          archives: updatedArchives,
        }),
      }).then(async (response) => {
        if (response.ok && user?.id) {
          setUser({ ...user, archivedTenders: updatedArchives });
          update({ user: { ...user, archivedTenders: updatedArchives } });
        }
      }),
      {
        loading: "Menghapus proyek dari arsip...",
        success: "Proyek berhasil dihapus dari arsip",
        error: "Gagal menghapus proyek dari arsip",
      }
    );
  }

  async function handleRecord(kode_tender: string) {
    toast.promise(
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/record/${user?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          records: [...(user?.recordedTenders ?? []), kode_tender],
        }),
      }).then(async (response) => {
        if (response.ok && user?.id) {
          setUser({
            ...user,
            recordedTenders: [...(user?.recordedTenders ?? []), kode_tender],
          });
          update({
            user: {
              ...user,
              recordedTenders: [...(user?.recordedTenders ?? []), kode_tender],
            },
          });
        }
      }),
      {
        loading: "Merekam proyek...",
        success: "Proyek berhasil direkam",
        error: "Gagal merekam proyek",
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
          data?.archives
            ?.filter(
              (tender: any) =>
                !user?.recordedTenders.includes(tender.kode_tender)
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
                    fill={
                      user?.archivedTenders.includes(tender.kode_tender)
                        ? "#777777"
                        : "none"
                    }
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
                      user?.recordedTenders.includes(tender.kode_tender)
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

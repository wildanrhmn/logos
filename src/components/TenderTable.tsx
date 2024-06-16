"use client";

import { ITender } from "@/interfaces/tender.interface";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";

const TenderTable = ({ tenders }: { tenders: ITender[] }) => {
    return (
        <table className="w-full overflow-scroll">
            <thead>
                <tr className="text-sm font-semibold bg-tertiary">
                    <th>No</th>
                    <th>Nama Proyek</th>
                    <th>Penyelenggara</th>
                    <th>Lokasi</th>
                    <th>Akhir Pendaftaran</th>
                    <th>HPS</th>
                    <th>Status</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {tenders.map((tender, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="flex items-center gap-2">
                            <DataWithPopOver value={tender.nama_tender} />
                        </td>
                        <td>{tender.instansi}</td>
                        <td className="flex items-center gap-2">
                            <DataWithPopOver value={tender.lokasi_pengerjaan} />
                        </td>
                        <td>{tender.tanggal_pembuatan}</td>
                        <td>{tender.nilai_hps_paket}</td>
                        <td>Pembukaan Dokumen Penawaran</td>
                        <td>
                            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#777777">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path d="M5 6.2C5 5.07989 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.07989 3 8.2 3H15.8C16.9201 3 17.4802 3 17.908 3.21799C18.2843 3.40973 18.5903 3.71569 18.782 4.09202C19 4.51984 19 5.07989 19 6.2V21L12 16L5 21V6.2Z" stroke="#777777" stroke-width="2" stroke-linejoin="round"></path>
                                </g>
                            </svg>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TenderTable;

function DataWithPopOver({ value }: { value: string }) {
    return (
        <>
            <p className="text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[350px]">
                {value}
            </p>
            <Popover placement="bottom" showArrow>
                <PopoverTrigger>
                    <Image
                        src="/eye.png"
                        alt="View"
                        width={20}
                        height={20}
                        className="cursor-pointer"
                    />
                </PopoverTrigger>
                <PopoverContent>
                    <p className="py-2 px-3 bg-black/80 text-white text-sm">
                        {value}
                    </p>
                </PopoverContent>
            </Popover>
        </>

    );
}

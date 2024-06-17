"use client";

import { ITender } from "@/interfaces/tender.interface";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { usePathname } from "next/navigation";
import useUserStore from "@/stores/user";
import toast from "react-hot-toast";

const TenderTable = ({ tenders }: { tenders?: ITender[] }) => {
    const { archiveTender, unarchiveTender, recordTender, unrecordTender, user } = useUserStore(state => ({
        archiveTender: state.archiveTender,
        unarchiveTender: state.unarchiveTender,
        recordTender: state.recordTender,
        unrecordTender: state.unrecordTender,
        user: state.user
    }));
    const pathname = usePathname();

    const handleArchive = (tender: ITender) => {
        if (!isArchived(tender)) {
            archiveTender(tender);
            toast.success("Tender successfully archived");
        } else {
            unarchiveTender(tender);
            toast.success("Tender successfully unarchived");
        }
    };

    const handleRecord = (tender: ITender) => {
        if (!isRecorded(tender)) {
            recordTender(tender);
            toast.success("Tender successfully recorded");
        } else {
            unrecordTender(tender);
            toast.success("Tender successfully unrecorded");
        }
    };

    const isRecorded = (tender: ITender) => user?.recordedTenders.includes(tender);
    const isArchived = (tender: ITender) => user?.archivedTenders.includes(tender);

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
                {pathname === '/home' && tenders && tenders.map((tender, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="flex items-center gap-2"><DataWithPopOver value={tender.nama_tender} /></td>
                        <td>{tender.instansi}</td>
                        <td className="flex items-center gap-2"><DataWithPopOver value={tender.lokasi_pengerjaan} /></td>
                        <td>{tender.tanggal_pembuatan}</td>
                        <td>{tender.nilai_hps_paket}</td>
                        <td>Pembukaan Dokumen Penawaran</td>
                        <td>
                            <svg onClick={() => handleArchive(tender)} className="cursor-pointer" width="25px" height="25px" viewBox="0 0 24 24" fill={isArchived(tender) ? '#777777' : 'none'} xmlns="http://www.w3.org/2000/svg" stroke="#777777">
                                <path d="M5 6.2C5 5.07989 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.07989 3 8.2 3H15.8C16.9201 3 17.4802 3 17.908 3.21799C18.2843 3.40973 18.5903 3.71569 18.782 4.09202C19 4.51984 19 5.07989 19 6.2V21L12 16L5 21V6.2Z" stroke="#777777" strokeWidth="2" strokeLinejoin="round"></path>
                            </svg>
                        </td>
                    </tr>
                ))}
                {pathname === '/archive' && user?.archivedTenders.map((tender, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="flex items-center gap-2"><DataWithPopOver value={tender.nama_tender} /></td>
                        <td>{tender.instansi}</td>
                        <td className="flex items-center gap-2"><DataWithPopOver value={tender.lokasi_pengerjaan} /></td>
                        <td>{tender.tanggal_pembuatan}</td>
                        <td>{tender.nilai_hps_paket}</td>
                        <td>Pembukaan Dokumen Penawaran</td>
                        <td className="flex items-center gap-1">
                            <svg onClick={() => handleArchive(tender)} className="cursor-pointer" width="25px" height="25px" viewBox="0 0 24 24" fill={isArchived(tender) ? '#777777' : 'none'} xmlns="http://www.w3.org/2000/svg" stroke="#777777">
                                <path d="M5 6.2C5 5.07989 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.07989 3 8.2 3H15.8C16.9201 3 17.4802 3 17.908 3.21799C18.2843 3.40973 18.5903 3.71569 18.782 4.09202C19 4.51984 19 5.07989 19 6.2V21L12 16L5 21V6.2Z" stroke="#777777" strokeWidth="2" strokeLinejoin="round"></path>
                            </svg>
                            <svg onClick={() => handleRecord(tender)} className="cursor-pointer" width="25px" height="25px" viewBox="0 0 24 24" fill={isRecorded(tender) ? '#3CDB7F' : 'none'} xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" stroke={isRecorded(tender) ? '#3CDB7F' : '#777'} strokeWidth="1.5"></circle>
                                <path d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke={isRecorded(tender) ? '#FFFFFF' : '#777'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </td>
                    </tr>
                ))}
                {pathname === '/record' && user?.recordedTenders.map((tender, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="flex items-center gap-2"><DataWithPopOver value={tender.nama_tender} /></td>
                        <td>{tender.instansi}</td>
                        <td className="flex items-center gap-2"><DataWithPopOver value={tender.lokasi_pengerjaan} /></td>
                        <td>{tender.tanggal_pembuatan}</td>
                        <td>{tender.nilai_hps_paket}</td>
                        <td>Pembukaan Dokumen Penawaran</td>
                        <td className="flex items-center gap-1">
                            <svg onClick={() => handleArchive(tender)} className="cursor-pointer" width="25px" height="25px" viewBox="0 0 24 24" fill={isArchived(tender) ? '#777777' : 'none'} xmlns="http://www.w3.org/2000/svg" stroke="#777777">
                                <path d="M5 6.2C5 5.07989 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.07989 3 8.2 3H15.8C16.9201 3 17.4802 3 17.908 3.21799C18.2843 3.40973 18.5903 3.71569 18.782 4.09202C19 4.51984 19 5.07989 19 6.2V21L12 16L5 21V6.2Z" stroke="#777777" strokeWidth="2" strokeLinejoin="round"></path>
                            </svg>
                            <svg onClick={() => handleRecord(tender)} className="cursor-pointer" width="25px" height="25px" viewBox="0 0 24 24" fill={isRecorded(tender) ? '#3CDB7F' : 'none'} xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" stroke={isRecorded(tender) ? '#3CDB7F' : '#777'} strokeWidth="1.5"></circle>
                                <path d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke={isRecorded(tender) ? '#FFFFFF' : '#777'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
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
        <div className="flex justify-between w-full gap-2">
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
        </div>
    );
}

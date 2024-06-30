export interface ITender {
    _id: string;
    kode_tender: string;
    nama_tender: string;
    jenis_pengadaan: string;
    instansi: string;
    satuan_kerja: string;
    tahun_anggaran: string;
    nilai_hps_paket: string;
    lokasi_pengerjaan: string;
    peserta_tender: string;
    is_show: boolean;
    date_added: string;
    anchor: string;
    kode_sbu: string;
    kode_kbli: string;
    tahapan_tender: object[];
}
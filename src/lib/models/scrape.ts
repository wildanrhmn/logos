import mongoose from "mongoose";

const scrape_schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  kode_tender: String,
  nama_tender: String,
  jenis_pengadaan: String,
  instansi: String,
  satuan_kerja: String,
  tahun_anggaran: String,
  nilai_hps_paket: String,
  lokasi_pengerjaan: String,
  peserta_tender: String,
  is_show: Boolean,
  date_added: String,
  anchor: String,
  kode_sbu: String,
  kode_kbli: String,
  tahapan_tender: [Object],
});

const Scrape = mongoose.model("scrapes", scrape_schema);

export default Scrape;
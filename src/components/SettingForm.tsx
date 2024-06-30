/** @format */
"use client";

import { useEffect, useState } from "react";
import InputComp from "./InputComp";
import EditableItem from "./EditableItem";

import dummy from "@/utils/setting-dummy.json";

export default function SettingForm() {
  const [setting, setSetting] = useState<{ [key: string]: string }>(dummy);

  useEffect(() => {
    const getSetting = () => {
      setSetting(dummy);
    };

    getSetting();
  }, []);

  function setData(inputData: string, typeData: string, isArray: boolean) {
    if (isArray) {
      const arrData = setting[typeData].split(",") || [];

      arrData.push(inputData);
      setSetting({ ...setting, [typeData]: arrData.join() });
    } else {
      setSetting({ ...setting, [typeData]: inputData });
    }
  }

  function removeData(inputData: string, typeData: string) {
    const tempArr = setting[typeData].split(",") || [];
    const indexValue = tempArr.indexOf(inputData);

    tempArr.splice(indexValue, 1);
    setSetting({ ...setting, [typeData]: tempArr.join() });
  }

  return (
    <div className="my-10 bg-grey p-5 w-full rounded-md ">
      <h1 className="text-4xl font-bold mb-4">SETTING</h1>
      <ul className="space-y-4">
        <li>
          <h2 className="font-bold mb-2">Penyelenggara Proyek</h2>
          <InputComp
            setData={setData}
            variant="select"
            data={{
              options: [
                "Kementerian Agama",
                "Kementerian Pendidikan Kebudayaan Riset dan Teknologi",
                "Kementerian Kesehatan",
                "Kementerian Kelautan Dan Perikanan",
                "Kementerian Pekerjaan Umum dan Perumahan Rakyat",
                "Kementrian Keuangan",
                "Provinsi DKI Jakarta",
                "Provinsi Banten",
                "Provinsi Jawa Tengah",
                "Provinsi Jawa Barat",
                "Provinsi Jawa Timur",
                "Provinsi DI Yogyakarta",
                "Kota Tangerang",
                "Kab. Tangerang",
                "Kota Tangerang Selatan",
                "Kota Depok",
                "Kota Bekasi",
                "Kab. Bekasi",
              ],
              type: "penyelenggara_proyek",
            }}
          />
          <p className="flex w-full py-2 gap-2">
            {setting.penyelenggara_proyek.split(",").map((each, index) => (
              <>
                {each !== "" ? (
                  <EditableItem
                    type="penyelenggara_proyek"
                    data={each}
                    key={index}
                    removeData={removeData}
                  />
                ) : null}
              </>
            ))}
          </p>
        </li>
        <li>
          <h2 className="font-bold mb-2">Jenis Proyek</h2>
          <InputComp
            setData={setData}
            variant="select"
            data={{
              options: [
                "Pengadaan Barang",
                "Jasa Konsultansi Badan Usaha Non Konstruksi",
                "Pekerjaan Konstruksi",
                "Jasa Konsultansi Perorangan Non Konstruksi",
                "Jasa Konsultansi Badan Usaha Konstruksi",
                "Jasa Konsultansi Perorangan Konstruksi",
                "Pekerjaan Konstruksi Terintegrasi",
                "Jasa Lainnya",
              ],
              type: "jenis_proyek",
            }}
          />
          <p className="flex w-full py-2 gap-2">
            {setting.jenis_proyek.split(",").map((each, index) => (
              <>
                {each !== "" ? (
                  <EditableItem
                    type="jenis_proyek"
                    data={each}
                    key={index}
                    removeData={removeData}
                  />
                ) : null}
              </>
            ))}
          </p>
        </li>
        {/* <li>
          <h2 className="font-bold mb-2">Lokasi Proyek</h2>
          <InputComp
            setData={setData}
            variant="select"
            data={{
              options: ["DKI Jakarta", "Banten", "Jawa Barat", "Jawa Tengah"],
              type: "lokasi_proyek",
            }}
          />
          <p className="flex w-full py-2 gap-2">
            {setting.lokasi_proyek.split(",").map((each, index) => (
              <>
                {each !== "" ? (
                  <EditableItem
                    type="lokasi_proyek"
                    data={each}
                    key={index}
                    removeData={removeData}
                  />
                ) : null}
              </>
            ))}
          </p>
        </li> */}
        <li>
          <h2 className="font-bold mb-2">Nilai Proyek</h2>
          <InputComp
            setData={setData}
            variant="number"
            data={{ selected: setting.nilai_proyek, type: "nilai_proyek" }}
          />
        </li>
        <li>
          <h2 className="font-bold mb-2">HBU</h2>
          <InputComp
            setData={setData}
            variant="text"
            data={{ selected: setting.hbu, type: "hbu" }}
          />
        </li>
        <li>
          <h2 className="font-bold mb-2">KBLI</h2>
          <InputComp
            setData={setData}
            variant="text"
            data={{ selected: setting.kbli, type: "kbli" }}
          />
        </li>
        <li>
          <button className="px-4 py-2 rounded-full bg-tertiary flex gap-2">
            Save
          </button>
        </li>
      </ul>
    </div>
  );
}

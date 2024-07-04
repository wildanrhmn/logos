/** @format */
"use client";

import { useEffect, useState } from "react";
import InputComp from "./InputComp";
import EditableItem from "./EditableItem";
import useUserStore from "@/stores/user";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

import dummy from "@/utils/setting-dummy.json";
import { type } from "os";

interface Config {
  penyelenggara_proyek: string[];
  jenis_proyek: string[];
  nilai_proyek: {
    min: number;
    max: number;
  };
  hbu: null;
  kbli: null;
}

export default function SettingForm() {
  const { update } = useSession();
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));

  const [setting, setSetting] = useState<Config>(dummy);
  const [instansi, setInstansi] = useState(["Provinsi DKI Jakarta"]);

  useEffect(() => {
    const getSetting = () => {
      if (user) {
        setSetting(user?.config);
      }
    };

    const getInstansi = () => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/scrape/instansi`, {
        method: "GET",
      }).then(async (response) => {
        const { data } = await response.json();
        setInstansi(data);
      });
    };

    getSetting();
    getInstansi();
  }, [user]);

  function setData(
    inputData: string,
    typeData: keyof Config | "min" | "max",
    isArray: boolean
  ) {
    if (isArray) {
      const arrData = setting[typeData as keyof Config] as string[];

      arrData.push(inputData);
      setSetting({ ...setting, [typeData]: arrData });
    } else {
      if (typeData === "max" || typeData === "min") {
        setSetting({
          ...setting,
          nilai_proyek: {
            ...setting.nilai_proyek,
            [typeData]: parseInt(inputData),
          },
        });
      } else {
        setSetting({ ...setting, [typeData]: inputData });
      }
    }
  }

  function removeData(inputData: string, typeData: keyof Config) {
    const tempArr = setting[typeData] as string[];
    const indexValue = tempArr.indexOf(inputData);

    tempArr.splice(indexValue, 1);
    setSetting({ ...setting, [typeData]: tempArr });
  }

  function updateConfig() {
    toast.promise(
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/config/${user?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(setting),
      }).then(async (response) => {
        const data = await response.json();
        update({
          user: {
            ...user,
            config: data.config,
          },
        });
      }),
      {
        loading: "Memperbarui config...",
        success: "Config berhasil diperbarui",
        error: "Gagal memperbarui config",
      }
    );
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
              options: instansi,
              type: "penyelenggara_proyek",
            }}
          />
          <p className="flex w-full py-2 gap-2">
            {setting.penyelenggara_proyek.map((each, index) => (
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
            {setting.jenis_proyek.map((each, index) => (
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
        <h2 className="font-bold mb-2">Nilai Proyek</h2>
        <div className="flex gap-10 justify-stretch">
          <li>
            <h2 className="font-bold mb-2">Min</h2>
            <InputComp
              setData={setData}
              variant="number"
              data={{
                selected: setting.nilai_proyek.min,
                type: "min",
              }}
            />
          </li>
          <li>
            <h2 className="font-bold mb-2">Max</h2>
            <InputComp
              setData={setData}
              variant="number"
              data={{
                selected: setting.nilai_proyek.max,
                type: "max",
              }}
            />
          </li>
        </div>

        <li>
          <h2 className="font-bold mb-2">SBU</h2>
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
          <button
            className="px-4 py-2 rounded-full bg-tertiary flex gap-2"
            onClick={() => updateConfig()}
          >
            Save
          </button>
        </li>
      </ul>
    </div>
  );
}

/** @format */

"use client";

interface Props {
  variant: string;
  data: any;
  setData: any;
}

export default function InputComp({ variant, data, setData }: Props) {
  switch (variant) {
    case "select":
      return (
        <select
          className="w-full p-2 mb-2"
          onChange={(e) => setData(e.target.value, data.type, true)}
        >
          <option value="" disabled selected className="hidden">
            Click Here
          </option>

          {data.options.map((each: string, index: number) => (
            <option key={`${index + 1} option`} value={each}>
              {each}
            </option>
          ))}
        </select>
      );
    case "text":
      return (
        <input
          className="w-full p-2 mb-2"
          type="text"
          value={data.selected}
          onChange={(e) => setData(e.target.value, data.type, false)}
        />
      );
    case "number":
      return (
        <input
          className="w-full p-2 mb-2"
          type="number"
          value={data.selected}
          onChange={(e) => setData(e.target.value, data.type, false)}
        />
      );
    default:
      return null;
  }
}

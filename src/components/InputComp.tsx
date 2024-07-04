/** @format */

"use client";

interface Props {
  variant: string;
  data: any;
  setData: any;
}

export default function InputComp({ variant, data, setData }: Props) {
  const formatNumber = (number: any) => {
    const parsed_number = number.toString();
    return parsed_number.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const setDataNumber = (value: string) => {
    const parsed_value = parseInt(value.replace(/\./g, ""));
    setData(parsed_value, data.type, false);
  };

  switch (variant) {
    case "select":
      return (
        <select
          className="w-full p-2 mb-2"
          onChange={(e) => setData(e.target.value, data.type, true)}
          defaultValue=""
        >
          <option value="" disabled className="hidden">
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
          value={data.selected || ""}
          onChange={(e) => setData(e.target.value, data.type, false)}
        />
      );
    case "number":
      return (
        <input
          className="w-full p-2 mb-2"
          type="text"
          value={data.selected ? formatNumber(data.selected) : "0"}
          onChange={(e) => setDataNumber(e.target.value)}
        />
      );
    default:
      return null;
  }
}

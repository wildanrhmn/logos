'use client';

/** @format */

interface Props {
  data: string;
  itemKey: number;
  type: string;
  removeData: any;
}

export default function EditableItem({ data, itemKey, type, removeData }: Props) {
  return (
    <div className="px-4 py-2 rounded-full bg-[#CCBF9D] flex gap-2" key={itemKey}>
      {data}
      <button onClick={() => removeData(data, type)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="#ff0000"
            d="M7 12c0 .55.45 1 1 1h8c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1m5-10C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8"
          />
        </svg>
      </button>
    </div>
  );
}

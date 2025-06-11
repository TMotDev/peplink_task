import { useMemo, useState } from "react";

export type User = {
  id: number;
  name: string;
  occupation: string;
  gender: string;
  age: number;
};

export type NewUser = {
  name: string;
  occupation: string;
  gender: string;
  age: number;
};

interface UserTableProps {
  data: User[];
  onDeleteUsers: (selectedIds: number[]) => void;
}

export default function UserTable({ data, onDeleteUsers }: UserTableProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [sortType, setSortType] = useState<string>("id");
  const [sortDirection, setSortDirection] = useState<string>("asc");

  const sortedData = useMemo(() => {
    console.log(sortType, sortDirection);
    return [...data].sort((a, b) => {
      let value1, value2;
      switch (sortType) {
        case "name":
          value1 = a.name;
          value2 = b.name;
          break;
        case "gender":
          value1 = a.gender;
          value2 = b.gender;
          break;
        case "age":
          value1 = a.age;
          value2 = b.age;
          break;
        case "id":
          value1 = a.id;
          value2 = b.id;
          break;
      }
      if (sortDirection === "desc") {
        [value2, value1] = [value1, value2];
      }

      if (typeof value1 === "string" && typeof value2 === "string") {
        return value1.localeCompare(value2);
      } else {
        return (value1 as number) - (value2 as number);
      }
    });
  }, [data, sortType, sortDirection]);

  function handleDeletion() {
    onDeleteUsers(selectedIds);
    setSelectedIds([]);
  }

  function handleSelect(id: number): void {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center w-full mb-3">
        <div className="flex gap-2 flex-col justify-center items-start">
          <span className="text-gray-700 font-medium">Sort by:</span>
          <div className="flex">
            <div className="flex bg-gray-200 rounded-l-lg p-1">
              <button
                onClick={() => {
                  setSortType("name");
                }}
                className={`px-3 cursor-pointer py-1.5 text-sm font-medium rounded-md ${
                  sortType === "name"
                    ? "bg-white text-blue-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Name
              </button>
              <button
                onClick={() => {
                  setSortType("gender");
                }}
                className={`px-3 cursor-pointer py-1.5 text-sm font-medium rounded-md ${
                  sortType === "gender"
                    ? "bg-white text-blue-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Gender
              </button>
              <button
                onClick={() => {
                  setSortType("age");
                }}
                className={`px-3 cursor-pointer py-1.5 text-sm font-medium rounded-md ${
                  sortType === "age"
                    ? "bg-white text-blue-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Age
              </button>
              <button
                onClick={() => {
                  setSortType("id");
                  setSortDirection("asc");
                }}
                className={`px-3 cursor-pointer py-1.5 text-sm font-medium rounded-md ${
                  sortType === "id"
                    ? "bg-white text-blue-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Default
              </button>
            </div>
            <button
              onClick={() => {
                setSortDirection(sortDirection === "asc" ? "desc" : "asc");
              }}
              className="cursor-pointer bg-gray-200 p-1 flex items-center rounded-r-lg"
            >
              <span className="bg-white text-blue-600 px-3 py-1.5 text-sm font-medium rounded-sm">
                {sortType === "name"
                  ? sortDirection === "asc"
                    ? "A - Z"
                    : "Z - A"
                  : sortType === "gender"
                    ? sortDirection === "asc"
                      ? "Female First"
                      : "Male First"
                    : sortDirection === "asc"
                      ? "Ascending ▲"
                      : "Descending ▼"}
              </span>
            </button>
          </div>
        </div>
        <button
          disabled={selectedIds.length === 0}
          title="Select Users To Delete"
          onClick={() => handleDeletion()}
          className={`px-6 self-end py-2.5 font-medium text-sm rounded-lg transition-all duration-200 ${
            selectedIds.length === 0
              ? "bg-red-100 text-gray-400 cursor-not-allowed"
              : "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 hover:shadow-md active:scale-[0.98] cursor-pointer"
          }`}
        >
          Delete {selectedIds.length > 0 && `(${selectedIds.length})`}
        </button>
      </div>
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-50 border border-gray-300">
          <tr>
            <th className="w-12 px-4 py-3 text-left"></th>
            <th className="px-4 py-3 text-left font-medium text-gray-900">
              Name
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-900">
              Occupation
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-900">
              Gender
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-900">
              Age
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedData.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td
                className="cursor-pointer px-4 py-3"
                onClick={() => handleSelect(item.id)}
              >
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item.id)}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleSelect(item.id);
                  }}
                  className="cursor-pointer w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
              </td>
              <td className="px-4 py-3 text-gray-900">{item.name}</td>
              <td className="px-4 py-3 text-gray-600">{item.occupation}</td>
              <td className="px-4 py-3 text-gray-600">{item.gender}</td>
              <td className="px-4 py-3 text-gray-600">{item.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

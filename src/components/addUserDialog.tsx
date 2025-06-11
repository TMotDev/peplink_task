import { useRef, useState } from "react";
import type { NewUser } from "./userTable";

export default function AddUserDialog({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: NewUser) => void;
}) {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(0);

  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formData = new FormData(formRef.current!);
    const entries = Object.fromEntries(formData.entries());

    const data: NewUser = {
      name: String(entries.name),
      occupation: String(entries.occupation),
      gender: String(entries.gender),
      age: Number(entries.age),
    };

    console.log(data);

    // handle submit outside
    onSubmit(data);

    // clear inputs
    formRef.current?.reset();
    setGender("");
    setAge(0);
  }

  return (
    <div className="p-8">
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onDoubleClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 relative">
            <button
              onClick={onClose}
              className="cursor-pointer absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl font-bold w-6 h-6 flex items-center justify-center"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-4 pr-8">Add New User</h2>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  autoComplete="given-name"
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label
                  htmlFor="occupation"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Occupation
                </label>
                <input
                  autoComplete=""
                  type="text"
                  id="occupation"
                  name="occupation"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={gender === "Male"}
                      onChange={() => setGender("Male")}
                      className="cursor-pointer"
                    />
                    Male
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={gender === "Female"}
                      onChange={() => setGender("Female")}
                      className="cursor-pointer"
                    />
                    Female
                  </label>
                </div>
              </div>

              <div>
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value))}
                  min="1"
                  max="120"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="cursor-pointer disabled:bg-blue-300 flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  disabled={age <= 0}
                >
                  Add User
                </button>
                <button
                  onClick={onClose}
                  type="button"
                  className="cursor-pointer flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

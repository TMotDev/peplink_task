import { useEffect, useState } from "react";
import AddUserDialog from "../components/addUserDialog";
import UserTable, { type NewUser, type User } from "../components/userTable";

export const Route = createFileRoute({
  component: UsersPage,
});

function generateId(): number {
  return Math.floor(1000 + Math.random() * 90000);
}

const defaultData: User[] = [
  {
    id: 1,
    name: "John Doe",
    occupation: "Software Engineer",
    gender: "Male",
    age: 28,
  },
  {
    id: 2,
    name: "Jane Smith",
    occupation: "Designer",
    gender: "Female",
    age: 32,
  },
  {
    id: 3,
    name: "Tom Mot",
    occupation: "Front-End Developer",
    gender: "Male",
    age: 21,
  },
];

function UsersPage() {
  const [data, setData] = useState<User[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // no api, playing with localstorage
  useEffect(() => {
    setIsLoading(true);

    const storedData = localStorage.getItem("userData");
    const parsedData = storedData ? JSON.parse(storedData) : null;
    setData(
      Array.isArray(parsedData) && parsedData.length > 0
        ? parsedData
        : defaultData
    );

    setIsLoading(false);
  }, []);

  // save locally everytime data changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("userData", JSON.stringify(data));
    }
  }, [data, isLoading]);

  function handleDeleteUsers(selectedIds: number[]) {
    // api.deleteUser(id)
    setData(data.filter((item) => !selectedIds.includes(item.id)));
  }

  function handleAddUser(newUser: NewUser): void {
    // api.addUser(newUser)
    setData((prevData) => [...prevData, { ...newUser, id: generateId() }]);

    setIsDialogOpen(false);
  }

  return (
    <>
      <title>Peplink Task - Users</title>
      <main className="flex-grow flex justify-center items-center p-4 flex-col">
        <div className="md:w-2/3 w-full">
          <div className="flex justify-between items-center w-full mb-6">
            <button
              onClick={() => setIsDialogOpen(true)}
              className="cursor-pointer hover:bg-blue-100 px-4 py-2 bg-blue-200 text-blue-600 rounded-md text-sm font-medium"
            >
              Add New User
            </button>
          </div>
          <UserTable data={data} onDeleteUsers={handleDeleteUsers} />
        </div>
      </main>
      <AddUserDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          console.log(isDialogOpen);
        }}
        onSubmit={(data) => handleAddUser(data)}
      />
    </>
  );
}

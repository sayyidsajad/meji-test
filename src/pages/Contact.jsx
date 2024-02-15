import { useState } from "react";
import { useEffect } from "react";
import extractUppercase from "../utility/upperCase";
import { useLocation } from "react-router-dom";
import { Modal } from "antd";
import Details from "./Details";
function Contact() {
  const [data, setData] = useState([]);
  const [open, setopen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const state = useLocation();
  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setopen(true);
  };

  const fetchData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const result = await response.json();
    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateData = async () => {
    try {
      await fetchData();

      if (state?.state?.id) {
        const updatedData = data.map((user) => {
          if (user.id === state.state.id) {
            return {
              ...user,
              name: state.state.name || user.name,
              username: state.state.username || user.username,
              companyName: state.state.companyName || user.companyName,
              catchPhrase: state.state.catchPhrase || user.catchPhrase,
              address: state.state.address || user.address,
            };
          }
          return user;
        });

        setData(updatedData);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  useEffect(() => {
    updateData();
  }, []);
  return (
    <>
      <section className="bg-white py-6 sm:py-8 lg:py-6 p-20">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <div className="mb-10 md:mb-5">
            <h2 className="mb-4 text-2xl font-bold text-gray-800 md:mb-3 lg:text-3xl">
              User Card Lists
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-2 xl:grid-cols-2 xl:gap-8">
            {data &&
              data.map((user, index) => (
                <article
                  key={index}
                  className="flex flex-col items-center gap-4 md:flex-row lg:gap-4"
                >
                  <a
                    href="#"
                    className="group relative h-56 w-full shrink-0 self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-20 lg:w-35 flex"
                  >
                    <img
                      src={`https://placehold.co/600x400/2563EB/FFF?text=${extractUppercase(
                        user.name
                      )}`}
                      alt="hello"
                      className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                    />
                  </a>
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-800">{user.name}</span>
                    <h2 className="text-sm text-gray-400">
                      <a
                        href="#"
                        className="transition duration-100 hover:text-rose-500 active:text-rose-600"
                      >
                        {user.email}
                      </a>
                    </h2>
                    <p className="text-gray-500">
                      Company: {user.company.name}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-800">
                      Phone:{user.phone}
                    </span>
                    <h2 className="text-sm text-gray-400">
                      <a
                        href={user.website}
                        className="transition duration-100 hover:text-rose-500 active:text-rose-600"
                      >
                        {user.website}
                      </a>
                    </h2>
                    <button
                      onClick={() => handleOpenModal(user)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded"
                    >
                      View Details
                    </button>{" "}
                  </div>
                  <Modal
                    open={open}
                    onCancel={() => setopen(false)}
                    size={1200}
                    footer={null}
                  >
                    <Details
                      user={selectedUser}
                      setopen={setopen}
                      setData={setData}
                    />
                  </Modal>
                </article>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
export default Contact;

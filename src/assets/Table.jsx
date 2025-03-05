import { useEffect, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
import { IoMdEye } from "react-icons/io";
import { Link } from "react-router-dom";

const Table = () => {
  const [state, setState] = useState([]);
  const [show, setShow] = useState(false);
  const [modalState, setModalState] = useState(null);

  const openModal = (user, action) => {
    setModalState({ selectedUser: user, action });
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
    setModalState(null);
  };

  const deleteUser = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/routes/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      setState((prevState) => prevState.filter((user) => user._id !== id));
      toast.success(data.message, {
        position: "top-right",
        autoClose: 1000,
        theme: "light",
        transition: Bounce,
      });

      setTimeout(() => {
        closeModal();
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const dataRefresh = () => {
    fetch("http://localhost:8000/routes/data")
      .then((res) => res.json())
      .then((json) => {
        setState(json.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to refresh data", {
          position: "top-right",
          autoClose: 5000,
          theme: "light",
          transition: Bounce,
        });
      });
  };

  useEffect(() => {
    fetch("http://localhost:8000/routes/data")
      .then((res) => res.json())
      .then((json) => {
        setState(json.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Your Data
            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              Here is the list of all the students in your school
            </p>

            <div className="mt-8">
            <Link
                type="submit"
                value="Search"
                className="py-2 px-6 mx-3 text-sm tracking-wider rounded text-white bg-blue-600 hover:bg-blue-900 focus:outline-none"
                to={"/Mail"}
              >
                Contact us
              </Link>
              <Link
                type="submit"
                value="Search"
                className="py-2 px-6 mx-3 text-sm tracking-wider rounded text-white bg-blue-600 hover:bg-blue-900 focus:outline-none"
                to={"/Search"}
              >
                Search
              </Link>
              <button
                type="button"
                className="py-2 px-6 mx-3 text-sm tracking-wider rounded text-white bg-blue-600 hover:bg-blue-900 focus:outline-none"
                onClick={dataRefresh}
              >
                Refresh
              </button>
              <Link
                type="submit"
                value="Add New"
                className="py-2 px-6 mx-3 text-sm tracking-wider rounded text-white bg-blue-600 hover:bg-blue-900 focus:outline-none"
                to={"/"}
              >
                Add new
              </Link>
            </div>
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Class
              </th>
              <th scope="col" className="px-6 py-3">
                Age
              </th>
              <th scope="col" className="px-6 py-3">
                Created On
              </th>
              <th scope="col" className="px-3 py-2">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {state.map((newdata, index) => {
              const { _id, name, last, userClass, age, createdOn } = newdata;
              return (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {`${name} ${last}`}
                  </th>
                  <td className="px-6 py-4">{userClass}</td>
                  <td className="px-6 py-4">{age}</td>
                  <td className="px-6 py-4">{createdOn}</td>
                  <td className="px-3 py-2 text-right flex items-center justify-end gap-6">
                    <button
                      onClick={() => openModal(newdata)}
                      className="font-medium text-blue-600 dark:text-blue-500"
                    >
                      <IoMdEye />
                    </button>
                    <Link
                      to={`/Update/${_id}`}
                      className="font-medium text-blue-600 dark:text-blue-500"
                    >
                      <MdEdit />
                    </Link>
                    <button
                      className="font-medium text-blue-600 dark:text-blue-500"
                      onClick={() => openModal(newdata)}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {show && modalState?.action === "delete" && (
        <div
          id="static-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-[#00000008] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0 backdrop-saturate-100 backdrop-contrast-100"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Confirm Deletion
                </h3>
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-4 md:p-5 space-y-4">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete{" "}
                  <strong>{modalState.selectedUser?.name}</strong>?
                </p>
              </div>

              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={() => deleteUser(modalState.selectedUser._id)}
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Yes, I'm sure 
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 hover:text-gray-900 rounded-lg text-sm font-medium px-5 py-2.5 text-center dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {show && modalState && (
        <div
          id="static-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-[#00000008] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0 backdrop-saturate-100 backdrop-contrast-100"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  User Details
                </h3>
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-4 md:p-5 space-y-4">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  <strong>Name:</strong> {`${modalState.selectedUser.name} ${modalState.selectedUser.last}`}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  <strong>Class:</strong> {modalState.selectedUser.userClass}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  <strong>Age:</strong> {modalState.selectedUser.age}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  <strong>Phone:</strong> +91 {modalState.selectedUser.phone}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  <strong>Email:</strong> {modalState.selectedUser.email}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  <strong>Created On:</strong> {modalState.selectedUser.createdOn}
                </p>
              </div>

              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <Link
                  to={`/Update/${modalState.selectedUser._id}`}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Edit
                </Link>
                <button
                  onClick={() => openModal(modalState.selectedUser)}
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none rounded-lg focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Table;

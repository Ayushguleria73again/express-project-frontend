import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";

const Table = () => {
  const [state, setState] = useState([]);

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

  const deleteUser = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/routes/delete/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
        setState((prevState) => prevState.filter((user) => user._id !== id));
        toast.success(data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Your Data
            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              Here is the list of all the students in your school
            </p>
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Class</th>
              <th scope="col" className="px-6 py-3">Age</th>
              <th scope="col" className="px-6 py-3">Phone</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {state.map((newdata, index) => {
              const { _id, name, last, userClass, phone, age, email } = newdata;
              return (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {`${name} ${last}`}
                  </th>
                  <td className="px-6 py-4">{userClass}</td>
                  <td className="px-6 py-4">{age}</td>
                  <td className="px-6 py-4">{phone}</td>
                  <td className="px-6 py-4">{email}</td>
                  <td className="px-6 py-4 text-right">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      <MdEdit />
                    </a>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => deleteUser(_id)}
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
    </>
  );
};

export default Table;

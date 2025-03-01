import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
function Searchbox() {
    const [find, setFind] = useState({ name: "" });
    const [doms, setDoms] = useState({
        data: [],
        message: "",
        success: ""
    })
    const [state, setState] = useState([]);
    const handleValue = (e) => {
        setFind({
            ...find,
            [e.target.name]: e.target.value
        });
    };
    const submit = async (e) => {
        e.preventDefault();
        try {
            const responce = await fetch(`http://localhost:8000/routes/name/${find.name}`, {
                method: "GET"
            })
            const res = await responce.json()
            setDoms(res)
            console.log(doms.data);
        } catch (error) {
            console.log(error);

        }
    };

    const deleteUser = async (id) => {
        try {
            const res = await fetch(`http://localhost:8000/routes/delete/${id}`, {
                method: "DELETE",
            });

            const data = await res.json(state);
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
                            You can search students by Name
                        </p>
                        <form className="max-w-md mx-auto">
                            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input
                                    onChange={handleValue}
                                    type="search"
                                    value={find.name}
                                    name="name"
                                    id="default-search"
                                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Search Name"
                                    required
                                />
                                <button
                                    onClick={submit}
                                    type="button"
                                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Search
                                </button>
                            </div>
                        </form>

                    </caption>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Class</th>
                            <th scope="col" className="px-6 py-3">Age</th>
                            <th scope="col" className="px-6 py-3">Phone</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Created On</th>
                            <th scope="col" className="px-3 py-2">
                                <span className="sr-only">Edit</span>
                            </th>
                            <th scope="col" className="px-3 py-2">
                                <span className="sr-only">View</span>
                            </th>
                            <th scope="col" className="px-3 py-2">
                                <span className="sr-only">Delete</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {doms.data && doms.data.length > 0 ? (
                            doms.data.map((newdata, index) => {
                                const { _id, name, last, userClass, age, phone, email, createdOn } = newdata;
                                return (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {`${name} ${last}`}
                                        </th>
                                        <td className="px-6 py-4">{userClass}</td>
                                        <td className="px-6 py-4">{age}</td>
                                        <td className="px-6 py-4">+91 {phone}</td>
                                        <td className="px-6 py-4">{email}</td>
                                        <td className="px-6 py-4">{createdOn}</td>
                                        <td>      <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                            <IoMdEye />
                                        </a>
                                        </td>
                                        <td className="px-3 py-2 text-right">
                                            <Link to={`/Update/${_id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                <MdEdit />
                                            </Link>
                                        </td>
                                        <td className="px-3 py-2 text-left">
                                            <button
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                onClick={() => deleteUser(_id)}>
                                                <MdDelete />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="9" className="px-6 py-4 text-center text-gray-500">
                                    No results found
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>
        </>
    );
}

export default Searchbox;

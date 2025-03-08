import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom'
import { toast ,Zoom} from "react-toastify";
function Update() {
    const { id } = useParams()
    const [state, setState] = useState({
        name: "",
        last: "",
        userClass: "",
        phone: "",
        age: "",
        email: "",
        gender:""
    });

    useEffect(() => {
        fetch(`http://localhost:8000/routes/user/${id}`)
            .then((res) => res.json())
            .then((json) => {
                setState(json.data);
            })
    }, [id])

    const handleValue = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const submit = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:8000/routes/Update/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(state)
        })

        const res = await response.json()
        if (res.message === "update") {
            toast.warn(res.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Zoom,
            });
        }
        else if (res.message === "Please fill all the feilds") {
            toast.warn(res.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Zoom,
            });
        }
        else {
            toast.success(res.message, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition:Zoom,
            });
            setTimeout(() => {
                window.location.href = "http://localhost:5173/Table";
            }, 2000);

        }
    }
    return (
        <>
            <div className="max-w-4xl max-sm:max-w-lg mx-auto font-[sans-serif] p-6">
                <div className="text-center mb-12 sm:mb-16">
                    <a href="javascript:void(0)"><h1>FORM</h1></a>
                    <h4 className="text-gray-600 text-base mt-6">Update your Data</h4>
                </div>

                <form>
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                            <label className="text-gray-600 text-sm mb-2 block">First Name</label>
                            <input name="name"
                                onChange={handleValue}
                                value={state.name}
                                type="text"
                                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                                placeholder="Enter name" />
                        </div>
                        <div>
                            <label className="text-gray-600 text-sm mb-2 block">Last Name</label>
                            <input name="last"
                                onChange={handleValue}
                                value={state.last}
                                type="text"
                                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                                placeholder="Enter last name" />
                        </div>
                        <div>
                            <label className="text-gray-600 text-sm mb-2 block">Gender</label>
                            <select
                                name="gender"
                                onChange={handleValue}
                                value={state.gender}
                                type="text"
                                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                                placeholder="Enter gender"
                            >
                            <option value="select">select</option>
                             <option value="male">Male</option>
                             <option value="female">Female</option>
                             <option value="others">Others</option>

                            </select>
                        </div>
                        <div>
                            <label className="text-gray-600 text-sm mb-2 block">Email Id</label>
                            <input name="email"
                                onChange={handleValue}
                                value={state.email}
                                type="text"
                                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                                placeholder="Enter email" />
                        </div>
                        <div>
                            <label className="text-gray-600 text-sm mb-2 block">Class</label>
                            <input name="userClass"
                                onChange={handleValue}
                                value={state.userClass}
                                type="text"
                                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                                placeholder="Enter Class" />
                        </div>
                        <div>
                            <label className="text-gray-600 text-sm mb-2 block">Age</label>
                            <input name="age"
                                onChange={handleValue}
                                value={state.age}
                                type="number"
                                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                                placeholder="Enter Age" />
                        </div>
                        <div>
                            <label className="text-gray-600 text-sm mb-2 block">Phone</label>
                            <input name="phone"
                                onChange={handleValue}
                                value={state.phone}
                                type="tel"
                                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                                placeholder="Enter mobile number" />
                        </div>
                    </div>

                    <div className="mt-8">
                        <Link onClick={submit} className=" py-3 px-6 text-sm tracking-wider rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">Update</Link>

                        {/* <Link to={"/Table"} type="submit" value="Update" className="mx-auto block py-3 px-6 text-sm tracking-wider rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none" /> */}
                    </div>
                </form>
            </div>
        </>
    )
}

export default Update
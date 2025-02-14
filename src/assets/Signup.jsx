import { useState } from "react";
import { toast } from "react-toastify"
import { Bounce } from "react-toastify"

function Signup() {

    const [state, setstate] = useState({
        name: "",
        last: "",
        userClass: "",
        phone: "",
        age: "",
        email: ""
    })
    const handleValue = (e) => {
        setstate({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const submitValue = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:8000/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(state)
        })
        const res = await response.json()
        console.log(res);
        if (res.message === "email or phone allready exist") {
            toast.warn(res.message, {
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
        else if (res.message === "please fill all the feilds") {
            toast.warn(res.message, {
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
        else {
            toast.success(res.message, {
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
    }


    return (
        <>
            <div className="max-w-4xl max-sm:max-w-lg mx-auto font-[sans-serif] p-6">
                <div className="text-center mb-12 sm:mb-16">
                    <a href="javascript:void(0)"><h1>FORM</h1></a>
                    <h4 className="text-gray-600 text-base mt-6">Sign up into your account</h4>
                </div>

                <form onSubmit={submitValue}>
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
                                value={state.class}
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
                                value={state.number}
                                type="tel"
                                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                                placeholder="Enter mobile number" />
                        </div>
                    </div>

                    <div className="mt-8">
                        {/* <button type="submit" className="mx-auto block py-3 px-6 text-sm tracking-wider rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
              Sign up
            </button> */}
                        <input type="submit" value="Sign up" className="mx-auto block py-3 px-6 text-sm tracking-wider rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none" />
                    </div>
                </form>
            </div>
        </>
    );
}

export default Signup;

import { useState } from "react";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";

function Signup() {
    const [state, setState] = useState({
        name: "",
        last: "",
        userClass: "",
        phone: "",
        age: "",
        email: "",
        password: "",
    });

    const [toggle, setToggle] = useState(false);

    const viewHide = () => {
        setToggle(!toggle);
    };

    const handleValue = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const submitValue = async (e) => {
        e.preventDefault();

        // Frontend validation (basic)
        if (!state.name || !state.last || !state.email || !state.password || !state.phone || !state.age || !state.userClass) {
            toast.warn("Please fill all the fields.", {
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
            return;
        }

        const response = await fetch("http://localhost:8000/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(state),
        });

        const res = await response.json();
        console.log(res);

        if (res.message === "email or phone already exist") {
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
        } else if (res.message === "please fill all the fields") {
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
        } else if (res.message === "Server error") {
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
        } else {
            toast.success(res.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            setTimeout(() => {
                window.location.href = "http://localhost:5173/Table";
            }, 3000);
        }
    };

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
                            <input
                                name="name"
                                onChange={handleValue}
                                value={state.name}
                                type="text"
                                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                                placeholder="Enter name"
                            />
                        </div>
                        <div>
                            <label className="text-gray-600 text-sm mb-2 block">Last Name</label>
                            <input
                                name="last"
                                onChange={handleValue}
                                value={state.last}
                                type="text"
                                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                                placeholder="Enter last name"
                            />
                        </div>
                        <div>
                            <label className="text-gray-600 text-sm mb-2 block">Email Id</label>
                            <input
                                name="email"
                                onChange={handleValue}
                                value={state.email}
                                type="text"
                                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                                placeholder="Enter email"
                            />
                        </div>
                        <div className="relative">
                            <label className="text-gray-600 text-sm mb-2 block">Password</label>
                            <div className="relative">
                                <input
                                    name="password"
                                    onChange={handleValue}
                                    value={state.password}
                                    type={toggle ? "text" : "password"}
                                    placeholder="Enter Password"
                                    className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={viewHide}
                                    className="absolute right-3 top-3 text-sm text-blue-500"
                                >
                                    {toggle ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="text-gray-600 text-sm mb-2 block">Class</label>
                            <input
                                name="userClass"
                                onChange={handleValue}
                                value={state.userClass}
                                type="text"
                                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                                placeholder="Enter Class"
                            />
                        </div>
                        <div>
                            <label className="text-gray-600 text-sm mb-2 block">Age</label>
                            <input
                                name="age"
                                onChange={handleValue}
                                value={state.age}
                                type="number"
                                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                                placeholder="Enter Age"
                            />
                        </div>
                        <div>
                            <label className="text-gray-600 text-sm mb-2 block">Phone</label>
                            <input
                                name="phone"
                                onChange={handleValue}
                                value={state.phone}
                                type="tel"
                                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                                placeholder="Enter mobile number"
                            />
                        </div>
                    </div>

                    <div className="mt-8">
                        <input
                            type="submit"
                            value="Sign up"
                            className="mx-auto block py-3 px-6 text-sm tracking-wider rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                        />
                    </div>
                </form>
            </div>
        </>
    );
}

export default Signup;

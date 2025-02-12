import { ToastContainer } from "react-toastify"
import { Bounce } from "react-toastify"
function Toster() {
  return (
    <>
        <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>
    </>
  )
}

export default Toster
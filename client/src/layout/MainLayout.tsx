import Header from "../components/Header";
import { Outlet } from "react-router";
import { Bounce, ToastContainer } from "react-toastify";

function MainLayout() {
  return (
    <div className="  sm:px-1 md:px-10  lg:px-20  bg-gray-100 min-h-screen">
      <ToastContainer
        position="bottom-right"
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

      <Header />
      <Outlet />
    </div>
  );
}

export default MainLayout;

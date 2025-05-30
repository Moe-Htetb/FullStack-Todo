import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4 text-center">
      <h1 className="text-9xl font-bold text-black">404</h1>
      <p className="text-2xl md:text-3xl font-semibold text-black mt-4">
        Page Not Found
      </p>
      <p className="text-black mt-2 text-base md:text-lg">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-2 border border-black text-black font-medium rounded hover:bg-black hover:text-white transition"
      >
        Go Home
      </button>
    </div>
  );
};

export default ErrorPage;

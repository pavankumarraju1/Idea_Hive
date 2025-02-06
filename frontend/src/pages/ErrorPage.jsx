import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
            <div className="text-center">
                <h1 className="text-6xl font-bold">404</h1>
                <p className="text-2xl mt-4">Page Not Found</p>
                <Link to="/land"><button className="mt-6 inline-block px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600"> Go to Home</button></Link>
            </div>
        </div>
    );
};

export default ErrorPage;
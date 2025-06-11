import { Link } from "react-router-dom";
import { CircleUser } from "lucide-react";

function Navbar({user}) {

  return (
    <header>
      <nav className="container flex items-center justify-between shadow-md p-2 mx-auto navbar">
        <Link to="/">PostPal</Link>
        <Link
          to={user ? "/dashboard" : "/login"}
          className="border-[1px] bg-gray-300 rounded-full login-btn h-10 w-10"
        >
          <button className="h-full w-full overflow-hidden cursor-pointer rounded-full">
            {user !== null ? (
              <img
                src={user?.user?.image}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <CircleUser className="w-full h-full" />
            )}
          </button>
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;

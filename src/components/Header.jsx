import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../context/UserContext"
import toast from "react-hot-toast";

const Header = () => {
  const context = useContext(UserContext);

  const naviagte = useNavigate();

  function handleLogout() {
    const res = context.userLogout();
    if (res.success) {
      toast.success(res.message);
      naviagte("/login");
    }
  }

  return (
    <div
      style={{
        width: "100%",
        height: "35px",
        border: "2px solid black",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      {/* app name */}
      <div>My Notes App</div>

      {/* nav links */}
      <div>
        <ul
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            gap: "1.5rem",
            listStyle: "none",
          }}
        >
          <Link to="/">
            <li>Dashboard</li>
          </Link>
          <Link to="/tasks">
            <li>Task</li>
          </Link>
          <Link to="/notes">
            <li>Notes</li>
          </Link>
        </ul>
      </div>

      {/* email & logout button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <p>test@gmail.gom</p>
        <button
          onClick={handleLogout}
          style={{
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;

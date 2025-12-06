import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import HeaderStyle from "./Header.module.css";
import { UserContext } from "../context/UserContext";
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
    <div className={HeaderStyle.header}>
      {/* app name */}
      <div className={HeaderStyle.appName}>My Notes App</div>

      {/* nav links */}
      <nav className={HeaderStyle.nav}>
        <ul className={HeaderStyle.navList}>
          <Link to="/" className={HeaderStyle.navLink}>
            <li>Dashboard</li>
          </Link>
          <Link to="/tasks" className={HeaderStyle.navLink}>
            <li>Task</li>
          </Link>
          <Link to="/notes" className={HeaderStyle.navLink}>
            <li>Notes</li>
          </Link>
        </ul>
      </nav>

      {/* email & logout button */}
      <div className={HeaderStyle.userSection}>
        <p className={HeaderStyle.userEmail}>test@gmail.gom</p>
        <button onClick={handleLogout} className={HeaderStyle.logoutBtn}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;

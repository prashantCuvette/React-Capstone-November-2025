import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import SignupStyle from "./Signup.module.css";
import { UserContext } from "../context/UserContext";
import toast from "react-hot-toast";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const context = useContext(UserContext);

  const handleForm = async (e) => {
    try {
      e.preventDefault();

      const res = await context.userCreate(username, email, password);
      console.log(res);
      if (res.success) {
        toast.success(res.message);
        navigate("/");
      } else {
        throw new Error(res.message);
      }

      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div className={SignupStyle.container}>
      <div className={SignupStyle.formWrapper}>
        <h2 className={SignupStyle.title}>Create Account</h2>
        <form onSubmit={handleForm} className={SignupStyle.form}>
          <div className={SignupStyle.inputGroup}>
            <label className={SignupStyle.label} htmlFor="username">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={SignupStyle.input}
            />
          </div>

          <div className={SignupStyle.inputGroup}>
            <label className={SignupStyle.label} htmlFor="useremail">
              Email:
            </label>
            <input
              type="email"
              id="useremail"
              name="useremail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={SignupStyle.input}
            />
          </div>

          <div className={SignupStyle.inputGroup}>
            <label className={SignupStyle.label} htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={SignupStyle.input}
            />
          </div>

          <button type="submit" className={SignupStyle.submitBtn}>
            Sign Up
          </button>
        </form>

        <div className={SignupStyle.footer}>
          <p className={SignupStyle.footerText}>
            Already Have An Account? Login Here
          </p>
          <Link to="/login" className={SignupStyle.loginLink}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;

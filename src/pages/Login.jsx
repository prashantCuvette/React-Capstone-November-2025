import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import LoginStyle from "./Login.module.css";
import { UserContext } from "../context/UserContext";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const context = useContext(UserContext);

  const handleForm = async (e) => {
    try {
      e.preventDefault();
      const res = await context.userLogin(email, password);
      if (res.success) {
        toast.success(res.message);
        navigate("/");
      } else {
        throw new Error(res.message);
      }
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div className={LoginStyle.container}>
      <div className={LoginStyle.formWrapper}>
        <h2 className={LoginStyle.title}>Welcome Back</h2>
        <form onSubmit={handleForm} className={LoginStyle.form}>
          <div className={LoginStyle.inputGroup}>
            <label className={LoginStyle.label} htmlFor="useremail">
              Email:
            </label>
            <input
              type="email"
              id="useremail"
              name="useremail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={LoginStyle.input}
            />
          </div>

          <div className={LoginStyle.inputGroup}>
            <label className={LoginStyle.label} htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={LoginStyle.input}
            />
          </div>

          <button type="submit" className={LoginStyle.submitBtn}>
            Login
          </button>
        </form>

        <div className={LoginStyle.footer}>
          <p className={LoginStyle.footerText}>
            Don't Have An Account? Signup Here
          </p>
          <Link to="/signup" className={LoginStyle.signupLink}>
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

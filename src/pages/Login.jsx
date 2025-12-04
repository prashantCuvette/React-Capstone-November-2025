import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
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
    <div
      style={{
        border: "2px solid blue",
      }}
    >
      <form onSubmit={handleForm}>
        <label htmlFor="useremail">Email:</label>
        <input
          type="email"
          id="useremail"
          name="useremail"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />
        <br />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">Login</button>
      </form>
      <p>Dont Have An Account. Signup Here</p>
      <Link to="/signup">Signup</Link>
    </div>
  );
};

export default Login;

import { useState } from "react";
import { Link } from "react-router";
import SignupStyle from "./Signup.module.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(SignupStyle);

  const handleForm = (e) => {
    e.preventDefault();
    console.log(username);
    console.log(email);
    console.log(password);

    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <div
      style={{
        border: "2px solid blue",
      }}
    >
      <form onSubmit={handleForm}>
        <label className={SignupStyle.container} htmlFor="username">
          Username:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <br />

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

        <button type="submit">Sign Up</button>
      </form>
      <p>Alreday Have An Account. Login Here</p>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Signup;

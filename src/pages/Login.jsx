import { useState } from "react";
import { Link } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleForm = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);

  
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

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    const result = await registerUser(username, password, role);
    if (result.success) {
      navigate("/login");
    } else {
      alert(result.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <select onChange={(e) => setRole(e.target.value)} value={role}>
        <option value="">Select Role</option>
        <option value="Admin">Admin</option>
        <option value="Doctor">Doctor</option>
        <option value="Patient">Patient</option>
      </select>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;

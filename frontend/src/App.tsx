import axios from "axios";
import { useEffect } from "react";

export default function App() {
  function handleLogin() {
    const host =
      window.location.host === "localhost:5173"
        ? "http://localhost:8080"
        : window.location.origin;
    window.open(host + "/oauth2/authorization/google", "_self");
  }
  function handleLogout() {
    const host =
      window.location.host === "localhost:5173"
        ? "http://localhost:8080"
        : window.location.origin;
    window.open(host + "/logout", "_self");
  }

  const loadUser = () => {
    axios.get("/api/auth").then((response) => console.log(response.data));
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

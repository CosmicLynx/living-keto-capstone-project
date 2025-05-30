import { CustomButton } from "../components/CustomButton.tsx";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext.ts";

export function Header() {
  const { user } = useContext(UserContext);

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

  return (
    <div className="border-b">
      <div className="m-auto p-5 max-w-[1040px] flex justify-between items-center">
        <div className="shrink-0 w-fit">Living Keto Capstone-Project</div>
        <div>
          {user ? (
            <CustomButton
              label={user.username + " | Logout"}
              onClick={handleLogout}
            />
          ) : (
            <CustomButton label="Login" onClick={handleLogin} />
          )}
        </div>
      </div>
    </div>
  );
}

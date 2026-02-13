import { CustomButton } from "../components/CustomButton.tsx";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext.ts";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomNavDropdown } from "../components/CustomNavDropdown.tsx";

export function Header() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

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
    <div className="bg-primary-background">
      <div className="m-auto p-5 max-w-[1040px] flex justify-between items-center">
        <h1 className="shrink-0 w-fit text-white">
          Living Keto Capstone-Projekt
        </h1>
        <div className="flex gap-2">
          {location.pathname !== "/recipes" && (
            <CustomButton
              label="Rezepte"
              onClick={() => navigate("/recipes")}
              variant="secondary"
            />
          )}
          {location.pathname !== "/" && (
            <CustomButton
              label="Startseite"
              onClick={() => navigate("/")}
              variant="secondary"
            />
          )}
          {user ? (
            user.role === "ROLE_ADMIN" ? (
              <CustomNavDropdown
                label={user.username}
                options={[
                  { label: "Admin", navigateTo: "/admin", admin: true },
                  { label: "Logout", navigateTo: "/", customNav: handleLogout },
                ]}
              />
            ) : (
              <CustomButton
                label={user.username + " | Logout"}
                onClick={handleLogout}
                variant="secondary"
              />
            )
          ) : (
            <CustomButton
              label="Login"
              onClick={handleLogin}
              variant="secondary"
            />
          )}
        </div>
      </div>
    </div>
  );
}

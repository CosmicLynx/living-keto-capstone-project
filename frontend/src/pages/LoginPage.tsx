import { useContext } from "react";
import { UserContext } from "../contexts/UserContext.ts";
import { CustomButton } from "../components/CustomButton.tsx";
import { PageWrapper } from "../layout/PageWrapper.tsx";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <PageWrapper>
      {user && user.role === "ADMIN" && (
        <CustomButton label="Admin page" onClick={() => navigate("/admin")} />
      )}
    </PageWrapper>
  );
}

import { PageWrapper } from "../layout/PageWrapper.tsx";
import { CustomButton } from "../components/CustomButton.tsx";
import { useNavigate } from "react-router-dom";

export function AdminPage() {
  const navigate = useNavigate();
  return (
    <PageWrapper>
      <h2>Admin</h2>
      <CustomButton label="Back" onClick={() => navigate("/")} />
    </PageWrapper>
  );
}

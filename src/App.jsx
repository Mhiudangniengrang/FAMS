import { useEffect } from "react";
import Cookies from "js-cookie";
import { Router } from "@/routes/Sections";
import useAuth from "@/hooks/useAuth";
import { FloatButtonClick } from "@/components";

function App() {
  const { fetchUserInfo, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserInfo();
    }
  }, [Cookies.get("__token")]);

  return (
    <div>
      <Router />
      <FloatButtonClick />
    </div>
  );
}

export default App;

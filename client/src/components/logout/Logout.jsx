import { useNavigate } from "react-router";
import { useUserContext } from "../../contexts/UserContext";
import { useEffect } from "react";

export default function Logout() {
  const navigate = useNavigate();
  const { logoutHandler } = useUserContext();

  useEffect(() => {
        logoutHandler()
            .then(() => { console.log('logged out') })
            .finally(() => navigate('/'));
    }, [])

    return null;
  }

// Home.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Home() {
  useEffect(() => {
    document.title = "SingFit Partner Portal";
  }, []); 
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/aarp-member");
  }, [navigate]);

  return null;
}

import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GoogleSSO = () => {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      console.log("Attempting Google login...");

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/google`,
        { token: credentialResponse.credential },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Login response:", res.data);

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/userhome");
      } else {
        throw new Error(res.data.error || "Login failed");
      }
    } catch (error) {
      console.error("Google login failed:", {
        error: error.response?.data || error.message,
      });
      alert(error.response?.data?.error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="google-sso-container">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log("Google login failed")}
        useOneTap
        shape="rectangular"
        theme="filled_blue"
        size="large"
        text="continue_with"
      />
    </div>
  );
};
export default GoogleSSO;

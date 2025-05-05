import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabase/supabaseClient.js";

function AuthCallback() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false); // Track if we've already saved

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        if (saved) return; // Prevent multiple saves

        const { data, error: authError } = await supabase.auth.getSession();

        if (authError) throw new Error(`Session error: ${authError.message}`);
        if (!data?.session?.access_token)
          throw new Error("No valid session found");

        const session = data.session;
        const isSocialLogin = session.user?.app_metadata?.provider !== "email";

        // Only proceed with save if we haven't already
        if (!saved) {
          if (isSocialLogin) {
            const userProfile = {
              firstName:
                session.user.user_metadata?.full_name?.split(" ")[0] || "",
              lastName:
                session.user.user_metadata?.full_name
                  ?.split(" ")
                  .slice(1)
                  .join(" ") || "",
              mobileNumber: session.user.phone || "",
              password: "",
            };
            await saveUserToBackend(userProfile, session.access_token);
          } else {
            const profileData = JSON.parse(localStorage.getItem("profileData"));
            if (profileData) {
              await saveUserToBackend(profileData, session.access_token);
              localStorage.removeItem("profileData");
            }
          }
          setSaved(true);
        }

        navigate("/");
      } catch (err) {
        console.error("Auth callback error:", err.message);
        setError(err.message);
        navigate("/?error=auth-failed");
      } finally {
        setLoading(false);
      }
    };

    handleRedirect();
  }, [navigate, saved]);

  const saveUserToBackend = async (profileData, token) => {
    try {
      const response = await fetch("http://localhost:8000/api/save-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Backend error: ${errorData.detail}`);
      }

      const result = await response.json();
      console.log("User saved:", result);
      return result;
    } catch (error) {
      console.error("Error saving user to backend:", error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="auth-callback-container">
        <p>Finalizing your account... Please wait.</p>
        {/* You could add a loading spinner here */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="auth-callback-container error">
        <p>Authentication error: {error}</p>
        <button onClick={() => navigate("/")}>Return to homepage</button>
      </div>
    );
  }

  return null;
}

export default AuthCallback;

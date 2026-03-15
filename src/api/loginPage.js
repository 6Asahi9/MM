const API_URL = "https://mm-backend-render.onrender.com";

export async function registerUser({ username, email, password }) {
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Registration failed");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    return data;
  } catch (error) {
    console.error("Register error:", error.message);
    throw error;
  }
}

export async function loginUser({ email, password }) {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Login failed");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    return data;
  } catch (error) {
    console.error("Login error:", error.message);
    throw error;
  }
}

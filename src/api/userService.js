const API_URL = "https://mm-backend-render.onrender.com";

export async function getUser() {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/api/auth/user`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch user");
    }

    return data;
  } catch (error) {
    console.error("Get user error:", error.message);
    throw error;
  }
}

export async function updateUser(field, value) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/api/auth/user`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        [field]: value,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Update failed");
    }

    return data;
  } catch (error) {
    console.error("Update user error:", error.message);
    throw error;
  }
}

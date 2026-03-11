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

export async function changePassword(currentPassword, newPassword) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/api/auth/change-password`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Password change failed");
    }

    return data;
  } catch (error) {
    console.error("Change password error:", error.message);
    throw error;
  }
}

export async function deleteAccount() {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/api/auth/delete-account`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Delete account failed");
    }

    return data;
  } catch (error) {
    console.error("Delete account error:", error.message);
    throw error;
  }
}

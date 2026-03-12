const API_URL = "https://mm-backend-render.onrender.com/api/products";

export async function publishProduct(productData) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to publish product");
    }

    return data;
  } catch (error) {
    console.error("Publish product error:", error.message);
    throw error;
  }
}

export async function getProducts() {
  try {
    const response = await fetch(`${API_URL}`, { method: "GET" });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch products");
    }

    return data;
  } catch (error) {
    console.error("Get products error:", error.message);
    throw error;
  }
}

const API_URL = "https://mm-backend-render.onrender.com";

export async function addToCart(productId) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/api/orders/add-to-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to add to cart");
    }

    return data;
  } catch (error) {
    console.error("Add to cart error:", error.message);
    throw error;
  }
}

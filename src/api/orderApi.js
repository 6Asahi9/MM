export async function createOrder(
  userId,
  totalAmount,
  productId = null,
  quantity = 1,
  price = 0,
) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/api/orders`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId,
        totalAmount,
        productId,
        quantity,
        price,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to create order");
    }

    return data;
  } catch (error) {
    console.error("Create order error:", error.message);
    throw error;
  }
}

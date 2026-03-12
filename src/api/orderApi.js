const API_URL = "https://mm-backend-render.onrender.com";

export async function createOrder(userId, totalAmount) {
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

export async function addOrderItem(orderId, productId, quantity, price) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/api/orders/item`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        orderId,
        productId,
        quantity,
        price,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to add item");
    }

    return data;
  } catch (error) {
    console.error("Add order item error:", error.message);
    throw error;
  }
}

export async function getOrder(orderId) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/api/orders/${orderId}`, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch order");
    }

    return data;
  } catch (error) {
    console.error("Get order error:", error.message);
    throw error;
  }
}

export async function getUserOrders(userId) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/api/orders/user/${userId}`, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch orders");
    }

    return data;
  } catch (error) {
    console.error("Get user orders error:", error.message);
    throw error;
  }
}

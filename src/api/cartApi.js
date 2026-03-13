import { getProductById } from "./productApi";

const API_URL = "https://mm-backend-render.onrender.com";
const token = localStorage.getItem("token");

async function authFetch(url, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };
  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Something went wrong");
  }
  return response.json();
}

export async function getOrdersWithProducts() {
  const userId = localStorage.getItem("userId");
  const ordersArray = await authFetch(`${API_URL}/api/orders/user/${userId}`);

  const enrichedItems = [];

  for (const order of ordersArray) {
    if (!order.items) continue;
    for (const item of order.items) {
      const product = await getProductById(item.product_id);
      enrichedItems.push({
        orderId: order.id,
        status: order.status,
        product,
        quantity: item.quantity,
        totalAmount: item.price * item.quantity,
      });
    }
  }

  return enrichedItems;
}

export async function setOrderStatus(productId, status) {
  return authFetch(`${API_URL}/api/orders/status`, {
    method: "PUT",
    body: JSON.stringify({ productId, status }),
  });
}

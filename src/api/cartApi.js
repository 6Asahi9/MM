import { getProductById } from "./productApi";

const API_URL = "https://mm-backend-render.onrender.com";

async function authFetch(url, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch orders");
  }

  return response.json();
}

export async function getOrdersWithProducts() {
  const data = await authFetch(`${API_URL}/api/orders/products`);

  const enrichedOrders = await Promise.all(
    data.orders.map(async (order) => {
      const product = await getProductById(order.product_id);

      return {
        product,
        status: order.status,
      };
    }),
  );

  return enrichedOrders;
}

export async function setOrderStatus(productId, status) {
  return authFetch(`${API_URL}/api/orders/status`, {
    method: "PUT",
    body: JSON.stringify({ productId, status }),
  });
}

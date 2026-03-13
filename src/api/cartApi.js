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
    throw new Error(errorData.error || "Failed to fetch orders");
  }

  return response.json();
}

export async function getOrdersWithProducts() {
  const data = await authFetch(`${API_URL}/api/orders/products`);

  const enrichedOrders = await Promise.all(
    data.productIds.map(async (id) => {
      const product = await getProductById(id);
      return {
        product,
        status: "pending",
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

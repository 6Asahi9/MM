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
    if (!response.ok)
      throw new Error(data.error || "Failed to publish product");
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
    if (!response.ok) throw new Error(data.error || "Failed to fetch products");
    return data;
  } catch (error) {
    console.error("Get products error:", error.message);
    throw error;
  }
}

export async function getProductById(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "GET" });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to fetch product");
    return data;
  } catch (error) {
    console.error("Get product by ID error:", error.message);
    throw error;
  }
}

export async function searchProducts(queryParams) {
  try {
    const queryString = new URLSearchParams(queryParams).toString();
    const response = await fetch(`${API_URL}/search?${queryString}`, {
      method: "GET",
    });
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.error || "Failed to search products");
    return data;
  } catch (error) {
    console.error("Search products error:", error.message);
    throw error;
  }
}

export async function updateProduct(id, updatedData) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to update product");
    return data;
  } catch (error) {
    console.error("Update product error:", error.message);
    throw error;
  }
}

export async function deleteProduct(id) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to delete product");
    return data;
  } catch (error) {
    console.error("Delete product error:", error.message);
    throw error;
  }
}

export async function addRating(id, rating) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/${id}/rating`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ rating }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to add rating");
    return data;
  } catch (error) {
    console.error("Add rating error:", error.message);
    throw error;
  }
}

export async function getMyProducts() {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/my-product`, {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok)
      throw new Error(data.error || "Failed to fetch my products");
    return data;
  } catch (error) {
    console.error("Get my products error:", error.message);
    throw error;
  }
}

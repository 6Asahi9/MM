const API_URL = "https://mm-backend-render.onrender.com/api/comments";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function fetchComments() {
  try {
    const res = await fetch(`${API_URL}`);
    if (!res.ok) throw new Error("Failed to fetch comments");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function fetchCommentsByProduct(productId) {
  try {
    const res = await fetch(`${API_URL}/product/${productId}`);
    if (!res.ok) throw new Error("Failed to fetch comments for product");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function postComment({ product_id, content, rating }) {
  try {
    const res = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify({ product_id, content, rating }),
    });

    if (!res.ok) throw new Error("Failed to post comment");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function postReply(commentId, { content }) {
  try {
    const res = await fetch(`${API_URL}/${commentId}/reply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify({ content }),
    });

    if (!res.ok) throw new Error("Failed to post reply");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function updateComment(commentId, { content, rating }) {
  try {
    const res = await fetch(`${API_URL}/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify({ content, rating }),
    });

    if (!res.ok) throw new Error("Failed to update comment");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function deleteComment(commentId) {
  try {
    const res = await fetch(`${API_URL}/${commentId}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (!res.ok) throw new Error("Failed to delete comment");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

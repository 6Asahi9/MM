const API_URL = "https://mm-backend-render.onrender.com/api/salesbanners";

export const getSales = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch sales");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getSaleById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch sale");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const API_URL = "https://mm-backend-render.onrender.com/api/salesbanners";

export const getSalesBanners = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch sales banners");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getSalesBannerById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch banner");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

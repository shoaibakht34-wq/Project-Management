import { BASE_URL } from "../api";

export const getProjects = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/projects`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};
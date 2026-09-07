export const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "https://em-mern-social-app.onrender.com/api/v1"
).replace(/\/+$/, "");

export class ApiError extends Error {
  constructor(message, { status, data } = {}) {
    super(message || "Something went wrong. Please try again.");
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

function getToken() {
  try {
    return localStorage.getItem("clientToken");
  } catch {
    return null;
  }
}

function buildUrl(path) {
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function apiFetch(path, { auth = true, headers, body, ...rest } = {}) {
  const finalHeaders = { ...headers };
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

  if (!isFormData && body !== undefined && !finalHeaders["Content-Type"]) {
    finalHeaders["Content-Type"] = "application/json";
  }
  if (auth) {
    const token = getToken();
    if (token) finalHeaders.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(buildUrl(path), {
      ...rest,
      headers: finalHeaders,
      body: isFormData || body === undefined ? body : JSON.stringify(body),
    });
  } catch (networkError) {
    throw new ApiError("Network error — please check your connection.", {
      status: 0,
      data: networkError,
    });
  }

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json().catch(() => null)
    : null;

  if (!response.ok) {
    throw new ApiError(data?.message || `Request failed (${response.status})`, {
      status: response.status,
      data,
    });
  }

  return data;
}

export const get = (path, options) => apiFetch(path, { ...options, method: "GET" });
export const post = (path, body, options) => apiFetch(path, { ...options, method: "POST", body });
export const patch = (path, body, options) => apiFetch(path, { ...options, method: "PATCH", body });
export const del = (path, options) => apiFetch(path, { ...options, method: "DELETE" });

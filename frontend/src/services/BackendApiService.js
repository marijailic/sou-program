import { getAuthHeaders } from "@/services/authService";

const backendUrl = process.env.VUE_APP_URL;

const trimUrl = (url) => (url[0] === "/" ? url.slice(1) : url);

export default {
    delete: async ({ url, headers, body }) => {
        return await fetch(`${backendUrl}/${trimUrl(url)}`, {
            method: "DELETE",
            headers: {
                ...headers,
                ...getAuthHeaders(),
            },
            body,
        });
    },
    post: async ({ url, headers, body }) => {
        return await fetch(`${backendUrl}/${trimUrl(url)}`, {
            method: "POST",
            headers: {
                ...headers,
                ...getAuthHeaders(),
            },
            body,
        });
    },
    put: async ({ url, headers, body }) => {
        return await fetch(`${backendUrl}/${trimUrl(url)}`, {
            method: "PUT",
            headers: {
                ...headers,
                ...getAuthHeaders(),
            },
            body,
        });
    },
    patch: async ({ url, headers, body }) => {
        return await fetch(`${backendUrl}/${trimUrl(url)}`, {
            method: "PATCH",
            headers: {
                ...headers,
                ...getAuthHeaders(),
            },
            body,
        });
    },
    get: async ({ url, headers }) => {
        return await fetch(`${backendUrl}/${trimUrl(url)}`, {
            method: "GET",
            headers: {
                ...headers ?? {},
                ...getAuthHeaders(),
            },
        });
    },
};

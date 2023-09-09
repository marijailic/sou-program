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
};

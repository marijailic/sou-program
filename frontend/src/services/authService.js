const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    const username = localStorage.getItem("username");
    const type = localStorage.getItem("type");

    return {
        Authorization: `Bearer ${token}`,
        RefreshToken: refreshToken,
        username,
        type,
    };
};

const saveAuthData = ({ username, type, token, refreshToken }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("type", type);
    localStorage.setItem("username", username);
};

export { getAuthHeaders, saveAuthData };

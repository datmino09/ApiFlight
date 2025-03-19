require('dotenv').config();
const axios = require('axios');

const AMADEUS_API = "https://test.api.amadeus.com";
let token = "";

const getToken = async () => {
    try {
        const response = await axios.post(`${AMADEUS_API}/v1/security/oauth2/token`, 
            new URLSearchParams({
                grant_type: "client_credentials",
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET
            }).toString(), 
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );

        token = response.data.access_token;
        console.log("🎟️ Token mới:", token);
    } catch (error) {
        console.error("❌ Lỗi lấy token:", error.response?.data || error.message);
    }
};


const requestWithRetry = async (url, params) => {
    try {
        return await axios.get(url, { params, headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.log("🔄 Token hết hạn, lấy lại token...");
            await getToken();
            return axios.get(url, { params, headers: { Authorization: `Bearer ${token}` } });
        }
        throw error;
    }
};

module.exports = { getToken, requestWithRetry, AMADEUS_API };

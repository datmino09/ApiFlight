const { requestWithRetry, AMADEUS_API } = require('../utils/amadeus');

class FlightController {
async searchFlight(req, res) { 
    try {
        const { origin, destination, date, adults = 1, children = 0 } = req.query;
        console.log("🔍 Tìm kiếm chuyến bay:", { origin, destination, date, adults, children });

        if (!origin || !destination || !date) {
            return res.status(400).json({ error: "Thiếu thông tin chuyến bay!" });
        }

        const response = await requestWithRetry(`${AMADEUS_API}/v2/shopping/flight-offers`, 
            { originLocationCode: origin, destinationLocationCode: destination, departureDate: date, adults, children });

        res.json(response.data);
    } catch (error) {
        console.error("❌ Lỗi khi tìm chuyến bay:", error.response?.data || error.message);
        res.status(500).json({ error: error.response?.data || error.message });
    }
}

}

module.exports = new FlightController();

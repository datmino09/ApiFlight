const { book } = require('../models');  // Import từ db đã khởi tạo các mô hình
const { requestWithRetry, AMADEUS_API } = require('../utils/amadeus');
const axios = require('axios');

class FlightController {
    // Tìm kiếm chuyến bay
    async searchFlight(req, res) {
        try {
            const { origin, destination, date } = req.query;
            console.log("🔍 Tìm kiếm chuyến bay:", { origin, destination, date });
            if (!origin || !destination || !date) {
                return res.status(400).json({ error: "Thiếu thông tin chuyến bay!" });
            }

            const response = await requestWithRetry(`${AMADEUS_API}/v2/shopping/flight-offers`, 
                { originLocationCode: origin, destinationLocationCode: destination, departureDate: date, adults: 1 });

            res.json(response.data);
        } catch (error) {
            console.error("❌ Lỗi khi tìm chuyến bay:", error.response?.data || error.message);
            res.status(500).json({ error: error.response?.data || error.message });
        }
    }

    // Đặt vé
    async bookFlight(req, res) {
        const orderData = req.body;  // Nhận dữ liệu từ phía client

        // Kiểm tra dữ liệu đầu vào
        if (!orderData.flightOfferId || !orderData.firstName || !orderData.lastName || !orderData.email) {
            return res.status(400).json({ error: 'Thiếu thông tin đặt vé!' });
        }

        try {
            // Lưu thông tin đơn đặt vé vào cơ sở dữ liệu
            const newBooking = await book.create({
                flightOfferId: orderData.flightOfferId, // Dữ liệu chuyến bay từ client
                firstName: orderData.firstName,
                lastName: orderData.lastName,
                email: orderData.email,
                bookingDate: new Date(),
            });

            res.status(200).json({
                message: 'Đặt vé thành công!',
                bookingId: newBooking.id,
                flightOfferId: newBooking.flightOfferId,  // ID chuyến bay từ client
            });
        } catch (error) {
            console.error('❌ Lỗi khi lưu thông tin đặt vé:', error.message);
            res.status(500).json({
                error: 'Lỗi khi thực hiện đặt vé',
                details: error.message
            });
        }
    }
}

module.exports = new FlightController();

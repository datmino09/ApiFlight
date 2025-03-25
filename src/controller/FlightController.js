const { book } = require('../models');  // Import từ db đã khởi tạo các mô hình
const { requestWithRetry, AMADEUS_API } = require('../utils/amadeus');

class FlightController {
    // Tìm kiếm chuyến bay
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
    async bookFlight(req, res) {
            const orderData = req.body;
            if (
                !orderData.flightOfferId ||
                !orderData.firstName ||
                !orderData.lastName ||
                !orderData.email ||
                !orderData.origin ||
                !orderData.destination ||
                !orderData.duration ||
                !orderData.AirlineName ||
                !orderData.departureTime ||
                !orderData.arrivalTime ||
                !orderData.quantityAdult ||
                !orderData.quantityChildren ||
                !orderData.totalPrice
            ) {
                return res.status(400).json({ error: 'Thiếu thông tin đặt vé!' });
            }
        
            try {
             
                const newBooking = await book.create({
                    flightOfferId: orderData.flightOfferId,
                    firstName: orderData.firstName,
                    lastName: orderData.lastName,
                    email: orderData.email,
                    bookingDate: new Date(),
                    user_id: orderData.user_id,
                    origin: orderData.origin,
                    destination: orderData.destination,
                    duration: orderData.duration,
                    AirlineName: orderData.AirlineName,
                    departureTime: new Date(orderData.departureTime),
                    arrivalTime: new Date(orderData.arrivalTime),
                    quantityAdult: orderData.quantityAdult,
                    quantityChildren: orderData.quantityChildren,
                    totalPrice: orderData.totalPrice
                });
        
                res.status(200).json({
                    message: 'Đặt vé thành công!',
                    bookingId: newBooking.id,
                    flightOfferId: newBooking.flightOfferId
                });
            } catch (error) {
                console.error('❌ Lỗi khi lưu thông tin đặt vé:', error.message);
                res.status(500).json({
                    error: 'Lỗi khi thực hiện đặt vé',
                    details: error.message
                });
            }
        }
        async getBookingsByUser(req, res) {
            const { user_id } = req.params; // Lấy user_id từ URL
        
            if (!user_id) {
                return res.status(400).json({ error: 'Thiếu user_id!' });
            }
        
            try {
                const bookings = await book.findAll({
                    where: { user_id },
                    order: [['bookingDate', 'DESC']], // Sắp xếp theo thời gian đặt vé mới nhất
                });
        
                if (!bookings.length) {
                    return res.status(404).json({ message: 'Người dùng chưa có đơn đặt vé nào.' });
                }
        
                res.status(200).json(bookings);
            } catch (error) {
                console.error('❌ Lỗi khi lấy danh sách đơn đặt vé:', error.message);
                res.status(500).json({
                    error: 'Lỗi khi lấy đơn đặt vé',
                    details: error.message
                });
            }
        }
        
}

module.exports = new FlightController();

const { as_user, bookedAppointments } = require('../models');

const handleDeleteAppointment = async (req, res) => {
    const id = req.params.id;
    const username = req.user;

    try {
        // Find the user by username
        const user = await as_user.findOne({
            where: {
                username: username
            }
        });

        if (!user) {
            return res.status(404).json({ 'message': 'User not found' });
        }

        // Find the appointment by id and user id
        const appointment = await bookedAppointments.findOne({
            where: {
                id: id,
                userId: user.id
            }
        });

        if (!appointment) {
            return res.status(404).json({ 'message': 'Appointment not found' });
        }

        // Delete the appointment
        await appointment.destroy();

        return res.status(200).json({ 'message': 'Appointment deleted successfully' });
    } catch (err) {
        console.error('Error deleting appointment:', err);
        return res.status(500).json({ 'message': 'Internal server error' });
    }
}

module.exports = {
    handleDeleteAppointment
};

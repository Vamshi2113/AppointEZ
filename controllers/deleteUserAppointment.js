'use strict';
const { sequelize } = require('../models');
const { as_user, bookedAppointments, UserData, currentholdings, createAppointment } = require('../models');

const handleDeleteAppointment = async (req, res) => {
    const id = req.params.id;
    const username = req.user;
    let t; // Define transaction variable outside the try block

    try {
        // Start a transaction
        t = await sequelize.transaction();

        // Find the user by username
        const user = await as_user.findOne({
            where: { username: username },
            include: [UserData],
            transaction: t
        });

        if (!user) {
            await t.rollback();
            return res.status(404).json({ 'message': 'User not found' });
        }

        // Find the booked appointment by id and user id within the transaction
        const appointment = await bookedAppointments.findOne({
            where: { id: id, userId: user.id },
            include: [{ model: createAppointment, as: 'createAppointment' }], // Include createAppointment model
            transaction: t
        });

        if (!appointment) {
            await t.rollback();
            return res.status(404).json({ 'message': 'Appointment not found' });
        }

        // Get the credits of the appointment to return to the user
        const creditsToReturn = appointment.createAppointment.cost;

        // Delete the appointment
        await appointment.destroy({ transaction: t });

        // Delete the corresponding entry in currentholdings
        // const deletedHoldings = await currentholdings.destroy({
        //     where: { bookedAppointmentId: id },
        //     transaction: t
        // });

        // if (!deletedHoldings) {
        //     await t.rollback();
        //     return res.status(500).json({ 'message': 'Failed to delete current holdings entry' });
        // }

        // Update user's credits with the credits of the deleted appointment
        const updatedUser = await UserData.increment('credits', {
            by: creditsToReturn,
            where: { id: user.UserDatum.id },
            transaction: t
        });

        if (!updatedUser) {
            await t.rollback();
            return res.status(500).json({ 'message': 'Failed to update user credits' });
        }

        // Commit the transaction if all operations succeed
        await t.commit();

        return res.status(200).json({ 'message': 'Appointment deleted successfully' });

    } catch (err) {
        console.error('Error deleting appointment:', err);
        if (t) await t.rollback(); // Rollback transaction if an error occurs
        return res.status(500).json({ 'message': 'Internal server error' });
    }
}

module.exports = {
    handleDeleteAppointment
};

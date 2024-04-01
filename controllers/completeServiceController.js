'use strict';
const { sequelize } = require('../models');
const { bookedAppointments, UserData, currentholdings, as_service_provider } = require('../models');

const handleCompleteAppointment = async (req, res) => {
    const id = req.params.id;
    const username = req.user;
    let t; // Define transaction variable outside the try block

    try {
        // Start a transaction
        t = await sequelize.transaction();

        // Find the current appointment with associated service provider, user data, and current holdings
        const currentAppointment = await bookedAppointments.findOne({
            where: {
                id: id,
            },
            include: [
                {
                    model: as_service_provider,
                    include: [
                        {
                            model: UserData
                        }
                    ]
                },
                {
                    model: currentholdings
                }
            ],
            transaction: t
        });

        if (!currentAppointment) {
            await t.rollback();
            return res.status(404).json({ 'message': 'Appointment not found' });
        }

        if (!(currentAppointment.as_service_provider.username == username)) {
            await t.rollback();
            return res.status(404).json({ 'message': 'No authority to access this data ' });
        }

        // Increment the credits of the service provider
        const serviceProvider = currentAppointment.as_service_provider;
        const creditsToAdd = currentAppointment.currentholding.credits;
        const updatedServiceProvider = await UserData.increment('credits', {
            by: creditsToAdd,
            where: { id: serviceProvider.UserDatum.id },
            transaction: t
        });

        if (!updatedServiceProvider) {
            await t.rollback();
            return res.status(500).json({ 'message': 'Failed to update service provider credits' });
        }

        // Destroy the appointment entry
        await currentAppointment.destroy({ transaction: t });

        // Commit the transaction if all operations succeed
        await t.commit();

        return res.status(200).json({ 'message': 'Appointment completed successfully' });

    } catch (err) {
        console.error('Error completing appointment:', err);
        if (t) await t.rollback(); // Rollback transaction if an error occurs
        return res.status(500).json({ 'message': 'Internal server error' });
    }
}

module.exports = {
    handleCompleteAppointment
};

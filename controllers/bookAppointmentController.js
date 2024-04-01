const { sequelize } = require('../models');
const { bookedAppointments, createAppointment, as_service_provider, as_user, UserData,currentholdings} = require('../models');

const handleBookAppointment = async (req, res) => {
    const id = req.params.id;
    const username = req.user;
    let t; // Define the transaction variable outside the try block
    try {
        // Start a transaction
        t = await sequelize.transaction();

        const appointment = await createAppointment.findOne({ where: { id }, include: [as_service_provider] });
        console.log("appointment", appointment)
        const user = await as_user.findOne({
            where: {
                username: username
            },
            include: [UserData]
        });

        console.log("==============", user)

        // Calculate the cost of booking
        const cost_of_booking = appointment.cost;

        // Get the user's current credits
        const user_credits = user.UserDatum.credits;
        console.log("==============", user_credits)

        // Check if the user has sufficient credits
        if (user_credits < cost_of_booking) {
            await t.rollback();
            return res.status(400).json({ 'message': 'insufficient credits' });
        }

        // Subtract the cost of booking from the user's credits
        const updatedUser = await UserData.decrement('credits', { by: cost_of_booking, where: { id: user.UserDatum.id }, transaction: t });

        if (updatedUser[0] === 0) {
            await t.rollback();
            return res.status(400).json({ 'message': 'failed to update user data' });
        }

        // Create a new bookedAppointment entry
        const bookedappointment = await bookedAppointments.create({
            status: 'active',
            createAppointmentId: appointment.id,
            userId: user.id,
            serviceProviderId: appointment.as_service_provider.id
        }, { transaction: t });

        if (!bookedappointment) {
            await t.rollback();
            return res.status(400).json({ 'message': 'failed to book' });
        }

        // Create a new entry in currentHoldings
        const newHoldingsEntry = await currentholdings.create({
            credits: cost_of_booking,
            bookedAppointmentId: bookedappointment.id
        }, { transaction: t });

        if (!newHoldingsEntry) {
            await t.rollback();
            return res.status(400).json({ 'message': 'failed to create current holdings entry' });
        }

        // Commit the transaction if all operations succeed
        await t.commit();

        return res.status(200).json({ 'message': 'success' });

    } catch (err) {
        console.error('Error:', err);
        if (t) await t.rollback(); // Rollback transaction if t is defined
        return res.status(400).json({ 'err': err });
    }
}

module.exports = {
    handleBookAppointment
};

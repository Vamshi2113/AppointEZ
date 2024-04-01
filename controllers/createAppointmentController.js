const { UserData, as_service_provider, types, createAppointment } = require('../models');

function hasAllProperties(obj, properties) {
    for (const property of properties) {
        if (!(property in obj)) {
            return false;
        }
    }
    return true;
}

const handlecreateAppointment = async (req, res) => {
    const requiredProperties = ["serviceFromTime", "serviceToTime", "serviceDesc", "serviceCost", "serviceType"];

    const checkAllProperties = hasAllProperties(req.body, requiredProperties);
    console.log("********************************************", req.body);

    if (!checkAllProperties) {
        return res.status(400).json({ "message": "Enter all properties" });
    }

    try {
        const username = req.user;

        const user = await UserData.findOne({
            where: {
                username: username
            },
            include: [as_service_provider]
        });

        const type = await types.findOne({
            where: {
                type: req.body.serviceType
            }
        });

        const appointment = {
            username: username,
            from_time: req.body.serviceFromTime,
            to_time: req.body.serviceToTime,
            at: user.coordinates,
            desc: req.body.serviceDesc,
            cost: req.body.serviceCost,
            name: req.body.serviceName, // Updated property name
            serviceProviderId: user.as_service_provider.id,
            userDataId: user.id,
            typeId: type.id
        };

        createAppointment.createAppointmentMethod(appointment)
            .then((newAppoint) => {
                return res.status(200).json({ "message": newAppoint });
            })
            .catch((err) => {
                console.log("***********************************************", err);
                return res.status(400).json({ "message": err });
            });

    } catch (err) {
        return res.status(400).json({ "message": err });
    }
}

module.exports = { handlecreateAppointment };

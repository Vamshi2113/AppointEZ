const { as_service_provider, UserData } = require("../models");

const handleJoinAsServiceProvider = async (req, res) => {
  const username = req.user;

  try {
    const user = await as_service_provider.findOne({
      where: {
        username: username,
      },
    });

    if (user) {
      return res.status(200).json({ 'message': 'You are already a service provider' });
    }

    const userData = await UserData.findOne({
        
      where: { username: username },
    });

    await as_service_provider.create({ username: username, userDataId: userData.id })
      .then(() => {
        res.status(200).json({ 'message': 'Joined as a service provider' });
      })
      .catch((err) => {
        res.status(400).json({ 'message': 'Operation failed', 'error': err });
      });
  } catch (err) {
    return res.status(500).json({ 'message': err.message });
  }
};

module.exports = {
  handleJoinAsServiceProvider,
};

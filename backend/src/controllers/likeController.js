const Dev = require('../models/Dev');

module.exports = {

  // register a new like
  async create(req, res) {
    console.log(req.connectedUsers);
    const { user } = req.headers;
    const { devId } = req.params;

    const loggedDev = await Dev.findById(user);
    const likedDev = await Dev.findById(devId);

    if (!likedDev) return res.status(400).json({ error: 'Dev not exists' });

    // checks if devs match each other
    if (likedDev.likes.includes(loggedDev._id)) {
      const loggedSocket = req.connectedUsers[user];
      const likedSocket = req.connectedUsers[devId];

      if (loggedSocket) {
        req.io.to(loggedSocket).emit('match', likedDev);
      }

      if (likedSocket) {
        req.io.to(likedSocket).emit('match', loggedDev);
      }
    }

    loggedDev.likes.push(likedDev._id);

    await loggedDev.save();
    return res.status(201).json(loggedDev);
  }
};
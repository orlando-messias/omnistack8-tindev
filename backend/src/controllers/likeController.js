const Dev = require('../models/Dev');

module.exports = {

  // register a new like
  async create(req, res) {
    const { user } = req.headers;
    const { devId } = req.params;

    const loggedDev = await Dev.findById(user);
    const likedDev = await Dev.findById(devId);

    if (!likedDev) return res.status(400).json({ error: 'Dev not exists' });

    // checks if devs match each other
    if (likedDev.likes.includes(loggedDev._id))
      console.log('DEU MATCH');

    loggedDev.likes.push(likedDev._id);

    await loggedDev.save();
    return res.status(201).json(loggedDev);
  }
};
const { create } = require('../models/Dev');
const Dev = require('../models/Dev');

module.exports = {

  // register a new dislike
  async create(req, res) {
    const { devId } = req.params;
    const { user } = req.headers;

    const loggedDev = await Dev.findById(user);
    const dislikedDev = await Dev.findById(devId);

    if (!dislikedDev) return res.status(400).json({ error: 'Dev not exists' });

    loggedDev.dislikes.push(dislikedDev._id);

    await loggedDev.save();

    return res.status(201).json(loggedDev);

  }
};
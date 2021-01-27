const axios = require('axios');

const Dev = require('../models/Dev');

module.exports = {

  // list only devs whose logged dev didn't like or dilike yet
  async list(req, res) {
    const { user } = req.headers;

    const loggedDev = await Dev.findById(user);

    const users = await Dev.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedDev.likes } },
        { _id: { $nin: loggedDev.dislikes } }
      ],
    });

    return res.status(200).json(users);
  },

  async create(req, res) {
    const { username } = req.body;

    const userExists = await Dev.findOne({ user: username });

    if (userExists) return res.json({ message: 'User already exists' });

    // find username via github api
    const response = await axios.get(`https://api.github.com/users/${username}`);

    const { name, bio, avatar_url: avatar } = response.data;

    const dev = await Dev.create({
      name,
      user: username,
      bio,
      avatar
    });

    return res.status(201).json(dev);
  },

  async getAll(req, res) {
    const devs = await Dev.find();

    return res.status(200).json(devs);
  }
};
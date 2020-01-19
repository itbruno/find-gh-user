const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStrongAsArray');

module.exports = {
    async index(req, res) {
        const devs = await Dev.find();

        return res.json(devs);
    },

    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_username });

        if(!dev) {
            const response = await axios.get(`https://api.github.com/users/${github_username}`);
            const { name = login, avatar_url, bio } = response.data;

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });
        }

        return res.json(dev);
    },

    async update(req, res) {
        const _id = req.params.id;
        let dev = await Dev.findOne({ _id });

        if(dev) {
            const { name, bio, techs, latitude, longitude } = req.body;
            
            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };

            dev = await Dev.updateOne({ _id }, {
                name,
                bio,
                techs: techsArray,
                location
            });
        }
        
        return res.json(dev);
    },

    async remove(req, res) {
        const _id = req.params.id;

        if(Dev.findOne({ _id })) {
            const deleteDev = await Dev.deleteOne({ _id });
            return res.json(deleteDev);
        }
    }
};
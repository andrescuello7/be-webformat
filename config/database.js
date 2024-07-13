const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DATABASE)
        return 'connected successfully';
    } catch (error) {
        return 'connection error: ' + error.message;
    }
};

module.exports = { connect };

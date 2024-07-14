const mongoose = require('mongoose');
const { values } = require('./shared/values');

const connect = async () => {
    try {
        await mongoose.connect(values.MONGO_DATABASE)
        return 'connected successfully';
    } catch (error) {
        return 'connection error: ' + error.message;
    }
};

module.exports = { connect };

const fs = require('fs');
const path = require('path');
const { getAnswer } = require('./code_orchestrator');
const HistoryModel = require('../models/history');

// Service function that handles the OpenAI request
const orchestrator = async (req, res) => {
    const { question, conversation_id } = req.body;
    let _arguments = [];
    let result;

    try {
        const promptFilePath = path.join(__dirname, 'bot_description.prompt');
        const prompt = fs.readFileSync(promptFilePath, 'utf8');

        if (conversation_id) {
            const { history } = await HistoryModel.findById(conversation_id);
            for (const i of history) {
                _arguments.push({ role: i['role'], content: i['content'] });
            }
        } else {
            _arguments.push({ role: 'system', content: prompt });
        }

        _arguments.push({ role: 'user', content: question });

        const answer = await getAnswer(_arguments);
        _arguments.push({ role: 'assistant', content: answer });

        if (conversation_id) {
            result = await HistoryModel.findByIdAndUpdate(
                {_id: conversation_id },
                { history: _arguments },
                { new: true }
            );
        } else {
            result = await new HistoryModel({ history: _arguments }).save();
        }

        return res.status(200).send({ result: _arguments });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

module.exports = { orchestrator };

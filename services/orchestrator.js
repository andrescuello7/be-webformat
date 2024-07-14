const fs = require('fs');
const path = require('path');
const { getAnswer } = require('./code_orchestrator');
const HistoryModel = require('../models/history');

// Service function that handles the OpenAI request
const orchestrator = async (req, res) => {
    const { question, conversation_id } = req.body;
    let arguments = [];
    let query;

    try {
        /* Read the prompt file content
        Check if a conversation ID is provided */
        const promptFilePath = path.join(__dirname, 'bot_description.prompt');
        const prompt = fs.readFileSync(promptFilePath, 'utf8');

        if (conversation_id) {
            /* Retrieve the conversation history from the database
            Add each entry in the history to the arguments array */
            const { history } = await HistoryModel.findById(conversation_id);
            for (const i of history) {
                arguments.push({ role: i['role'], content: i['content'] });
            }
        } else {
            // If no conversation ID, use the prompt as the system's initial message
            arguments.push({ role: 'system', content: prompt });
        }

        // Add the user's question to the arguments array
        arguments.push({ role: 'user', content: question });

        // Get the assistant's answer using the orchestrator
        const answer = await getAnswer(arguments);
        arguments.push({ role: 'assistant', content: answer['answer'] });

        // Update the conversation history in the database if a conversation ID is provided
        if (conversation_id) {
            query = await HistoryModel.findByIdAndUpdate(
                { _id: conversation_id },
                { history: arguments },
                { new: true }
            );
        } else {
            // If no conversation ID, create a new conversation history entry in the database
            query = await new HistoryModel({ history: arguments }).save();
        }

        let result = { 
            conversation_id: query['_id'],
            answer: answer['answer']
        }
        return res.status(200).send(result);
    } catch (error) {
        // Handle any errors that occur during the process
        return res.status(500).send({ error: error.message });
    }
}

module.exports = { orchestrator };

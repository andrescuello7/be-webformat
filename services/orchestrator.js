const { getAnswer } = require('./code_orchestrator')

// Service function that handles the OpenAI request
const orchestrator = async (req, res) => {
    const { question } = req.body;
    try {
        const answer = await getAnswer(question);
        // Send the parsed result back as JSON response
        res.status(200).json({ result: answer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { orchestrator }

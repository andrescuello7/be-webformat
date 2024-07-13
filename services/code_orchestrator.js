const fs = require('fs');
const path = require('path');
const kernel = require('../shared/kernel')
const { triage } = require('./plugins/Conversation/Triage/wrapper')

// Path to the prompt file
const PLUGGING = 'services/plugins/Conversation';

// Service function that handles the OpenAI request
const getAnswer = async (question) => {
    const promptFilePath = path.join(__dirname, 'bot_description.prompt');
    const prompt = fs.readFileSync(promptFilePath, 'utf8');
    
    const conversationPlugin = kernel.importPluginFromPromptDirectory(PLUGGING, 'Triage');
    const _arguments = [];

    _arguments.push({ role: 'system', content: prompt })
    _arguments.push({ role: 'user', content: question })

    // Send a request to OpenAI to stream chat completions
    const answerDict = await triage(kernel.createKernel, conversationPlugin, _arguments);
    return answerDict
}

module.exports = { getAnswer }

const kernel = require('../shared/kernel')
const { triage } = require('./plugins/Conversation/Triage/wrapper')

// Path to the prompt file
const PLUGGING = 'services/plugins/Conversation';

// Service function that handles the OpenAI request
const getAnswer = async (_arguments) => {
    const conversationPlugin = kernel.importPluginFromPromptDirectory(PLUGGING, 'Triage');

    // Send a request to OpenAI to stream chat completions
    const answerDict = await triage(kernel.createKernel, conversationPlugin, _arguments);
    return answerDict
}

module.exports = { getAnswer }

const fs = require('fs');
const path = require('path');
const { OpenAIStream, StreamingTextResponse } = require('ai');
const { OpenAIClient, AzureKeyCredential } = require('@azure/openai');
const { values } = require('./values');

// Function to create a kernel by sending a request to OpenAI
const addKernel = async (arg) => {
    // Initialize the OpenAI client with endpoint and API key
    const client = new OpenAIClient(
        values.AZURE_OPENAI_ENDPOINT,
        new AzureKeyCredential(values.AZURE_OPENAI_KEY)
    );
    /* Send a request to OpenAI to stream chat completions
    Stream the response from OpenAI
    Convert the streamed response to text */

    const kernel = await client.streamChatCompletions(values.AZURE_OPENAI_DEPLOYMENT_NAME, arg);
    const stream = await OpenAIStream(kernel);
    return await new StreamingTextResponse(stream).text();
}

// Function to handle a question using the created kernel
const createKernel = async (_arguments, conversationPlugin) => {

    // TODO i18n: structured on code for prompint?
    _arguments[0]['content'] = `${_arguments[0]['content']} \n ${conversationPlugin}`
    
    // Call kernelCreate to get the kernel response
    const _createKernel = await addKernel(_arguments);
    return kernelParseStream({ result: _createKernel });
}

// Function to parse the streamed data and format it
const kernelParseStream = (data) => {
    const parse = data.result
        .replace(/0:\"/g, '')
        .replace(/\\n/g, ' ')
        .replace(/\"/g, '')
        .trim();
    // Replace any remaining newline characters with empty string
    return parse.replace(/\n/g, '');
}

// Function to import pluggin for answer
const importPluginFromPromptDirectory = (fileDirectory, skPrompt) => {
    const file = `${fileDirectory}/${skPrompt}/skprompt.txt`;
    const prompt = fs.readFileSync(file, 'utf8');
    return prompt;
}

module.exports = {
    createKernel,
    importPluginFromPromptDirectory
}

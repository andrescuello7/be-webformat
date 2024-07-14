const triage = async (kernel, conversationPlugin, arguments) => {
    /*  This function is used to triage the user's request and determine its intent. 
    Depending on the intent, it either generates a search query for sources (if it's a Q&A question) 
    or directly generates an answer (if it's not a Q&A question).
    
    Args:
    kernel (object): The kernel object.
    conversation_plugin (dict): The conversation plugin dictionary.
    arguments (dict): The arguments for the function.

    Returns:
        dict: A dictionary containing the triage response. The response includes:
            'intents' (list): A list of intents of the request. Defaults to ['none'] if not found.
            'answer' (str): The answer to the request. Defaults to an empty string if not found.
            'search_query' (str): The search query for the request. Defaults to an empty string if not found.
            'prompt_tokens' (list): The prompt tokens from the function result. 
            'completion_tokens' (list): The completion tokens from the function result.
            'bypass' (bool): A flag indicating whether to bypass the reminder flow steps (in case an error has occurred).
            
    Raises:
        Exception: If there's a JSON decoding error when processing the function result. */
    let result = { answer: '' }
    result['answer'] = await kernel(arguments, conversationPlugin);
    
    return result;
}

module.exports = { triage }

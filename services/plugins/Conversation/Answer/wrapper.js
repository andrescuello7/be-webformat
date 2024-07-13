const triage = async (kernel, conversation_plugin, _arguments) => {
    const answer = await kernel(_arguments);
    return answer;
}

module.exports = { triage }

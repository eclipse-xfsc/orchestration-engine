module.exports = function(RED) {
    function BrowserJsNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        // save the user’s snippet
        node.code = config.code || "";

        node.on('input', function(msg) {
            // push the incoming msg to the editor via RED.comms
            // topic is “browser-js”, payload carries both node.id and msg
            RED.comms.publish(
                'browser-js',
                JSON.stringify({ id: node.id, msg: msg })
            );
            // no output
        });
    }
    RED.nodes.registerType('browser-js', BrowserJsNode);
}

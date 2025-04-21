

module.exports = function(RED) {
   

    function Label(config) {
        
        RED.nodes.createNode(this,config);
        var node = this;


        // Set up the handler
        node.on('input', function(msg) {
            
            msg.ui = msg.ui || {};
            msg.ui.label = {
                          
                "title": {
                    text: config.TitleText,
                    class: config.TitleClass,
                    style:config.TitleStyle
                
            },
            "description": {
                text: config.DescTitle,
                class: config.DescClass,
                style:config.DescStyle
            
        },
        }
            node.send(msg);
        });
        
    }
    RED.nodes.registerType("Label",Label);
}

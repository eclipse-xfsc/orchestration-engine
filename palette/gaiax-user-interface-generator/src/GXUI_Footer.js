

module.exports = function(RED) {
   

    function GXUI_Footer(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        var src = config.src;
        var alt = config.alt;         
        var Item = config.MenuItem;
        var buttons = config.MenuButton;


        for (let i = 0; i < buttons.length; i++) {
            buttons[i].id = i+1;
            delete buttons[i].type;
            delete buttons[i].value;
            var Button =buttons;
          }
          const button_s = {};
        for (let i = 0; i < Button.length; i++) {
         button_s[i] = Button[i];
        }
        
        for (let i = 0; i < Item.length; i++) {
          Item[i].id= i+1;         
          delete Item[i].type;
          delete Item[i].value;
          var elementItem =Item;
        }

        const element_s = {};
        for (let i = 0; i < elementItem.length; i++) {
          element_s[i] = elementItem[i];
        }
        
        node.on('input', function(msg) {
            msg.ui = msg.ui || {};
 
            msg.ui.menu = msg.ui.menu || {};
            msg.ui.menu.footer = msg.ui.menu.footer || {};
            msg.ui.menu.footer = {
                         
               
                    element_s,
                    button_s,
                    image: {
                        "src":src,
                        "alt": alt,
                        "Style": config.style,
                        "Class": config.class
                    },
           
      
            };
            node.send(msg);
           
        });
    }
    RED.nodes.registerType("GXUI Footer",GXUI_Footer);
}

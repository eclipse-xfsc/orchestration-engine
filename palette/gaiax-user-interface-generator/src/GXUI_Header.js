

module.exports = function(RED) {
   

    function GXUI_Header(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        var src = config.src;
        var alt = config.alt;         
        var Item = config.MenuItem;
        var buttons = config.MenuButton;


        for (let i = 0; i < buttons.length; i++) {
            buttons[i].id= i+1;
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
            msg.ui.menu.header = msg.ui.menu.header || {};
            msg.ui.menu.header = {
                           
                
                    element_s,
                    button_s,
                    image: {
                        "src":src,
                        "alt": alt,
                        "Style": config.style,
                        "class": config.class
                    },
            
      
            };
            node.send(msg);
           
        });
    }
    RED.nodes.registerType("GXUI Header",GXUI_Header);
}



module.exports = function(RED) {
   

    function Data_Set(config) {
        
        RED.nodes.createNode(this,config);
        var node = this;
        var form = config.formElement;
        var button = config.menuButton;
        var status =config.dropdownStatus
        
        
      
        
        
        function parseInput(input) {
            const opt = input.split(",");
            return { opt };
          }



        for (let i = 0; i < form.length; i++) {
            if (form[i].type === "label" || form[i].type === "download" || form[i].type === "upload" ||  form[i].type === "input" ||  form[i].type === "button" || form[i].type === "dropDown" || form[i].type === "radio" || form[i].type === "checkBox") {
              form[i].options = {};
              switch (form[i].type) {
                case "label":
                  form[i].options = {
                    title: form[i].title,
                    description: form[i].description,
                  }
                  delete form[i].title;
                  delete form[i].description
                  break;
                case "upload":
                  form[i].options = {
                      label: form[i].label,
                      accept: form[i].accept,
                      description: form[i].description,
                      multiple: form[i].multiple,
                    }
                  delete form[i].label;
                  delete form[i].accept;
                  delete form[i].multiple;
                  delete form[i].description
                  break;
                  case "download":
                  form[i].options = {
                      label: form[i].label,
                      description: form[i].description,
                      downloadKey: form[i].downloadkey,
                    }
                  delete form[i].label;
                  delete form[i].downloadkey;
                  delete form[i].description
                  break;
                case "input":
                  form[i].options = {
                    inputType: form[i].inputType,
                    placeholder: form[i].placeholder,
                  }
                  delete form[i].inputType;
                  delete form[i].placeholder;
                  break;
                case "button":
                  delete form[i].value;
                  if(form[i].href){
                    form[i].options = {
                      href: form[i].href, 
                      label: form[i].label,      
                    }
                    delete form[i].href;
                  } else if(form[i].onClick){
                    form[i].options = {
                      onClick: form[i].onClick,  
                      label: form[i].label,     
                    }
                    delete form[i].onClick;
                  } else if(form[i].onClickSend){
                    form[i].options = {
                      onClickSend: form[i].onClickSend,  
                      label: form[i].label,     
                    }
                    delete form[i].onClickSend;
                  }
                  delete form[i].select;
                  delete form[i].label;    
                  break;
                case "dropDown":
                  var inputString = form[i].opt;
                  var {opt} = parseInput(inputString);    
                  form[i].options = {}
                  for (let j = 0; j < opt.length; j++) {
                    form[i].options[j] = opt[j];
                  }
                  delete form[i].opt;
                  break;
                case "radio":
                  var inputString = form[i].optValue;
                  var {opt} = parseInput(inputString); 
                  form[i].options = {}
                  for (let j = 0; j < opt.length; j++) {
                    form[i].options[j] = opt[j];
                  }
                  delete form[i].optValue;
                  break;
                case "checkBox":
                  var inputLabel = form[i].label;
                  var {opt} = parseInput(inputLabel);
                  form[i].options = {};
                  form[i].value = {};
                  var selArray = (form[i].defaultsel || "").split(",").map(option => option.trim());
                  for (let j = 0; j < opt.length; j++) {
                    var label = opt[j].trim();
                    var isChecked = selArray.includes(label);
                    form[i].options[j.toString()] = {label: label, check: isChecked};
                    form[i].value[j.toString()] = {label: label, check: isChecked};
                  }
                  delete form[i].label;
                  delete form[i].defaultsel;
                  break;

              }
            }
          }
          


        for (let i = 0; i < button.length; i++) {
            delete button[i].value
            button[i].id = i+1;
            delete button[i].select;
            
          }
          const setButton_s= {};
          for (let i = 0; i < button.length; i++) {
            setButton_s[i] = button[i];
          }
          

            const element_s = {};
            for (let i = 0; i < form.length; i++) {
            element_s[i] = form[i];
            }
        
   
        node.on('input', function(msg) {
  
            msg.ui = msg.ui || {};
             msg.ui.dataset_s = msg.ui.dataset_s || {};
             var Status;              
             Status = JSON.parse(status);
             if (msg.status != undefined) {
                 Status = msg.status;
                 delete msg.status
             }
             if (Object.keys(msg.ui.dataset_s).length > 0) {
                    msg.ui.dataset_s[Object.keys(msg.ui.dataset_s).length] = {
                        setButton_s,
                        "setBadge": {
                            number: config.number,
                            title: config.title,
                            description: config.description,
                            isActive: Status,
                            isComplete: {
                                "status": true,
                                "color": "green"
                            }
                        },
                        "form": {
                            "label": {
                                "title": config.formtitle,
                                "description": config.formDes
                            },
                            element_s
                        },
                        "setInfo": {
                            tipDesc: config.tipdesc,
                            tipTitle: config.tiptitle
                        }
                    };
                } else {
                    msg.ui.dataset_s = {
                        0: {
                            setButton_s,
                            "setBadge": {
                                number: config.number,
                                title: config.title,
                                description: config.description,
                                isActive: Status,
                                isComplete: {
                                    "status": true,
                                    "color": "green"
                                }
                            },
                            "form": {
                                "label": {
                                    "title": config.formtitle,
                                    "description": config.formDes
                                },
                                element_s
                            },
                            
                            "setInfo": {
                                tipDesc: config.tipdesc,
                                tipTitle: config.tiptitle
                            }
                        }
                    };
                }

           
        
            node.send(msg);
        });
        
    }
    RED.nodes.registerType("Data_Set",Data_Set);
}

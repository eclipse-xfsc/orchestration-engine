function waitForElm(selector) {
  return new Promise(resolve => {
      if (document.querySelector(selector)) {
          return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver(mutations => {
          if (document.querySelector(selector)) {
              resolve(document.querySelector(selector));
              observer.disconnect();
          }
      });

      observer.observe(document.body, {
          childList: true,
          subtree: true
      });
  });
}


waitForElm('.red-ui-deploy-button-content').then((elm) => {
  // console.log('Element is ready');
  var aTags = document.getElementsByTagName("span");
  var searchText = "Deploy";
  var found;
  for (var i = 0; i < aTags.length; i++) {
      if (aTags[i].textContent == searchText) {
          found = aTags[i];
          break;
      }
  }
  found.innerHTML = 'Save & Deploy';

  var deploy = document.getElementById("red-ui-header-button-deploy-icon");
  deploy.src = window.location.origin + window.location.pathname + "dynamicsrc/images/deploy.svg";
});


waitForElm('.red-ui-palette-node').then((elm) => {
  const logo = document.getElementById('red-ui-header');
  logo.style.display = "inline";
  //document.querySelector(".red-ui-header-logo").firstChild.setAttribute("src","red/dynamicsrc/images/logo.png")
});

waitForElm('.red-ui-flow-node').then((elm) => {
  function changeTab() {
      document.querySelectorAll("#red-ui-workspace-tabs .fa-eye").forEach(e => {
          e.classList.add("fa-close");
          e.classList.remove("fa-eye");
      })
  };
  changeTab();
  document.querySelector(".red-ui-tab-button.red-ui-tabs-add").firstChild.addEventListener('click', changeTab);
});




// waitForElm('.red-ui-flow-node').then((elm) => {
//     var title = document.createElement("h1");
//     title.setAttribute('class', "active-flow-title");
//     document.querySelector("#red-ui-header").insertBefore(title, document.querySelector("#red-ui-header").children[1]);
//     title.innerHTML = document.querySelector(".red-ui-tab.red-ui-tabs-closeable.ui-draggable.ui-draggable-handle.active").getAttribute("flowname");
//     window.onclick = function (event) {
//         title.innerHTML = document.querySelector(".red-ui-tab.red-ui-tabs-closeable.ui-draggable.ui-draggable-handle.active").getAttribute("flowname");
//     }
// });




// waitForElm('#red-ui-workspace-tabs').then((elm) => {
//     var Button = document.createElement("a");
//     Button.setAttribute('class', "flows-button");
//     Button.innerText = "Flows";
//     Button.addEventListener("click", showflows);
//     document.querySelector(".red-ui-header-toolbar").appendChild(Button);


//     var shade = document.createElement("div");
//     shade.setAttribute('id', "shade");
//     document.querySelector("#red-ui-editor").appendChild(shade);

//     var flows = document.createElement("div");
//     flows.setAttribute('id', "flows-container");
//     document.querySelector("#red-ui-main-container").appendChild(flows);

//     var search = document.createElement("input");
//     search.setAttribute('id', "search-flows");
//     search.setAttribute('type', "text");
//     search.setAttribute('placeholder', "Search your flows...");
//     flows.appendChild(search);

//     var addFlow = document.createElement("button");
//     addFlow.setAttribute('id', "add-flow");
//     addFlow.setAttribute('type', "button");
//     addFlow.addEventListener("click", function () {
//         document.querySelector(".red-ui-tab-button.red-ui-tabs-add").firstChild.click()
//     });
//     flows.appendChild(addFlow);
//     var addIcon = document.createElement("i");
//     addIcon.setAttribute('class', "fa fa-plus");
//     addFlow.appendChild(addIcon);


//     const xmlhttp = new XMLHttpRequest();
//     const currentURL = location.origin;
//     xmlhttp.open("GET", currentURL + "/flows");
//     xmlhttp.send();

//     xmlhttp.onload = function () {
//         const myObj = JSON.parse(this.responseText);

//         const mySet = new Set();
//         for (let i = 0; i < myObj.length; i++) {
//             if (myObj[i].type == "tab" || myObj[i].type == "subflow") {

//                 const envObj = myObj[i].env;
//                 if (envObj.length === 0) {
//                     myObj[i].category = "other";
//                 }
//                 for (let j = 0; j < envObj.length; j++) {
//                     if (envObj[j].name == "category") {
//                         myObj[i].category = envObj[j].value;
//                         mySet.add(envObj[j].value);
//                     }
//                     else {
//                         myObj[i].category = "other";
//                     }
//                 }
//             }
//         }
//         mySet.add("other");
//         mySet.forEach(function (value) {
//             var category = document.createElement("div");
//             category.setAttribute('id', "category-" + value);
//             category.setAttribute('class', "flow-category");
//             flows.appendChild(category);
//             var title = document.createElement("div");
//             title.setAttribute('class', "category-title");
//             title.innerText = value;
//             category.appendChild(title);
//         })


//         for (let i = 0; i < myObj.length; i++) {
//             if (myObj[i].type == "tab" || myObj[i].type == "subflow") {

//                 var flow = document.createElement("a");
//                 flow.setAttribute('class', "flow-container " + myObj[i].type);
//                 flow.setAttribute('href', "#" + myObj[i].id);
//                 flow.addEventListener('click', function (e) {
//                     document.querySelectorAll(".red-ui-info-outline-item-label").forEach(e => {
//                         if (e.innerText === myObj[i].name || e.innerText === myObj[i].label) {
//                             if (myObj[i].type == "tab") {
//                                 e.parentElement.parentElement.firstChild.firstChild.click();
//                             }
//                             else
//                                 e.parentElement.parentElement.parentElement.firstChild.firstChild.click()
//                         }
//                     });
//                     flows.scrollTop = 0;
//                     flows.style.display = 'none';
//                     document.getElementById("shade").style.display = "none";

//                 });
//                 document.querySelector("#category-" + myObj[i].category).appendChild(flow);

//                 var iconBox = document.createElement("div");
//                 flow.appendChild(iconBox);
//                 iconBox.setAttribute('class', "icon-container");
//                 var icon = document.createElement("img");
//                 iconBox.appendChild(icon);
//                 icon.setAttribute('class', "flow-icon");
//                 icon.setAttribute('src', "");

//                 var type = document.createElement("div");
//                 flow.appendChild(type);
//                 type.setAttribute('class', "flow-type");
//                 type.innerText = myObj[i].type;
//                 if (myObj[i].type == "tab") {
//                     type.innerText = "flow";
//                 }
//                 var label = document.createElement("div");
//                 flow.appendChild(label);
//                 label.setAttribute('class', "flow-label");
//                 label.innerText = myObj[i].label || myObj[i].name;


//             }
//         }
//     }

//     search.addEventListener('keyup', function searchFunction() {
//         var input, filter, flow, label, i, txtValue;
//         input = document.getElementById("search-flows");
//         filter = input.value.toUpperCase();
//         flow = document.getElementsByClassName("flow-container");
//         for (i = 0; i < flow.length; i++) {
//             label = flow[i].getElementsByClassName("flow-label")[0];
//             if (label) {
//                 txtValue = label.textContent || label.innerText;
//                 if (txtValue.toUpperCase().indexOf(filter) > -1) {
//                     flow[i].style.display = "";
//                     document.querySelectorAll(".flow-category").forEach(function (e) {
//                         e.style.display = "";
//                     })
//                 } else {
//                     flow[i].style.display = "none";
//                 }
//             }
//         }
//         document.querySelectorAll(".flow-category").forEach(function (e) {
//             var children = e.childNodes;
//             var hideParent = true;
//             for (let i = 1; i < children.length; i++) {
//                 if (children[i].style.display != "none") {
//                     hideParent = false;
//                     break;
//                 }
//             }
//             if (hideParent) {
//                 e.style.display = "none";
//             }
//         })

//     });

//     function showflows() {
//         document.getElementById("flows-container").style.display = "block";
//         document.getElementById("shade").style.display = "block";
//     }
//     document.addEventListener('click', function hideflows(event) {
//         if (!flows.contains(event.target) && !Button.contains(event.target)) {
//             flows.scrollTop = 0;
//             flows.style.display = 'none';
//             shade.style.display = "none";
//         }
//     });
// });





waitForElm('#red-ui-tab-debug-link-button').then((elm) => {
  var info = document.createElement("p");
  info.innerText = "Info";
  document.querySelector("#red-ui-tab-info-link-button").appendChild(info);
  var help = document.createElement("p");
  help.innerText = "Help";
  document.querySelector("#red-ui-tab-help-link-button").appendChild(help);
  var debug = document.createElement("p");
  debug.innerText = "Debug";
  document.querySelector("#red-ui-tab-debug-link-button").appendChild(debug);
  var config = document.createElement("p");
  config.innerText = "Config";
  document.querySelector("#red-ui-tab-config-link-button").appendChild(config);
  var context = document.createElement("p");
  context.innerText = "Context";
  document.querySelector("#red-ui-tab-context-link-button").appendChild(context);

  document.querySelectorAll(".red-ui-tab-link-button p").forEach(element => {
      element.className = "tabIcon";
  })


});


waitForElm('#red-ui-tab-editor-tab-properties-link-button').then((elm) => {

  propertiesButton = document.querySelector("#red-ui-tab-editor-tab-properties-link-button");
  if (propertiesButton != null) {
      var properties = document.createElement("p");
      properties.innerText = "Properties";
      propertiesButton.appendChild(properties);
  }
  subflowButton = document.querySelector("#red-ui-tab-editor-tab-subflow-module-link-button");
  if (subflowButton != null) {
      var subflow = document.createElement("p");
      subflow.innerText = "Subflow";
      subflowButton.appendChild(subflow);
  }
  descriptionButton = document.querySelector("#red-ui-tab-editor-tab-description-link-button");
  if (descriptionButton != null) {
      var description = document.createElement("p");
      description.innerText = "Description";
      descriptionButton.appendChild(description);
  }
  appearanceButton = document.querySelector("#red-ui-tab-editor-tab-appearance-link-button");
  if (appearanceButton != null) {
      var appearance = document.createElement("p");
      appearance.innerText = "Appearance";
      appearanceButton.appendChild(appearance);
  }

  document.querySelectorAll(".red-ui-tab-link-button p").forEach(element => {
      element.className = "tabIcon";
  })

});




// new

const style = document.createElement('style');
style.type = 'text/css';

const origin = window.location.origin + window.location.pathname;

style.innerHTML = `
/* Font Faces */
@font-face {
  font-family: ManropeBold;
  src: url("${origin}dynamicsrc/font/Manrope-Bold.woff");
}
@font-face {
  font-family: ManropeRegular;
  src: url("${origin}dynamicsrc/font/Manrope-Regular.woff");
}
@font-face {
  font-family: Poppins;
  src: url("${origin}dynamicsrc/font/Poppins.woff");
}
  
.red-ui-tabs.red-ui-tabs-add.red-ui-tabs-menu.red-ui-tabs-scrollable > .red-ui-tab-button.red-ui-tabs-menu > a {
  background-image: url(${origin}dynamicsrc/images/Down-arrow.svg);
}
.red-ui-tabs.red-ui-tabs-add.red-ui-tabs-menu.red-ui-tabs-scrollable > .red-ui-tab-button.red-ui-tabs-add > a {
  background-image: url(${origin}dynamicsrc/images/Add.svg);
}
`;

document.head.appendChild(style);


//hossein create New Node button to node pallete
waitForElm('#red-ui-palette-search').then((paletteContainer) => {
  const NewNodeButton = document.createElement("button");
  NewNodeButton.innerHTML = `<span><svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path>
</svg></span><span>New Node</span>`;
  NewNodeButton.className = "new-node-button";

  NewNodeButton.addEventListener('click', () => {
      const managePaletteBtn = document.querySelector('#menu-item-edit-palette');
      managePaletteBtn.click();  

  });

  paletteContainer.appendChild(NewNodeButton);
});

//hossein create Button For Changing Dark Mode And Light Mode

waitForElm('#red-ui-workspace').then((headerContainer) => {
  // Create a container div for the SVG button
  const svgContainer = document.createElement('div');
  svgContainer.classList.add('svg-container');
  headerContainer.appendChild(svgContainer);
  
  // Create the SVG element
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('width', '47');
  svg.setAttribute('height', '92');
  svg.setAttribute('viewBox', '0 0 47 92');
  svg.setAttribute('fill', 'none');
  svgContainer.appendChild(svg);
  
  // Main group element with clip-path
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.setAttribute('id', 'Frame_2_0');
  g.setAttribute('clip-path', 'url(#clip0_28_30)');
  svg.appendChild(g);
  
  // Sub-group for background rectangle
  const g2 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g2.setAttribute('id', 'Rectangle_167_1');
  g.appendChild(g2);
  
  // Light mode background rectangle
  const rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect1.setAttribute('id', 'Rectangle_167_1_0');
  rect1.setAttribute('x', '0');
  rect1.setAttribute('y', '0');
  rect1.setAttribute('width', '47');
  rect1.setAttribute('height', '92');
  rect1.setAttribute('rx', '8');
  rect1.setAttribute('fill', '#E4E1E8');
  rect1.setAttribute('transform', 'rotate(0 27 60.5)');
  g2.appendChild(rect1);
  
  // Toggle circle (moves up/down)
  const rect2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect2.setAttribute('id', 'Rectangle_168_2');
  rect2.setAttribute('x', '0');
  rect2.setAttribute('y', '65');
  rect2.setAttribute('width', '47');
  rect2.setAttribute('height', '47');
  rect2.setAttribute('rx', '8');
  rect2.setAttribute('fill', 'white');
  rect2.setAttribute('transform', 'rotate(0 27 83)');
  g.appendChild(rect2);
  
  // Moon/Sun icon (filled path)
  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path1.setAttribute('id', 'Vector_3');
  path1.setAttribute('d', 'M26.9995 89.3C27.2382 89.3 27.4671 89.3948 27.6359 89.5636C27.8047 89.7324 27.8996 89.9613 27.8996 90.2V91.1C27.8996 91.3387 27.8047 91.5676 27.6359 91.7364C27.4671 91.9052 27.2382 92 26.9995 92C26.7608 92 26.5319 91.9052 26.3631 91.7364C26.1943 91.5676 26.0995 91.3387 26.0995 91.1V90.2C26.0995 89.9613 26.1943 89.7324 26.3631 89.5636C26.5319 89.3948 26.7608 89.3 26.9995 89.3ZM32.7274 87.455L33.3638 88.0913C33.5277 88.261 33.6184 88.4884 33.6164 88.7244C33.6143 88.9603 33.5197 89.1861 33.3528 89.3529C33.1859 89.5198 32.9602 89.6145 32.7242 89.6165C32.4882 89.6186 32.2608 89.5278 32.0911 89.3639L31.4547 88.7276C31.2908 88.5579 31.2001 88.3305 31.2021 88.0945C31.2042 87.8586 31.2988 87.6328 31.4657 87.466C31.6326 87.2991 31.8583 87.2044 32.0943 87.2024C32.3303 87.2003 32.5577 87.2911 32.7274 87.455ZM21.2716 87.455C21.4336 87.2936 21.6509 87.1999 21.8795 87.1929C22.108 87.1859 22.3307 87.2662 22.5022 87.4174C22.6737 87.5687 22.7812 87.7795 22.8029 88.0071C22.8246 88.2348 22.7588 88.4621 22.619 88.643L22.5443 88.7276L21.9079 89.3639C21.7459 89.5253 21.5286 89.619 21.3 89.626C21.0715 89.633 20.8488 89.5527 20.6773 89.4015C20.5058 89.2502 20.3983 89.0394 20.3766 88.8118C20.3549 88.5841 20.4207 88.3568 20.5605 88.1759L20.6352 88.0913L21.2716 87.455ZM26.9995 77.6C28.4317 77.6 29.8053 78.1689 30.8181 79.1816C31.8308 80.1943 32.3998 81.5678 32.3998 83C32.3998 84.4322 31.8308 85.8057 30.8181 86.8184C29.8053 87.8311 28.4317 88.4 26.9995 88.4C25.5673 88.4 24.1937 87.8311 23.1809 86.8184C22.1682 85.8057 21.5992 84.4322 21.5992 83C21.5992 81.5678 22.1682 80.1943 23.1809 79.1816C24.1937 78.1689 25.5673 77.6 26.9995 77.6ZM26.9995 79.4C26.0447 79.4 25.1289 79.7793 24.4538 80.4544C23.7786 81.1295 23.3993 82.0452 23.3993 83C23.3993 83.9548 23.7786 84.8705 24.4538 85.5456C25.1289 86.2207 26.0447 86.6 26.9995 86.6C27.9543 86.6 28.8701 86.2207 29.5452 85.5456C30.2204 84.8705 30.5997 83.9548 30.5997 83C30.5997 82.0452 30.2204 81.1295 29.5452 80.4544C28.8701 79.7793 27.9543 79.4 26.9995 79.4ZM19.7991 82.1C20.0285 82.1003 20.2492 82.1881 20.416 82.3456C20.5828 82.503 20.6832 82.7183 20.6966 82.9473C20.7101 83.1763 20.6355 83.4017 20.4883 83.5776C20.3411 83.7536 20.1322 83.8666 19.9044 83.8937L19.7991 83.9H18.8991C18.6696 83.8997 18.449 83.8119 18.2822 83.6544C18.1154 83.497 18.015 83.2817 18.0015 83.0527C17.9881 82.8237 18.0626 82.5983 18.2099 82.4224C18.3571 82.2464 18.5659 82.1334 18.7937 82.1063L18.8991 82.1H19.7991ZM35.0999 82.1C35.3387 82.1 35.5676 82.1948 35.7364 82.3636C35.9052 82.5324 36 82.7613 36 83C36 83.2387 35.9052 83.4676 35.7364 83.6364C35.5676 83.8052 35.3387 83.9 35.0999 83.9H34.1999C33.9612 83.9 33.7323 83.8052 33.5635 83.6364C33.3947 83.4676 33.2999 83.2387 33.2999 83C33.2999 82.7613 33.3947 82.5324 33.5635 82.3636C33.7323 82.1948 33.9612 82.1 34.1999 82.1H35.0999ZM20.6352 76.6361C20.7902 76.4811 20.9964 76.3881 21.2152 76.3743C21.4339 76.3605 21.6501 76.4271 21.8233 76.5614L21.9079 76.6361L22.5443 77.2724C22.7057 77.4344 22.7994 77.6517 22.8064 77.8802C22.8134 78.1088 22.7331 78.3314 22.5818 78.503C22.4306 78.6745 22.2197 78.782 21.9921 78.8037C21.7645 78.8253 21.5371 78.7596 21.3562 78.6197L21.2716 78.545L20.6352 77.9087C20.4665 77.7399 20.3717 77.511 20.3717 77.2724C20.3717 77.0338 20.4665 76.8049 20.6352 76.6361ZM33.3638 76.6361C33.5325 76.8049 33.6273 77.0338 33.6273 77.2724C33.6273 77.511 33.5325 77.7399 33.3638 77.9087L32.7274 78.545C32.6444 78.631 32.5451 78.6995 32.4353 78.7467C32.3255 78.7939 32.2074 78.8187 32.0878 78.8197C31.9683 78.8208 31.8498 78.798 31.7392 78.7527C31.6286 78.7075 31.5281 78.6407 31.4436 78.5562C31.3591 78.4717 31.2923 78.3712 31.247 78.2606C31.2017 78.15 31.179 78.0314 31.18 77.9119C31.181 77.7924 31.2059 77.6743 31.253 77.5645C31.3002 77.4547 31.3688 77.3554 31.4547 77.2724L32.0911 76.6361C32.2599 76.4674 32.4888 76.3726 32.7274 76.3726C32.9661 76.3726 33.195 76.4674 33.3638 76.6361ZM26.9995 74C27.2382 74 27.4671 74.0948 27.6359 74.2636C27.8047 74.4324 27.8996 74.6613 27.8996 74.9V75.8C27.8996 76.0387 27.8047 76.2676 27.6359 76.4364C27.4671 76.6052 27.2382 76.7 26.9995 76.7C26.7608 76.7 26.5319 76.6052 26.3631 76.4364C26.1943 76.2676 26.0995 76.0387 26.0995 75.8V74.9C26.0995 74.6613 26.1943 74.4324 26.3631 74.2636C26.5319 74.0948 26.7608 74 26.9995 74Z');
  path1.setAttribute('transform', 'translate(-3, 6)');
  path1.setAttribute('fill', '#5C5B60');
  g.appendChild(path1);
  
  // Highlight curve (stroke path)
  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path2.setAttribute('id', 'Vector_4');
  path2.setAttribute('d', 'M27.7571 31.0058H28.0523C27.0875 31.8679 26.4674 33.0279 26.2997 34.2841C26.132 35.5403 26.4274 36.8133 27.1344 37.8819C27.8414 38.9504 28.9154 39.7469 30.1697 40.1328C31.424 40.5188 32.7793 40.4699 34 39.9946C33.5304 41.0811 32.763 42.0247 31.7795 42.7247C30.796 43.4247 29.6334 43.8549 28.4157 43.9692C27.1979 44.0836 25.9708 43.8779 24.8651 43.3741C23.7593 42.8703 22.8166 42.0873 22.1373 41.1087C21.458 40.13 21.0677 38.9923 21.008 37.817C20.9484 36.6418 21.2215 35.4729 21.7984 34.4353C22.3753 33.3976 23.2343 32.53 24.2837 31.925C25.3331 31.32 26.5336 31.0003 27.7571 31V31.0058Z');
  path2.setAttribute('transform', 'translate(-3, 5)');
  path2.setAttribute('stroke', '#9A9A9A');
  path2.setAttribute('stroke-width', '1.32203');
  path2.setAttribute('stroke-linecap', 'round');
  path2.setAttribute('stroke-linejoin', 'round');
  g.appendChild(path2);
  
  // Create defs and clip-path for SVG masking
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  const clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
  clipPath.setAttribute('id', 'clip0_28_30');
  const clipRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  clipRect.setAttribute('width', '54');
  clipRect.setAttribute('height', '121');
  clipRect.setAttribute('fill', 'white');
  clipPath.appendChild(clipRect);
  defs.appendChild(clipPath);
  svg.appendChild(defs);
  
  // Define element IDs and animation states
  const sourceIdNames = ["Rectangle_168_2", "Vector_3", "Vector_4", "Rectangle_167_1_0"];
  const animationLoops = [
    ["animation_Rectangle_168_2_flow_1 0.3s ease-out 0s forwards", "animation_Rectangle_168_2_flow_2 0.3s ease-out 0s forwards"],
    ["animation_Vector_3_flow_1 0.3s ease-out 0s forwards", "animation_Vector_3_flow_2 0.3s ease-out 0s forwards"],
    ["animation_Vector_4_flow_1 0.3s ease-out 0s forwards", "animation_Vector_4_flow_2 0.3s ease-out 0s forwards"],
    ["animation_Rectangle_167_1_0_flow_1 0.3s ease-out 0s forwards", "animation_Rectangle_167_1_0_flow_2 0.3s ease-out 0s forwards"]
  ];
  
  // Restore saved theme and animation on page load
  const savedTheme = localStorage.getItem('theme');
  const animationIndex = localStorage.getItem('themeAnimationIndex');
  
  if (savedTheme === 'dark') {
    document.documentElement.classList.toggle('dark');
    sourceIdNames.forEach((id, index) => {
      const element = document.getElementById(id);
      if (element) {
        element.style.animation = animationLoops[index][0];
        animationLoops[index].push(animationLoops[index].shift());
      }
    });
  }
  
  // Handle theme toggle on SVG click
  svgContainer.addEventListener("click", () => {
    sourceIdNames.forEach((id, index) => {
      const element = document.getElementById(id);
      if (element) {
        element.style.animation = animationLoops[index][0];
        animationLoops[index].push(animationLoops[index].shift());
      }
    });
  
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    localStorage.setItem('themeAnimationIndex', isDark ? '1' : '0');
  });
  });




//hossein create zoom-in zoom-zore zoom-out buttons
waitForElm('#red-ui-workspace').then((elm) => {
  function createPanelGroup() {
      const panelGroup = document.createElement("div");
      panelGroup.className = "panel-group";
    
      const zoom = document.createElement("div");
      zoom.className = "zoom";
    
      const zoomIn = document.createElement("div");
      zoomIn.className = "zoom-in";
      zoomIn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" fill="#5A5A89"></path>
        </svg>
      `;
    
      const zoomZero = document.createElement("div");
      zoomZero.className = "zoom-zero";
      zoomZero.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
          <circle cx="14" cy="13" r="4" stroke="#5A5A89" stroke-width="2"></circle>
        </svg>
      `;
    
      const zoomOut = document.createElement("div");
      zoomOut.className = "zoom-out";
      zoomOut.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M11 11H13H19V13H13H11H5V11H11Z" fill="#5A5A89"></path>
        </svg>
      `;
    
      zoom.appendChild(zoomIn);
      zoom.appendChild(zoomZero);
      zoom.appendChild(zoomOut);
    
      const map = document.createElement("div");
      map.className = "map";
      map.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20ZM12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 14C11.4696 14 10.9609 13.7893 10.5858 13.4142C10.2107 13.0391 10 12.5304 10 12C10 11.4696 10.2107 10.9609 10.5858 10.5858C10.9609 10.2107 11.4696 10 12 10C12.5304 10 13.0391 10.2107 13.4142 10.5858C13.7893 10.9609 14 11.4696 14 12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14Z" fill="#5A5A89"></path>
        </svg>
      `;
    
      panelGroup.appendChild(zoom);
      panelGroup.appendChild(map);
    
      return panelGroup;
    }
    
    const editor = document.querySelector('#red-ui-workspace');
    const panel = createPanelGroup();
    if (editor) {
      editor.insertBefore(panel, editor.firstChild);
    }
    
});

waitForElm('.red-ui-statusbar-bucket').then((elm) => {

  $(".map").on("click", function() {
      $("#red-ui-view-navigate").click();
  });
  // $(".zoom-in").on("click", function() {
  //     $("#red-ui-view-zoom-in").click();
  // });
  // $(".zoom-zero").on("click", function() {
  //     $("#red-ui-view-zoom-zero").click();
  // });
  // $(".zoom-out").on("click", function() {
  //     $("#red-ui-view-zoom-out").click();
  // });

});

waitForElm('#red-ui-tab-info-link-button i').then((elm) => {

  $('#red-ui-tab-info-link-button i').replaceWith(
      $('<img>', {
          src: 'dynamicsrc/images/Info.svg',
          class: 'red-ui-tab-icon',
          width: 16,
          height: 16
      })
  );


});


waitForElm('.red-ui-workspace-chart-event-layer').then((elm) => {
  const zoomable = document.querySelector(".red-ui-workspace-chart-event-layer");
  const svg = document.querySelector('#red-ui-workspace-chart > svg');
  const workspace = document.getElementById("red-ui-workspace");

  let scale = 0.8;
  const minScale = 0.2;
  const maxScale = 1.2;
  let transX = 0, transY = 0;
  const zoomSpeed = 0.001;

  let isDragging = false;
  let isSpacePressed = false;
  let isCtrlPressed = false;
  let startX, startY;

  svg.style.cursor = 'default';

  function updateTransform() {
    zoomable.style.transform = `translate(${transX}px, ${transY}px) scale(${scale})`;

    window.customZoomState = {
      scale,
      transX,
      transY
    };
  }

  function clampTransform() {
    const workspaceRect = workspace.getBoundingClientRect();
    const chartRect = zoomable.getBoundingClientRect();

    const limitX = -(chartRect.width * scale - workspaceRect.width + 50);
    const limitY = -(chartRect.height * scale - workspaceRect.height + 50);

    transX = Math.min(50, Math.max(limitX, transX));
    transY = Math.min(50, Math.max(limitY, transY));
  }

  function onWheel(e) {
    if (!isCtrlPressed) return;
    e.preventDefault();

    const rect = zoomable.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const delta = -e.deltaY * zoomSpeed;
    const newScale = Math.min(maxScale, Math.max(minScale, scale + delta));
    const factor = newScale / scale;

    transX -= offsetX * (factor - 1);
    transY -= offsetY * (factor - 1);
    scale = newScale;
    clampTransform();
    updateTransform();
  }

  function onMouseDown(e) {
    if (!isSpacePressed) return;
    isDragging = true;
    startX = e.clientX - transX;
    startY = e.clientY - transY;
    zoomable.style.cursor = "grabbing";
  }

  function onMouseMove(e) {
    if (!isDragging) return;
    transX = e.clientX - startX;
    transY = e.clientY - startY;
    clampTransform();
    updateTransform();
  }

  function onMouseUp() {
    isDragging = false;
    zoomable.style.cursor = isSpacePressed ? "grab" : "default";
  }

  function onKeyDown(e) {
    const isInputFocused =
      document.activeElement.tagName === "INPUT" ||
      document.activeElement.tagName === "TEXTAREA" ||
      document.activeElement.isContentEditable;
  
    if (e.code === "Space") {
      if (!isInputFocused) {
        isSpacePressed = true;
        if (!isDragging) {
          zoomable.style.cursor = "grab";
          svg.style.cursor = "grab";
        }
        e.preventDefault(); 
      }
    } else if (e.key === "Control") {
      isCtrlPressed = true;
    }
  }

  function onKeyUp(e) {
    if (e.code === "Space") {
      isSpacePressed = false;
      isDragging = false;
      zoomable.style.cursor = "default";
      svg.style.cursor = "default";
    } else if (e.key === "Control") {
      isCtrlPressed = false;
    }
  }

  workspace.addEventListener("wheel", onWheel, { passive: false });
  workspace.addEventListener("mousedown", onMouseDown);
  workspace.addEventListener("mousemove", onMouseMove);
  workspace.addEventListener("mouseup", onMouseUp);
  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);

  $(".zoom-in").on("click", function () {
    if (scale < maxScale) {
      scale = Math.min(maxScale, scale + 0.1);
      clampTransform();
      updateTransform();
    }
  });

  $(".zoom-zero").on("click", function () {
    scale = 0.8;
    transX = 0;
    transY = 0;
    clampTransform();
    updateTransform();
  });

  $(".zoom-out").on("click", function () {
    if (scale > minScale) {
      scale = Math.max(minScale, scale - 0.1);
      clampTransform();
      updateTransform();
    }
  });

  updateTransform();
});


        // fardin
        waitForElm('#red-ui-tab-info-link-button i').then((elm) => {

          $('#red-ui-tab-info-link-button i').replaceWith(
              $('<img>', {
                  src: 'dynamicsrc/images/right-bar-icons/Info.svg',
                  class: 'red-ui-tab-icon',
                  width: 16,
                  height: 16
              })
          );
      
      
      });
      waitForElm('#red-ui-tab-help-link-button i').then((elm) => {

          $('#red-ui-tab-help-link-button i').replaceWith(
              $('<img>', {
                  src: 'dynamicsrc/images/right-bar-icons/Help.svg',
                  class: 'red-ui-tab-icon',
                  width: 16,
                  height: 16
              })
          );
      
      
      });
              waitForElm('#red-ui-tab-debug-link-button i').then((elm) => {

          $('#red-ui-tab-debug-link-button i').replaceWith(
              $('<img>', {
                  src: 'dynamicsrc/images/right-bar-icons/Debug.svg',
                  class: 'red-ui-tab-icon',
                  width: 16,
                  height: 16
              })
          );
      
      
      });
      waitForElm('#red-ui-tab-config-link-button i').then((elm) => {

          $('#red-ui-tab-config-link-button i').replaceWith(
              $('<img>', {
                  src: 'dynamicsrc/images/right-bar-icons/config.svg',
                  class: 'red-ui-tab-icon',
                  width: 16,
                  height: 16
              })
          );
      
      
      });
      waitForElm('#red-ui-tab-context-link-button i').then((elm) => {

          $('#red-ui-tab-context-link-button i').replaceWith(
              $('<img>', {
                  src: 'dynamicsrc/images/right-bar-icons/Data.svg',
                  class: 'red-ui-tab-icon',
                  width: 16,
                  height: 16
              })
          );
      
      
      });




waitForElm('.red-ui-deploy-button-group').then((elm) => {

const askBtn = document.createElement('button');
askBtn.className = 'ai-btn';
askBtn.innerHTML = `  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
  <defs>
    <linearGradient id="aiGradient" gradientTransform="rotate(35.802)">
      <stop offset="0%" stop-color="#5046e4"></stop>
      <stop offset="46%" stop-color="#625bff"></stop>
      <stop offset="100%" stop-color="#B503FB"></stop>
    </linearGradient>
  </defs>
  <path d="M10.1481 5.21151C10.0858 5.04535 9.95465 4.91424 9.78849 4.85193L8.18347 4.25004C7.65195 4.05072 7.65182 3.29894 8.18328 3.09944L9.78868 2.49681C9.95473 2.43448 10.0857 2.30344 10.148 2.13737L10.75 0.532857C10.9493 0.00143039 11.701 0.00131309 11.9005 0.532679L12.5031 2.13755C12.5655 2.30351 12.6964 2.43447 12.8624 2.49679L14.4673 3.09947C14.9987 3.299 14.9986 4.05066 14.4672 4.25002L12.8626 4.85195C12.6965 4.91425 12.5654 5.04527 12.5031 5.21133L11.9005 6.81666C11.7011 7.34812 10.9493 7.34801 10.7499 6.81649L10.1481 5.21151ZM3.34778 11.9945C3.28533 11.8384 3.16161 11.7147 3.00548 11.6522L0.426252 10.6205C-0.0887493 10.4145 -0.0887493 9.6855 0.426252 9.4795L3.00548 8.44779C3.16161 8.38534 3.28533 8.26162 3.34778 8.10549L4.37949 5.52626C4.58549 5.01126 5.3145 5.01126 5.5205 5.52626L6.55221 8.10549C6.61466 8.26162 6.73838 8.38534 6.89451 8.44779L9.47374 9.4795C9.98874 9.6855 9.98874 10.4145 9.47374 10.6205L6.89451 11.6522C6.73838 11.7147 6.61466 11.8384 6.55221 11.9945L5.5205 14.5737C5.3145 15.0887 4.58549 15.0887 4.37949 14.5737L3.34778 11.9945Z"></path>
</svg><span>Ask AI</span>`;
document.querySelector(".red-ui-header-toolbar li").prepend(askBtn);


// --- Popover Container ---
const popover = document.createElement('div');
popover.className = 'ai-popover';
popover.innerHTML = `
  <textarea class="ai-textarea" placeholder="Enter your prompt here..."></textarea>
  <div class="button-container"><button class="ai-generate">Generate Flow</button></div>
`;
document.body.appendChild(popover);

// --- Toggle Popover ---
askBtn.addEventListener('click', () => {
  popover.querySelector('.ai-textarea').value = '';
  popover.querySelector('.ai-generate').classList.remove('ai-success', 'ai-error', 'ai-loading');
  popover.style.display = popover.style.display === 'flex' ? 'none' : 'flex';
});


popover.querySelector('.ai-generate').addEventListener('click', async function () {
  const textarea = popover.querySelector('.ai-textarea');
  const prompt = textarea.value.trim();
  const button = this;

  // textarea.classList.remove('error-border');

  if (!prompt) {
    textarea.classList.add('error-border');
    setTimeout(() => {
        textarea.classList.remove("error-border");
    }, 3000);
      return;
  }
  else{
    textarea.classList.remove('error-border')
  }



  // Reset all state classes
  button.classList.remove('ai-success', 'ai-error', 'ai-loading', 'ai-shrink-open','ai-shrink-close');

  if (!prompt) return;


  button.classList.add('ai-shrink-open');
  button.disabled = true;

  
  setTimeout(async () => {
      
      button.classList.remove('ai-shrink-open');
      button.classList.add('ai-loading');
      button.innerHTML = `<div class="spinner">
                            <span class="circle"></span>
                            <span class="circle"></span>
                          </div>`;

      try {
        const response = await fetch(`${window.location.origin + window.location.pathname}ai`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt })
        });

        const result = await response.json();

        if (response.ok && result.status === "success") {
          button.classList.remove('ai-loading');
          button.classList.add('ai-success');
          button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 16 16">
                                <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-6.25 6.25a.75.75 0 0 1-1.06 0L2.22 7.28a.75.75 0 0 1 1.06-1.06l3.25 3.25 5.72-5.72a.75.75 0 0 1 1.06 0z"/>
                              </svg>`;
        } else {
          throw new Error(result.message || "Unknown error");
        }
      } catch (error) {
          button.classList.remove('ai-loading');
          button.classList.add('ai-error');
          button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 16 16">
                                <path d="M4.22 4.22a.75.75 0 0 1 1.06 0L8 6.94l2.72-2.72a.75.75 0 1 1 1.06 1.06L9.06 8l2.72 2.72a.75.75 0 0 1-1.06 1.06L8 9.06l-2.72 2.72a.75.75 0 0 1-1.06-1.06L6.94 8 4.22 5.28a.75.75 0 0 1 0-1.06z"/>
                              </svg>`;
          console.error(error.message);
      } finally {
        setTimeout(() => {
          button.classList.add('ai-shrink-close');
          setTimeout(() => {
            button.classList.remove('ai-success', 'ai-error', 'ai-loading', 'ai-shrink-close');
            button.textContent = 'Generate Flow';
          }, 300);
          
          button.textContent = '';
          button.disabled = false;
        }, 2000);
      }
  }, 500); 
});



document.addEventListener('click', function (event) {
const isClickInsidePopover = popover.contains(event.target);
const isClickOnButton = askBtn.contains(event.target);

// If clicked outside both popover and button
if (!isClickInsidePopover && !isClickOnButton) {
  popover.style.display = 'none';
  popover.querySelector('.ai-textarea').value = '';
}
});

});    



waitForElm('.red-ui-header-logo').then((elm) => {

  const logoSpan = document.querySelector('.red-ui-header-logo');
  
  const img = document.createElement('img');
  img.classList.add('dark-logo');
  img.src = 'dynamicsrc/images/orce-logo-dark.png'
  logoSpan.appendChild(img)
  
  
});


document.addEventListener("DOMContentLoaded", () => {
  console.log("[Tooltip] Waiting for buttons to appear...");
  setupCustomTooltips();
});

function setupCustomTooltips() {
  const SELECTOR = ".red-ui-tab-link-button";

  const tooltipMap = {
    "red-ui-tab-info-link-button": "Info",
    "red-ui-tab-help-link-button": "Help",
    "red-ui-tab-debug-link-button": "Debug",
    "red-ui-tab-config-link-button": "Config",
    "red-ui-tab-context-link-button": "Context"
  };

  // Create or reuse a single tooltip element
  let tooltip = document.querySelector(".custom-tooltip");
  if (!tooltip) {
    tooltip = document.createElement("div");
    tooltip.className = "custom-tooltip";
    tooltip.id = "custom-tooltip";
    tooltip.setAttribute("role", "tooltip");
    tooltip.style.display = "none";
    document.body.appendChild(tooltip);
  }

  const positionTooltip = (button) => {
    // Defer until layout is updated
    requestAnimationFrame(() => {
      const rect = button.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();

      let top = rect.top + window.scrollY - tooltipRect.height - 8;
      let left = rect.left + window.scrollX + rect.width / 2 - tooltipRect.width / 2;

      // Keep tooltip in the viewport
      const padding = 8;
      const maxLeft = window.scrollX + document.documentElement.clientWidth - tooltipRect.width - padding;
      const minLeft = window.scrollX + padding;

      if (left < minLeft) left = minLeft;
      if (left > maxLeft) left = maxLeft;
      if (top < window.scrollY + padding) {
        // Not enough space above; place below
        top = rect.bottom + window.scrollY + 8;
      }

      tooltip.style.top = `${top}px`;
      tooltip.style.left = `${left}px`;
    });
  };

  const showTooltip = (button, labelText) => {
    tooltip.textContent = labelText;
    tooltip.style.display = "block";
    tooltip.classList.add("show");
    positionTooltip(button);
  };

  const hideTooltip = () => {
    tooltip.classList.remove("show");
    tooltip.style.display = "none";
  };

  const initButton = (button) => {
    const id = button.id;
    const labelText = tooltipMap[id];
    if (!labelText) return;

    // Prevent double-initialization
    if (button.dataset.tooltipInit === "1") return;
    button.dataset.tooltipInit = "1";

    // Remove native tooltip to avoid duplication, but wire up aria-describedby to the custom one
    button.removeAttribute("title");
    const previousDescribedBy = button.getAttribute("aria-describedby") || "";
    const ids = new Set(previousDescribedBy.split(/\s+/).filter(Boolean));
    ids.add("custom-tooltip");
    button.setAttribute("aria-describedby", Array.from(ids).join(" "));

    // Mouse interactions
    button.addEventListener("mouseenter", () => showTooltip(button, labelText));
    button.addEventListener("mouseleave", hideTooltip);
    button.addEventListener("mousemove", () => positionTooltip(button));

    // Keyboard interactions
    button.addEventListener("focus", () => showTooltip(button, labelText));
    button.addEventListener("blur", hideTooltip);
  };

  // Initialize any existing buttons
  document.querySelectorAll(SELECTOR).forEach(initButton);

  // Observe future buttons and initialize them once they appear
  const observer = new MutationObserver(() => {
    document.querySelectorAll(SELECTOR).forEach(initButton);
  });
  observer.observe(document.body, { childList: true, subtree: true });
}


waitForElm('.red-ui-workspace-chart-event-layer').then((elm) => {
  const zoomable = document.querySelector(".red-ui-workspace-chart-event-layer");
  const svg = document.querySelector('#red-ui-workspace-chart > svg');
  const workspace = document.getElementById("red-ui-workspace");

  let scale = 0.8;
  const minScale = 0.2;
  const maxScale = 1.2;
  let transX = 0, transY = 0;
  const zoomSpeed = 0.001;

  let isDragging = false;
  let isSpacePressed = false;
  let isCtrlPressed = false;
  let startX, startY;

  svg.style.cursor = 'default';

  function updateTransform() {
    zoomable.style.transform = `translate(${transX}px, ${transY}px) scale(${scale})`;

    window.customZoomState = {
      scale,
      transX,
      transY
    };
  }

  function clampTransform() {
    const workspaceRect = workspace.getBoundingClientRect();
    const chartRect = zoomable.getBoundingClientRect();

    const limitX = -(chartRect.width * scale - workspaceRect.width + 50);
    const limitY = -(chartRect.height * scale - workspaceRect.height + 50);

    transX = Math.min(50, Math.max(limitX, transX));
    transY = Math.min(50, Math.max(limitY, transY));
  }

  function onWheel(e) {
    if (!isCtrlPressed) return;
    e.preventDefault();

    const rect = zoomable.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const delta = -e.deltaY * zoomSpeed;
    const newScale = Math.min(maxScale, Math.max(minScale, scale + delta));
    const factor = newScale / scale;

    transX -= offsetX * (factor - 1);
    transY -= offsetY * (factor - 1);
    scale = newScale;
    clampTransform();
    updateTransform();
  }

  function onMouseDown(e) {
    if (!isSpacePressed) return;
    isDragging = true;
    startX = e.clientX - transX;
    startY = e.clientY - transY;
    zoomable.style.cursor = "grabbing";
  }

  function onMouseMove(e) {
    if (!isDragging) return;
    transX = e.clientX - startX;
    transY = e.clientY - startY;
    clampTransform();
    updateTransform();
  }

  function onMouseUp() {
    isDragging = false;
    zoomable.style.cursor = isSpacePressed ? "grab" : "default";
  }

  function onKeyDown(e) {
    const isInputFocused =
      document.activeElement.tagName === "INPUT" ||
      document.activeElement.tagName === "TEXTAREA" ||
      document.activeElement.isContentEditable;
  
    if (e.code === "Space") {
      if (!isInputFocused) {
        isSpacePressed = true;
        if (!isDragging) {
          zoomable.style.cursor = "grab";
          svg.style.cursor = "grab";
        }
        e.preventDefault(); 
      }
    } else if (e.key === "Control") {
      isCtrlPressed = true;
    }
  }

  function onKeyUp(e) {
    if (e.code === "Space") {
      isSpacePressed = false;
      isDragging = false;
      zoomable.style.cursor = "default";
      svg.style.cursor = "default";
    } else if (e.key === "Control") {
      isCtrlPressed = false;
    }
  }

  workspace.addEventListener("wheel", onWheel, { passive: false });
  workspace.addEventListener("mousedown", onMouseDown);
  workspace.addEventListener("mousemove", onMouseMove);
  workspace.addEventListener("mouseup", onMouseUp);
  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);

  $(".zoom-in").on("click", function () {
    if (scale < maxScale) {
      scale = Math.min(maxScale, scale + 0.1);
      clampTransform();
      updateTransform();
    }
    });

  $(".zoom-zero").on("click", function () {
      scale = 0.8;
      transX = 0;
      transY = 0;
      updateTransform();
    
      const scrollContainer = document.getElementById("red-ui-workspace-chart");
      if (scrollContainer) {
        scrollContainer.scrollTop = 0;
        scrollContainer.scrollLeft = 0;
      }
    });
    
    
      $(".zoom-out").on("click", function () {
        if (scale > minScale) {
          scale = Math.max(minScale, scale - 0.1);
          clampTransform();
          updateTransform();
        }
      });
    
      updateTransform();
});

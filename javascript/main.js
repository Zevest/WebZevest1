window.addEventListener("load",main);
var projectList = []
var curentPath;

var num = 0;
function main(){
  createTitle();
  makeCenter();
  addProjectFolder("TP1 Rectangles","Zevest.github.io/TP1/index.html");
  projectList.forEach(addButton);

}

function createTitle(){
  h1 = document.createElement("H1");
  h1.innerHTML = "University Project"
  h1.left = "50%"
  h1.align = "center"
  document.body.appendChild(h1);
}

function makeCenter(){
  center = document.createElement('div');
  center.className = "container";
  document.body.appendChild(center);
}

function addButton(prj){
  var element = document.createElement("div");
  element.className = "projectButton";
  element.id = "button_" + num;
  num++;
  element.innerHTML = prj.name;
  currentPath = document.location.hostname  + "/" + prj.path
  element.addEventListener('click', goTo);
  center.appendChild(element);
}

function goTo(){
  window.location.assign(currentPath);
}


function addProjectFolder(projectName, folderName){
  project = {name : projectName, path: folderName};
  projectList.push(project);
}

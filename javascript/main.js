window.addEventListener("load",main);
var projectList = []
var targetPath = {};

var num = 0;
function main(){
  createTitle();
  makeCenter();
  addProjectFolder("TP1 Rectangles","TP1/index.html");
  addProjectFolder("TP1 width p5.js", "TP1_with_p5/index.html");
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
  element.id = "B"+num;
  num++;
  element.innerHTML = prj.name;
  targetPath[element.id] = prj.path;
  element.addEventListener('click', goTo, this);
  center.appendChild(element);
}

function goTo(element){
    window.location.assign(targetPath[element.target.id]);
}


function addProjectFolder(projectName, folderName){
  project = {name : projectName, path: folderName};
  projectList.push(project);
}

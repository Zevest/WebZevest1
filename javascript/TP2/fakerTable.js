window.addEventListener("load", main);
var people = [] // contain all person object
var table;


function main() {
  faker.locale = "fr";
  var totalPeople = 50;
  for (i = 0; i < totalPeople; i++) {
    people.push(createPerson());
  }
  buildTable();
}

// Return a person object
function createPerson() {
  var person = {
    lastName: faker.fake("{{name.lastName}}"),
    firstName: faker.fake("{{name.firstName}}"),
    age: random(18, 100).toString(),
    job: faker.fake("{{name.jobTitle}}"),
    job: faker.fake("{{name.jobType}} {{name.jobArea}}"),
    address: faker.fake("{{address.streetAddress}}"),
    num: faker.fake("{{phone.phoneNumber}}")
  };
  return person;
}

// Return a row width a person's data
function objectToRow(person) {
  var row = document.createElement("tr");
  for (key in person) {
    cell = document.createElement("td");
    cell.textContent = person[key];
    cell.style.border = "1px solid black";
    row.appendChild(cell);
  }
  return row;
}

// Return a Table element containaing people's data
function makeTable(content) {
  var tempTable = document.createElement("table");
  tempTable.appendChild(createTr(["Last name", "First name", "Age", "Job", "Address", "Phone Number"],
    ["lastName", "firstName", "age", "job", "address", "num"]));
  for (i = 0; i < content.length; i++) {
    tempTable.appendChild(objectToRow(content[i]));
  }
  return tempTable;
}

//  Add people to the body
function buildTable() {
  table = makeTable(people);
  table.style.borderCollapse = "collapse";
  table.style.border = "1px solid black";
  document.body.appendChild(table);
}
// Sort people by the property clicked on
function sortByProperty(element) {
  people.sort(function(a, b) {
    return a[element.target.id].localeCompare(b[element.target.id]);
  });
  document.body.removeChild(table);
  buildTable();
}

// Add Property of the Table  to the body
function createTr(property, id) {
  var row = document.createElement("tr");
  for (i = 0; i < property.length; i++) {
    var cell = document.createElement("td");
    cell.textContent = property[i];
    cell.bgColor = "black";
    cell.style.color = "white";
    cell.style.cursor = "pointer"
    cell.id = id[i];
    cell.addEventListener("click", sortByProperty, this);
    row.appendChild(cell);
  }
  return row;
}
// Return random number
function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

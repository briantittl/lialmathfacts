$(document).ready(function(){

var typeString = prompt("What fact types? (+,-,x,/) separated by commas");
var typeArray = typeString.split(",");

var familyString = prompt("What primary fact families? (75% of questions)");

var familyArray = familyString.split(",");
var rFamilyArray = [];
for (var i = 0; i<familyArray.length; i++){
	familyArray[i] = Number(familyArray[i]);
  for (var j = 0; j<3; j++) {
    rFamilyArray.push(familyArray[i]);
  }
}

var secondaryFamilyString = prompt("What secondary fact families? (25% of questions)")
if (secondaryFamilyString.length > 0){
  console.log(secondaryFamilyString);
  var secondaryFamilyArray = secondaryFamilyString.split(",");
  for (var i = 0; i<secondaryFamilyArray.length; i++){
    secondaryFamilyArray[i] = Number(secondaryFamilyArray[i]);
    rFamilyArray.push(secondaryFamilyArray[i]);
  }
}

console.log(rFamilyArray);

var rows = Number(prompt("How many rows?"));
var columns = Number(prompt("How many columns?"));

var number = rows*columns;

function getProblems(factType, factFamily, number) {
	problems = [];
	for (var i=0; i<number; i++) {
		var type = factType[Math.floor(Math.random() * factType.length)];
		var family = factFamily[Math.floor(Math.random() * factFamily.length)];
		problems.push(getFact(type, family));
	}
	return problems;
}

function getFact(factType, factFamily) {

  var problem = [];

  function randomize(problem) {
    var randomizer = (Math.floor((Math.random() * 2)));
    if (randomizer == 1) {
      var b = problem[1];
      problem[1] = problem[2];
      problem[2] = b;
    }
  }

  if (factType == "x") {
    var firstNumber = Math.floor(Math.random() * 10);
    var secondNumber = factFamily
    problem = [factType, firstNumber, secondNumber];
    randomize(problem)
  }

  if (factType == "/") {
    var firstNumber = factFamily;
    var secondNumber = (Math.floor(Math.random() * 10) * factFamily);
    problem = [factType, firstNumber, secondNumber];
    //first and second numbers not interchangeable
  }

  if (factType == "+") {
    var firstNumber = factFamily - Math.floor(Math.random() * (factFamily+1));
    var secondNumber = factFamily - firstNumber;
    problem = [factType, firstNumber, secondNumber];
    randomize(problem)
  }

  if (factType == "-") {
    var firstNumber = factFamily
    var secondNumber = Math.floor(Math.random() * (factFamily + 1))
    problem = [factType, firstNumber, secondNumber];
    //first and second numbers not interchangeable
  }

  return problem;
}

var data = getProblems(typeArray,rFamilyArray,number)

var tableString = ""

tableString += "<table>";

for (var i=0; i<rows; i++){
	tableString += "<tr class='row'>";
	for (var j=0; j<columns; j++){
		var fact = data.pop();
		if (fact[0] == "x" || fact[0] == "-" || fact[0] == "+") {
			tableString += "<td><table class='fact'><tr><td class='sign'></td><td class='number'>" + fact[1] + "</td></tr><tr><td class='sign'>" + fact[0] + "</td><td class='number'>" + fact[2] + "</td></tr><tr><td class='bottom sign'></td><td class='bottom number'></td></tr></table></td>"
		}
		else {
			tableString += "<td><table class='fact'><tr><td class='sign'></td><td class='number'></td></tr><tr><td class='sign divisionRight'>" + fact[1] + "</td><td class='number divisionTop'>" + fact[2] + "</td></tr><tr><td class='sign'></td><td class='number'></td></tr></table></td>"	
		}
	}
	tableString += "</tr>";
}
tableString += "</table>";

$("#table").html(tableString);

});

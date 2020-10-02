
var players;
var numbersArray;
function getNumbers() {
  players = [document.getElementById("name1").value, document.getElementById("name2").value, 
  document.getElementById("name3").value, document.getElementById("name4").value, 
  document.getElementById("name5").value];
  var numbers = [document.getElementById("pl1").value, document.getElementById("pl2").value, 
  document.getElementById("pl3").value, document.getElementById("pl4").value, 
  document.getElementById("pl5").value];
  numbersArray = numbers.map(Number);
  algorithm();
}

var result;
function algorithm() {
  if (checkValid(numbersArray) == false) {
    document.getElementById("demo").innerHTML = "Numbers do not add up to 0, try again.";
    return;
  }
  sortNumbersNames(numbersArray, players);
  winnersDict = findWinners(players, numbersArray);
  losersDict = findLosers(players, numbersArray);
  var winnersNumbers = findWinnersArray(players, numbersArray);
  var winnersNames = findWinnersNamesArray(winnersDict, winnersNumbers);
  var losersNumbers = findLosersArray(players, numbersArray);
  var losersNames = findLosersNamesArray(losersDict, losersNumbers);
  result = calculate(winnersNames, losersNames, winnersNumbers, losersNumbers);
  display(result);
}

function display(result) {
  var length = Object.keys(result).length;
  var i = 0;
  var j;
  var winnerDisplay = new Array(length);
  var loserDisplay = new Array(length);
  for (var key in result) {
    winnerDisplay[i] = key;
    loserDisplay[i] = result[key];
    i++;
  }
  var ledger = new Array(winnerDisplay.length);
  var finances = document.getElementById("demo1");
  finances.innerHTML = "";
  for (j = 0; j < winnerDisplay.length; j++) {
    ledger[j] = winnerDisplay[j] + ": " + loserDisplay[j];
    finances.innerHTML += ledger[j] + "<br>";
  }
}
function sortNumbersNames(numbersArray, players) {
  var i;
  var j;
  var temp;
  var tempName;
  for (i = 0; i < numbersArray.length; i++) {
    for (j = i + 1; j < numbersArray.length; j++) {
      if (numbersArray[i] > numbersArray[j]) {
        temp = numbersArray[i];
        numbersArray[i] = numbersArray[j];
        numbersArray[j] = temp;
        tempName = players[i];
        players[i] = players[j];
        players[j] = tempName;
      }
    }
  }
}

function calculate(winnersNames, losersNames, winnersNumbers, losersNumbers) {
  var result = {};
  var i = 0;
  var j = 0;
  var loserString = [];
  while (i < losersNames.length && j < winnersNames.length) {
    if (losersNumbers[i] + winnersNumbers[j] == 0) {
      loserString.push(losersNames[i].concat(' ', -losersNumbers[i].toString(10)));
      result[winnersNames[j]] = loserString;
      loserString = [];
      i++;
      j++;
    } else if ((losersNumbers[i] + winnersNumbers[j]) < 0) {
      losersNumbers[i] = losersNumbers[i] + winnersNumbers[j];
      loserString.push(losersNames[i].concat(' ', winnersNumbers[j].toString(10)));
      result[winnersNames[j]] = loserString;
      loserString = [];
      j++;
    } else if (losersNumbers[i] + winnersNumbers[j] > 0) {
      loserString.push(losersNames[i].concat(' ', -losersNumbers[i].toString(10)));
      winnersNumbers[j] = winnersNumbers[j] + losersNumbers[i];
      i++;
    }
  }
  return result;
}
function findWinnersNamesArray(winnersDict, winnersNumbers) {
  var i = 0;
  var winnersNamesTwo = new Array(winnersNumbers.length);
  for (var key in winnersDict) {
    winnersNamesTwo[i] = key;
    i++
  }
  return winnersNamesTwo.reverse();
}

function findLosersNamesArray(losersDict, losersNumbers) {
  var i = 0;
  var losersNamesTwo = new Array(losersNumbers.length);
  for (var key in losersDict) {
    losersNamesTwo[i] = key;
    i++
  }
  return losersNamesTwo;
}



function checkValid(numbers) {
  var i;
  var result = 0;
  for (i = 0; i < numbers.length; i++) {
    result += numbers[i];
  }
  if (result == 0) {
    return true;
  }
  return false;
}

function findWinnersArray(players, numbers) {
  var i;
  var count = 0;
  for (i = 0; i < numbers.length; i++) {
    if (numbers[i] > 0) {
      count += 1;
    }
  }
  var winnersArray = numbers.splice(-count);
  return winnersArray.reverse();
}

function findLosersArray(players, numbers) {
  var i;
  var count = 0;
  for (i = 0; i < numbers.length; i++) {
    if (numbers[i] < 0) {
      count += 1;
    }
  }
  return numbers.slice(0,count);
}

function findWinners(players, numbers) {
  var i;
  var winners = {};
  for (i = 0; i < numbers.length; i++) {
    if (numbers[i] > 0) {
      winners[players[i]] = numbers[i];
    }
  }
  return winners;
}

function findLosers(players, numbers) {
  var i;
  var losers = {};
  for (i = 0; i < numbers.length; i++) {
    if (numbers[i] < 0) {
      losers[players[i]] = numbers[i];
    }
  }
  return losers;
}
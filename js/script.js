  var count = 4;

  function resetRows() {
    for (i = 0; i <= count; i ++) {
      document.getElementById("name" + i).value = '';
      document.getElementById("pl" + i).value = '';
    }
  }

  function addOneRow() {
    count++;
    var para = document.createElement("p"); // This code creates a new <p> element
    var node = document.createElement("INPUT"); //To add text to the <p> element, you must create a text node first.
    node.setAttribute("type", "text");
    node.setAttribute("id", "name" + count);
    node.setAttribute("placeholder", "player" + " " + (count+1));

    var space = document.createElement("STRING");               // Create a <p> element
    space.innerText = " ";               // Insert text   

    var node1 = document.createElement("INPUT"); //To add text to the <p> element, you must create a text node first.
    node1.setAttribute("type", "text");
    node1.setAttribute("id", "pl" + count);
    
    node1.setAttribute("placeholder", "P/L player" + " " + (count+1));
    para.appendChild(node); // Then you must append the text node to the <p> element:
    para.appendChild(space);; 
    para.appendChild(node1);
    //Finally you must append the new element to an existing element.
    var element = document.getElementById("leftside"); // This code finds an existing element
    var child = document.getElementById("p1"); //This code appends the new element to the existing element
    element.insertBefore(para,child);
    
  }

  function addFiveRows() {
    for (var j = 0; j <= 4; j++) {
      count++;
      var para = document.createElement("p"); // This code creates a new <p> element
      var node = document.createElement("INPUT"); //To add text to the <p> element, you must create a text node first.
      node.setAttribute("type", "text");
      node.setAttribute("id", "name" + count);
      node.setAttribute("placeholder", "player" + " " + (count+1));
      
      var space = document.createElement("STRING");               // Create a <p> element
      space.innerText = " ";               // Insert text   

      var node1 = document.createElement("INPUT"); //To add text to the <p> element, you must create a text node first.
      node1.setAttribute("type", "text");
      node1.setAttribute("id", "pl" + count);
      
      node1.setAttribute("placeholder", "P/L player" + " " + (count+1));
      para.appendChild(node); // Then you must append the text node to the <p> element:
      para.appendChild(space);;
      para.appendChild(node1);
      //Finally you must append the new element to an existing element.
      var element = document.getElementById("leftside"); // This code finds an existing element
      var child = document.getElementById("p1"); //This code appends the new element to the existing element
      element.insertBefore(para,child);
    }
  }

  var players; //used to store the player names
  var profitLosses; //used to store the profit/loss of players
  
  function storeArrays() {
    addPlayers();
    addProfitLosses();
    profitLosses = profitLosses.map(Number); //converts the array of string of numbers into an array of numbers
    runAlgorithm();
  }

  function addPlayers() {
    var i;
    players = new Array(count + 1);
    for (i = 0; i <= count; i ++) {
      players[i] = document.getElementById("name" + i).value;
    }
  }

  function addProfitLosses() {
    var i;
    profitLosses = new Array(count + 1);
    for (i = 0; i <= count; i ++) {
      profitLosses[i] = document.getElementById("pl" + i).value;
    }
  }

  var result;

  function runAlgorithm() {
    if (addToZero() == false) { //checks if all the profit losses add up to zero
      document.getElementById("errorCheck").innerHTML = "Numbers do not add up to 0, try again."; //prints string if it doesn't add to zero
      return; // .innerHTML prints to div in HTML
    } 
    else {
      document.getElementById("errorCheck").innerHTML = ""
    }

    sortNumbersPlayers(); //sorts profitLosses array in ascending order and rearranges players array accordingly
    winnersDict = findWinners(); //makes a list of winners in form of {player name:profit} 
    losersDict = findLosers(); //makes a list of losers in form of {players:loss} 
    var sortedWinnersProfits = sortWinners(profitLosses); // makes array of profits in descending order
    var sortedWinnersNames = sortWinnersNames(winnersDict, sortedWinnersProfits); // rearranges names accordingly
    var sortedLosersLosses = sortLosers(players, profitLosses); // makes array of losses in ascending order
    var sortedLosersNames = sortLosersNames(losersDict, sortedLosersLosses); // rearranges names accordingly
    result = calculate(sortedWinnersNames, sortedLosersNames, sortedWinnersProfits, sortedLosersLosses);
    // result is a list in format {winner: loser1 losses, loser2 losses}
    display(result); //displays the result, comments in display function
  }

  function addToZero() {
    var i;
    var result = 0;
    for (i = 0; i < profitLosses.length; i++) {
      result += profitLosses[i];
    }
    if (result == 0) {
      return true;
    }
    return false;
  }

  function sortNumbersPlayers() {
    var i,j;
    var tempNumber;
    var tempName;
    for (i = 0; i < profitLosses.length; i++) {
      for (j = i + 1; j < profitLosses.length; j++) {
        if (profitLosses[i] > profitLosses[j]) {
          temp = profitLosses[i];
          profitLosses[i] = profitLosses[j];
          profitLosses[j] = temp;
          tempName = players[i];
          players[i] = players[j];
          players[j] = tempName;
        }
      }
    }
  }

  function findWinners() {
    var i;
    var winners = {};
    for (i = 0; i < profitLosses.length; i++) {
      if (profitLosses[i] > 0) {
        winners[players[i]] = profitLosses[i];
      }
    }
    return winners;
  }

  function findLosers() {
    var i;
    var losers = {};
    for (i = 0; i < profitLosses.length; i++) {
      if (profitLosses[i] < 0) {
        losers[players[i]] = profitLosses[i];
      }
    }
    return losers;
  }

  function sortWinners(profitLosses) {
    var i;
    var count = 0;
    for (i = 0; i < profitLosses.length; i++) {
      if (profitLosses[i] > 0) {
        count += 1;
      }
    }
    var winnersArray = profitLosses.splice(-count);
    return winnersArray.reverse();
  }
  
  function sortWinnersNames(winnersDict, sortedWinnersProfits) {
    var i = 0;
    var sortedProfits = new Array(sortedWinnersProfits.length);
    for (var key in winnersDict) {
      sortedProfits[i] = key;
      i++
    }
    return sortedProfits.reverse();
  }

  function sortLosers(players, numbers) {
    var i;
    var count = 0;
    for (i = 0; i < numbers.length; i++) {
      if (numbers[i] < 0) {
        count += 1;
      }
    }
    return numbers.slice(0,count);
  }
  
  function sortLosersNames(losersDict, losersNumbers) {
    var i = 0;
    var losersNamesTwo = new Array(losersNumbers.length);
    for (var key in losersDict) {
      losersNamesTwo[i] = key;
      i++
    }
    return losersNamesTwo;
  }
  


  // winnersNames is an array of the names of winners
  // their respective earnings is the respective index in winnersNumbers
  // vice versa for losersNames and losesNumbers

  function calculate(winnersNames, losersNames, winnersNumbers, losersNumbers) {
    var result = {}; 
    // i is loser's index
    var i = 0; 

    // j is winner's index
    var j = 0; 
    //var loserString = [];
    var winnerString = ""; 
    while (i < losersNames.length && j < winnersNames.length) {
      
      // 
      if (losersNumbers[i] + winnersNumbers[j] == 0) {
        //loserString.push(losersNames[i].concat(' ', -losersNumbers[i].toString(10)));
        winnerString += losersNames[i] + " " + -losersNumbers[i];
        result[winnersNames[j]] = winnerString;
        winnerString = "";
        i++;
        j++;

      //
      } else if ((losersNumbers[i] + winnersNumbers[j]) < 0) {
        losersNumbers[i] = losersNumbers[i] + winnersNumbers[j];

        // loserString.push(losersNames[i].concat(' ', winnersNumbers[j].toString(10)));
        winnerString += losersNames[i] + " " + winnersNumbers[j]
        result[winnersNames[j]] = winnerString;
        winnerString = "";
        j++;

      // 
      } else if (losersNumbers[i] + winnersNumbers[j] > 0) {
        // winnerString.push(losersNames[i].concat(' ', -losersNumbers[i].toString(10)));
        winnerString += losersNames[i] + " " + -losersNumbers[i];
        winnersNumbers[j] = winnersNumbers[j] + losersNumbers[i];
        i++;
      }
    }
    return result;
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

    //ledger is a makeshift output box, can be taken out if values are 
    var ledger = new Array(winnerDisplay.length);
    var finances = document.getElementById("result"); //we are going to print finances at "result" (line 109)

    finances.innerHTML = ""; //initialize finances to be an empty string
    
    for (j = 0; j < winnerDisplay.length; j++) {
      ledger[j] = winnerDisplay[j] + ": " + loserDisplay[j]; // we are going to add ledger[j] to the string
      finances.innerHTML += ledger[j] + "<br>"; // add ledger[j] to finances then break line
    }
  }





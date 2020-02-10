function allID(id) {
  return document.getElementById(id);
}

let voornaam = allID("voornaam");
let achternaam = allID("achternaam");
let leeftijd = allID("leeftijd");
let inputVerwijderRij = allID("input-verwijder-rij");
let uitvoertabel = allID("uitvoer-tabel");

function allEvents() {
  allID("voeg-data-toe").onclick = function () {
    if (allCheck(voornaam.value, achternaam.value, leeftijd.value) == true) {
      voegToeGegevens();
      allID("uitvoer").innerHTML = "";
      cleanInputs();
    }
  };
}

allEvents();

function cleanInputs() {
  voornaam.value = "";
  achternaam.value = "";
  leeftijd.value = "";
}

function allCheck(vNaam, aNaam, age) {
  let resultCheck = false;
  let patternVnaam = /^[a-zA-Z]+$/;
  let patternAnaam = /^[a-zA-Z]+$/;
  let leeftijdCheck = parseInt(age);

  if (patternVnaam.test(vNaam) == false || vNaam == "") {
    allID("uitvoer").innerHTML = "Voer een voornaam in a.u.b.";
    allID("voornaam").focus();
  } else if (patternAnaam.test(aNaam) == false || aNaam == "") {
    allID("uitvoer").innerHTML = "Voer een achternaam in a.u.b.";
    allID("achternaam").focus();
  } else if (leeftijdCheck < 0 || leeftijdCheck > 120 || isNaN(leeftijdCheck)) {
    allID("uitvoer").innerHTML = "Voer een leeftijd in a.u.b.";
    allID("leeftijd").focus();
  } else {
    resultCheck = true;
  }
  return resultCheck;
}

click = 0;

function voegToeGegevens() {

  let formulier = allID("invoer-formulier");
  let nieuweGegevens = [];

  for (let i = 0; i < formulier.length; i++) {
    nieuweGegevens[i] = formulier.elements[i].value;
  }

  let row = document.querySelectorAll("#uitvoer-tabel tbody tr");
  let lastRowIndex;
  click++;

  if (click == 1) {
    lastRowIndex = row[row.length - 1].childNodes[1].innerHTML;
  } else {
    lastRowIndex = row[row.length - 1].childNodes[0].innerHTML;
  }
  nieuweGegevens.unshift(parseInt(lastRowIndex) + 1);

  let nieuweRij = uitvoertabel.insertRow(-1);

  for (i = 0; i < 4; i++) {
    let NieuweCell = nieuweRij.insertCell(i);
    NieuweCell.innerHTML = nieuweGegevens[i];
    if (i === 0) {
      NieuweCell.classList.add("row-nmr");
    }
  }
}

allID("verwijder-rij").onclick = function () {
  let row = document.getElementsByClassName("row-nmr");
  let ivr = parseInt(inputVerwijderRij.value);

  try {
    if (row[ivr - 1].childNodes[0].nodeValue) {
      allID("uitvoer-tabel").deleteRow(ivr);
      allID("error-verwijder-rij").innerHTML = "";
    }

    let count = 1;

    for (let i = 0; i < row.length; i++) {
      row[i].innerHTML = count;
      count++;
    }
  } catch (err) {
    if (ivr >= uitvoertabel.rows.length || ivr <= 0) {
      allID("error-verwijder-rij").innerHTML =
        "Geen geldig tabelnummer ingevoerd!";
      inputVerwijderRij.focus();
    }
  }
};

for (let i = 1; i <= 10; i++) {
  console.log(i + ", ");
}
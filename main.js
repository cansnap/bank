// PARTIE 1 Générer le clavier (position des chiffres de 0 à 9 et touches vides)

// Génération des chiffres de 0 à 9 dans un tableau
let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// Génération des cases vides dans un tableau
let emptyCases = Array(6).fill("");

// Concaténation des chiffres et des cases vides dans un tableau
let values = numbers.concat(emptyCases);

// Mélange aléatoire des chiffres et des cases vides
values.sort(() => Math.random() - 0.5);

// Récupération des boutons du clavier
let buttons = document.querySelectorAll(".keyboard-button");

// Remplissage des boutons avec les chiffres mélangés et des cases vides
// Ajout d'une classe active pour mettre en gris foncé les cases qui ont un nombre entier (on vérifie si la valeur de values[i] est un nombre en utilisant la méthode Number.isInteger(). Si la valeur est un nombre entier, vous pouvez alors ajouter la classe active à ce bouton.)
for (let i = 0; i < buttons.length; i++) {
    if (Number.isInteger(values[i])) {
        buttons[i].innerHTML = values[i];
        buttons[i].classList.add("active");
    } else {
        buttons[i].innerHTML = "";
        buttons[i].classList.remove("active");
    }
}

// Stockage du mot de passe saisi
let passwordTyped = "";

// Récupération de l'input avec l'ID "password"
let passwordInput = document.getElementById("password");

// Ajout d'un chiffre au mot de passe lorsqu'un bouton est cliqué
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", passwordCreation);
}

function passwordCreation(){
    passwordInput.value += this.innerHTML;
    passwordTyped += this.innerHTML;
}

// Ecouteur d'événement "click" sur le bouton "Effacer"
let clearButton = document.getElementById("clear-button");
clearButton.addEventListener("click", clear);

function clear(){
    fillButtons();
    passwordInput.value = "";
    passwordTyped = "";
}

function fillButtons(){
    let newNumbers = [...numbers, ...emptyCases];
    newNumbers.sort(() => Math.random() - 0.5);
    for (let i = 0; i < buttons.length; i++) {
        if (Number.isInteger(newNumbers[i])) {
            buttons[i].innerHTML = newNumbers[i];
            buttons[i].classList.add("active");
        } else {
            buttons[i].innerHTML = "";
            buttons[i].classList.remove("active");
        }
    }
}

// PARTIE 2 et 3 Envoyer et afficher la demande d'authentification

async function bankLogin() {
    const login = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    const response = await fetch('https://www.ericfree.net/formation/api/check_user.php', {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `login=${login}&password=${password}`
    });
    const data = await response.json();
    if (data.check === true) {
      document.querySelector(".message-connect").style.display = "block";
      document.querySelector(".message-fail").style.display = "none";
    } else {
      document.querySelector(".message-fail").style.display = "block";
      document.querySelector(".message-connect").style.display = "none";
    }
  }

  // Ecouteur d'événement click sur le bouton submit

  document.getElementById("submit-button").addEventListener("click", function(event) {
    event.preventDefault();
    bankLogin();
  });





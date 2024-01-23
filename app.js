//USAMOS: el DOM (Document Object Model)
//conectamos elementos del html con el js
/*
let titulo = document.querySelector("h1");
titulo.innerHTML = "Juego del número secreto";

let parrafo = document.querySelector("p");
parrafo.innerHTML = "Indica un número del 1 al 10";
*/

//INTERACCIÓN: botones
/*let intentoDeUsuario = () => {
  alert("click desde el botón");//verificando que funciona
};*/

let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteado = [];
let numeroMaximo = 10;

function verificarIntento() {
  let numeroDeUsuario = parseInt(document.getElementById("valorUsuario").value); //acá nos referimos al input con el id
  if (numeroDeUsuario === numeroSecreto) {
    asignarTextoElemento(
      "p",
      `Acertaaste al número, en ${intentos} ${
        intentos === 1 ? "intento" : "intentos"
      }`
    );
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    //el user no acertó
    if (numeroDeUsuario > numeroSecreto) {
      asignarTextoElemento("p", "El número secreto es menor");
    } else {
      asignarTextoElemento("p", "El número secreto es mayor");
    }
    intentos += 1;
    limpiarCaja();
  }
  return;
}

//Automatización
//Se busca que sea genérica, para poder reutilizarla = orden - profesionalismo - escalabilidad
function asignarTextoElemento(elemento, texto) {
  let elementoHTML = document.querySelector(elemento);
  elementoHTML.innerHTML = texto;
  return; //buena práctica aún si no retorna algo
}

function condicionesIniciales() {
  asignarTextoElemento("h1", "Juego de número secreto");
  asignarTextoElemento("p", `Indica un número del 1 al ${numeroMaximo}`);
  numeroSecreto = generarNumeroSecreto();
  intentos = 1;
}

// uso de listas
function generarNumeroSecreto() {
  let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1; //poniendo el return, dejamos de necesitar una variable
  if (listaNumerosSorteado.length == numeroMaximo) {
    asignarTextoElemento("p", "Ya se sortearon todos los números posibles");
  } else {
    //si el número está incluído en la lista
    //entonces esto es para que cuando descubrimos el número, ya no se puede jugar el mismo
    //guarda cada número generado en una lista
    if (listaNumerosSorteado.includes(numeroGenerado)) {
      return generarNumeroSecreto();
    } else {
      listaNumerosSorteado.push(numeroGenerado);
      return numeroGenerado;
    }
  }
  // return numeroSecreto; // aquí si retorna el valor del num secreto
}

function limpiarCaja() {
  document.querySelector("#valorUsuario").value = ""; //otra forma de seleccionar por id
}

function reiniciarJuego() {
  //limpiar la caja
  limpiarCaja();
  //indicar mensaje de inicio
  //restaurar el número aleatorio
  //inicializar el número de intentos
  condicionesIniciales();
  //deshabilitar el botón de nuevo
  document.getElementById("reiniciar").setAttribute("disabled", "true");
}

condicionesIniciales();

//--------------------------------------------------------------------
// Listas, vectores, arrays

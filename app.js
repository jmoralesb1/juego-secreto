let numeroSecreto = 0;
//Para determinar el numero de intentos al adivinar el numero secreto, 
//creamos la siguiente variable, se inicia en 1, porque las personas hará al menos un intento
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;


function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}
//Capturando el valor de Input
//Vamos a capturar lo que el usuario escribe en el input
//dado el caso que tengamos varios input, vamos al index y ponemos un id al input a capturar
function verificarIntento(){
    //Para llamar un elemento usamos por regla general querySelector
    //pero cuando hay un Id, hay una funcion que nos ayuda a llamarla, getElementById
    //con el value, puedo traer del elemento, todos sus atributos
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    //si el usuario acerta el numero, usamos la linea siguiente
    if (numeroDeUsuario === numeroSecreto){
        //mostramos un mensaje que acertó
        //se pone el contador de la linea 4 y 37 en ${}
        //el segundo ${}, se usa como if para evaluar si se escribe vez o veces
        asignarTextoElemento('p', `Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        //Ahora, en la pagina web hay un botton que se llama nuevo juego
        //Este boton esta desactivado y solo se actará cuando el usuario haya ganado la partida y se activa de esta manera
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        //Si el mumero de usuario es mayor que el secreto
        if (numeroDeUsuario > numeroSecreto){
            //mostramos un mensaje que diga que el numero secreto es menor
            asignarTextoElemento('p', 'El número secreto es menor');
        } else {
            asignarTextoElemento('p', 'El número secreto es mayor');
        }
        //contador de intentos, cuya variable fue hecha en la linea 4
        intentos++;
        limpiarCaja();
    }
    return;
}

//Creamos una funcion para limpiar el input luego de haber acertado el numero
//se escribe un # seguido del Id del input
//Esta funcion se llama cuando la persona no acierta el numero secreto
//Es por eso se que se escribe debajo de intentos++
function limpiarCaja(){
    document.querySelector('#valorUsuario').value ='';
    //Luego llamamos la variable y le asignamos comillas simples y vacias. Esto vacía el input.
}

//Generar numeros aleatorios
function generarNumeroSecreto(){
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    //si ya sortemamos todos los numeros
    if (listaNumerosSorteados.length == numeroMaximo){
        asignarTextoElemento('p', 'Ya se sortearon todos los numeros posibles');
    } else {
        //si el numero generado está incluido en la lista   
        if (listaNumerosSorteados.includes(numeroGenerado)){
            return generarNumeroSecreto();
        } else {
            //Con esto agregamos el numero generado con el metodo pus y con el pop eliminamos
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }

}

function condicionesIniciales(){
    asignarTextoElemento('h1', 'Juego del numero secrero');
    asignarTextoElemento('p', `Asignar un numero del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}


//Para hacer uso del boton activar juego, en el index agregamos en el boton 
//la funcion de onclick con el parametro o nombre "reiniciarJuego"
function reiniciarJuego() {
    //limpiar la caja
    limpiarCaja();
    //indicar mensaje de intervalo de numeros
    //generar el numero aleatorio
    //inicializar el numero de intentos
    condicionesIniciales();
    //deshabilitar el boton de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true');
    
}

condicionesIniciales();

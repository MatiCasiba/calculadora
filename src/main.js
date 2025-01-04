import './style.css'

let pantalla = document.getElementById('pantalla') 
const botones = document.querySelectorAll('.btn')


let entradaActual = ''
let operacionActual = ''
let resultados = ''
let reinicaiarPantalla = false

// función para actualizar la pantalla
let actualizarPantalla = (valor) => {
    if (valor.length > 13){
        pantalla.textContent = valor.slice(0, 13)
    } else {
        pantalla.textContent = valor
    }
}

// funcion para el reinicio de la calculadora
let reiniciarCalculadora = () =>{
    entradaActual = ''
    operacionActual = ''
    resultados = ''
    reinicaiarPantalla = false
    actualizarPantalla("0")
}


import './style.css'

let pantalla = document.getElementById('pantalla') 
const botones = document.querySelectorAll('.btn')

let entradaActual = ''
let operacionActual = ''
let resultados = ''
let reiniciarPantalla = false

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
    reiniciarPantalla = false
    actualizarPantalla("0")
}

// funcion para calculos
let calcular = () =>{
    if (!operacionActual || entradaActual === ""){
        return;
    }

    const n1 = parseFloat(resultados)
    const n2 = parseFloat(entradaActual)

    // verifico si los numeros son válidos
    if (isNaN(n1) || isNaN(n2)){
        return;
    }

    switch (operacionActual){
        case "+":
            resultados = (n1+n2).toString();
            break;
        case "-":
            resultados = (n1-n2).toString();
            break;
        case "x":
            resultados = (n1*n2).toString();
            break;
        case "/":
            if (n2 === 0){
                resultados = 'Error';
            } else {
                resultados = (n1 / n2).toString();
            }
            break;
        default:
            return;
    }
    entradaActual = ""
    operacionActual = ""
    actualizarPantalla(resultados)
}

// función para manejar el evento de botones
let operadores = ['+', '-', 'x', '/']
botones.forEach((boton) => {
    boton.addEventListener("click", () =>{
        let valor = boton.textContent

        if (!isNaN(valor) || valor === "."){
            if (reiniciarPantalla){
                entradaActual = ""
                reiniciarPantalla = false
                actualizarPantalla("0")
            }
            if (valor === "." && entradaActual.includes()) {
                return;
            }
            entradaActual += valor
            let valorPantalla
            if (entradaActual){
                valorPantalla = entradaActual
            } else {
                valorPantalla = "0"
            }
            actualizarPantalla(valorPantalla)

        } else if (operadores.includes(valor)){
            if (resultados && !entradaActual) {
                operacionActual = valor
                return;
            }
            if (entradaActual && operacionActual) {
                calcular ()
            }
            if (!resultados){
                resultados = entradaActual
            }
            operacionActual = valor
            entradaActual = ""

        } else if (valor === "=") {
            calcular()
        } 
    })
})

//Reiniciando la pantalla cuando haga click
pantalla.addEventListener("click", reiniciarCalculadora)
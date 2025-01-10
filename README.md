* Nombre: Matias Casiba
* Link Netlify: https://calculadora-matias-casiba.netlify.app/
* Link repo GitHub: https://github.com/MatiCasiba/calculadora

# Desafio 11: creando una calculadora
En este poryecto, se pidio crear una calculadora, para esto estaré utilizando html con css para mostrar en pantalla la calculadora, con html crearé los botones con sus números y signos, también una pantalla chica donde se mostrará la operación que deseas realizar, con css le estaré dando estilo a esta calculadora. En javaScript, estaré realizando las funciones para que la calculadora ande como corresponda. Las funciones que tendrá la calculadora es de suamar, restar, dividir y multiplicar.

## Armando la calculadora
En el archivo index.html, estaré trabajndo con elementos contenedores y button:
```sh
<body>
    <div class="calculadora">
      <div class="pantalla" id="pantalla">0</div>
      <div class="botones">
        <button class="btn">9</button>
        <button class="btn">8</button>
        <button class="btn">7</button>
        <button class="btn">+</button>
        <button class="btn">6</button>
        <button class="btn">5</button>
        <button class="btn">4</button>
        <button class="btn">-</button>
        <button class="btn">3</button>
        <button class="btn">2</button>
        <button class="btn">1</button>
        <button class="btn">x</button>
        <button class="btn">.</button>
        <button class="btn">0</button>
        <button class="btn">=</button>
        <button class="btn">/</button>
      </div>
    </div> <!-- .calculadora -->

    <script type="module" src="/src/main.js"></script>
  </body>
```
### Diseño de la calculadora
Voy usar estos contenedores con sus clases para dar diseño al igual que algunos elementos
```sh
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Times New Roman', Times, serif; # una tipografia que aplica a todos los elementos
}

# en root creo los colores para luego asignarolos sea en elementos o clases con var()
:root{
  --colorTeclas: #121111;
  --colorNumeros-simbolos: #ffff;
  --colorNumeroPantalla: #121111;
  --colorBorde: #121111;
}

body{
  display: flex;
  justify-content: center; # centra la calculadora en la linea horizontal
  align-items: center; # centra la calculadora en la linea vertical
  height: 100vh; #viewport height (altura de la ventana gráfica), me permite ajustar el tamaño de los elemetnos en relación con la altura de la ventana del navegador
  
}

.calculadora{
  width: 400px; # su ancho
}

.pantalla{
  color: var(--colorNumeroPantalla);
  font-size: 50px; #tamaño del numero que se muestra en la pantalla arriba de las teclas
  text-align: right; # comenzará mostrando desde la derecha
  padding: 10px; # su relleno
  height: 80px; # el alto 
  border: 1px solid var(--colorBorde); # grosor, estilo y color del borde
  border-radius: 5px; # elimino las esquinas puntiagudas
  
}
```

### Diseño de los botones
Para que los botones tengan un orden y encajen en la calculadora. voy a trabajar con flex: grow shrink basis

```sh
button{
  flex: 1 1 calc(25% - 10px);
  padding: 20px;
  font-size: 30px;
  background-color: var(--colorTeclas);
  color: var(--colorNumeros-simbolos);
  border-radius: 5px;
}

.botones{
  display: flex;
  flex-wrap: wrap; # si los botones no tiene espacio para seguir en la misma linea horizontal, se irá acomodando debajo en otra línea horizontal
  gap: 2px; # espacio entre estos botones
  margin-top: 10px; # espacio arriba de los botones para que no quede muy pegados con la pantalla 
}
```
* flex-grow: 1 -> este valor va a indicar como el elemento puede crecer en proporción a los demás elementos flexibles dentro del contenedor
* flex-shrink: 1 -> este define cuanto puede reducirse el tamaño del elemento si el contenedor tiene menos espacio del necesario
* flex-basis: calc(25% - 10px) -> va a definir el tamaño base inicial del elemento antes de que se aplice el espacio que sobra o el que falta. Si tengo de contenedor un ancho de 400px, cada boton empieza con un ancho base de calc(25% - 10px) osea:
```sh
ANCHO DEL BOTON = 400/4 - 10 = 100 - 10 = 90px

#divido por 4 ya que la organización de la calculadora lo hago de 4 botones por fila:
Ancho del contenedor(400px) / cantidad de botones por fila(4)
```
Entonces cuando combino flex-grow:1 y flex-shrink:1, voy a asegurarme de que los botones puedan ampliarse o achicarse de manera dinámica para que se adapte al contenedor. ¿Por qué 25%? Cada botón ocupa inicialmente el 25% de ancho del contenedor, para llegar a este resultado la cuenta seria de 100/ 4 = 25, le resto 10px para dejar espacio entre los botones.
* calc(): me va a permitir realizar operaciones matemáticos (suma, resta, division, multiplicacion), con este puedo combinar valores diferentes, ejemplo: px, %, em, rem, vh, vw, etc.

## Diseño en teclas
Al momento de pasar el cursor por encima de los botones, estas cambiarán de color, para esto eh trabajado con un hover y agregué 2 colores en el root:

```sh
:root{
  --colorTeclasHover: #ffff;
  --colorNumeros-simbolosHover: #121111;
}

button:hover{
  color: var(--colorNumeros-simbolosHover);
  background-color: var(--colorTeclasHover);
}
```
### Color active 
Cuando el usuario aprete la tecla, el color de fondo de la tecla pasará a tener un color gris, esto lo logro con button:active
```sh
button:active{
  background-color: var(--colorTeclasActive);
}
```

## Creando variables de estado, funcion para actualizar pantalla y reinicio de calculadora
Primero comenzaré creando las variables de estado, antes de eso voy a acceder al contenedor div y los botones
```sh
let pantalla = document.getElementById('pantalla') # el display
const botones = document.querySelectorAll('.btn') # obtengo todos los botones de la calculadora
```

### Variables de estado
La finalidad con la que hago eso es para almacenar el estado de la calculadora

```sh
let entradaActual = ''
let operacionActual = ''
let resultados = ''
let reinicaiarPantalla = false
```
* la variable entradaActual se encargará de almacenar los números que están ingresando
* la variable operacionActual contenderá el operador de momento sea +, -, x o la /
* la variable resultado va a guardar el resultado que se va acumulando de la operacion
* la variable reiniciarPantalla lo declaré en booleano para indicar si se debe reiniciar la entrada despues de mostrar el resultado

### Función para actualizar la pantalla
Con este bloque de código voy a limitar la longitud del texto para evitar desbordes 
```sh
let actualizarPantalla = (valor) => {
    if (valor.length > 13){
        pantalla.textContent = valor.slice(0, 13) // limito a 13 caracteres
    } else {
        pantalla.textContent = valor // muestra el valor completo
    }
}
```
* valor: es el contendio que se va a mostrar en el display

### Función para reiniciar la calculadora
Voy a resetar todas las variables a sus valores inicial y mostrará 0 en el display, esto cuando el usuario haga click en el display y en cualquier momento que necesites un reinicio
```sh
let reiniciarCalculadora = () =>{
    entradaActual = ''
    operacionActual = ''
    resultados = ''
    reinicaiarPantalla = false
    actualizarPantalla("0")
}
```

## Funcion para calcular
En este bloque de código se encargará de procesar las operaciones matemáticas a ejecutar, suma, resta, mulñtiplicación y división:
```sh
let calcular = () =>{
    if (!operacionActual || entradaActual === ""){
        return; # si no hay operación o entrada, no se sigue
    }

    const n1 = parseFloat(resultados)
    const n2 = parseFloat(entradaActual)

    # verifico si los numeros son válidos
    if (isNaN(n1) || isNaN(n2)){
        return; # que salga si no cumple las condiciones necesarias
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
```
* En la condicion inicial lo que hace es que si no hay una operación pendiente o no se ha ingresado un número, no se hará nada
* Nota -> uso isNaN para asegurarme que el programa maneje entradas no numéricas, con esto me evito de posibles errores o algún comportamiento distinto
```sh
if (isNaN(n1) || isNaN(n2)){
    return; # que salga si no cumple las condiciones necesarias
}
```
* Verás que hay parseFloat, con esto convierto en números flotantes los resultados y la entradaActual
```sh
    const n1 = parseFloat(resultados)
    const n2 = parseFloat(entradaActual)
```
* Switch se encarga de realizar la operación que se ingrese, hice un pequeño bloque de código para la división con la finalidad de que no se pueda dividir por 0, si el usuario lo intenta, este mostrará "Error"
```sh
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
```
Con toString() convierto el resultado de las operaciones (números) en cadenas de texto antes de asignarlas a la variable resultados. Una de las razones por la cual lo uso es porque en el display de la calculadora (pantalla) es texto, si asignara un número directamente, js lo convertirá de manera no declarada en una cadena. Entonces al usar toString(), me aseguro de esta conversión, si no llegara a usar esto, no estaría notando errores ya que js hace la conversión automáticamente.

* Saliendo de switch, lo que verás en 3 líneas es la actualización. Este almacena el resultado como un string, se reinicia la entradaActual y muestra el resultado en el display:
```sh
    entradaActual = ""
    operacionActual = ""
    actualizarPantalla(resultados)
```

## Función para manejar evento de botones
Este bloque de código permite que cada botón de la calculadora realice acciones según su tipo, sea números, operadores o el botón de =. Esta es la funcipon que se va a encargar de gestionar el flujo completo de la calculadora, desde la captura de entrada hasta la ejecución de operaciones matemáticas, lo realicé de la siguiente forma:
```sh
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
                return
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
```
### Definiendo los operadores
Cree una array para los símbolos de las operiones matemáticas que va tener la calculadora:
```sh
let operadores = ['+', '-', 'x', '/']
```

### La iteración sobre botones
Botones es una lista de elementos html que la obtuve con document.querySelectorAll('btn'), el forEach() va a recorrer cada botón y ejecuta la función proporcionada por cada uno. Cada elemento individiual del recorrido se llama boton
```sh
botones.forEach((boton) => {...})
```

### Agrego un evento a cada botón
Agregué un evento de tio click a cada botón, cada vez que el usuario haga click en un botón, se va a ejecutar la función que desea:
```sh
boton.addEventListener("click", () => {...})
```

### Obteniendo el texto del boton
Esta parte va a obtener el texto que contiene el boton seleccionado y va a guardarse en la variable valor, el texto es lo que va a identificar si es un número, operador o algún otro símbolo sea = o un .
```sh
const valor = boton.textContent;
```

### Manejando números y el punto decimal
Este bloque se va a ejecutar si botón presionado es un número o un punto:
```sh
if (!isNaN(valor) || valor === ".") {
}
```
* !isNaN(): va a verificar si el valor es un número, usando el hecho de que devuelve true para valores no numéricos
* valor === ".": permite que el punto decimal pase este filtro

### Un reinicio a la pantalla si es necesario
Esta parte del código se encargará del reinicio de la pantalla, si reiniciarPantalla es verdadero, limpiará la entrada actual -> entradaActual="", entonces se reiniciará la pantalla mostrando un 0. Luego cambia reiniciarPantalla a false para evitar reinicar denuevo en el siguiente click:
```sh
if (reiniciarPantalla) {
    entradaActual = "";
    reiniciarPantalla = false;
    actualizarPantalla("0");
}
```

### Evitando multiples puntos decimales
Esta condicón se va a encargar de que si el usurio intenta agregar otro punto decimal cuando ya hay uno en entradaActual, la función se detiene con return:
```sh
if (valor === "." && entradaActual.includes()) {
    return;
}
```

### Agregando el valorn a la entrada actual
Acá se concatena el valor presionado (numero o un punto) al contenido actual de entradaActual
```sh
entradaActual += valor
```

### Actualiza la pantalla
```sh
let valorPantalla;
if (entradaActual) {
    valorPantalla = entradaActual;
} else {
    valorPantalla = "0";
}
actualizarPantalla(valorPantalla);
```
Si entradaActual tiene un valor, se asigna a valorPantalla, en todo caso si está vacio se asigna un 0. Saliendo de esta condición, llamo a actualizarPantalla(valorPantall) para mostrar el valor actualizado

### Manejando operadores de pantalla
Esto va a comprobar si el botón presionado es uno de los operadores definidos en el array "operadores"
```sh
} else if (operadores.includes(valor)){
```
### Operación sin entrada nueva
En este bloque de código lo que estoy queriendo decir es que si ya hay un resultado y no hay valor nuevo en entradaActual, actualiza el operador (operacionActual=valor) y detiene la ejecución
```sh
if (resultados && !entradaActual) {
   operacionActual = valor
   return;
}
```

### Ejecutando una operación si hay datos
Si hay un operador y un valor en entadaActual, se llaman a la funcion calcular para procesar la operación pendiente 
```sh
if (entradaActual && operacionActual) {
    calcular ()
}
```

### Configurando los valores actuales
En esta parte lo que hace es ver si no encuentra un resultado almacenado, guarda el valor de entradaActual en resultados, asigno el operador actual a la variable operacionActual, luego limpio entradaActual para que esté listo para el próximo número 
```sh
if (!resultados){
    resultados = entradaActual
}
operacionActual = valor
entradaActual = ""
```

### Manejo del botón igual =
Si el botón presionado es =, se llama a la función calcular() para resolver la operación actual:
```sh
} else if (valor === "=") {
    calcular()
} 
```

## Reiniciando pantalla cuando se le haga click
Con esto, cuando el usuario haga click en la pantalla de la calculadora, se va a ejecutar la función reiniciarCalculadora, con la finalidad de reinciar el estado de la calculadora:
```sh
pantalla.addEventListener("click", reiniciarCalculadora)
```
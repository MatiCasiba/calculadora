* Nombre: Matias Casiba
* Link Netlify:
* Link repo GitHub:

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


// Inicialización de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let Movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 60;
let timerinicial = 60;
let tiemporegresivoid = null;

// Apuntando a documento HTML
let mostrarmovimientos = document.getElementById('Movimientos');
let mostraraciertos = document.getElementById('Aciertos');
let mostrartiempo = document.getElementById('t-restante');

// Arreglo de números
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => Math.random() - 0.5);
console.log(numeros);

// Función para contar el tiempo
function contarTiempo() {
    tiemporegresivoid = setInterval(() => {
        timer--;
        mostrartiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if (timer === 0) {
            clearInterval(tiemporegresivoid);
            bloquearTarjetas();
        }
    }, 1000);
}

// Función para bloquear todas las tarjetas
function bloquearTarjetas() {
    for (let i = 0; i <= 15; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML =  `<img src="Recursos/pokes/${numeros[i]}.png" alt="">`;
        tarjetaBloqueada.disabled = true;
    }
}

// Función principal para destapar tarjetas
function destapar(id) {
    if (temporizador === false) {
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;

    if (tarjetasDestapadas === 1) {
        // Mostrar el primer número
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = `<img src="Recursos/pokes/${primerResultado}.png" alt="">`;

        // Deshabilitar el primer botón
        tarjeta1.disabled = true;
    } else if (tarjetasDestapadas === 2) {
        // Mostrar el segundo número
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML =  `<img src="Recursos/pokes/${segundoResultado}.png" alt="">`;

        // Deshabilitar el segundo botón
        tarjeta2.disabled = true;

        // Incrementar movimientos
        Movimientos++;
        mostrarmovimientos.innerHTML = `Movimientos: ${Movimientos}`;

        if (primerResultado === segundoResultado) {
            tarjetasDestapadas = 0;

            // Aumentar aciertos
            aciertos++;
            mostraraciertos.innerHTML = `Aciertos: ${aciertos}`;

            if (aciertos === 8) { // 8 pares para completar el juego
                clearInterval(tiemporegresivoid);
                mostraraciertos.innerHTML = `Aciertos: ${aciertos} 😱`;
                mostrartiempo.innerHTML = `¡Fantástico! Solo demoraste ${timerinicial - timer} segundos`;
                mostrarmovimientos.innerHTML = `Movimientos: ${Movimientos} 😎`;
            }
        } else {
            // Mostrar momentáneamente los valores
            setTimeout(() => {
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            }, 500);
        }
    }
}

// Inicialización de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let Movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 120;
let timerinicial = 120;
let tiemporegresivoid = null;

let mostraraciertos = document.getElementById('Aciertos');
let mostrartiempo = document.getElementById('t-restante');
let mostrarmovimientos = document.getElementById('Movimientos');
let finalSection = document.getElementById('final-section');

// Arreglo de números (18 pares)
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18];
numeros = numeros.sort(() => Math.random() - 0.5);

// Función para contar el tiempo
function contarTiempo() {
    tiemporegresivoid = setInterval(() => {
        timer--;
        mostrartiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if (timer === 0) {
            clearInterval(tiemporegresivoid);
            bloquearTarjetas();
            mostrarFinalSection();
        }
    }, 1000);
}

// Función para bloquear todas las tarjetas
function bloquearTarjetas() {
    for (let i = 0; i <= 35; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = numeros[i];
        tarjetaBloqueada.disabled = true;
    }
}

// Función para mostrar la sección de finalización
function mostrarFinalSection() {
    finalSection.style.display = 'block';
}

// Función principal para destapar tarjetas
function destapar(id) {
    if (temporizador === false) {
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;

    if (tarjetasDestapadas === 1) {
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = primerResultado;
        tarjeta1.disabled = true;
    } else if (tarjetasDestapadas === 2) {
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = segundoResultado;
        tarjeta2.disabled = true;

        Movimientos++;
        mostrarmovimientos.innerHTML = `Movimientos: ${Movimientos}`;

        if (primerResultado === segundoResultado) {
            tarjetasDestapadas = 0;
            aciertos++;
            mostraraciertos.innerHTML = `Aciertos: ${aciertos}`;

            if (aciertos === 18) {
                clearInterval(tiemporegresivoid);
                mostraraciertos.innerHTML = `Aciertos: ${aciertos} 😱`;
                mostrartiempo.innerHTML = `¡Fantástico! Solo demoraste ${timerinicial - timer} segundos`;
                mostrarmovimientos.innerHTML = `Movimientos: ${Movimientos} 😎`;
                mostrarFinalSection();
            }
        } else {
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


// Juego Snake

// Dimensiones y configuración del juego
var blockSize = 25; // Tamaño de cada bloque en el tablero
var rows = 20; // Número de filas en el tablero
var cols = 20; // Número de columnas en el tablero
var gameBoard; // Elemento del tablero
var gameContext; // Contexto del juego

// Posición y velocidad de la cabeza de la serpiente
var snakeHeadX = blockSize * 5;
var snakeHeadY = blockSize * 5;
var snakeVelocityX = 0;
var snakeVelocityY = 0;

// Segmentos del cuerpo de la serpiente
var snakeSegments = [];

// Posición de la comida
var foodX;
var foodY;

// Estado del juego
var isGameOver = false;

// Inicialización del juego al cargar la página
window.onload = function() {
    // Obtener el elemento del tablero y configurar su tamaño
    gameBoard = document.getElementById("board");
    gameBoard.height = rows * blockSize;
    gameBoard.width = cols * blockSize;
    gameContext = gameBoard.getContext("2d");

    // Colocar la comida en una posición aleatoria
    placeFood();

    // Escuchar eventos de teclado para cambiar la dirección de la serpiente
    document.addEventListener("keyup", handleDirectionChange);

    // Actualizar el juego continuamente
    setInterval(updateGame, 1000/10); // Actualizar cada 100 milisegundos
}

// Función principal para actualizar el juego
function updateGame() {
    if (isGameOver) {
        return;
    }

    // Limpiar el tablero
    gameContext.fillStyle = "black";
    gameContext.fillRect(0, 0, gameBoard.width, gameBoard.height);

    // Dibujar la comida
    gameContext.fillStyle = "red";
    gameContext.fillRect(foodX, foodY, blockSize, blockSize);

    // Lógica de la colisión con la comida
    if (snakeHeadX == foodX && snakeHeadY == foodY) {
        snakeSegments.push([foodX, foodY]);
        placeFood();
    }

    // Mover  cuerpo de la serpiente
    for (let i = snakeSegments.length-1; i > 0; i--) {
        snakeSegments[i] = snakeSegments[i-1];
    }

    // Actualizar la posición de la cabeza de la serpiente
    if (snakeSegments.length) {
        snakeSegments[0] = [snakeHeadX, snakeHeadY];
    }

    // Dibujar la cabeza de la serpiente
    gameContext.fillStyle = "green";
    snakeHeadX += snakeVelocityX * blockSize;
    snakeHeadY += snakeVelocityY * blockSize;
    gameContext.fillRect(snakeHeadX, snakeHeadY, blockSize, blockSize);

    // Dibujar segmentos del cuerpo de la serpiente
    for (let i = 0; i < snakeSegments.length; i++) {
        gameContext.fillRect(snakeSegments[i][0], snakeSegments[i][1], blockSize, blockSize);
    }

    // Condiciones de Game Over
    if (snakeHeadX < 0 || snakeHeadX > cols*blockSize || snakeHeadY < 0 || snakeHeadY > rows*blockSize) {
        isGameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < snakeSegments.length; i++) {
        if (snakeHeadX == snakeSegments[i][0] && snakeHeadY == snakeSegments[i][1]) {
            isGameOver = true;
            alert("Game Over");
        }
    }
}

// Cambiar la dirección de la serpiente al presionar una tecla
function handleDirectionChange(e) {
    if (e.code == "ArrowUp" && snakeVelocityY != 1) {
        snakeVelocityX = 0;
        snakeVelocityY = -1;
    } else if (e.code == "ArrowDown" && snakeVelocityY != -1) {
        snakeVelocityX = 0;
        snakeVelocityY = 1;
    } else if (e.code == "ArrowLeft" && snakeVelocityX != 1) {
        snakeVelocityX = -1;
        snakeVelocityY = 0;
    } else if (e.code == "ArrowRight" && snakeVelocityX != -1) {
        snakeVelocityX = 1;
        snakeVelocityY = 0;
    }
}

// Colocar la comida en una posición aleatoria
function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

// Función para la aparición de la imagen cada x segundos en una esquina distinta  Así usamos un setTimeout  y distraemos al ususario
function manageImageAppearance() {
    setInterval(function() {
        var img = new Image();
        img.onload = function() {
            img.style.position = 'fixed';

            // Definir las esquinas (top-left, top-right, bottom-left, bottom-right)
            var corners = [
                { top: '0', left: '0' },
                { top: '0', right: '0' },
                { bottom: '0', left: '0' },
                { bottom: '0', right: '0' }
            ];

            // Elegir una esquina aleatoriamente
            var randomCorner = corners[Math.floor(Math.random() * corners.length)];

            // Asignar las propiedades de la esquina seleccionada
            for (var prop in randomCorner) {
                img.style[prop] = randomCorner[prop];
            }

            img.style.width = '200px';
            img.style.height = '200px';

            document.body.appendChild(img);

            // Desaparecer la imagen después de 5 segundos 
            setTimeout(function() {                 //AQUI USO SETTIMEOUT
                document.body.removeChild(img);
            }, 5000);
        };
        img.src = 'snake2.jpg';
    }, 10000); // 5000 milisegundos = 5 segundos
}

// Llamar a la función para manejar la aparición de la imagen
manageImageAppearance();

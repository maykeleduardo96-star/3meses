const book = document.querySelector("#book");
const allPapers = document.querySelectorAll(".paper");
const nextButtons = document.querySelectorAll(".next-btn");
const prevButtons = document.querySelectorAll(".prev-btn");
const backCover = document.querySelector(".back-cover");

const numOfPapers = allPapers.length;
const maxLocation = numOfPapers + 1;
let currentLocation = 1;

// Función para mostrar y ocultar el mensaje de amor
function showLoveMessage() {
    // Crear el elemento del mensaje
    const loveMessage = document.createElement("div");
    loveMessage.id = "love-message";
    loveMessage.innerHTML = "Te Amo Ana, Felices 3 meses";
    loveMessage.style.cssText = `
        position: absolute;
        bottom: 50px;
        left: 50%;
        transform: translateX(-50%);
        font-family: 'Dancing Script', cursive;
        font-size: 3rem;
        color: #FFD700;
        text-shadow: 
            0 0 10px #FFD700,
            0 0 20px #FFD700,
            0 0 30px #FF0000,
            0 0 40px #FF0000,
            0 0 50px #FF0000;
        text-align: center;
        z-index: 1000;
        opacity: 0;
        animation: fadeInOut 10s ease-in-out;
        pointer-events: none;
    `;
    
    // Añadir estilos de animación
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
            20% { opacity: 1; transform: translateX(-50%) translateY(0); }
            80% { opacity: 1; transform: translateX(-50%) translateY(0); }
            100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        }
        
        @keyframes shimmer {
            0% { text-shadow: 
                0 0 10px #FFD700,
                0 0 20px #FFD700,
                0 0 30px #FF0000,
                0 0 40px #FF0000,
                0 0 50px #FF0000; }
            50% { text-shadow: 
                0 0 15px #FFD700,
                0 0 25px #FFD700,
                0 0 35px #FF0000,
                0 0 45px #FF0000,
                0 0 55px #FF0000,
                0 0 65px #FFD700; }
            100% { text-shadow: 
                0 0 10px #FFD700,
                0 0 20px #FFD700,
                0 0 30px #FF0000,
                0 0 40px #FF0000,
                0 0 50px #FF0000; }
        }
        
        #love-message {
            animation: fadeInOut 10s ease-in-out, shimmer 2s infinite alternate;
        }
    `;
    
    document.head.appendChild(styleSheet);
    document.body.appendChild(loveMessage);
    
    // Remover el mensaje después de 10 segundos
    setTimeout(() => {
        if (loveMessage.parentNode) {
            loveMessage.parentNode.removeChild(loveMessage);
        }
    }, 10000);
}

// Función para cerrar completamente el libro
function closeBookCompletely() {
    // Cerrar el libro
    closeBook();
    
    // Voltear todas las páginas a su estado original
    allPapers.forEach((paper, index) => {
        paper.classList.remove("flipped");
        paper.style.zIndex = (numOfPapers - index) + numOfPapers;
    });
    
    // Restablecer la ubicación actual
    currentLocation = 1;
    
    // Mostrar el mensaje de amor
    setTimeout(() => {
        showLoveMessage();
    }, 500); // Pequeño retraso para que coincida con la animación de cierre
}

// Inicializar z-index de las páginas
allPapers.forEach((paper, index) => {
    paper.style.zIndex = (numOfPapers - index) + numOfPapers;
});

// Event listeners para botones de siguiente
nextButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        e.stopPropagation();
        goNextPage();
    });
});

// Event listeners para botones de anterior
prevButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        e.stopPropagation();
        goPrevPage();
    });
});

// Event listener para la cubierta trasera
backCover.addEventListener("click", () => {
    // Solo cerrar si estamos en la última página
    if (currentLocation === maxLocation) {
        closeBookCompletely();
    }
});

function openBook() {
    book.style.transform = "translateX(50%)";
}

function closeBook() {
    book.style.transform = "translateX(0%)";
}

function goNextPage() {
    if (currentLocation < maxLocation) {
        if (currentLocation === 1) {
            openBook();
        }

        const paperToFlip = document.querySelector(`#p${currentLocation}`);
        paperToFlip.classList.add("flipped");
        
        setTimeout(() => {
            paperToFlip.style.zIndex = currentLocation;
        }, 600);

        currentLocation++;
    }
}

function goPrevPage() {
    if (currentLocation > 1) {
        currentLocation--;
        
        const paperToUnflip = document.querySelector(`#p${currentLocation}`);
        paperToUnflip.classList.remove("flipped");
        
        paperToUnflip.style.zIndex = (numOfPapers - (currentLocation - 1)) + numOfPapers;

        if (currentLocation === 1) {
            closeBook();
        }
    }
}
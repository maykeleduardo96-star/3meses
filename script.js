const book = document.querySelector("#book");
const allPapers = document.querySelectorAll(".paper");
const nextButtons = document.querySelectorAll(".next-btn");
const prevButtons = document.querySelectorAll(".prev-btn");

const numOfPapers = allPapers.length;
const maxLocation = numOfPapers + 1;
let currentLocation = 1;

allPapers.forEach((paper, index) => {
    paper.style.zIndex = (numOfPapers - index) + numOfPapers;
});

nextButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        e.stopPropagation();
        goNextPage();
    });
});

prevButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        e.stopPropagation();
        goPrevPage();
    });
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


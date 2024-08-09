let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newBtn = document.querySelector("#new-btn");
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msg-container");

let turn0 = true;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

const resetGame = () => {
    turn0 = true;
    enabled();
    msgContainer.classList.add("hide");
}

reset.addEventListener("click", () => {
    resetGame();
});

newBtn.addEventListener("click", () => {
    resetGame();
});

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {      // player X
            box.innerHTML = "X";
            turn0 = false;
        } else {
            box.innerHTML = "O";  // player O
            turn0 = true;
        }
        box.disabled = true;
        checkWinner();
    })
});

const disabled = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enabled = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerHTML = "";
    }
}

const showWinner = (winner) => {
    msg.innerHTML = `Congratulations, Winner is '${winner}'`;
    msgContainer.classList.remove("hide");
    disabled();
}

const checkWinner = () => {
    let isDraw = true;
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos1val === pos2val && pos2val === pos3val) {
            showWinner(pos1val);
            return;
        }
    }

    // Check if all boxes are filled, indicating a draw
    boxes.forEach((box) => {
        if (box.innerText === "") {
            isDraw = false;
        }
    });

    if (isDraw) {
        msg.innerHTML = "It's a Draw!";
        msgContainer.classList.remove("hide");
    }
}

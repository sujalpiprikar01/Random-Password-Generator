const passwordBox = document.getElementById("password");
const lengthSlider = document.getElementById("lengthSlider");
const lengthValue = document.getElementById("lengthValue");
const historyList = document.getElementById("historyList");
const clearHistory = document.getElementById("clearHistory");

let passwordHistory = [];

let length = lengthSlider.value;

lengthSlider.addEventListener("input", () => {
  length = lengthSlider.value;
  lengthValue.textContent = length;
});

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-+";

const allChars = upperCase + lowerCase + numbers + symbols;

function createPassword() {

    let password = "";
    let characters = "";

    const useUppercase = document.getElementById("uppercase").checked;
    const useLowercase = document.getElementById("lowercase").checked;
    const useNumbers = document.getElementById("numbers").checked;
    const useSymbols = document.getElementById("symbols").checked;

    if (useUppercase) {
        characters += upperCase;
    }

    if (useLowercase) {
        characters += lowerCase;
    }

    if (useNumbers) {
        characters += numbers;
    }

    if (useSymbols) {
        characters += symbols;
    }

    if (characters === "") {
        alert("Please select at least one option!");
        return;
    }

    while (password.length < length) {
        password += characters[Math.floor(Math.random() * characters.length)];
    }

    passwordBox.value = password;
    checkStrength(password);
    addToHistory(password);
}

function checkStrength(password) {

    const strengthText = document.getElementById("strengthText");
    const strengthFill = document.getElementById("strengthFill");

    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) {
        strengthText.textContent = "Weak";
        strengthFill.style.width = "30%";
    } 
    else if (score <= 4) {
        strengthText.textContent = "Medium";
        strengthFill.style.width = "60%";
    } 
    else {
        strengthText.textContent = "Strong";
        strengthFill.style.width = "100%";
    }
}

function copyPassword() {
    passwordBox.select();
    document.execCommand("copy");

    const copyMessage = document.getElementById("copyMessage");

    copyMessage.style.display = "block";

    setTimeout(() => {
        copyMessage.style.display = "none";
    }, 2000);
}

function addToHistory(password) {

    passwordHistory.unshift(password);

    if (passwordHistory.length > 5) {
        passwordHistory.pop();
    }

    historyList.innerHTML = "";

    passwordHistory.forEach((item) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span>${item}</span>
            <button onclick="copyHistoryPassword('${item}')">Copy</button>
        `;

        historyList.appendChild(li);
    });
}

function copyHistoryPassword(password) {

    navigator.clipboard.writeText(password);

    const copyMessage = document.getElementById("copyMessage");

    copyMessage.textContent = "Password Copied ✓";
    copyMessage.style.display = "block";

    setTimeout(() => {
        copyMessage.style.display = "none";
    }, 2000);
}

clearHistory.addEventListener("click", () => {

    passwordHistory = [];

    historyList.innerHTML = "";
});
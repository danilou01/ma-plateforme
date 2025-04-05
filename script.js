const users = {
    "admin": "password123"
};

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    if (users[username] && users[username] === password) {
        document.getElementById("login-form").style.display = "none";
        document.getElementById("app").style.display = "block";
    } else {
        document.getElementById("login-error").innerText = "Nom d'utilisateur ou mot de passe incorrect.";
    }
}

const dysModels = {
    "dyslexie": {
        mots_cles: ["lecture", "confusion", "lettres", "syllabes", "orthographe"],
        amenagements: ["utiliser des polices dys", "livres audio", "temps supplémentaire"]
    },
    "dysphasie": {
        mots_cles: ["parler", "langage", "phrases", "trouver les mots"],
        amenagements: ["orthophonie", "communication alternative"]
    },
    "dyspraxie": {
        mots_cles: ["écriture", "coordination", "gestes", "mouvement"],
        amenagements: ["clavier numérique", "ergothérapie"]
    },
};

function diagnoseText() {
    const text = document.getElementById("difficulties").value.toLowerCase();
    let result = "";

    for (const [trouble, info] of Object.entries(dysModels)) {
        if (info.mots_cles.some(word => text.includes(word))) {
            result += `<p><strong>Diagnostic suspecté :</strong> ${trouble}</p>`;
            result += `<p><strong>Aménagements proposés :</strong> ${info.amenagements.join(", ")}</p>`;
        }
    }

    if (!result) {
        result = "<p>Aucun trouble détecté avec certitude.</p>";
    }

    document.getElementById("result").innerHTML = result;
}

function useVoice() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    
    recognition.onstart = function() {
        console.log("La reconnaissance vocale a commencé...");
    };
    
    recognition.onresult = function(event) {
        const speechToText = event.results[0][0].transcript;
        document.getElementById("difficulties").value = speechToText;
        diagnoseText();
    };
    
    recognition.start();
}
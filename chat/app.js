class App {
    constructor() {
        this.game = new Game();
        this.opponentHandElement = document.getElementById("opponent-hand");
        this.playerHandElement = document.getElementById("player-hand");
    }

    createCardElement(card, isPlayerCard) {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");

        const titleElement = document.createElement("p");
        titleElement.classList.add("card__title");
        titleElement.textContent = card.name.toUpperCase();

        const imageElement = document.createElement("img");
        imageElement.classList.add("card__image");
        imageElement.src = `https://pokeapi.co/media/sprites/pokemon/${card.id}.png`;
        imageElement.alt = card.name;

        const idElement = document.createElement("p");
        idElement.classList.add("id");
        idElement.textContent = `ID: ${card.id}`;
        idElement.dataset.pokemonId = card.id;

        const attributesElement = document.createElement("div");
        attributesElement.classList.add("card__attributes");

        const attackElement = this.createAttributeElement("attack", `Ataque: ${card.attack}`);
        const defenseElement = this.createAttributeElement("defense", `Defesa: ${card.defense}`);

        attributesElement.appendChild(idElement);
        attributesElement.appendChild(attackElement);
        attributesElement.appendChild(defenseElement);

        cardElement.appendChild(imageElement);
        cardElement.appendChild(titleElement);
        cardElement.appendChild(attributesElement);

        if (isPlayerCard) {
            this.playerHandElement.appendChild(cardElement);
        } else {
            this.opponentHandElement.appendChild(cardElement);
        }

        idElement.addEventListener("click", () => this.game.compare("id"));
        attackElement.addEventListener("click", () => this.game.compare("attack"));
        defenseElement.addEventListener("click", () => this.game.compare("defense"));
    }

    createAttributeElement(className, textContent) {
        const element = document.createElement("p");
        element.classList.add(className);
        element.textContent = textContent;
        return element;
    }

    // Função para iniciar o jogo
    startGame() {
        const numCards = 20;
        const startId = 1;
        this.game.startGame(numCards, startId);

        // Limpar as mãos antes de criar novas cartas
        this.playerHandElement.innerHTML = "";
        this.opponentHandElement.innerHTML = "";

        // Criar cartas para o jogador
        this.game.playerHand.forEach(card => {
            this.createCardElement(card, true);
        });

        // Criar cartas para o oponente
        this.game.opponentHand.forEach(card => {
            this.createCardElement(card, false);
        });
    }

    restartGame() {
        this.game.restartGame();
        this.startGame(); // Reiniciar o jogo implica em começar um novo jogo
    }

    shuffleHand() {
        // Somente permite embaralhar quando o jogo estiver empatado
        if (this.game.playerScore === this.game.opponentScore) {
            this.game.shuffleHand();

            // Limpar as mãos antes de criar novas cartas
            this.playerHandElement.innerHTML = "";
            this.opponentHandElement.innerHTML = "";

            // Criar cartas para o jogador
            this.game.playerHand.forEach(card => {
                this.createCardElement(card, true);
            });

            // Criar cartas para o oponente
            this.game.opponentHand.forEach(card => {
                this.createCardElement(card, false);
            });
        }
    }
}

const app = new App();
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("start-btn").addEventListener("click", () => app.startGame());
    document.getElementById("restart-btn").addEventListener("click", () => app.restartGame());
    document.getElementById("shuffle-btn").addEventListener("click", () => app.shuffleHand());
});
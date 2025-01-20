class Player {
    constructor() {
        this.score = 0;
        this.hand = [];
    }
}

class CardGame {
    constructor() {
        this.player1 = new Player();
        this.player2 = new Player();
        this.allCards = [];
        this.selectedAttribute = null;
    }

    async fetchCards() {
        try {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon?offset=1&limit=20");
            const data = await response.json();

            const cardPromises = data.results.map(async (pokemon) => {
                const res = await fetch(pokemon.url);
                const details = await res.json();

                return {
                    id: details.id,
                    name: details.name,
                    image: details.sprites.front_default,
                    weight: details.weight,
                    height: details.height,
                    moves: details.moves.length,
                };
            });

            this.allCards = await Promise.all(cardPromises);
            this.initializeGame();
        } catch (error) {
            console.error("Erro ao buscar os dados das cartas:", error);
        }
    }

    initializeGame() {
        const shuffledDeck = this.shuffle([...this.allCards]);

        const halfDeck = Math.floor(shuffledDeck.length / 2);
        this.player1.hand = shuffledDeck.slice(0, halfDeck);
        this.player2.hand = shuffledDeck.slice(halfDeck);

        this.updateLayout();
    }

    shuffle(deck) {
        let currentIndex = deck.length;
        while (currentIndex > 0) {
            const randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [deck[currentIndex], deck[randomIndex]] = [deck[randomIndex], deck[currentIndex]];
        }
        return deck;
    }

    shuffleHands() {
        this.player1.hand = this.shuffle([...this.player1.hand]);
        this.player2.hand = this.shuffle([...this.player2.hand]);

        this.updateLayout();
        this.showMessage("As mãos foram embaralhadas!");
    }

    updateLayout() {
        this.renderHand(this.player1.hand, "player1-container");
        this.renderHand(this.player2.hand, "player2-container");
        this.updateCardCounts();
    }

    renderHand(hand, containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = "";

        hand.forEach((card) => {
            const cardElement = document.createElement("div");
            cardElement.classList.add("card");

            cardElement.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">
                        <img src="${card.image}" alt="${card.name}" class="card__image">
                        <p class="card__title">${card.name.toUpperCase()}</p>
                    </div>
                    <div class="card-back">
                        <p class="card__attribute clickable" data-attribute="id" data-value="${card.id}">ID: ${card.id}</p>
                        <p class="card__attribute clickable" data-attribute="weight" data-value="${card.weight}">Peso: ${card.weight / 10}kg</p>
                        <p class="card__attribute clickable" data-attribute="height" data-value="${card.height}">Altura: ${card.height / 10}m</p>
                        <p class="card__attribute clickable" data-attribute="moves" data-value="${card.moves}">Movimentos: ${card.moves}</p>
                    </div>
                </div>
            `;

            cardElement.querySelectorAll(".clickable").forEach((element) => {
                element.style.cursor = "pointer"; 
                element.addEventListener("click", () => {
                    const attribute = element.dataset.attribute;
                    const value = element.dataset.value;
                    this.handleAttributeClick(attribute, value);
                });
            });

            container.appendChild(cardElement);
        });
    }
    handleAttributeClick(attribute, value) {
        // A carta do jogador (sempre a primeira da mão)
        const playerCard = this.player1.hand[0];
        // A carta do oponente (sempre a primeira da mão)
        const opponentCard = this.player2.hand[0];
    
        // Compare os atributos
        const isWinner = this.compareAttributes({ attribute, value }, opponentCard);
    
        if (isWinner) {
            this.showMessage("Você ganhou a rodada!");
            this.player1.hand.push(playerCard, opponentCard);  // Adiciona as duas cartas ao final
            this.player2.hand.shift();  // Remove a carta do início
            this.player1.hand.shift();  // Remove a carta do início
        } else {
            this.showMessage("Você perdeu a rodada.");
            this.player2.hand.push(playerCard, opponentCard);  // Adiciona as duas cartas ao final
            this.player1.hand.shift();  // Remove a carta do início
            this.player2.hand.shift();  // Remove a carta do início
        }
    
        // Atualiza o layout com as novas mãos
        this.updateLayout();
    }
    
    

    compareAttributes(selected, opponentCard) {
        const selectedValue = selected.value;
        const opponentValue = opponentCard[selected.attribute];

        // Comparação para valores numéricos
        if (typeof selectedValue === "number" && typeof opponentValue === "number") {
            return selectedValue > opponentValue;
        }

        // Caso o tipo seja misturado ou algum valor inesperado, tratamos como numérico
        return parseFloat(selectedValue) > parseFloat(opponentValue);
    }

    updateCardCounts() {
        const player1CardCount = document.getElementById("player1CardCount");
        const player2CardCount = document.getElementById("player2CardCount");

        if (player1CardCount) player1CardCount.textContent = this.player1.hand.length;
        if (player2CardCount) player2CardCount.textContent = this.player2.hand.length;
    }

    showMessage(message) {
        const modal = document.getElementById("resultModal");
        const modalMessage = document.getElementById("modal-message");
        const closeBtn = document.getElementsByClassName("close")[0];
    
        modalMessage.textContent = message;
        modal.style.display = "block";
    
        closeBtn.onclick = () => {
            modal.style.display = "none";
        }
    
        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        };

        setTimeout(() => {
            modal.style.display = "none";
        }, 2000);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const game = new CardGame();

    document.getElementById("shuffle-button").addEventListener("click", () => {
        game.shuffleHands();
    });

    document.querySelector(".start-game").addEventListener("click", () => {
        game.fetchCards();
    });
});

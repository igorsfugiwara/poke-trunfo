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
    }

    startGame() {
        this.fetchPokemons();
    }

    fetchPokemons() {
        fetch("https://pokeapi.co/api/v2/pokemon?offset=1&limit=20")
            .then((response) => response.json())
            .then((body) => {
                const result = body.results;
                const requests = result.map((element) =>
                    fetch(element.url)
                        .then((response) => response.json())
                        .then((data) => {
                            const card = {
                                nome: data.name,
                                imagem: data.sprites.front_default,
                                peso: data.weight,
                                altura: data.height,
                                qtdMovimentos: data.moves.length,
                                id: data.id,
                            };
                            return {
                                [element.name]: card,
                            };
                        })
                        .catch((error) => {
                            console.error(`Erro na requisição para ${element.url}:`, error);
                        })
                );

                return Promise.all(requests);
            })
            .then((responses) => {
                this.initializeGame(responses);
            })
            .catch((error) => {
                console.error("Erro na requisição principal:", error);
            });
    }

    initializeGame(responses) {
        const gamersDeck = this.shuffle(responses);

        gamersDeck.forEach((card, index) => {
            index % 2 === 0 ? this.player1.hand.push(card) : this.player2.hand.push(card);
        });

        console.log("Cartas do Jogador 1:", this.player1.hand);
        console.log("Cartas do Jogador 2:", this.player2.hand);

        this.renderHands();
    }

    renderHands() {
        this.renderHand(this.player1, "player1-container");
        this.renderHand(this.player2, "player2-container");
    }

    renderHand(player, containerId) {
        const container = document.getElementById(containerId);

        if (container) {
            player.hand.forEach((card) => {
                const cardElement = this.createCardElement(card);
                container.appendChild(cardElement);
            });
        }
    }

    createCardElement(card) {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");

        for (const key in card) {
            const titleElement = document.createElement("p");
            titleElement.classList.add("card__title");
            titleElement.textContent = card[key].nome.toUpperCase();

            const imageElement = document.createElement("img");
            imageElement.classList.add("card__image");
            imageElement.src = card[key].imagem;
            imageElement.alt = card[key].nome;

            const idElement = document.createElement("p");
            idElement.classList.add("id");
            idElement.textContent = `ID: ${card[key].id}`;
            idElement.dataset.pokemonId = card[key].id;

            const attributesElement = document.createElement("div");
            attributesElement.classList.add("card__attributes");

            const weightElement = this.createAttributeElement("weight", `Peso: ${card[key].peso / 10}kg`);
            const heightElement = this.createAttributeElement("height", `Altura: ${card[key].altura / 10}m`);
            const movesElement = this.createAttributeElement(
                "moves",
                `Quantidade de Ataques: ${card[key].qtdMovimentos}`
            );

            attributesElement.appendChild(idElement);
            attributesElement.appendChild(weightElement);
            attributesElement.appendChild(heightElement);
            attributesElement.appendChild(movesElement);

            cardElement.appendChild(imageElement);
            cardElement.appendChild(titleElement);
            cardElement.appendChild(attributesElement);

            idElement.addEventListener("click", () => this.compareAttribute("id", card[key].id));
            weightElement.addEventListener("click", () => this.compareAttribute("peso", card[key].peso));
            heightElement.addEventListener("click", () => this.compareAttribute("altura", card[key].altura));
            movesElement.addEventListener("click", () => this.compareAttribute("qtdMovimentos", card[key].qtdMovimentos));
        }

        return cardElement;
    }

    createAttributeElement(className, textContent) {
        const element = document.createElement("p");
        element.classList.add(className);
        element.textContent = textContent;
        return element;
    }

    async addAttributeListeners() {
        const btnWeight = document.querySelector(".weight");
        const btnHeight = document.querySelector(".height");
        const btnMoves = document.querySelector(".moves");
        const btnId = document.querySelector(".id");
        const btnClosed = document.querySelector("#close");
    
        const clickHandler = async (attribute) => {
            await this.playRound(attribute);
        };
    
        btnWeight.addEventListener("click", () => clickHandler("peso"));
        btnHeight.addEventListener("click", () => clickHandler("altura"));
        btnMoves.addEventListener("click", () => clickHandler("qtdMovimentos"));
        btnId.addEventListener("click", () => clickHandler("id"));
    
        btnClosed.addEventListener("click", () => this.closeModal());
    }

    compareAttribute(attributeName, attributeValue) {
        console.log(`Atributo ${attributeName} clicado com valor ${attributeValue}`);
        this.playRound(attributeName);
    }

    shuffle(array) {
        let currentIndex = array.length,
            randomIndex;

        while (currentIndex > 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    compareCards(attribute) {
        if (this.player1.hand.length === 0 || this.player2.hand.length === 0) {
            this.endGame();
            return;
        }

        const player1Card = this.player1.hand[0][Object.keys(this.player1.hand[0])[0]][attribute];
        const player2Card = this.player2.hand[0][Object.keys(this.player2.hand[0])[0]][attribute];

        if (player1Card > player2Card) {
            this.player1.score += this.player1.hand.length;
            console.log("Jogador 1 venceu a rodada!");
            this.player1.hand.push(this.player2.hand.shift());
            this.player1.hand.push(this.player1.hand.shift());
        } else if (player2Card > player1Card) {
            this.player2.score += this.player2.hand.length;
            console.log("Jogador 2 venceu a rodada!");
            this.player2.hand.push(this.player1.hand.shift());
            this.player2.hand.push(this.player2.hand.shift());
        } else {
            this.player1.score += this.player1.hand.length;
            this.player2.score += this.player2.hand.length;
            console.log("Empate! As cartas vão para a próxima rodada.");
            this.player1.hand = this.shuffle(this.player1.hand);
            this.player2.hand = this.shuffle(this.player2.hand);
        }

        this.updateScore();
        this.updateFirstCard(this.player1);
        this.updateFirstCard(this.player2);
        this.clearLayout();
        this.renderHands();
        this.updateCardCount(this.player1.hand.length, this.player2.hand.length);
    }

    updateScore() {
        console.log(`Placar - Jogador 1: ${this.player1.score} | Jogador 2: ${this.player2.score}`);
    }

    playRound(attribute) {
        this.compareCards(attribute);
        this.updateScore();

        if (this.player1.hand.length === 0) {
            console.log("Jogador 1 está sem cartas. Jogador 2 venceu!");
            this.clearLayout();
        } else if (this.player2.hand.length === 0) {
            console.log("Jogador 2 está sem cartas. Jogador 1 venceu!");
            this.clearLayout();
            this.showVictoryModal();
        } else {
            this.updateFirstCard(this.player1);
            this.updateFirstCard(this.player2);
            this.clearLayout();
            this.renderHands();
        }
    }

    endGame() {
        console.log("Jogo encerrado!");
    }

    updateFirstCard(player) {
        if (player.hand.length > 0) {
            const updatedCard = this.fetchPokemonData(player.hand[0].name);
            updatedCard
                .then((data) => {
                    player.hand[0] = data;
                })
                .catch((error) => {
                    console.error(`Erro na atualização da carta para ${player.hand[0].name}:`, error);
                });
        }
    }

    async fetchPokemonData(pokemonName) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            const data = await response.json();
            return {
                nome: data.name,
                imagem: data.sprites.front_default,
                peso: data.weight,
                altura: data.height,
                qtdMovimentos: data.moves.length,
                id: data.id,
            };
        } catch (error) {
            console.error(`Erro na requisição para ${pokemonName}:`, error);
            throw error;
        }
    }

    clearLayout() {
        const player1Container = document.getElementById("player1-container");
        const player2Container = document.getElementById("player2-container");

        if (player1Container) {
            player1Container.innerHTML = "";
        }

        if (player2Container) {
            player2Container.innerHTML = "";
        }
    }

    showVictoryModal() {
        const modal = document.getElementById('victoryModal');
        modal.style.display = 'block';
    }

    closeModal() {
        const modal = document.getElementById('victoryModal');
        modal.style.display = 'none';
    }

    updateCardCount(player1Count, player2Count) {
        const player1CardCount = document.getElementById('player1CardCount');
        const player2CardCount = document.getElementById('player2CardCount');

        player1CardCount.textContent = player1Count;
        player2CardCount.textContent = player2Count;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const cardGame = new CardGame();

    const btnStart = document.querySelector(".startGame");
    const btnShuffle = document.querySelector(".shuffleCards");
    const btnRestart = document.querySelector(".restartGame");

    btnStart.addEventListener("click", () => cardGame.startGame());

    btnShuffle.addEventListener("click", function () {
        cardGame.clearLayout();
        const shuffledDeck = cardGame.shuffle([...cardGame.player1.hand, ...cardGame.player2.hand]);
        cardGame.player1.hand = shuffledDeck.slice(0, shuffledDeck.length / 2);
        cardGame.player2.hand = shuffledDeck.slice(shuffledDeck.length / 2);

        cardGame.renderHands();
    });

    cardGame.addAttributeListeners();
});
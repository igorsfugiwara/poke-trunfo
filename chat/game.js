let pokemonData = []; // Armazena os dados dos pokémons após a requisição

class Game {
    constructor() {
        this.playerHand = [];
        this.opponentHand = [];
        this.playerScore = 0;
        this.opponentScore = 0;
        this.currentRound = 1;
    }

    async startGame(numCards = 20, startId = 1) {
        // Faz a requisição para obter os dados dos pokémons
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${numCards}&offset=${startId - 1}`);
        const data = await response.json();

        // Preenche pokemonData com os dados necessários
        pokemonData = data.results.map((pokemon, index) => ({
            id: index + 1,
            name: pokemon.name,
            type: "normal", // Adapte conforme necessário
            attack: Math.floor(Math.random() * 100) + 1, // Atributos fictícios para exemplo
            defense: Math.floor(Math.random() * 100) + 1
        }));

        // Cria as mãos dos jogadores e embaralha
        this.playerHand = pokemonData.slice(0, numCards / 2);
        this.opponentHand = pokemonData.slice(numCards / 2);
        this.shuffleHand();
    } catch (error) {
        console.error("Erro ao obter dados dos pokémons:", error);
    }


    restartGame() {
        this.playerScore = 0;
        this.opponentScore = 0;
        this.currentRound = 1;
        this.shuffleHand();
    }

    shuffleHand() {
        // Embaralha as mãos separadamente
        this.playerHand = this.shuffleArray(this.playerHand);
        this.opponentHand = this.shuffleArray(this.opponentHand);
    }


    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            // Troca os elementos de posição
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }


    compare(attribute) {
        const playerCard = this.playerHand[0];
        const opponentCard = this.opponentHand[0];

        const playerValue = playerCard[attribute];
        const opponentValue = opponentCard[attribute];

        if (playerValue > opponentValue) {
            this.playerScore++;
        } else if (playerValue < opponentValue) {
            this.opponentScore++;
        } // Se houver um empate, nenhum ponto é atribuído

        this.endTurn();
    }

    endTurn() {
        const playerCard = this.playerHand.shift();
        const opponentCard = this.opponentHand.shift();

        // Adiciona as cartas comparadas à pilha de cartas usadas
        this.usedCards.push(playerCard, opponentCard);

        // Verifica se as mãos estão vazias, indicando o final do jogo
        if (this.playerHand.length === 0 || this.opponentHand.length === 0) {
            this.endGame();
        } else {
            this.currentRound++;
        }
    }

    endGame() {
        // Lógica para verificar o vencedor e exibir um modal
        const winner = this.playerScore > this.opponentScore ? 'Jogador' : 'Oponente';
        alert(`O jogo acabou! O ${winner} venceu!`);

        // Reinicia o jogo
        this.restartGame();
    }

    checkGameOver() {
        return this.playerHand.length === 0 || this.opponentHand.length === 0;
    }
}

const game = new Game();

function startGame() {
    const numCards = 20;
    const startId = 1;
    game.startGame(numCards, startId);
}

function restartGame() {
    game.restartGame();
}

function shuffleHand() {
    // Somente permite embaralhar quando o jogo estiver empatado
    if (game.playerScore === game.opponentScore) {
        game.shuffleHand();
    }
}
document.addEventListener("DOMContentLoaded", function () {
    // Definindo jogadores
    let player1 = { score: 0, hand: [] };
    let player2 = { score: 0, hand: [] };

    // Função principal para iniciar o jogo
    function startGame() {
        fetchPokemons();
    }

    // Função para buscar os dados dos pokémons
    function fetchPokemons() {
        fetch("https://pokeapi.co/api/v2/pokemon?offset=20&limit=20")
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

                // Aguarda todas as requisições concluírem
                return Promise.all(requests);
            })
            .then((responses) => {
                initializeGame(responses);
            })
            .catch((error) => {
                console.error("Erro na requisição principal:", error);
            });
    }

    // Função para inicializar o jogo com cartas embaralhadas
    function initializeGame(responses) {
        const gamersDeck = shuffle(responses);

        gamersDeck.forEach((card, index) => {
            index % 2 === 0 ? player1.hand.push(card) : player2.hand.push(card);
        });

        console.log("Cartas do Jogador 1:", player1.hand);
        console.log("Cartas do Jogador 2:", player2.hand);

        // Renderiza as mãos dos jogadores nos containers específicos
        renderHands(player1, player2);

        // Adiciona listeners para os botões de atributo
        addAttributeListeners();
    }

    // Função para renderizar as mãos dos jogadores
    function renderHands(player1, player2) {
        renderHand(player1, "player1-container");
        renderHand(player2, "player2-container");
    }

    // Função para renderizar a mão do jogador
    function renderHand(player, containerId) {
        const container = document.getElementById(containerId);

        if (container) {
            player.hand.forEach((card) => {
                const cardElement = createCardElement(card);
                container.appendChild(cardElement);
            });
        }
    }

    // Função para criar um elemento HTML representando uma carta
    function createCardElement(card) {
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

            const weightElement = createAttributeElement("weight", `Peso: ${card[key].peso / 10}kg`);
            const heightElement = createAttributeElement("height", `Altura: ${card[key].altura / 10}m`);
            const movesElement = createAttributeElement(
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

            // Adiciona ouvintes de eventos de clique aos elementos clicáveis
            idElement.addEventListener("click", () => compareAttribute("id", card[key].id));
            weightElement.addEventListener("click", () => compareAttribute("peso", card[key].peso));
            heightElement.addEventListener("click", () => compareAttribute("altura", card[key].altura));
            movesElement.addEventListener("click", () => compareAttribute("qtdMovimentos", card[key].qtdMovimentos));
        }

        return cardElement;
    }

    // Função para criar um elemento de atributo clicável
    function createAttributeElement(className, textContent) {
        const element = document.createElement("p");
        element.classList.add(className);
        element.textContent = textContent;
        return element;
    }

    // Função para adicionar listeners aos botões de atributo
    function addAttributeListeners() {
        const btnWeight = document.querySelector(".weight");
        const btnHeight = document.querySelector(".height");
        const btnMoves = document.querySelector(".moves");
        const btnId = document.querySelector(".id");
        const btnClosed = document.querySelector("#close");

        btnWeight.addEventListener("click", () => playRound("peso"));
        btnHeight.addEventListener("click", () => playRound("altura"));
        btnMoves.addEventListener("click", () => playRound("qtdMovimentos"));
        btnId.addEventListener("click", () => playRound("id"));

        btnClosed.addEventListener("click", () => closeModal());
    }

    // Função para comparar atributos clicáveis
    function compareAttribute(attributeName, attributeValue) {
        console.log(`Atributo ${attributeName} clicado com valor ${attributeValue}`);
        playRound(attributeName);
    }

    // Função para embaralhar as cartas
    function shuffle(array) {
        let currentIndex = array.length,
            randomIndex;

        while (currentIndex > 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    // Função para comparar cartas
    function compareCards(attribute) {
        if (player1.hand.length === 0 || player2.hand.length === 0) {
            // Um dos jogadores está sem cartas, encerre o jogo
            endGame();
            return;
        }

        const player1Card = player1.hand[0][Object.keys(player1.hand[0])[0]][attribute];
        const player2Card = player2.hand[0][Object.keys(player2.hand[0])[0]][attribute];

        if (player1Card > player2Card) {
            player1.score += player1.hand.length;
            console.log("Jogador 1 venceu a rodada!");
            // Move a carta do jogador 2 para o final do baralho do jogador 1
            player1.hand.push(player2.hand.shift());
            // Move a carta do jogador 1 para o final do baralho do jogador 1
            player1.hand.push(player1.hand.shift());
        } else if (player2Card > player1Card) {
            player2.score += player2.hand.length;
            console.log("Jogador 2 venceu a rodada!");
            // Move a carta do jogador 1 para o final do baralho do jogador 2
            player2.hand.push(player1.hand.shift());
            // Move a carta do jogador 2 para o final do baralho do jogador 2
            player2.hand.push(player2.hand.shift());
        } else {
            // Empate - as cartas vão para a próxima rodada
            player1.score += player1.hand.length;
            player2.score += player2.hand.length;
            console.log("Empate! As cartas vão para a próxima rodada.");
            // Embaralha ambas as mãos
            player1.hand = shuffle(player1.hand);
            player2.hand = shuffle(player2.hand);
        }

        // Atualiza o placar
        updateScore();

        // Atualiza a primeira carta de cada jogador
        updateFirstCard(player1);
        updateFirstCard(player2);

        // Limpa o layout antes de renderizar as mãos dos jogadores para a próxima rodada
        clearLayout();
        // Renderiza as mãos dos jogadores nos containers específicos para a próxima rodada
        renderHands(player1, player2);
        //Atualiza o placar
        updateCardCount(player1.hand.length, player2.hand.length)
    }

    // Função para atualizar o placar
    function updateScore() {
        console.log(`Placar - Jogador 1: ${player1.score} | Jogador 2: ${player2.score}`);
    }

    // Função para iniciar uma nova rodada
    function playRound(attribute) {
        compareCards(attribute);

        // Atualiza o placar
        updateScore();

        // Verifica se algum jogador ficou sem cartas
        if (player1.hand.length === 0) {
            console.log("Jogador 1 está sem cartas. Jogador 2 venceu!");
            clearLayout();
        } else if (player2.hand.length === 0) {
            console.log("Jogador 2 está sem cartas. Jogador 1 venceu!");
            clearLayout();
            showVictoryModal();
        } else {
            // Atualiza a primeira carta de cada jogador
            updateFirstCard(player1);
            updateFirstCard(player2);

            // Limpa o layout antes de renderizar as mãos dos jogadores para a próxima rodada
            clearLayout();
            // Renderiza as mãos dos jogadores nos containers específicos para a próxima rodada
            renderHands(player1, player2);
        }
    }

    // Função para encerrar o jogo
    function endGame() {
        console.log("Jogo encerrado!");
        // Adicione aqui qualquer lógica adicional que você deseja executar ao encerrar o jogo
    }

    // Função para atualizar a primeira carta do jogador
    function updateFirstCard(player) {
        if (player.hand.length > 0) {
            // Atualiza a primeira carta do jogador com os novos dados
            const updatedCard = fetchPokemonData(player.hand[0].name);
            updatedCard
                .then((data) => {
                    player.hand[0] = data;
                })
                .catch((error) => {
                    console.error(`Erro na atualização da carta para ${player.hand[0].name}:`, error);
                });
        }
    }

    // Função para buscar os dados atualizados do Pokémon
    async function fetchPokemonData(pokemonName) {
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

    // Limpa o layout removendo todas as cartas dos jogadores
    function clearLayout() {
        const player1Container = document.getElementById("player1-container");
        const player2Container = document.getElementById("player2-container");

        if (player1Container) {
            player1Container.innerHTML = "";
        }

        if (player2Container) {
            player2Container.innerHTML = "";
        }
    }

    // BOTÕES DE CONTROLE - COMEÇAR, EMBARALHAR E RECOMEÇAR
    const btnStart = document.querySelector(".startGame");
    const btnShuffle = document.querySelector(".shuffleCards");
    const btnRestart = document.querySelector(".restartGame");

    btnStart.addEventListener("click", startGame);

    // Evento para o botão de embaralhar
    btnShuffle.addEventListener("click", function () {
        clearLayout(); // Limpa o layout antes de renderizar as mãos dos jogadores
        const shuffledDeck = shuffle([...player1.hand, ...player2.hand]);
        player1.hand = shuffledDeck.slice(0, shuffledDeck.length / 2);
        player2.hand = shuffledDeck.slice(shuffledDeck.length / 2);

        renderHands(player1, player2);
    });

    // Adiciona listeners para os botões de atributo
    addAttributeListeners();

    // Adicione esta função para exibir o modal de vitória
function showVictoryModal() {
    const modal = document.getElementById('victoryModal');
    modal.style.display = 'block';
}

// Adicione esta função para fechar o modal
function closeModal() {
    const modal = document.getElementById('victoryModal');
    modal.style.display = 'none';
}

// Adicione esta função para atualizar a contagem de cartas na interface
function updateCardCount(player1Count, player2Count) {
    const player1CardCount = document.getElementById('player1CardCount');
    const player2CardCount = document.getElementById('player2CardCount');

    player1CardCount.textContent = player1Count;
    player2CardCount.textContent = player2Count;
}
});
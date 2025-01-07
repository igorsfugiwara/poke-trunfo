# Jogo de Poké-Trunfo

O **Poké-Trunfo** é um jogo de cartas inspirado no famoso jogo "Super Trunfo", onde os jogadores competem usando cartas de Pokémon. O jogo utiliza dados da [PokéAPI](https://pokeapi.co/) para obter informações sobre os Pokémon e desafiar o oponente em uma batalha de atributos.

https://poke-trunfo.netlify.app/

## Como jogar

1. **Iniciar o jogo**: O jogo começa ao clicar no botão **Iniciar Jogo**. Isso irá buscar informações sobre Pokémon da PokéAPI e distribuir as cartas entre os dois jogadores.
2. **Rodadas**: Os jogadores competem em rodadas, escolhendo um atributo (Peso, Altura, Quantidade de Movimentos ou ID) para desafiar o oponente. A carta com o maior valor para o atributo escolhido vence a rodada e leva a carta do oponente.
3. **Vencer o jogo**: O jogo termina quando um dos jogadores não tem mais cartas. O jogador com o maior número de cartas no final da partida é o vencedor.

## Como funciona

O jogo é baseado nas cartas de Pokémon, que possuem os seguintes atributos:
- **Nome**: O nome do Pokémon.
- **Imagem**: Imagem do Pokémon.
- **Peso**: Peso do Pokémon.
- **Altura**: Altura do Pokémon.
- **Quantidade de Ataques**: Número de ataques que o Pokémon pode realizar.
- **ID**: Identificador único do Pokémon.

A cada rodada, os jogadores escolhem um atributo para comparar. O jogador que tiver o valor maior para o atributo escolhido vence a rodada e ganha as cartas do oponente.

## Tecnologias utilizadas

- **HTML**: Estrutura da página.
- **CSS**: Estilos para o layout e a apresentação do jogo.
- **JavaScript Vanilla**: Lógica do jogo, interações com a PokéAPI e controle das cartas e dos jogadores.

## Funcionalidades

- **Fetch de dados**: As cartas dos Pokémon são obtidas da [PokéAPI](https://pokeapi.co/).
- **Baralho de cartas**: Cada jogador possui um conjunto de cartas com Pokémon aleatórios.
- **Interação**: Os jogadores podem clicar nos atributos das cartas para iniciar a comparação de dados.
- **Pontuação**: O jogador que ganhar uma rodada ganha a carta do oponente. O vencedor é o jogador com mais cartas no final do jogo.

## Instruções de execução

Para jogar o Poké-Trunfo, basta abrir o arquivo `index.html` em seu navegador. O jogo funciona diretamente no frontend, sem a necessidade de backend ou servidores.

1. Clone este repositório ou faça o download dos arquivos.
2. Abra o arquivo `index.html` em um navegador moderno.

## Contribuição

Sinta-se à vontade para contribuir com melhorias ou correções! Para isso, basta seguir as etapas abaixo:

1. Faça um fork deste repositório.
2. Crie uma branch para suas alterações (`git checkout -b feature-nome-da-sua-feature`).
3. Commit suas alterações (`git commit -am 'Adiciona nova feature'`).
4. Push para a branch (`git push origin feature-nome-da-sua-feature`).
5. Abra um Pull Request.
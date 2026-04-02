import React from 'react';

const ContentSection: React.FC = () => {
    return (
        <section
            style={{ background: '#0f0f11', borderTop: '1px solid #27272a', padding: '2.5rem 1rem' }}
            aria-label="Sobre o PokéTrunfo"
        >
            <div style={{ maxWidth: '640px', margin: '0 auto', color: '#a1a1aa', fontFamily: 'Inter, sans-serif' }}>

                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#22c55e', marginBottom: '0.75rem' }}>
                    O que é PokéTrunfo?
                </h2>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                    PokéTrunfo é uma versão digital do clássico jogo Super Trunfo, agora com cartas de Pokémon.
                    O jogo consome dados reais da PokéAPI, com mais de 900 Pokémon disponíveis. Compare atributos,
                    vença rodadas e colete todas as cartas do adversário para ganhar.
                </p>

                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#22c55e', marginBottom: '0.75rem' }}>
                    Como jogar
                </h2>
                <ul style={{ fontSize: '0.9rem', lineHeight: 1.8, paddingLeft: '1.25rem', marginBottom: '1.5rem' }}>
                    <li>Você e o computador recebem uma carta de Pokémon cada.</li>
                    <li>Escolha o atributo que acredita ser maior que o do adversário.</li>
                    <li>Se o seu atributo for maior, você vence a rodada e fica com a carta do oponente.</li>
                    <li>Quem ficar sem cartas perde. Colete todas para vencer!</li>
                </ul>

                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#22c55e', marginBottom: '0.75rem' }}>
                    Atributos das cartas
                </h2>
                <ul style={{ fontSize: '0.9rem', lineHeight: 1.8, paddingLeft: '1.25rem', marginBottom: '1.5rem' }}>
                    <li><strong style={{ color: '#e4e4e7' }}>HP</strong> — Pontos de vida do Pokémon</li>
                    <li><strong style={{ color: '#e4e4e7' }}>Ataque</strong> — Poder de ataque físico</li>
                    <li><strong style={{ color: '#e4e4e7' }}>Defesa</strong> — Resistência a ataques físicos</li>
                    <li><strong style={{ color: '#e4e4e7' }}>Ataque Especial</strong> — Poder de ataques especiais</li>
                    <li><strong style={{ color: '#e4e4e7' }}>Defesa Especial</strong> — Resistência a ataques especiais</li>
                    <li><strong style={{ color: '#e4e4e7' }}>Velocidade</strong> — Determina quem age primeiro em batalha</li>
                </ul>

                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#22c55e', marginBottom: '0.75rem' }}>
                    Sobre o projeto
                </h2>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>
                    PokéTrunfo é um projeto open source desenvolvido por Igor Fugiwara, engenheiro frontend em São Paulo.
                    Construído com React, TypeScript e Tailwind CSS. Os dados dos Pokémon são fornecidos pela{' '}
                    <a href="https://pokeapi.co" style={{ color: '#22c55e', textDecoration: 'underline' }}>PokéAPI</a>,
                    uma API pública e gratuita com informações completas de todos os Pokémon das séries principais.
                </p>

            </div>
        </section>
    );
};

export default ContentSection;
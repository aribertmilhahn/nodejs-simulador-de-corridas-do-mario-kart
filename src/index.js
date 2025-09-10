const player1 = {
    name: 'Mario',
    speed: 4,
    handling: 3,
    power: 3,
    score: 0,
};

const player2 = {
    name: 'Luigi',
    speed: 3,
    handling: 4,
    power: 4,
    score: 0,
};

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
};

async function getRandomBlock() {
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.33:
            result = 'RETA';
            break;

        case random < 0.66:
            result = 'CURVA';
            break;
    
        default:
            result = 'CONFRONTO';
            break;
    }

    return result;
}

async function logRollDiceResult(characterName, block, diceResult, attribute) {
    console.log(
        `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`
    );
};

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);
        
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if (block === 'RETA') {
            totalTestSkill1 = diceResult1 + character1.speed;
            totalTestSkill2 = diceResult2 + character2.speed;

            logRollDiceResult(character1.name, 'speed', diceResult1, character1.speed);
            logRollDiceResult(character2.name, 'speed', diceResult2, character2.speed);
        } else if (block === 'CURVA') {
            totalTestSkill1 = diceResult1 + character1.handling;
            totalTestSkill2 = diceResult2 + character2.handling;

            logRollDiceResult(character1.name, 'handling', diceResult1, character1.handling);
            logRollDiceResult(character2.name, 'handling', diceResult2, character2.handling);
        } else if (block === 'CONFRONTO') {
            let powerResult1 = diceResult1 + character1.power;
            let powerResult2 = diceResult2 + character2.power;

            console.log(`${character1.name} confrontou com ${character2.name} 🥊`);

            logRollDiceResult(character1.name, 'power', diceResult1, character1.power);
            logRollDiceResult(character2.name, 'power', diceResult2, character2.power);

            if (powerResult1 > powerResult2 && character2.score > 0) {
                console.log(`${character1.name} venceu o confronto! ${character2.name} perdeu um ponto 🐢`);
                character2.score--;
            }
            if (powerResult2 > powerResult1 && character1.score > 0) {
                console.log(`${character2.name} venceu o confronto! ${character1.name} perdeu um ponto 🐢`);
                character1.score--;
            }
            
            console.log(powerResult1 === powerResult2 ? 'Confronto empatado! Nenhum ponto foi perdido!' : '');
        }

        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`${character1.name} marcou um ponto`);
            character1.score++;
        } else if (totalTestSkill2 > totalTestSkill1) {
            console.log(`${character2.name} marcou um ponto`);
            character2.score++;
        }

        console.log('-----------------------------------------------');
    }
}

async function declareWinner(character1, character2) {
    console.log('Resultado final: ');
    console.log(`${character1.name} : ${character1.score} ponto(s)`);
    console.log(`${character2.name} : ${character2.score} ponto(s)`);

    if (character1.score > character2.score) {
        console.log(`\n${character1.name} venceu a corrida! Parabéns! 🏆`);
    } else if (character2.score > character1.score) {
        console.log(`\n${character2.name} venceu a corrida! Parabéns! 🏆`);
    } else {
        console.log('A corrida terminou em empate');
    }
}

(async function main() {
    console.log(
        `🏁🚨 Corrida entre ${player1.name} e ${player2.name} começando...\n`
    );

    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();
let gotas = [];
let solo;
let tipoSolo = "vegetacao"; // valor inicial
let passaros = []; // Array para armazenar os pássaros

function setup() {
    let canvas = createCanvas(600, 400);
    canvas.parent("canvas-holder");
    solo = new Solo(tipoSolo);

    // Cria alguns pássaros iniciais
    for (let i = 0; i < 3; i++) {
        passaros.push(new Passaro());
    }
}

function draw() {
    background(200, 220, 255); // céu

    for (let i = gotas.length - 1; i >= 0; i--) {
        gotas[i].cair();
        gotas[i].mostrar();

        if (gotas[i].atingeSolo(solo.altura)) {
            solo.aumentarErosao();
            gotas.splice(i, 1);
        }
    }

    solo.mostrar();

    if (frameCount % 5 === 0) {
        gotas.push(new Gota());
    }

    // Atualiza e exibe os pássaros
    for (let passaro of passaros) {
        passaro.voar();
        passaro.mostrar();
    }

    // Adiciona um novo pássaro aleatoriamente a cada certo número de frames
    if (frameCount % 120 === 0) {
        passaros.push(new Passaro());
    }
}

function setSoilType(tipo) {
    tipoSolo = tipo;
    solo = new Solo(tipoSolo);
}

class Gota {
    constructor() {
        this.x = random(width);
        this.y = 0;
        this.vel = random(4, 6);
    }

    cair() {
        this.y += this.vel;
    }

    mostrar() {
        stroke(0, 0, 200);
        line(this.x, this.y, this.x, this.y + 10);
    }

    atingeSolo(ySolo) {
        return this.y > ySolo;
    }
}

class Solo {
    constructor(tipo) {
        this.tipo = tipo;
        this.altura = height - 80;
        this.erosao = 0;
    }

    aumentarErosao() {
        let taxa;
        if (this.tipo === "vegetacao") taxa = 0.1;
        else if (this.tipo === "exposto") taxa = 0.5;
        else if (this.tipo === "urbanizado") taxa = 0.3;

        this.erosao += taxa;
        this.altura += taxa;
    }

    mostrar() {
        noStroke();
        if (this.tipo === "vegetacao") {
            fill(60, 150, 60);
            rect(0, this.altura, width, height - this.altura);
            this.desenharArvore();
        } else if (this.tipo === "exposto") {
            fill(139, 69, 19);
            rect(0, this.altura, width, height - this.altura);
        } else if (this.tipo === "urbanizado") {
            fill(120);
            rect(0, this.altura, width, height - this.altura);
            this.desenharPredio(width * 0.15, this.altura - 100, 80, 100, 5, 3); // Posição, altura, largura, num janelas (largura, altura)
            this.desenharPredio(width * 0.65, this.altura - 150, 100, 150, 7, 5); // Outro prédio
        }

        fill(0);
        textSize(14);
        textAlign(LEFT);
        text(`Erosão: ${this.erosao.toFixed(1)}`, 10, 20);
        text(`Tipo de solo: ${this.tipo}`, 10, 40);
    }

    desenharArvore() {
        const desenharUmaArvore = (x, y, escala) => {
            fill(101, 67, 33);
            rect(x - 10 * escala, y - 50 * escala, 20 * escala, 50 * escala);
            fill(34, 139, 34);
            ellipse(x, y - 70 * escala, 50 * escala, 40 * escala);
        };

        desenharUmaArvore(width * 0.8 + 10, this.altura, 1);
        desenharUmaArvore(width * 0.2, this.altura - 20, 0.8);
        desenharUmaArvore(width * 0.5, this.altura - 10, 0.9);
        desenharUmaArvore(width * 0.95, this.altura - 30, 0.7);
    }

    desenharPredio(x, y, largura, altura, linhas, colunas) {
        fill(80); // Cor do prédio
        rect(x, y, largura, altura);

        // Desenha as janelas
        let larguraJanela = largura / (colunas + 1) * 0.8;
        let alturaJanela = altura / (linhas + 1) * 0.8;
        let espacoX = largura / (colunas + 1) * 0.2;
        let espacoY = altura / (linhas + 1) * 0.2;

        fill(255, 255, 200); // Cor das janelas (amarelo claro)
        for (let i = 0; i < linhas; i++) {
            for (let j = 0; j < colunas; j++) {
                let janelaX = x + espacoX + j * (larguraJanela + espacoX);
                let janelaY = y + espacoY + i * (alturaJanela + espacoY);
                rect(janelaX, janelaY, larguraJanela, alturaJanela);
            }
        }
    }
    desenharArvore() {
        const desenharUmaArvore = (x, y, escala) => {
            fill(101, 67, 33);
            rect(x - 10 * escala, y - 50 * escala, 20 * escala, 50 * escala);
            fill(34, 139, 34);
            ellipse(x, y - 70 * escala, 50 * escala, 40 * escala);
        };

        desenharUmaArvore(width * 0.8 + 10, this.altura, 1);
        desenharUmaArvore(width * 0.2, this.altura - 20, 0.8);
        desenharUmaArvore(width * 0.5, this.altura - 10, 0.9);
        desenharUmaArvore(width * 0.95, this.altura - 30, 0.7);
    }
}

class Passaro {
    constructor() {
        this.x = -50; // Começa fora da tela à esquerda
        this.y = random(height * 0.1, height * 0.4); // Altura aleatória na parte superior
        this.velocidade = random(1, 3);
        this.tamanho = random(10, 20);
    }

    voar() {
        this.x += this.velocidade;
        if (this.x > width + 50) { // Se sair da tela pela direita, volta da esquerda
            this.x = -50;
            this.y = random(height * 0.1, height * 0.4);
            this.velocidade = random(1, 3);
            this.tamanho = random(10, 20);
        }
    }

    mostrar() {
        fill(255, 165, 0); // Laranja
        ellipse(this.x, this.y, this.tamanho, this.tamanho * 0.7); // Corpo
        // Asas (simplificadas)
        line(this.x - this.tamanho * 0.6, this.y, this.x - this.tamanho * 0.2, this.y - this.tamanho * 0.5);
        line(this.x + this.tamanho * 0.6, this.y, this.x + this.tamanho * 0.2, this.y - this.tamanho * 0.5);
    }
}

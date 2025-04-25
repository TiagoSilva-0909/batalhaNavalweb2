let tabuleiro = [];
let quantidadedebarcos = 7;
let barcosNaufragados = 0;
let quantidadesdetiros = 10;

// Inicializa o tabuleiro e coloca os barcos
function inicializarJogo() {
  tabuleiro = [];
  barcosNaufragados = 0;
  quantidadesdetiros = 10;

  // Cria o tabuleiro vazio
  for (let i = 0; i < 5; i++) {
    tabuleiro[i] = [];
    for (let j = 0; j < 5; j++) {
      tabuleiro[i][j] = false;
    }
  }

  // Coloca os barcos nas posições sorteadas
  for (let i = 0; i < quantidadedebarcos; i++) {
    let posX = Math.floor(Math.random() * 5);
    let posY = Math.floor(Math.random() * 5);
    tabuleiro[posX][posY] = true;
  }

  // Atualiza a exibição do tabuleiro
  atualizarTabuleiro();
  atualizarMensagens();
}

// Atualiza o tabuleiro visível na tela
function atualizarTabuleiro() {
  const boardElement = document.getElementById("board");
  boardElement.innerHTML = ""; // Limpa o tabuleiro existente

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.id = `${i}-${j}`;

      // Marcar as células que já foram atingidas
      if (tabuleiro[i][j] === null) {
        cell.style.backgroundColor = "gray";
      }

      boardElement.appendChild(cell);
    }
  }
}

// Atualiza as mensagens na tela
function atualizarMensagens() {
  document.getElementById("remainingShots").innerText = `Tiros restantes: ${quantidadesdetiros}`;
  document.getElementById("shipsSunk").innerText = `Barcos naufragados: ${barcosNaufragados}`;
  if (barcosNaufragados === quantidadedebarcos) {
    document.getElementById("message").innerText = "Você naufragou todos os barcos! Você venceu!";
  } else if (quantidadesdetiros === 0) {
    document.getElementById("message").innerText = "Fim de jogo! Você não venceu.";
  }
}

// Função chamada quando o jogador atira
function jogar() {
  if (quantidadesdetiros === 0 || barcosNaufragados === quantidadedebarcos) return;

  let jogadaX = parseInt(document.getElementById("coordX").value);
  let jogadaY = parseInt(document.getElementById("coordY").value);

  // Verifica a validade da jogada
  if (jogadaX < 0 || jogadaX > 4 || jogadaY < 0 || jogadaY > 4) {
    alert("Coordenadas inválidas! As coordenadas devem estar entre 0 e 4.");
    return;
  }

  // Verifica o que aconteceu no tabuleiro
  if (tabuleiro[jogadaX][jogadaY] === true) {
    barcosNaufragados++;
    tabuleiro[jogadaX][jogadaY] = null; // Marca como atingido
    document.getElementById(`${jogadaX}-${jogadaY}`).style.backgroundColor = "red";
    alert("Barco naufragado!");
  } else {
    document.getElementById(`${jogadaX}-${jogadaY}`).style.backgroundColor = "blue";
    alert("Tiro na água!");
  }

  quantidadesdetiros--;
  atualizarMensagens();
}

// Inicia o jogo ao carregar a página
inicializarJogo();
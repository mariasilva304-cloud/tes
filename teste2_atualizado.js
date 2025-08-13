
// Navegação móvel
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Navegação suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            navLinks.classList.remove('active');
        }
    });
});

// Armazenamento de plantas (usando variável em memória)
let plantasCadastradas = [];

// Formulário de cadastro de plantas
const plantaForm = document.getElementById('plantaForm');
const plantasCadastradasDiv = document.getElementById('plantasCadastradas');

plantaForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const planta = {
        id: Date.now(),
        nome: document.getElementById('nomePlanta').value,
        tipo: document.getElementById('tipoPlanta').value,
        dataAquisicao: document.getElementById('dataAquisicao').value,
        local: document.getElementById('localPlanta').value,
        observacoes: document.getElementById('observacoes').value
    };

    plantasCadastradas.push(planta);
    displayPlantas();
    plantaForm.reset();
    
    alert('Planta cadastrada com sucesso! 🌱');
});
function displayPlantas() {
    plantasCadastradasDiv.innerHTML = '';
    plantasCadastradas.forEach(planta => {
        const plantaDiv = document.createElement('div');
        plantaDiv.classList.add('planta');
        plantaDiv.innerHTML = `
            <h3>${planta.nome} (${planta.tipo})</h3>
            <p><strong>Data de Aquisição:</strong> ${new Date(planta.dataAquisicao).toLocaleDateString()}</p>
            <p><strong>Local:</strong> ${planta.local}</p>
            <p><strong>Observações:</strong> ${planta.observacoes}</p>
        `;
        plantasCadastradasDiv.appendChild(plantaDiv);
    });
}

// =====================
// Calculadora de Rega
// =====================
const calculadoraRega = document.getElementById('calculadoraRega');
const resultadoRega = document.getElementById('resultadoRega');

calculadoraRega.addEventListener('submit', function(e) {
    e.preventDefault();

    const tipo = document.getElementById('tipoPlantaCalc').value;
    const vaso = parseInt(document.getElementById('tamanhoVaso').value);
    const estacao = document.getElementById('estacao').value;

    let dias = 7; // base
    if (tipo === 'cacto') dias += 7; 
    if (tipo === 'rosa-deserto') dias += 4; 
    if (tipo === 'tropical') dias -= 2; 
    if (tipo === 'temperada') dias += 0; 
    if (tipo === 'ervas') dias -= 1;

    // Ajuste pelo tamanho do vaso
    if (vaso <= 10) dias -= 1;
    if (vaso >= 20) dias += 1;

    // Ajuste pela estação
    if (estacao === 'verao') dias -= 2;
    if (estacao === 'inverno') dias += 3;

    if (dias < 1) dias = 1; // nunca menos que 1 dia

    resultadoRega.textContent = `Regue a cada ${dias} dia(s). 💧`;
    resultadoRega.classList.remove('hidden');
});

// =====================
// Quiz: Que Planta Combina com Você?
// =====================
const quizOptions = document.querySelectorAll('.quiz-options li');
const calcularQuizBtn = document.getElementById('calcularQuiz');
const quizResult = document.getElementById('quizResult');

quizOptions.forEach(option => {
    option.addEventListener('click', () => {
        const parent = option.parentElement;
        parent.querySelectorAll('li').forEach(li => li.classList.remove('selected'));
        option.classList.add('selected');
    });
});

calcularQuizBtn.addEventListener('click', () => {
    let totalScore = 0;
    document.querySelectorAll('.quiz-options li.selected').forEach(selected => {
        totalScore += parseInt(selected.getAttribute('data-score'));
    });

    let resultadoTexto = '';
    if (totalScore <= 4) {
        resultadoTexto = '🌵 Você combina com cactos e suculentas — pouca manutenção e muito charme!';
    } else if (totalScore <= 6) {
        resultadoTexto = '🌱 Você combina com plantas de sombra como Pothos e Zamioculcas!';
    } else if (totalScore <= 8) {
        resultadoTexto = '🌸 Você combina com plantas floríferas — requerem cuidados moderados!';
    } else {
        resultadoTexto = '🌴 Você combina com plantas tropicais exuberantes!';
    }

    quizResult.textContent = resultadoTexto;
    quizResult.classList.remove('hidden');
});

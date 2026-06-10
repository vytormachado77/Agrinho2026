document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================================================
       1. SISTEMA DE ACCORDION (CAIXAS EXPANSÍVEIS)
       ========================================================================== */
    const accordionHeaders = document.querySelectorAll(".accordion-header");

    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const item = header.parentElement;
            const content = header.nextElementSibling;

            // Fecha outros itens abertos (Efeito único expansível)
            document.querySelectorAll(".accordion-item").forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains("active")) {
                    otherItem.classList.remove("active");
                    otherItem.querySelector(".accordion-content").style.maxHeight = null;
                }
            });

            // Alterna o item atual
            item.classList.toggle("active");
            if (item.classList.contains("active")) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    /* ==========================================================================
       2. CONTROLE DE ACESSIBILIDADE: TAMANHO DE FONTE & TEMA
       ========================================================================== */
    let rootFontSize = 16;
    const htmlElement = document.documentElement;

    document.getElementById("btn-aumentar").addEventListener("click", () => {
        if (rootFontSize < 24) {
            rootFontSize += 2;
            htmlElement.style.fontSize = `${rootFontSize}px`;
        }
    });

    document.getElementById("btn-diminuir").addEventListener("click", () => {
        if (rootFontSize > 12) {
            rootFontSize -= 2;
            htmlElement.style.fontSize = `${rootFontSize}px`;
        }
    });

    document.getElementById("btn-tema").addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    /* ==========================================================================
       3. CONTROLE DE ACESSIBILIDADE: LEITURA POR VOZ (SpeechSynthesis API)
       ========================================================================== */
    const btnOuvir = document.getElementById("btn-ouvir");
    const btnParar = document.getElementById("btn-parar");
    let somUtterance = null;

    btnOuvir.addEventListener("click", () => {
        // Para qualquer leitura ativa anterior
        window.speechSynthesis.cancel();

        // Captura apenas elementos de texto marcados com a classe de leitura pura
        const elementosTexto = document.querySelectorAll(".text-read p, .text-read h2, .text-read blockquote");
        let textoCompleto = "";

        elementosTexto.forEach(el => {
            textoCompleto += el.innerText + ". ";
        });

        if (textoCompleto.trim() !== "") {
            somUtterance = new SpeechSynthesisUtterance(textoCompleto);
            somUtterance.lang = "pt-BR";
            somUtterance.rate = 1.1; // Velocidade de leitura levemente otimizada

            somUtterance.onstart = () => {
                btnOuvir.innerText = "🔊 Lendo...";
                btnParar.classList.remove("hidden");
            };

            somUtterance.onend = () => {
                resetarBotoesVoz();
            };

            somUtterance.onerror = () => {
                resetarBotoesVoz();
            };

            window.speechSynthesis.speak(somUtterance);
        }
    });

    btnParar.addEventListener("click", () => {
        window.speechSynthesis.cancel();
        resetarBotoesVoz();
    });

    function resetarBotoesVoz() {
        btnOuvir.innerText = "🔊 Ouvir";
        btnParar.classList.add("hidden");
    }

    /* ==========================================================================
       4. INTERAÇÃO DE COMENTÁRIOS E CADASTRO
       ========================================================================== */
    const commentForm = document.getElementById("comment-form");
    const commentText = document.getElementById("comment-text");
    const commentsList = document.getElementById("comments-list");

    commentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        if (commentText.value.trim() !== "") {
            const card = document.createElement("div");
            card.classList.add("comment-card");
            
            // Sanitização simples para demonstração segura
            card.textContent = commentText.value;
            
            commentsList.prepend(card);
            commentText.value = "";
        }
    });

    const cadastroForm = document.getElementById("cadastro-seminario");
    cadastroForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Inscrição efetuada com sucesso para o Seminário de IA no Campo 2026!");
        cadastroForm.reset();
    });
});
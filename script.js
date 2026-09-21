/* =========================================================
   MERCADO MOTO — JAVASCRIPT
========================================================= */


/* =========================================================
   VARIÁVEIS
========================================================= */

let indiceBanner = 0;
let quantidadeCarrinho = 0;

const imagensBanner = [
    "img/banner1.jpg",
    "img/banner2.jpg",
    "img/banner3.jpg",
    "img/banner4.webp"
];


/* =========================================================
   ELEMENTOS
========================================================= */

const imagemBanner = document.getElementById("imagem-banner");
const indicadores = document.querySelectorAll(".indicador");
const contadorCarrinho = document.getElementById("contador-carrinho");
const campoPesquisa = document.getElementById("campo-pesquisa");


/* =========================================================
   CARROSSEL DO BANNER
========================================================= */

function atualizarBanner() {

    if (!imagemBanner) return;

    imagemBanner.style.opacity = "0";

    setTimeout(() => {

        imagemBanner.src = imagensBanner[indiceBanner];

        imagemBanner.style.opacity = "1";

    }, 180);

    indicadores.forEach((indicador, index) => {

        indicador.classList.toggle(
            "ativo",
            index === indiceBanner
        );

    });
}


function avancarImagem() {

    indiceBanner++;

    if (indiceBanner >= imagensBanner.length) {
        indiceBanner = 0;
    }

    atualizarBanner();
}


function voltarImagem() {

    indiceBanner--;

    if (indiceBanner < 0) {
        indiceBanner = imagensBanner.length - 1;
    }

    atualizarBanner();
}


/* Troca automática */

let intervaloBanner = setInterval(avancarImagem, 5000);


/* Pausar quando o mouse estiver sobre o banner */

const banner = document.querySelector(".banner");

if (banner) {

    banner.addEventListener("mouseenter", () => {
        clearInterval(intervaloBanner);
    });

    banner.addEventListener("mouseleave", () => {

        intervaloBanner = setInterval(
            avancarImagem,
            5000
        );

    });

}


/* =========================================================
   PESQUISA
========================================================= */

function pesquisar() {

    if (!campoPesquisa) return;

    const termo = campoPesquisa.value
        .trim()
        .toLowerCase();

    if (!termo) {

        campoPesquisa.focus();

        campoPesquisa.style.boxShadow =
            "0 0 0 3px rgba(220, 50, 50, .25)";

        setTimeout(() => {
            campoPesquisa.style.boxShadow = "";
        }, 700);

        return;
    }

    const produtos = document.querySelectorAll(".produto");

    let encontrou = false;

    produtos.forEach(produto => {

        const nome = produto
            .querySelector("h3")
            ?.textContent
            .toLowerCase() || "";

        if (nome.includes(termo)) {

            encontrou = true;

            produto.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            produto.style.transition = "box-shadow .3s ease";

            produto.style.boxShadow =
                "0 0 0 4px rgba(255, 214, 0, .65)";

            setTimeout(() => {

                produto.style.boxShadow = "";

            }, 1800);
        }

    });

    if (!encontrou) {

        alert(
            `Não encontramos produtos para "${campoPesquisa.value}".`
        );

    }

}


/* Pesquisar pressionando Enter */

if (campoPesquisa) {

    campoPesquisa.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {
                pesquisar();
            }

        }
    );

}


/* =========================================================
   IR PARA PRODUTOS
========================================================= */

function irParaProdutos() {

    const produtos = document.getElementById("produtos");

    if (!produtos) return;

    produtos.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =========================================================
   CARRINHO
========================================================= */

function adicionarCarrinho() {

    quantidadeCarrinho++;

    if (contadorCarrinho) {

        contadorCarrinho.textContent =
            quantidadeCarrinho;

        contadorCarrinho.animate(
            [
                {
                    transform: "scale(1)"
                },
                {
                    transform: "scale(1.35)"
                },
                {
                    transform: "scale(1)"
                }
            ],
            {
                duration: 350
            }
        );

    }

    mostrarNotificacao(
        "Produto adicionado ao carrinho!"
    );

}


/* =========================================================
   NOTIFICAÇÃO
========================================================= */

function mostrarNotificacao(mensagem) {

    const antiga =
        document.querySelector(".notificacao-site");

    if (antiga) {
        antiga.remove();
    }

    const notificacao =
        document.createElement("div");

    notificacao.className =
        "notificacao-site";

    notificacao.innerHTML = `
        <span>✓</span>
        <p>${mensagem}</p>
    `;

    Object.assign(
        notificacao.style,
        {
            position: "fixed",
            right: "25px",
            bottom: "25px",
            zIndex: "9999",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "14px 18px",
            background: "#111",
            color: "#fff",
            borderRadius: "12px",
            boxShadow: "0 15px 40px rgba(0,0,0,.2)",
            fontSize: "13px",
            fontWeight: "600",
            transform: "translateY(20px)",
            opacity: "0",
            transition: ".3s ease"
        }
    );

    notificacao.querySelector("span").style.cssText = `
        width:25px;
        height:25px;
        display:flex;
        align-items:center;
        justify-content:center;
        background:#ffd600;
        color:#111;
        border-radius:50%;
        font-weight:bold;
    `;

    document.body.appendChild(notificacao);

    requestAnimationFrame(() => {

        notificacao.style.transform =
            "translateY(0)";

        notificacao.style.opacity = "1";

    });

    setTimeout(() => {

        notificacao.style.transform =
            "translateY(20px)";

        notificacao.style.opacity = "0";

        setTimeout(() => {
            notificacao.remove();
        }, 300);

    }, 2500);

}


/* =========================================================
   FAVORITOS
========================================================= */

document.querySelectorAll(".favorito")
    .forEach(botao => {

        botao.setAttribute(
            "role",
            "button"
        );

        botao.setAttribute(
            "aria-label",
            "Adicionar aos favoritos"
        );

        botao.addEventListener(
            "click",
            function(event) {

                event.stopPropagation();

                const favoritado =
                    this.classList.toggle(
                        "favoritado"
                    );

                if (favoritado) {

                    this.textContent = "♥";

                    this.style.color =
                        "#df3b3b";

                    mostrarNotificacao(
                        "Produto adicionado aos favoritos!"
                    );

                } else {

                    this.textContent = "♡";

                    this.style.color = "";

                    mostrarNotificacao(
                        "Produto removido dos favoritos."
                    );

                }

            }
        );

    });


/* =========================================================
   CATEGORIAS
========================================================= */

document.querySelectorAll(".categoria")
    .forEach(categoria => {

        categoria.addEventListener(
            "click",
            function() {

                const nome =
                    this.querySelector("h3")
                        ?.textContent
                        .trim();

                if (!nome) return;

                if (nome.toLowerCase() === "motos") {

                    mostrarNotificacao(
                        "Confira nossas motos disponíveis."
                    );

                } else {

                    mostrarNotificacao(
                        `Categoria: ${nome}`
                    );

                }

                const produtos =
                    document.getElementById("produtos");

                if (produtos) {

                    setTimeout(() => {

                        produtos.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }, 350);

                }

            }
        );

    });


/* =========================================================
   NEWSLETTER
========================================================= */

function cadastrarEmail() {

    const campoEmail =
        document.getElementById("email");

    if (!campoEmail) return;

    const email =
        campoEmail.value.trim();

    const emailValido =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {

        mostrarNotificacao(
            "Digite seu e-mail para continuar."
        );

        campoEmail.focus();

        return;
    }

    if (!emailValido.test(email)) {

        mostrarNotificacao(
            "Digite um e-mail válido."
        );

        campoEmail.focus();

        return;
    }

    mostrarNotificacao(
        "Cadastro realizado com sucesso!"
    );

    campoEmail.value = "";

}


/* Enter no campo da newsletter */

const campoEmail =
    document.getElementById("email");

if (campoEmail) {

    campoEmail.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {
                cadastrarEmail();
            }

        }
    );

}


/* =========================================================
   LINKS "VER TODOS"
========================================================= */

document.querySelectorAll(
    '.titulo-secao a[href="#"]'
).forEach(link => {

    link.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            const secao =
                this.closest(".secao");

            if (!secao) return;

            const produtos =
                document.querySelector(".produtos");

            if (produtos) {

                produtos.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }
    );

});


/* =========================================================
   BOTÃO "EXPLORAR PRODUTOS"
========================================================= */

document.querySelectorAll(
    ".destaque .btn-principal"
).forEach(botao => {

    botao.addEventListener(
        "click",
        irParaProdutos
    );

});


/* =========================================================
   CARRINHO — CLIQUE NO ÍCONE
========================================================= */

const carrinho =
    document.querySelector(".carrinho");

if (carrinho) {

    carrinho.addEventListener(
        "click",
        function() {

            if (quantidadeCarrinho === 0) {

                mostrarNotificacao(
                    "Seu carrinho está vazio."
                );

            } else {

                mostrarNotificacao(
                    `Você possui ${quantidadeCarrinho} item(ns) no carrinho.`
                );

            }

        }
    );

}


/* =========================================================
   MENU — FECHAR / DESTACAR AO CLICAR
========================================================= */

document.querySelectorAll(
    ".menu a"
).forEach(link => {

    link.addEventListener(
        "click",
        function() {

            document
                .querySelectorAll(".menu a")
                .forEach(item => {
                    item.classList.remove("ativo");
                });

            this.classList.add("ativo");

        }
    );

});


/* =========================================================
   EFEITO DE ENTRADA AO ROLAR
========================================================= */

const elementosAnimados =
    document.querySelectorAll(
        ".categoria, .produto, .beneficio, .depoimento"
    );

const observador =
    new IntersectionObserver(
        entradas => {

            entradas.forEach(entrada => {

                if (entrada.isIntersecting) {

                    entrada.target.style.opacity = "1";

                    entrada.target.style.transform =
                        "translateY(0)";

                    observador.unobserve(
                        entrada.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


elementosAnimados.forEach(elemento => {

    elemento.style.opacity = "0";

    elemento.style.transform =
        "translateY(18px)";

    elemento.style.transition =
        "opacity .55s ease, transform .55s ease";

    observador.observe(elemento);

});


/* =========================================================
   ANIMAÇÃO DO HEADER AO ROLAR
========================================================= */

const cabecalho =
    document.querySelector(".cabecalho");

window.addEventListener(
    "scroll",
    function() {

        if (!cabecalho) return;

        if (window.scrollY > 30) {

            cabecalho.style.boxShadow =
                "0 5px 25px rgba(0,0,0,.14)";

        } else {

            cabecalho.style.boxShadow =
                "0 2px 18px rgba(0,0,0,.10)";

        }

    }
);


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        atualizarBanner();

        console.log(
            "MercadoMoto carregado com sucesso."
        );

    }
);
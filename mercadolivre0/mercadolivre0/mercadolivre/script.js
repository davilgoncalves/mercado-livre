/* =========================================================
   MERCADO MOTO - SCRIPT PRINCIPAL
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. CARROSSEL PRINCIPAL DO BANNER
       ===================================================== */

    const imagensBanner = [
        "img/banner1.jpg",
        "img/banner2.jpg",
        "img/banner3.jpg",
        "img/banner4.webp"
    ];

    let indiceBanner = 0;
    let intervaloBanner;

    const imagemBanner = document.getElementById("imagem-banner");
    const indicadores = document.querySelectorAll(".indicador");


    function atualizarBanner() {

        if (!imagemBanner) return;

        imagemBanner.classList.add("troca-banner");

        setTimeout(() => {

            imagemBanner.src = imagensBanner[indiceBanner];

            imagemBanner.onload = () => {
                imagemBanner.classList.remove("troca-banner");
            };

        }, 180);


        indicadores.forEach((indicador, index) => {

            indicador.classList.toggle(
                "ativo",
                index === indiceBanner
            );

        });
    }


    window.avancarImagem = function () {

        indiceBanner++;

        if (indiceBanner >= imagensBanner.length) {
            indiceBanner = 0;
        }

        atualizarBanner();
        reiniciarBanner();
    };


    window.voltarImagem = function () {

        indiceBanner--;

        if (indiceBanner < 0) {
            indiceBanner = imagensBanner.length - 1;
        }

        atualizarBanner();
        reiniciarBanner();
    };


    function iniciarBanner() {

        intervaloBanner = setInterval(() => {

            indiceBanner++;

            if (indiceBanner >= imagensBanner.length) {
                indiceBanner = 0;
            }

            atualizarBanner();

        }, 5000);

    }


    function reiniciarBanner() {

        clearInterval(intervaloBanner);

        iniciarBanner();

    }


    /* =====================================================
       2. INDICADORES DO BANNER
       ===================================================== */

    indicadores.forEach((indicador, index) => {

        indicador.addEventListener("click", () => {

            indiceBanner = index;

            atualizarBanner();

            reiniciarBanner();

        });

    });


    atualizarBanner();
    iniciarBanner();


    /* =====================================================
       3. CARROSSEL DOS PRODUTOS
       ===================================================== */

    const imagensCards = {

        1: [
            "img/banner1.jpg",
            "img/capacete1.jpg",
            "img/capacete2.jpg"
        ],

        2: [
            "img/banner2.jpg",
            "img/ferramentas1.jpg",
            "img/ferramentas2.jpg"
        ],

        3: [
            "img/banner3.jpg",
            "img/luvas1.jpg",
            "img/luvas2.jpg"
        ],

        4: [
            "img/banner4.webp",
            "img/acessorio1.jpg",
            "img/acessorio2.jpg"
        ]

    };


    const cardAtual = {
        1: 0,
        2: 0,
        3: 0,
        4: 0
    };


    function trocarImagemCard(numero, direcao) {

        const imagem = document.getElementById(`foto-card-${numero}`);

        if (!imagem) return;

        const imagens = imagensCards[numero];

        if (!imagens || imagens.length === 0) return;


        cardAtual[numero] += direcao;


        if (cardAtual[numero] >= imagens.length) {
            cardAtual[numero] = 0;
        }


        if (cardAtual[numero] < 0) {
            cardAtual[numero] = imagens.length - 1;
        }


        imagem.style.opacity = "0";


        setTimeout(() => {

            imagem.src = imagens[cardAtual[numero]];

            imagem.style.opacity = "1";

        }, 180);

    }


    window.avancarCard = function (numero) {

        trocarImagemCard(numero, 1);

    };


    window.voltarCard = function (numero) {

        trocarImagemCard(numero, -1);

    };


    /* =====================================================
       4. CRIAÇÃO DAS SETAS DOS CARDS
       ===================================================== */

    function prepararCarrosseisCards() {

        for (let numero = 1; numero <= 4; numero++) {

            const imagem = document.getElementById(`foto-card-${numero}`);

            if (!imagem) continue;


            const container = imagem.parentElement;

            if (!container) continue;


            const area = document.createElement("div");

            area.className = "area-carrossel";


            imagem.parentNode.insertBefore(area, imagem);

            area.appendChild(imagem);


            const setaEsquerda = document.createElement("button");

            setaEsquerda.className = "seta-card esquerda-card";

            setaEsquerda.innerHTML = "‹";

            setaEsquerda.setAttribute(
                "aria-label",
                "Imagem anterior"
            );


            const setaDireita = document.createElement("button");

            setaDireita.className = "seta-card direita-card";

            setaDireita.innerHTML = "›";

            setaDireita.setAttribute(
                "aria-label",
                "Próxima imagem"
            );


            setaEsquerda.addEventListener("click", (event) => {

                event.preventDefault();
                event.stopPropagation();

                voltarCard(numero);

            });


            setaDireita.addEventListener("click", (event) => {

                event.preventDefault();
                event.stopPropagation();

                avancarCard(numero);

            });


            area.appendChild(setaEsquerda);
            area.appendChild(setaDireita);

        }

    }


    prepararCarrosseisCards();


    /* =====================================================
       5. BUSCA
       ===================================================== */

    const campoBusca = document.querySelector(
        'input[type="search"], input[placeholder*="Buscar"], input[placeholder*="buscar"]'
    );


    if (campoBusca) {

        campoBusca.addEventListener("keydown", (event) => {

            if (event.key === "Enter") {

                const termo = campoBusca.value.trim();

                if (termo === "") {

                    mostrarNotificacao(
                        "Digite algo para pesquisar."
                    );

                    return;

                }


                mostrarNotificacao(
                    `Pesquisando por: ${termo}`
                );

            }

        });

    }


    /* =====================================================
       6. BOTÃO VER PRODUTOS
       ===================================================== */

    window.irParaProdutos = function () {

        const produtos = document.querySelector(
            ".ofertas, #produtos, .produtos"
        );


        if (produtos) {

            produtos.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    };


    /* =====================================================
       7. CARRINHO
       ===================================================== */

    let quantidadeCarrinho = 0;


    window.adicionarCarrinho = function () {

        quantidadeCarrinho++;

        atualizarCarrinho();

        mostrarNotificacao(
            "Produto adicionado ao carrinho!"
        );

    };


    function atualizarCarrinho() {

        const contador = document.querySelector(
            ".contador-carrinho"
        );


        if (contador) {

            contador.textContent = quantidadeCarrinho;

            contador.style.transform = "scale(1.3)";


            setTimeout(() => {

                contador.style.transform = "scale(1)";

            }, 200);

        }

    }


    /* =====================================================
       8. NOTIFICAÇÃO
       ===================================================== */

    function mostrarNotificacao(mensagem) {

        let notificacao = document.querySelector(
            ".notificacao-site"
        );


        if (!notificacao) {

            notificacao = document.createElement("div");

            notificacao.className = "notificacao-site";

            document.body.appendChild(notificacao);

        }


        notificacao.textContent = mensagem;

        notificacao.classList.add("mostrar");


        clearTimeout(notificacao.timer);


        notificacao.timer = setTimeout(() => {

            notificacao.classList.remove("mostrar");

        }, 2500);

    }


    /* =====================================================
       9. FAVORITOS
       ===================================================== */

    const botoesFavorito = document.querySelectorAll(
        ".favorito"
    );


    botoesFavorito.forEach((botao) => {

        botao.addEventListener("click", (event) => {

            event.preventDefault();
            event.stopPropagation();


            botao.classList.toggle("favoritado");


            if (botao.classList.contains("favoritado")) {

                botao.innerHTML = "♥";

                mostrarNotificacao(
                    "Produto adicionado aos favoritos!"
                );

            } else {

                botao.innerHTML = "♡";

                mostrarNotificacao(
                    "Produto removido dos favoritos."
                );

            }

        });

    });


    /* =====================================================
       10. CATEGORIAS
       ===================================================== */

    const categorias = document.querySelectorAll(
        ".categoria"
    );


    categorias.forEach((categoria) => {

        categoria.addEventListener("click", () => {

            const nomeCategoria =
                categoria.querySelector("h3, h4, span, p");


            if (nomeCategoria) {

                mostrarNotificacao(
                    `Categoria: ${nomeCategoria.textContent.trim()}`
                );

            }

        });

    });


    /* =====================================================
       11. NEWSLETTER
       ===================================================== */

    const newsletter = document.querySelector(
        ".newsletter form"
    );


    if (newsletter) {

        newsletter.addEventListener("submit", (event) => {

            event.preventDefault();


            const email = newsletter.querySelector(
                'input[type="email"]'
            );


            if (!email) return;


            if (email.value.trim() === "") {

                mostrarNotificacao(
                    "Digite seu e-mail."
                );

                return;

            }


            mostrarNotificacao(
                "E-mail cadastrado com sucesso!"
            );


            email.value = "";

        });

    }


    /* =====================================================
       12. BOTÕES "VER TODOS"
       ===================================================== */

    const botoesVerTodos = document.querySelectorAll(
        ".ver-todos"
    );


    botoesVerTodos.forEach((botao) => {

        botao.addEventListener("click", () => {

            const produtos = document.querySelector(
                ".produtos, .ofertas"
            );


            if (produtos) {

                produtos.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });


    /* =====================================================
       13. BOTÃO EXPLORAR PRODUTOS
       ===================================================== */

    const botoesExplorar = document.querySelectorAll(
        "button"
    );


    botoesExplorar.forEach((botao) => {

        const texto = botao.textContent
            .trim()
            .toLowerCase();


        if (
            texto.includes("explorar produtos") ||
            texto.includes("comprar agora")
        ) {

            botao.addEventListener("click", () => {

                irParaProdutos();

            });

        }

    });


    /* =====================================================
       14. CLIQUE NO CARRINHO
       ===================================================== */

    const carrinho = document.querySelector(
        ".carrinho"
    );


    if (carrinho) {

        carrinho.addEventListener("click", () => {

            if (quantidadeCarrinho === 0) {

                mostrarNotificacao(
                    "Seu carrinho está vazio."
                );

            } else {

                mostrarNotificacao(
                    `Você possui ${quantidadeCarrinho} produto(s) no carrinho.`
                );

            }

        });

    }


    /* =====================================================
       15. MENU DE NAVEGAÇÃO
       ===================================================== */

    const linksNav = document.querySelectorAll(
        "nav a"
    );


    linksNav.forEach((link) => {

        link.addEventListener("click", () => {

            linksNav.forEach((item) => {

                item.classList.remove("ativo");

            });


            link.classList.add("ativo");

        });

    });


    /* =====================================================
       16. ANIMAÇÃO AO ENTRAR NA TELA
       ===================================================== */

    const elementosAnimados = document.querySelectorAll(
        ".categoria, .produto, .beneficio, .depoimento, .destaque"
    );


    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entradas) => {

                entradas.forEach((entrada) => {

                    if (entrada.isIntersecting) {

                        entrada.target.classList.add(
                            "aparecer"
                        );

                        observer.unobserve(
                            entrada.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


        elementosAnimados.forEach((elemento) => {

            observer.observe(elemento);

        });

    }


    /* =====================================================
       17. SOMBRA DO HEADER AO ROLAR
       ===================================================== */

    const header = document.querySelector(
        ".cabecalho"
    );


    window.addEventListener("scroll", () => {

        if (!header) return;


        if (window.scrollY > 20) {

            header.classList.add(
                "header-scroll"
            );

        } else {

            header.classList.remove(
                "header-scroll"
            );

        }

    });


    /* =====================================================
       18. PREVENIR ERROS EM IMAGENS
       ===================================================== */

    const todasImagens = document.querySelectorAll(
        "img"
    );


    todasImagens.forEach((imagem) => {

        imagem.addEventListener("error", () => {

            imagem.style.opacity = "0.5";

        });

    });


    /* =====================================================
       19. FINALIZAÇÃO
       ===================================================== */

    console.log(
        "Mercado Moto iniciado com sucesso!"
    );

});

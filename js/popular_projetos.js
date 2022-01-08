const editorDinamico = document.getElementById("editor-code-dinamico");
let projetoInfo = window.localStorage.getItem("listaProjetos");


function funcoesFerramentas(id){
    let curtida = document.querySelector(".fa-heart");
    curtida.addEventListener("click", function(){
        curtirProjeto(id)
    });

    let comentar = document.querySelector("#realizar-comentario input");
    comentar.addEventListener("click", function(){
        comentarProjeto(id);
    });

    carregarComentario(id);
}
function curtirProjeto(id){
    let curtida = document.querySelector(".curtida");
    curtida = parseInt(curtida.textContent);
    curtida++;
    projetoInfo[id].qntCurtidas = curtida;
    document.querySelector(".curtida").textContent = curtida;
    salvarProjeto()
}


function carregarComentario(id){
    let carregarComentarios = document.querySelector("#carregar-comentarios");

    projetoInfo[id].comentarios.forEach(c => {
        let div = document.createElement("div");
        div.textContent = c;

        carregarComentarios.appendChild(div);
    });
    
}

function comentarProjeto(id){
    let comentario = document.querySelector("#comentar-post");
    let carregarComentarios = document.querySelector("#carregar-comentarios");

    let div = document.createElement("div");
    div.textContent = comentario.value;
    
    projetoInfo[id].comentarios.push(comentario.value);
    
    document.querySelector(".comentarios").textContent = projetoInfo[id].comentarios.length;
    carregarComentarios.appendChild(div);
    salvarProjeto()
}

function salvarProjeto(){
    window.localStorage.removeItem("listaProjetos");

    let novoProjeto = JSON.stringify(projetoInfo);
    window.localStorage.setItem("listaProjetos", novoProjeto);
}

function abrirProjetoEdicao(id){
    editorDinamico.innerHTML = ""; 
    id = parseInt(id);
    
    let editor_editor = document.createElement("section");
    editor_editor.className = "editor-editor";
    editor_editor.style.width = "100%";
  
    let editor_borda = document.createElement("div");
    editor_borda.className = "editor-borda";
    editor_borda.style = ("background-color: "+projetoInfo[id].corBorda);
    

    let back_bolinhas = document.createElement("div");
    back_bolinhas.className = "back-bolinhas";
    back_bolinhas.innerHTML = "<span class='bolinha bolinha-red'></span> <span class='bolinha bolinha-yellow'></span> <span class='bolinha bolinha-green'></span>";

    let pre = document.createElement("pre");
    let editor_code = document.createElement("code");
    editor_code.id = "editor-code";
    editor_code.className = "language-"+projetoInfo[id].personalizacaoCode+" hljs";
    editor_code.setAttribute("contenteditable", "true");

    editor_code.textContent = projetoInfo[id].codigo;
    
    hljs.highlightElement(editor_code);

    pre.appendChild(editor_code);

    editor_borda.appendChild(back_bolinhas);
    editor_borda.appendChild(pre);

    editor_editor.appendChild(editor_borda);

    // -------------------------------------

    let editor_dados = document.createElement("div");
    editor_dados.className = "editor-dados";
    
    let h2 = document.createElement("h2");
    h2.innerText = projetoInfo[id].nomeProjeto;

    let paragrafo = document.createElement("p");
    paragrafo.innerText = projetoInfo[id].descricaoProjeto;

    editor_dados.appendChild(h2);
    editor_dados.appendChild(paragrafo);
    
    // ----------------------------

    let section = document.createElement("section");

    let dados_code = document.createElement("div");
    dados_code.className = "dados-code";

    let spanComentario = document.createElement("span");

    spanComentario.innerHTML = "<i class='fas fa-comment'></i> "+"<span class='comentarios'>"+projetoInfo[id].comentarios.length+"</span>";

    let spanCurtida = document.createElement("span");

    spanCurtida.innerHTML = "<i class='fas fa-heart'></i> "+"<span class='curtida'>"+projetoInfo[id].qntCurtidas+"</span>";

    dados_code.appendChild(spanComentario);
    dados_code.appendChild(spanCurtida);

    section.appendChild(dados_code);

    // -------------------------

    let avatar_dados = document.createElement("div");
    avatar_dados.className = "avatar-dados";
    avatar_dados.innerHTML = `
        <div id="logo-dados"> 
            <img src="./img/header/photo.png" alt="avatar do usuário">
            </div>
        <span id="name">@Harry</span>
    `;
    
    section.appendChild(avatar_dados);

    editor_dados.appendChild(section);

    editor_editor.appendChild(editor_dados);

    // -------------------------------------
    editorDinamico.appendChild(editor_editor);

    // ==========================================

    let content_comentarior = document.createElement("section");
    content_comentarior.id = "content-comentarior"

    let realizar_comentario = document.createElement("section");
    realizar_comentario.id = "realizar-comentario";

    realizar_comentario.innerHTML = "<h2>Faça seu comentário!</h2> <textarea id='comentar-post'></textarea> <input type='button' value='Comentar'>";

    let carregar_comentarios = document.createElement("section");
    carregar_comentarios.id = "carregar-comentarios";

    carregar_comentarios.innerHTML = "<h2> Comentários </h2>";

    content_comentarior.appendChild(realizar_comentario);
    content_comentarior.appendChild(carregar_comentarios);

    editorDinamico.appendChild(content_comentarior);

    funcoesFerramentas(id);
}

function popularProjetos(projetoInfo){
    editorDinamico.innerHTML = "";
    let contador = 0;
    projetoInfo.forEach( p => {
        let editor_editor = document.createElement("section");
        editor_editor.className = "editor-editor";
        editor_editor.id = contador;
        editor_editor.addEventListener("click", function(){
            abrirProjetoEdicao(editor_editor.id);
        });

        let editor_borda = document.createElement("div");
        editor_borda.className = "editor-borda";
        editor_borda.style = ("background-color: "+p.corBorda+";");

        let back_bolinhas = document.createElement("div");
        back_bolinhas.className = "back-bolinhas";
        back_bolinhas.innerHTML = "<span class='bolinha bolinha-red'></span> <span class='bolinha bolinha-yellow'></span> <span class='bolinha bolinha-green'></span>";

        let pre = document.createElement("pre");
        let editor_code = document.createElement("code");
        editor_code.id = "editor-code";
        editor_code.className = "language-"+p.personalizacaoCode+" hljs";
        editor_code.setAttribute("contenteditable", "true");

        editor_code.textContent = p.codigo;
        
        hljs.highlightElement(editor_code);

        pre.appendChild(editor_code);

        editor_borda.appendChild(back_bolinhas);
        editor_borda.appendChild(pre);

        editor_editor.appendChild(editor_borda);

        // -------------------------------------

        let editor_dados = document.createElement("div");
        editor_dados.className = "editor-dados";
        
        let h2 = document.createElement("h2");
        h2.innerText = p.nomeProjeto;

        let paragrafo = document.createElement("p");
        paragrafo.innerText = p.descricaoProjeto;

        editor_dados.appendChild(h2);
        editor_dados.appendChild(paragrafo);
        
        // ----------------------------

        let section = document.createElement("section");

        let dados_code = document.createElement("div");
        dados_code.className = "dados-code";

        let spanComentario = document.createElement("span");

        spanComentario.innerHTML = "<i class='fas fa-comment'></i> "+"<span class='comentarios'>"+p.comentarios.length+"</span>";

        let spanCurtida = document.createElement("span");

        spanCurtida.innerHTML = "<i class='fas fa-heart'></i> "+"<span>"+p.qntCurtidas+"</span>";

        dados_code.appendChild(spanComentario);
        dados_code.appendChild(spanCurtida);

        section.appendChild(dados_code);

        // -------------------------

        let avatar_dados = document.createElement("div");
        avatar_dados.className = "avatar-dados";
        avatar_dados.innerHTML = `
            <div id="logo-dados"> 
                <img src="./img/header/photo.png" alt="avatar do usuário">
             </div>
            <span id="name">@Harry</span>
        `;
        
        section.appendChild(avatar_dados);

        editor_dados.appendChild(section);

        editor_editor.appendChild(editor_dados);

        // -------------------------------------
        editorDinamico.appendChild(editor_editor);
        contador++;
    });
}

function menuMobile(){
    let avatar_alura = document.querySelector(".avatar-alura");
    let editor_menu = document.querySelector(".editor-menu");

    avatar_alura.classList.toggle("avatar-mobile");
    editor_menu.classList.toggle("editor-mobile")
}

if(projetoInfo != null){
    projetoInfo =  JSON.parse(projetoInfo);
    popularProjetos(projetoInfo);
}else{
    editorDinamico.innerHTML = "<h1 style='color: #fff; font-size: 2rem; margin-top: 25px;'>Nenhum projeto</h1>"
}
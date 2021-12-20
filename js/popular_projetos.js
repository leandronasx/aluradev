const editorDinamico = document.getElementById("editor-code-dinamico");
let projetoInfo = window.localStorage.getItem("listaProjetos");


function popularProjetos(projetoInfo){
    editorDinamico.innerHTML = "";
    projetoInfo.forEach( p => {
        let editor = document.createElement("section");
        editor.className = "editor-editor";

        let edBorda = document.createElement("div");
        edBorda.className = "editor-borda";
        edBorda.style = "background-color: "+p.corBorda;

        let bBolinhas = document.createElement("div");
        bBolinhas.className = "back-bolinhas";
        bBolinhas.innerHTML = "<span class='bolinha bolinha-red'></span> <span class='bolinha bolinha-yellow'></span> <span class='bolinha bolinha-green'></span>";

        let pre = document.createElement("pre");
        let textArea = document.createElement("code");
        textArea.name = "editor-code";
        textArea.id = "editor-code";
        textArea.className = "language-"+p.personalizacaoCode+" hljs";
        textArea.textContent = p.codigo;

        edBorda.appendChild(bBolinhas);
        pre.appendChild(textArea);
        edBorda.appendChild(pre);

        editor.appendChild(edBorda);

        // -------------------------------------

        let edDados = document.createElement("div");
        edDados.className = "editor-dados";
        
        let h2 = document.createElement("h2");
        h2.innerText = p.nomeProjeto;

        let para = document.createElement("p");
        para.innerText = p.descricaoProjeto;

        edDados.appendChild(h2);
        edDados.appendChild(para);
        
        let section = document.createElement("section");

        let ddCode = document.createElement("div");
        ddCode.className = "dados-code";

        let spanComentario = document.createElement("span");

        spanComentario.innerHTML = "<i class='fas fa-comment'></i> "+"<span class='comentarios'>"+p.comentarios.length+"</span>";

        let spanCurtida = document.createElement("span");

        spanCurtida.innerHTML = "<i class='fas fa-heart'></i> "+"<span>"+p.qntCurtidas+"</span>";

        ddCode.appendChild(spanComentario);
        ddCode.appendChild(spanCurtida);

        let avatarCode = document.createElement("div");
        avatarCode.className = "avatar-dados";
        avatarCode.innerHTML = " <div id='logo-dados'> <img src='./img/header/photo.png' alt='avatar do usuário' /></div><span id='name'>@Harry</span>";
        
        section.appendChild(ddCode);
        section.appendChild(avatarCode);

        edDados.appendChild(section);

        editor.appendChild(edDados);

        // -------------------------------------

        editorDinamico.appendChild(editor);
    });
}

if(projetoInfo != null){
    projetoInfo =  JSON.parse(projetoInfo);

    popularProjetos(projetoInfo);
    hljs.highlightAll();
}else{
    editorDinamico.innerHTML = "<h1>Nenhum projeto</h1>"
}
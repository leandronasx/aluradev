let corDaBarra = document.getElementById("cor-project");
corDaBarra.value = "#6BD1FF";

corDaBarra.addEventListener("input", function(){
    document.querySelector(".editor-borda").style.backgroundColor = this.value;
});



function retornaProjeto(nome, desc, perso, cor, codigo){
    let estruturaCode = {
        "nomeProjeto": nome,
        "descricaoProjeto": desc,
        "personalizacaoCode": perso,
        "corBorda": cor,
        "qntCurtidas": 0,
        "comentarios": [],
        "codigo": codigo
    }

    return estruturaCode;
} 


function salvarProjeto(){
    let projeto = retornaProjeto(document.getElementById("name-project").value, document.getElementById("descri-project").value, document.getElementById("lang").value,
    document.getElementById("cor-project").value, document.getElementById("editor-code").textContent);

    
    let novoProjeto = window.localStorage.getItem("listaProjetos");
    if(novoProjeto != null){
        novoProjeto =  JSON.parse(novoProjeto);
        novoProjeto.push(projeto);
        window.localStorage.removeItem("listaProjetos");
        novoProjeto = JSON.stringify(novoProjeto)
        window.localStorage.setItem("listaProjetos", novoProjeto);
    }else{
        let novoProjeto = [];
        novoProjeto.push(projeto);
        novoProjeto = JSON.stringify(novoProjeto);
        window.localStorage.setItem("listaProjetos", novoProjeto);
    }

    document.querySelector(".modal-mensagem").style.display = "block";
    document.querySelector(".mensagem").style.right = "0px";

    setInterval(function(){
        document.querySelector(".modal-mensagem").style.display = "none";
        document.querySelector(".mensagem").style.right = "-50%";
    }, 4000);
}


// ==============================================================


function sintaxeLang(){
    let sintaxe = document.getElementById("lang").value;

    let code = document.getElementById("editor-code");
    let codigo = code.innerText;
    code.className = "";
    code.className = "language-"+sintaxe+" hljs";
    code.textContent = codigo;
    hljs.highlightElement(code);
}

let corDaBarra = document.getElementById("cor-project");
corDaBarra.value = "#6BD1FF";

corDaBarra.addEventListener("input", function(){
    document.querySelector(".editor-borda").style.backgroundColor = this.value;
});

let estruturaCode = {
    "nomeProjeto": "",
    "descricaoProjeto": "",
    "personalizacaoCode": "",
    "corBorda": "",
    "qntCurtidas": 0,
    "comentarios": [],
    "codigo": ""
}




function salvarProjeto(){
    estruturaCode.nomeProjeto = document.getElementById("name-project").value;

    estruturaCode.descricaoProjeto = document.getElementById("descri-project").value;

    estruturaCode.personalizacaoCode = document.getElementById("lang").value;

    estruturaCode.corBorda = document.getElementById("cor-project").value;

    estruturaCode.codigo = document.getElementById("editor-code").textContent;

    
    let novoProjeto = window.localStorage.getItem("listaProjetos");
    if(novoProjeto != null){
        novoProjeto =  JSON.parse(novoProjeto);
        novoProjeto.push(estruturaCode);
        window.localStorage.removeItem("listaProjetos");
        window.localStorage.setItem("listaProjetos", JSON.stringify(novoProjeto));
    }else{
        let novoProjeto = [];
        novoProjeto.push(estruturaCode);
        novoProjeto = JSON.stringify(novoProjeto);
        window.localStorage.setItem("listaProjetos", novoProjeto);
    }
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

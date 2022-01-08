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

function modalExport(){
    let modal_export = document.querySelector(".modal-export");
    modal_export.classList.toggle("modal-export-aberto");
}

function menuMobile(){
    let avatar_alura = document.querySelector(".avatar-alura");
    let editor_menu = document.querySelector(".editor-menu");

    avatar_alura.classList.toggle("avatar-mobile");
    editor_menu.classList.toggle("editor-mobile")
}

// ==============================================================

function savePng(){
    var codigo = document.getElementsByClassName("editor-borda")[0];

    domtoimage.toBlob(codigo).then(function (blob) {
        window.saveAs(blob, 'codigo.png');
    });

    modalExport()
}
function saveJpg(){
    var codigo = document.getElementsByClassName("editor-borda")[0];

    domtoimage.toBlob(codigo).then(function (blob) {
        window.saveAs(blob, 'codigo.jpg');
    });

    modalExport()
}
function saveSvg(){
    var codigo = document.getElementsByClassName("editor-borda")[0];

    domtoimage.toBlob(codigo).then(function (blob) {
        window.saveAs(blob, 'codigo.svg');
    });

    modalExport()
}

function saveHtml(){
    let codigo = document.getElementById("editor-code");

    let saveCodigo = new Blob([codigo.textContent], {type: "text/plain;charset=utf-8"});
    saveAs(saveCodigo, "codigo.html");

    modalExport()
}
function saveCss(){
    let codigo = document.getElementById("editor-code");

    let saveCodigo = new Blob([codigo.textContent], {type: "text/plain;charset=utf-8"});
    saveAs(saveCodigo, "codigo.css");

    modalExport()
}
function saveJs(){
    let codigo = document.getElementById("editor-code");

    let saveCodigo = new Blob([codigo.textContent], {type: "text/plain;charset=utf-8"});
    saveAs(saveCodigo, "codigo.js");

    modalExport()
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

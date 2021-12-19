let corDaBarra = document.getElementById("cor-project");
corDaBarra.value = "#6BD1FF";

corDaBarra.addEventListener("input", function(){
    document.querySelector(".editor-borda").style.backgroundColor = this.value;
});
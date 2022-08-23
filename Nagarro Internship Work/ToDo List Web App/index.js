

var button = document.getElementsByTagName("button");
document.addEventListener('keydown', (event) => {
    if(event.key === "Enter"){
        event.preventDefault();
        addItem();
    }
});

function deleteItem(event){
    var divtobeDeleted = event.srcElement.parentElement;
    divtobeDeleted.style.display = "none";
}

function addItem(){
    var inputByUser = document.getElementById("inputItem").value;
    while(inputByUser === ""){
        alert("Task can't be Empty!");
        return;
    }
    document.getElementById("inputItem").value = "";
    var div = document.createElement("div");
    div.setAttribute("class", "item");
    var checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    div.appendChild(checkBox);
    var p = document.createElement("p");
    
    console.log(inputByUser);
    p.innerText = inputByUser;
    div.appendChild(p);

    var i = document.createElement("i");
    i.setAttribute("class", "fa-lg fa-solid fa-circle-xmark");
    i.setAttribute("onclick", "deleteItem(event)");
    div.appendChild(i);
    
    var parentDiv = document.getElementById("addHere");
    var allDivs = document.querySelectorAll(".item");
    parentDiv.insertBefore(div, allDivs[allDivs.length - 1]);
}

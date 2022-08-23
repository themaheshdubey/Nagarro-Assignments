function setAns(){
    var input = document.getElementById("inputsm").value;
    var valueInGrams = parseFloat(input);
    document.getElementById('ans').innerText = (valueInGrams/1000).toString(10);
}
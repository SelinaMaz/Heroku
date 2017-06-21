/*
Aufgabe: 9
Name: Jana Burger
Matrikel: 255076
Datum: 4.6.17
    
Hiermit versichere ich, dass ich diesen Code selbst geschrieben habe.
Er wurde nicht kopiert und auch nicht diktiert. Teile der Aufgabe zusammen mit Jacqueline und Selina erstellt*/
var Form;
(function (Form) {
    window.addEventListener("load", init);
    let eissorten = ["Erdbeere", "Mango", "Himbeere", "Maracuja", "Banane",
        "Apfel", "Zitrone", "Ananas", "Melone"];
    let milchsorten = ["Schokolade", "Vanille", "Haselnuss", "Walnuss", "Joghurt", "Stracciatella", "Pistazie", "Nugat"];
    let toppings = ["Sahne", "Schokosauce", "Erdbeersauce", "Schokostreusel",
        "Gummibaerchen", "Smarties", "kleine Cookies", "bunte Streusel"];
    //    Preise
    let eissortenPrice = 1;
    let toppingPrice = 0.50;
    let fruchtInputs = [];
    let milchInputs = [];
    let topInputs = [];
    let fieldsetTopping;
    let fieldsetEissorte;
    let fieldsetMilchsorte;
    let step = document.createElement("input");
    function init(_event) {
        let fieldsets = document.getElementsByTagName("fieldset");
        let button = document.getElementById("button");
        for (let i = 0; i < fieldsets.length; i++) {
            let fieldset = fieldsets[i];
            fieldset.addEventListener("change", handleChange);
            fieldset.addEventListener("change", showSum);
            button.addEventListener("click", clickButton);
        }
        fieldsetEissorte = document.getElementById("fruchteis");
        fieldsetMilchsorte = document.getElementById("milcheis");
        fieldsetTopping = document.getElementById("toppings");
        for (let i = 0; i < eissorten.length; i++) {
            let input = document.createElement("input");
            let label = document.createElement("label");
            input.setAttribute("type", "number");
            input.setAttribute("value", "0");
            input.min = "0";
            label.innerText = eissorten[i];
            label.appendChild(input);
            fruchtInputs.push(input);
            fieldsetEissorte.appendChild(label);
            input.className = "checkbox";
            console.log(eissorten[i]);
        }
        for (let i = 0; i < milchsorten.length; i++) {
            let input = document.createElement("input");
            let label = document.createElement("label");
            input.setAttribute("type", "number");
            input.setAttribute("value", "0");
            input.min = "0";
            label.innerText = milchsorten[i];
            label.appendChild(input);
            milchInputs.push(input);
            fieldsetMilchsorte.appendChild(label);
            input.className = "checkbox";
            console.log(milchsorten[i]);
        }
        for (let i = 0; i < toppings.length; i++) {
            let input = document.createElement("input");
            let label = document.createElement("label");
            input.setAttribute("type", "checkbox");
            label.innerText = toppings[i];
            label.appendChild(input);
            topInputs.push(input);
            fieldsetTopping.appendChild(label);
            input.className = "toppings";
            console.log(toppings[i]);
        }
    }
    function handleChange(_event) {
        console.log(_event);
        let bestellung = document.getElementById("bestellung");
        bestellung.innerText = "";
        for (let i = 0; i < fruchtInputs.length; i++) {
            if (parseInt(fruchtInputs[i].value) > 0) {
                bestellung.innerText += eissorten[i] + " " + ": " + (parseInt(fruchtInputs[i].value) * 1) + "\n";
            }
        }
        for (let i = 0; i < milchInputs.length; i++) {
            if (parseInt(milchInputs[i].value) > 0) {
                bestellung.innerText += milchsorten[i] + " " + ": " + (parseInt(milchInputs[i].value) * 1) + "\n";
            }
        }
        for (let i = 0; i < topInputs.length; i++) {
            if (topInputs[i].checked) {
                bestellung.innerText += toppings[i] + " " + "\n";
            }
        }
    }
    function showSum(_event) {
        let summe = 0;
        for (let i = 0; i < fruchtInputs.length; i++) {
            summe += parseInt(fruchtInputs[i].value);
        }
        for (let i = 0; i < milchInputs.length; i++) {
            summe += parseInt(milchInputs[i].value);
        }
        for (let i = 0; i < topInputs.length; i++) {
            if (topInputs[i].checked)
                summe += 0.5;
        }
        console.log(summe);
        document.getElementById("sum").innerText = summe.toString() + " �";
    }
    function clickButton(_event) {
        let proof = [];
        for (let i = 0; i < 5; i++) {
            let inputs = document.getElementsByClassName("proof")[i];
            proof.push(inputs);
            console.log(inputs);
        }
        for (let i = 0; i < proof.length; i++) {
            console.log(proof.length);
            if (proof[i].validity.valid == false) {
                alert("Die Eingabe ist nicht korrekt.");
                location.reload();
            }
            else {
                alert("Vielen Dank fuer Ihre Bestellung!");
                location.reload();
            }
        }
    }
})(Form || (Form = {}));
//# sourceMappingURL=eis.js.map
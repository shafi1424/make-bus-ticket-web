// two functions called to create event handler in two buttons of eash type of ticket
form("fcPlusBtn", "fcMinusBtn", "fcTicket", "firstClassPrice");
form("ecoPlusBtn", "ecoMinusBtn", "ecoTicket", "ecoPrice");


// show book successcul page
hideUnhide("book-btn", "form", "success-form");

// go home
hideUnhide("home", "success-form", "form");

// this function takes id of two buttons "+" and "-" to add event handler, ticket amount and price
function form(btnPlus, btnMinus, ticket, price) {


    // this section is for plus button and for adding ticket prices
    document.getElementById(btnPlus).addEventListener("click", function() {
        let ticketAmount = parseFloat(document.getElementById(ticket).value);
        ticketAmount++;
        document.getElementById(ticket).value = ticketAmount;
        let ticketPrice = parseFloat(document.getElementById(price).innerText);
        let subtotal = addAmount("subtotal", ticketPrice);
        vat = (subtotal * parseFloat(document.getElementById("vatPercentage").innerText)) / 100;
        updateAmount("total", subtotal + vat);
        updateAmount("vat", vat)
    })


    //this section is for minus button and for removing ticket prices
    
    document.getElementById(btnMinus).addEventListener("click", function() {
        let ticketAmount = parseFloat(document.getElementById(ticket).value);

        // checks if ticket amount is greater than 0 while removing tickets
        if (ticketAmount >= 1) {
            ticketAmount--;

            //update ticket amount
            document.getElementById(ticket).value = ticketAmount;
            let ticketPrice = parseFloat(document.getElementById(price).innerText);

            //add subtotal amount
            let subtotal = addAmount("subtotal", -1 * ticketPrice);

            //add vat price
            vat = (subtotal * parseFloat(document.getElementById("vatPercentage").innerText)) / 100;
            updateAmount("vat", vat)

            // update total price with vat added
            updateAmount("total", subtotal + vat);
        }

        // if ticket is already 0 and trying to remove more, warns about invalid input
        else {
            alert("Invalid input");
        }
    })
}

// takes a button to track, and two sections to toggle hide and show them
function hideUnhide(btn, hide, unhide) {

    document.getElementById(btn).addEventListener("click", function() {
        const total = parseFloat(document.getElementById("total").innerText);

        // checks if the uesr gave valid ticket counts
        if (total > 0) {
            document.getElementById(hide).style.display = "none";
            document.getElementById(unhide).style.display = "block";

            // when going homepage, clears all the input field
            if (btn == "home") {
                setText0("total");
                setText0("subtotal");
                setText0("vat");
                setValue0("fcTicket");
                setValue0("ecoTicket");
            }
            else {
                document.getElementById("orderFcTicket").innerText = document.getElementById("fcTicket").value;
                document.getElementById("orderEcoTicket").innerText = document.getElementById("ecoTicket").value;
                document.getElementById("orderTotal").innerText = document.getElementById("total").innerText;

            }
        }
        // shows error when both ticket count is 0 and trying to book
        else {
            alert("Please select at least one ticket");
        }
    })
}

//sets the innertext of and id to 0
function setText0(id) {
    document.getElementById(id).innerText = "0";
}

//sets the value of an id to 0
function setValue0(id) {
    document.getElementById(id).value = "0";
}

//add amount to an id with it's previous amount
function addAmount(id, amount) {
    const current = parseFloat(document.getElementById(id).innerText);
    const total = current + amount;
    document.getElementById(id).innerText = total;
    return total;

}

//update amount of an id without adding with it's previous amount
function updateAmount(id, amount) {
    document.getElementById(id).innerText = amount;
}
let hours = document.querySelector(".container").children.length;
let hourbox = document.querySelector(".container");
$(document).on('click', '.saveBtn', saveInput);

function saveInput(event){
    event.stopPropagation();
    var element = $(this).parent().find("textarea").val();
    console.log(element);
    var thiselement = $(this).parent();
    console.log(thiselement);
    thiselement = thiselement.attr("data-state");
    console.log(thiselement + "stored");
    localStorage.setItem(thiselement + "stored", JSON.stringify(element));
}

function init(){
    for (i = 0; i < hours; i++) {
        var hourindex = (i + 9);
        var savedMessage = JSON.parse(localStorage.getItem(hourindex + "stored"));
        console.log(savedMessage);
       $(hourbox).children().eq(i).find("textarea").val(savedMessage);
    }

}

init();
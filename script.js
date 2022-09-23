// Variables used to get the index count of hour containers, as well as the container itself
let hours = document.querySelector(".container").children.length;
let hourbox = document.querySelector(".container");
// Variable for the present time
var today = moment();
// Sets the current day at the top of the screen
$("#currentDay").text(today.format("dddd MMMM Do, YYYY"));

// Function to run the constant time checks
function setTime() {
    // Set an interval of 100 ms, update the variable to the current hour, loop check the current hour vs the hour row's time
    var timerInterval = setInterval(function() {
        var currentHour = today.format("H");
        for (i = 0; i < hours; i++){
            let hourcheck = $(hourbox).children().eq(i).attr("data-state");
            hourcheck = parseInt(hourcheck);
            currentHour = parseInt(currentHour);
            // Changing the class based on the argument of 'Is the current hour less than, greater than, or equal to the hour attribute of each row'
            if(currentHour < hourcheck) {
                $(hourbox).children().eq(i).find("textarea").attr("class", "future col-10");

            }
            else if (currentHour === hourcheck){
                $(hourbox).children().eq(i).find("textarea").attr("class", "present col-10");
            }
            else{
                $(hourbox).children().eq(i).find("textarea").attr("class", "past col-10"); 
            }
        }
    }, 100);
  }
// Delegate save buttons to each time block
$(document).on('click', '.saveBtn', saveInput);

// Gets the data-state time associated with the parent box row, sends the text to storage with a unique tag
function saveInput(event){
    event.stopPropagation();
    var element = $(this).parent().find("textarea").val();
    var thiselement = $(this).parent();
    thiselement = thiselement.attr("data-state");
    localStorage.setItem(thiselement + "stored", JSON.stringify(element));
}
// On page display, load the text from local storage.
function init(){
    for (i = 0; i < hours; i++) {
        var hourindex = (i + 9);
        var savedMessage = JSON.parse(localStorage.getItem(hourindex + "stored"));
       $(hourbox).children().eq(i).find("textarea").val(savedMessage);
    }

}

init();
setTime();


/*
I saw this talk on coding tech "How to think like a programmer". 

One of the big things that spoke to me was this quote
"Comments shouldn't explain your code; code should explain your comments."

I created a mess of code on that last assignment that made it difficult to follow or grade. 

This time around I am going to pseudocode each section to make things easier 
to read by non-authors.
*/

//Our topics array will hold all search strings/button labels.
var topics = [
  "Thundercats",
  "He  Man",
  "Voltron",
  "Dragon Ball",
  "Transformers"
];

//This button div will hold all buttons that we generate.
var buttonDiv = $("#buttonDiv");

//this function will handle creation of buttons.
function generateButtons() {
  //clear all current buttons(as to not generate duplicates)
  $(buttonDiv).empty();
  //loop through every string contained in array topics
  for (i = 0; i < topics.length; i++) {
    console.log(topics[i]);
    //create a button using the value of the current index
    var createButton = $("<button></button>", {
      type: "button",
      //& label it with the text of the current string
      text: topics[i],
      //also give it an ID of button+the index number.
      id: "button" + i,
      //btn-spacing was added to our css to space out each button
      class: "btn btn-info btn-spacing",
      value: topics[i]
    });
    //insert the generated button into the div we created to hold the buttons
    $(buttonDiv).append(createButton);
  }
  //remove text from search box after completing button add
  $("#searchBox").val("");
}
//We have to tell our button to take the value of the text input once clicked....
$("#submitButton").on("click", function() {
  //stop the form from asking for total page reload
  event.preventDefault();
  //append the user defined string into the array at the last(greatest) index.
  //ot will also remove uneeded whitepace from the front and back of the stsring.
  topics.push(
    $("input[name=search]")
      .val()
      .trim()
  );
  //function call will replace /regenerate buttons we deleted earlier and
  //will add the button we made using the text input field.
  generateButtons();
});
//this function call will generate the buttons the user sees at page load.
generateButtons();

//Found solution for syntax here.http://jsfiddle.net/o4fyqvk7/
//selects buttons in button div "buttonDiv" and queries using their value
$("#buttonDiv").on("click", "button", function() {
  giphyAPICall($(this).val());
});

function giphyAPICall(query) {
  var url =
    "https://api.giphy.com/v1/gifs/search?api_key=ZUudWxxOOtymCzKktG3lHi5D88JFvLfQ&q=" +
    query +
    "&limit=25&offset=0&lang=en";
  console.log(url);
  $.get(url).then(function(response) {
    var responseLocal = response;
    console.log(responseLocal);
    console.log(query);
  });
}

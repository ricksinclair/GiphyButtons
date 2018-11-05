/*
I saw this talk on coding tech "How to think like a programmer". 

One of the big things that spoke to me was this quote
"Comments shouldn't explain your code; code should explain your comments."

I created a mess of code on that last assignment that made it difficult to follow or grade. 

This time around I am going to pseudocode each section to make things easier 
to read by non-authors.
*/
//this will tell me the item number for each picture/card
var count = 0;
//this will be the actual offset that gives us the different pages.
var offset = 0;
//i will keep a count of each page. i will multiply i by 25 to get the offset
var i = 0;
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
  for (y = 0; y < topics.length; y++) {
    console.log(topics[y]);
    //create a button using the value of the current index
    var createButton = $("<button></button>", {
      type: "button",
      //& label it with the text of the current string
      text: topics[y],
      //also give it an ID of button+the index number.
      id: "button" + y,
      //btn-spacing was added to our css to space out each button
      class: "btn btn-info btn-spacing",
      value: topics[y]
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
  i++;

  var url =
    "https://api.giphy.com/v1/gifs/search?api_key=ZUudWxxOOtymCzKktG3lHi5D88JFvLfQ&q=" +
    query +
    "&limit=50&offset=" +
    offset +
    "&lang=en";
  console.log(url);
  $.get(url).then(function(response) {
    //not sure if its redundant to declare the variable or not, but i did
    var responseLocal = response;
    var results = responseLocal.data;
    console.log(responseLocal);
    console.log(query);
    console.log("i is: " + i);
    var div = $("<div>", { id: i, class: "container row" });
    $("#results").prepend(div);

    for (x = 0; x < 50; x++) {
      count++;
      console.log(
        "index of current object Array is: " +
          x +
          " Title is:" +
          results[x].title
      );
      var picture = results[x].images.original_still.url;

      //yes, i did this in one append call.

      $("#" + i).append(
        "<div id=card" +
          count +
          "><img class=card-img-top id=picture" +
          count +
          " src=" +
          picture +
          "></img><div class=card-body><h2 id=title" +
          count +
          ">  " +
          results[x].title +
          "</h2> <p class=card-text id=rating" +
          count +
          "> Rating: " +
          results[x].rating +
          "</p>   <p id=itemnumber" +
          count +
          ">  RESULT#" +
          count +
          "</p></div></div> "
      );

      $("#card" + count + "").attr(
        "class",
        "card col-sm-6 text-center d-block mx-auto"
      );
      $("#title" + count + "").attr("class", "col-12 card-title");
      $("#picture" + count + "").attr("class", "card-img-top");

      $("#itemnumber" + count + "").attr("class", "col-12 card-text");
      $("#year" + count + "").attr("class", "col-12 card-text");
    }
    $("#" + i + "").append("<h5>PAGE: " + i + "</h5>");
  });
  offset = i * 25;
}

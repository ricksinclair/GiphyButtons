/*
I saw this talk on coding tech "How to think like a programmer". 

One of the big things that spoke to me was this quote
"Comments shouldn't explain your code; code should explain your comments."

I created a mess of code on that last assignment that made it difficult to follow or grade. 

This time around I am going to pseudocode each section to make things easier 
to read by non-authors.


known issues
===========


*/

//I added this variable in an attempt to stop the on click funtion of the buttons
//from looping twice on user created buttons(corresponding code around lines 64&68). unfortunately the behaviour persists.
var clickCount = 0;
//this will tell me the item number for each picture/card
var count = 0;
//this will be the actual offset that gives us the different pages.
var offset = 0;
//i will keep a count of each page. i will multiply i by 25 to get the offset
var i = 0;
//Our topics array will hold all search strings/button labels.
var topics = ["akira", "dragon ball z", "thunder cats", "voltron"];

//declare these to catch URL values for still and for
var pictureAnimated = [];
var picture = [];
//needed this to be global
var x;
//this array will track animation for each image
var animated = [];

//This button div will hold all buttons that we generate.
var buttonDiv = $("#buttonDiv");
var previousQuery = "firstrun";

//this function will handle creation of buttons.
function generateButtons() {
  //Found solution for syntax here.http://jsfiddle.net/o4fyqvk7/
  //selects buttons in button div "buttonDiv" and queries using their value

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
  //it will also remove redundant whitepace from the front and back of the stsring.
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

function giphyAPICall(query) {
  offset = i * 10;

  var url =
    "https://api.giphy.com/v1/gifs/search?api_key=ZUudWxxOOtymCzKktG3lHi5D88JFvLfQ&q=" +
    query +
    "&limit=10&offset=" +
    offset +
    "&lang=en";
  console.log(url);
  $.get(url).then(function(response) {
    //not sure if its redundant to declare the variable or not, but i did
    var responseLocal = response;
    var results = responseLocal.data;

    //lets verify things before moving forward
    console.log(responseLocal);
    console.log(query);
    console.log("i is: " + i);
    var div = $("<div>", { id: i, class: "container row" });

    $("#results").prepend(div);
    //this will get us 10 results at a time, leaving us with plenty of images and
    //an even layout.
    for (x = 0; x < 10; x++) {
      count++;

      //this adds all still urls into an array
      picture.push(results[x].images.original_still.url);

      //this adds all animated urls into an array
      pictureAnimated.push(results[x].images.original.url);

      //yes, i constructed the cards in 1 append call.

      $("#" + i).append(
        "<div id=card" +
          count +
          "><img class=card-img-top id=picture" +
          count +
          " src=" +
          picture[count - 1] +
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
          "</p></div> "
      );

      $("#card" + count + "").attr(
        "class",
        "card col-sm-6 text-center d-block mx-auto"
      );
      $("#title" + count + "").attr("class", "col-12 card-title");
      $("#picture" + count + "").attr("class", "card-img-top giphy");

      //confirm things are incrementing.
      console.log(pictureAnimated);

      //this  arrray stores the animated url corresponding the the picture
      $("#picture" + count + "").attr(
        "pictureAnimated",
        pictureAnimated[count - 1]
      );
      $("#picture" + count + "").attr("index", count - 1);

      //this  arrray stores the still url corresponding the the picture
      $("#picture" + count + "").attr("picture", picture[count - 1]);

      //this tracks and sets default data state
      $("#picture" + count + "").attr("data-state", "still");

      //tracks the result number of each image and the rating
      $("#itemnumber" + count + "").attr("class", "col-12 card-text");
      $("#rating" + count + "").attr("class", "col-12 card-text");
    }
    $("#card" + count + "").after("<h5>PAGE: " + parseInt(i + 1) + "</h5>");
    i++;
  });
  console.log("offset is: " + offset);
}

$("#buttonDiv").on("click", "button", function() {
  clickCount++;
  console.log("click! Click count is: " + clickCount);

  if (previousQuery == $(this).val() || previousQuery == "firstrun") {
    console.log("this is the first run or queries are the same");
    //this will help us increment the pictures only when is the same query, otherwise it'll fetch for a new count.
    giphyAPICall($(this).val());
    clearClickAct();
  }

  //make the results variables reset if the same button isn't pressed
  else if (previousQuery !== $(this).val() && previousQuery !== "firstrun") {
    $("#results").empty();

    console.log("queries are not the same");
    clickCount = 0;
    console.log("click count reset to zero");
    count = 0;
    offset = 0;
    i = 0;
    picture = [];
    pictureAnimated = [];

    giphyAPICall($(this).val());
    console.log("query is: " + $(this).val());
    clearClickAct();
  }
  console.log("previous query is: " + previousQuery);
  previousQuery = $(this).val();
});

// had to create this function for each time I updated to the page to "clear" the click events and stop them from incrementing.

function clearClickAct() {
  $(document).off("click", ".giphy");

  $(document).on("click", ".giphy", function() {
    var state = $(this).attr("data-state");
    //used this to determine if click event was broken..it was because I didn't clear the event and reload it after every new page was generated.

    console.log("click!");

    //if the state is still change it to
    animated;
    if (state === "still") {
      $(this).attr("src", $(this).attr("pictureanimated"));
      $(this).attr("data-state", "animated");
      //or if the state is animated, change it to still.
    } else if (state === "animated") {
      $(this).attr("src", $(this).attr("picture"));
      $(this).attr("data-state", "still");
    }
    console.log($(this).attr("data-state"));
  });
}

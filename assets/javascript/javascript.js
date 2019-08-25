

// Array of Topics to use for Buttons
var topics = ["Superman", "Batman", "Green Lantern", "Aquaman", "Wonder Woman", "Cyborg", "Green Arrow", "The Flash"]

// RGB FX on "Add your own super heroes"
var speed = 80

if (document.all || document.getElementById) {
	document.write('<form id="cartoon-form"></form>')
	var storetext = document.getElementById ? document.getElementById("cartoon-form") : document.all.highlight
}
else
	document.write(text)
var hex = new Array("00", "14", "28", "3C", "50", "64", "78", "8C", "A0", "B4", "C8", "DC", "F0")
var r = 1
var g = 1
var b = 1
var seq = 1
function changetext() {
	rainbow = "#" + hex[r] + hex[g] + hex[b]
	storetext.style.color = rainbow
}

// color changing sequence
function change() {
	if (seq == 6) {
		b--
		if (b == 0)
			seq = 1
	}
	if (seq == 5) {
		r++
		if (r == 12)
			seq = 6
	}
	if (seq == 4) {
		g--
		if (g == 0)
			seq = 5
	}
	if (seq == 3) {
		b++
		if (b == 12)
			seq = 4
	}
	if (seq == 2) {
		r--
		if (r == 0)
			seq = 3
	}
	if (seq == 1) {
		g++
		if (g == 12)
			seq = 2
	}
	changetext()
}
function starteffect() {
	if (document.all || document.getElementById)
		flash = setInterval("change()", speed)
}
starteffect()
//end of rgb sequence


// Giphy API
function displayTopicInfo() {
	var superHeroes = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=JbAze3Bq2K81GsPhzV1gSBiyZyA2vR38&q=" + superHeroes + "&limit=10&offset=0&rating=PG-13&lang=en";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function (response) {
		//sets the Length for the next loop
		var results = response.data;
		//Clear Previous images
		$("#cartoons").empty();
		// Create For Loop here to show multiple Giphy Responses
		for (var i = 0; i < results.length; i++) {

			//Creating a Div for Topic
			var topicDiv = $("<div class='heroes'>");
			// Storing the rating data in variable
			var rating = response.data[i].rating;
			// Creating Element to display rating 
			var pRate = $("<p>").text("Rating: " + rating);
			// Adding Rating to Topic Div
			topicDiv.append(pRate);
			// Variable to hold still image from from Giphy
			var giphyImgStill = response.data[i].images.downsized_still.url;
			// Variable to hold motion image from Giphy
			var giphyImgMotion = response.data[i].images.downsized.url;
			// Create Image Element
			var image = $("<img>").attr("src", giphyImgStill);
			//update image with more attributes
			image.attr("data-still", giphyImgStill);
			image.attr("data-animate", giphyImgMotion);
			image.attr("data-state", "still");
			image.attr("id", "img" + i)
			//Give images a class
			image.addClass("giphyImages");
			// Appending the Image
			topicDiv.prepend(image);
			// Write Topic Div to HTML document
			$("#cartoons").prepend(topicDiv);
		}
	})
}

function renderButtons() {
	// Clears CartoonButtons Div
	$("#cartoonButtons").empty();

	// Looping through topics
	for (var i = 0; i < topics.length; i++) {
		// Code to Dynamically Generate Buttons for each Topic in topics array
		var a = $("<button>");
		// Adding a class of Topic to our Button
		a.addClass("topic");
		// Adding a class for styling
		a.addClass("btn btn-lg");
		// Adding a data-attribute
		a.attr("data-name", topics[i]);
		// adding attr for Bootstrap
		a.attr("type", "button");
		// Button Text
		a.text(topics[i]);
		// Adding the Button to the Buttons Div
		$("#cartoonButtons").append(a);
	}
}

// This function handles events where a Topic button is clicked
$("#addCartoon").on("click", function (event) {
	event.preventDefault();
	// This line grabs the input from the textbox
	var topic = $("#cartoon-input").val().trim();
	// Adding movie from the textbox to our array
	topics.push(topic);
	// Clear the form field for next addition
	$("form").trigger("reset")
	// Calling renderButtons which handles the processing of our movie array
	renderButtons();
});

// Adding a click event listener to all elements with a class of "topic"
$(document).on("click", ".topic", displayTopicInfo);
// Calling the renderButtons function to display the intial buttons
renderButtons();



// Add a listener for all elements with class of "gif"
$(document).on("click", ".giphyImages", flipAnimate);



function flipAnimate() {
	var item = $(this).attr("id");
	item = "#" + item;
	// console.log(item);
	var state = $(item).attr("data-state");
	// console.log(state);
	if (state === "still") {
		$(item).attr("src", $(item).attr("data-animate"));
		$(item).attr("data-state", "animate");
		// console.log(this);
	} else {
		$(item).attr("src", $(item).attr("data-still"));
		$(item).attr("data-state", "still");
		// console.log(this);
	};
};


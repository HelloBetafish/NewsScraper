// Whenever someone clicks a p tag
$(document).on("click", ".viewComments", function() {
  // Empty the comments from the comment section
  $("#comments").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the comment information to the page
    .done(function(data) {
      console.log(data);
      // The title of the article
      $("#comments").append("<h4>Add a comment:</h4>");
      // An input to enter a new title
      $("#comments").append("<input id='titleinput' name='title' >");
      // A textarea to add a new comment body
      $("#comments").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new comment, with the id of the article saved to it
      $("#comments").append("<button data-id='" + data._id + "' id='saveComment'>Save Comment</button>");

      // If there's a comment in the article
      if (data.comments) {
        for (var i = 0; i < data.comments.length; i++) {
    // Display the comments information on the page
          $("#comments").prepend("<div class='card text-center'><div class='card-block'><h4 class='card-header'>" +
            data.comments[i].title + "</h4><p class='card-text'>" + data.comments[i].body + "</p>" +
          "<a href='#' class='delete' data-commentID='" + data.comments[i]._id + 
          "' class='btn btn-danger'>Delete</a></div></div>"
          );
        }
      }
  });
});

// When you click the saveComment button
$(document).on("click", "#saveComment", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  console.log(thisId);
  var Title = $("#titleinput").val();
  var Body = $("#bodyinput").val();
  console.log(Title + " " + Body);

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: Title,
      // Value taken from note textarea
      body: Body
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      location.reload();
    });

  $("#titleinput").val("");
  $("#bodyinput").val("");
});

// When you click the scrape button
$(document).on("click", "#scrape", function() {
  // Run a GET request to change the note, using what's entered in the inputs
  $.ajax({
    method: "GET",
    url: "/scrape"
  }).done(function() {
      // Log the response
      console.log("Scrape Complete");
      // Empty the notes section
      location.reload();
    });
});

  $(".delete").on("click", function(event) {
    var id = $(this).attr("data-commentID");

    // Send the DELETE request.
    $.ajax("/comments/" + id, {
      type: "DELETE",
      }).then(
        function() {
          console.log("deleted comment: ", id);
        // Reload the page to get the updated list
        location.reload();
      });
  });
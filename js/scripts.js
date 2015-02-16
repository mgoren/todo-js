$(document).ready(function() {
  $("form#new-place").submit(function(event) {
    event.preventDefault();
    $("#show-place").hide();

    var location = $("input#location").val();
    var dates    = $("input#dates").val();
    var notes    = $("input#notes").val();

    var newPlace = { location: location, dates: dates, notes: notes };

    $("ul#places").append("<li id='" + newPlace.location + "'><span class='place'>" + newPlace.location + "</span></li>");

    $("input#location").val("");
    $("input#dates").val("");
    $("input#notes").val("");
    $(".deletable").empty();

    $(".place").last().click(function() {
      $("#show-place").show();
      $("#show-place h2").text(newPlace.location);
      $(".deletable").html("<span class='delete'> [x]</span>");
      $(".dates").text(newPlace.dates);
      $(".notes").text(newPlace.notes);
      $(".delete").click(function() {
        $("#show-place").hide();
        $("li#" + newPlace.location).remove();
      });

    });

  });
});

$(document).ready(function() {
  $("form#new-place").submit(function(event) {
    event.preventDefault();

    var location = $("input#location").val();
    var dates    = $("input#dates").val();
    var notes    = $("input#notes").val();

    var newPlace = { location: location, dates: dates, notes: notes };

    $("ul#places").append("<li><span class='place'>" + newPlace.location + "</span></li>");

    $("input#location").val("");
    $("input#dates").val("");
    $("input#notes").val("");

    $(".place").last().click(function() {
      $("#show-place").show();
      $("#show-place h2").text(newPlace.location);
      $(".dates").text(newPlace.dates);
      $(".notes").text(newPlace.notes);
    });

  });
});

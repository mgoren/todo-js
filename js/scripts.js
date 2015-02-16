$(document).ready(function() {
  var togglePages = function() {
    $(".lists-page").toggle();
    $(".tasks-page").toggle();
  }


  $("form#new-list").submit(function(event) {
    event.preventDefault();

    var listName = $("input#list-name").val();
    var newList = { listName: listName };
    $("input#list-name").val("");
    $(".deletable").empty();

    var listID = $(".list").last().parent().attr('id');
    if(listID === undefined) {listID = "list_0";}
    listID = listID.slice(5);
    listID++;

    $("ul#lists").append("<li id='list_" + listID + "'><a href='#' class='list'>" + newList.listName + "</a></li>");

    $(".list").last().click(function() {
      togglePages();
      $("#list-tasks h2").text(newList.listName);
      $(".deletable").html(" <span class='delete glyphicon glyphicon-remove-sign'></span>");
      $(".delete").click(function() {
        togglePages();
        $("ul#tasks").empty();
        $("li#list_" + listID).remove();
      });
    });
  });


  $("form#new-task").submit(function(event) {
    event.preventDefault();

    var taskName = $("input#task-name").val();
    var newTask = { taskName: taskName };
    $("input#task-name").val("");

    var taskID = $(".task").last().parent().attr('id');
    if(taskID === undefined) {taskID = "task_0";}
    taskID = taskID.slice(5);
    taskID++;

    $("ul#tasks").append("<li id='task_" + taskID + "'><span class='complete glyphicon glyphicon-unchecked'></span> <span class='task'>" + newTask.taskName + "</span></li>");

    $("ul#tasks li#task_" + taskID).click(function() {
      $("ul#tasks li#task_" + taskID + " span.complete").toggleClass("glyphicon-unchecked");
      $("ul#tasks li#task_" + taskID + " span.complete").toggleClass("glyphicon-check");
    });

  });


  $("#back").click(function() {
    $("ul#tasks").empty();
    togglePages();
  });

});

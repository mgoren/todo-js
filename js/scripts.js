$(document).ready(function() {

  var togglePages = function() {
    $(".lists-page").toggle();
    $(".tasks-page").toggle();
  }

  var idGenerator = function(ilk) {
    var id = $("." + ilk).last().parent().attr('id');
    if(id === undefined) {id = ilk + "_0";}
    id = id.slice(5);
    id++;
    return id;
  }

  var changeState = function(task) {
    $("#tasks #task_" + task.taskID + " .complete").toggleClass("glyphicon-unchecked");
    $("#tasks #task_" + task.taskID + " .complete").toggleClass("glyphicon-check");
    task.complete ? task.complete = false : task.complete = true;
  }

  $("#back").click(function() {
    $("#tasks").empty();
    togglePages();
  });



// CREATE LIST

  $("#new-list").submit(function(event) {
    event.preventDefault();

    var listName = $("#list-name").val();
    var listID = idGenerator("list");
    var list = { listName: listName, tasks: [], listID: listID };

    $("#lists").append("<li id='list_" + listID + "'><a href='#' class='list'>" + list.listName + "</a></li>");

    $(".list").last().click(function() {
      togglePages();
      $("#list-tasks h2").text(list.listName);
      $(".deletable").html(" <span class='delete glyphicon glyphicon-remove-sign'></span>");
      $(".delete").click(function() {
        togglePages();
        $("#tasks").empty();
        $("#list_" + listID).remove();
      });

      // list tasks for this list
      list.tasks.forEach(function(task) {
        $("#tasks").append("<li id='task_" + task.taskID + "'><span class='complete glyphicon'></span> <span class='task'>" + task.taskName + "</span></li>");
        if (task.complete) {
          $("#tasks #task_" + task.taskID + " .complete").addClass("glyphicon-check");
        } else {
          $("#tasks #task_" + task.taskID + " .complete").addClass("glyphicon-unchecked");
        }

        $("#tasks #task_" + task.taskID).click(function() {
          changeState(task);
        });
      });

      // CREATE TASK

      $("#new-task").off(); // Unbind stuff so that form isn't bound to multiple lists simultaneously.
      $("#new-task").submit(function(event) {
        event.preventDefault();

        var taskName = $("#task-name").val();
        var taskID = idGenerator("task");
        var task = { taskName: taskName, taskID: taskID, complete: false };

        $("#tasks").append("<li id='task_" + taskID + "'><span class='complete glyphicon glyphicon-unchecked'></span> <span class='task'>" + task.taskName + "</span></li>");

        $("#tasks #task_" + taskID).click(function() {
          changeState(task);
        });

        $("#task-name").val("");

        list.tasks.push(task);
      });

    });

    $("#list-name").val("");
    $(".deletable").empty();
  });

});

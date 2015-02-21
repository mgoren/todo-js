$(document).ready(function() {

  // CREATE LIST

  $("#new-list").submit(function(event) {
    event.preventDefault();
    $("#list-display").show();

    var listName = $("#list-name").val();
    $("#list-name").val("");
    var listID = idGenerator("list");
    var list = { listName: listName, listID: listID, tasks: [] };

    $("#lists").append("<h5><li id='list_" + listID + "' class='list'><span class='clickable'>" + list.listName + "</span><span class='deletable'></span></li></h5>");

    $("#list_" + list.listID).hover(function(event) {
      $(this).find('.deletable').html("<span class='delete'><i class='fa fa-times'></i></span>");
    }, function(event) {
      $(this).find(".delete").remove();
    });

    $(".list").last().find(".deletable").click(function() {
      if (confirm("delete " + list.listName + " list?")) {
        $(".tasks-page").hide();
        $("#tasks").empty();
        $(this).parent().remove();
      }
    });

    $(".list").last().find(".clickable").click(function() {

      $("#tasks").empty();
      $(".tasks-page").show();
      $("#list-tasks h2").text(list.listName);

      // list tasks for this list
      list.tasks.forEach(function(task) {
        if (task.complete) {
          $("#tasks").append("<li id='task_" + task.taskID + "' class='task'><h5><span class='complete glyphicon glyphicon-check'></span> " + task.taskName + "</h5></li>");
        } else {
          $("#tasks").append("<li id='task_" + task.taskID + "' class='task'><h5><span class='complete glyphicon glyphicon-unchecked'></span> " + task.taskName + "</h5></li>");
        }

        $("#task_" + task.taskID).click(function() {
          changeState(task)
        });
        
      });

      // CREATE TASK

      $("#new-task").off(); // Unbind stuff so that form isn't bound to multiple lists simultaneously.
      $("#new-task").submit(function(event) {
        event.preventDefault();

        var taskName = $("#task-name").val();
        $("#task-name").val("");
        var taskID = idGenerator("task");
        var task = { taskName: taskName, taskID: taskID, complete: false };

        $("#tasks").append("<li id='task_" + taskID + "' class='task'><h5><span class='complete glyphicon glyphicon-unchecked'></span> " + task.taskName + "</h5></li>");

        $("#task_" + task.taskID).click(function() {
          changeState(task);
        });

        list.tasks.push(task);

        //--------- TMP FOR DEBUG -------------------
        $("#debug").click(function() {debugger;})
        //-------------------------------------------

      });

    });
  });

});

var idGenerator = function(ilk) {
  var id = $("." + ilk).last().attr('id');
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
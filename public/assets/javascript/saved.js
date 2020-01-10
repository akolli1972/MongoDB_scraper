$(document).ready(function() {
  var articleContainer = $(".article-container");

  $(document).om("click", ",btn.delete", handleArticleDelete);
  $(document).om("click", ",btn.notes", handleArticleNotes);
  $(document).om("click", ",btn.save", handleNoteSave);
  $(document).om("click", ",btn.note-delete", handleNoteDelete);

  initPage();
  function initPage() {
    articleContainer.empty();
    $.get("/api/headlines?saved=true").then(function(data) {
      if (data && data.length) {
        renderArticles(data);
      } else {
        renderEmpty();
      }
    });
  }
  function renderArticles(articles) {
    var articlePanels = [];
    for (var i = 0; i < articles.length; i++) {
      articlePanels.push(createPanel(articles[i]));
    }
  }
});
function createPanel(article){
 var panel =
 $(["div class='panel panel-default'>",
    "<div class = 'panel-heading'>",
    "<h3>",
    article.headline,
    "<a class = 'btn btn-danger delete'>",
    "Delete from Saved",
    "</a>",
    "<a class='btn btn-info notes'>Article Notes</a>",
    "</h3>",
    "</div>",
    "</div class ='panel-body'>",
    article.summary,
    "</div>",
    "</div>"
].join(""));

panel.data("_id", article.Iid);
return panel;
}


function renderEmpty(){
    varemptyAlert = 
    $(["<div class ='alert alert-warning text-center'>",
    "<h4>Uh oh, looks like we don't have any saved articles.</h4>",
    "</div>",
    "<div class ='panel panel=default'>",
    "<div class='panel panel-defaut'>",
    "<h3>Would you like to Browse Avialbale Articles?</h3>",
    "</div>",
    "</div>"
].join(""));
articleContainer.append(emptyAlert);
}
 function renderNotesList(data){
     var notesToRender = [];
     var currentNote;
     if (!data.notes.length) {
         currentNote = [
           "<li class='list-group-item'>",
           "No notes for this article yet.",
           "</li>"
         ].join(""));
         currentNote.children("button").data("_id", data.notes[i])._id);
         notesToRender.push(currentNote);
        }
        $(".note-container").append(notesToRender);
     }
 

 function handleArticleDelete(){
   var articleToDelete = $(this).parents(".panel").data();
   $.ajax({
     method:"DELETE",
     url: "/api/headlines/" + articleToDelete._id
   }).then(function(data){
     if (data.ok){
       initPage();
     }
   });
   
   })

   function handleArticleNotes() {
     var currentArticle = $(this).parents(".panel").data();
     $.get("/api/notes/" + currentArticle._id).then(function(data){
       var modalText = [
        "<div class='container-fluid tect-center'>",
        "<h4>Notes for Articles: ",
        currentArticle._id,
        "</h4>",
        "</hr />",
        "ul class=List-group note=container'>",
        "</ul>",
        "<textarea placeholder=New Note' rows-'4' cols='60'></textarea>",
        "<button class='btn btn-success save'>Save Note</button>",
        "</div>"
       ].join("");
       bootbox.dialog({
         message:modalText,
         closeButton:true
       });
       var noteData = {
         _id: currentArticle._id,
         notes: data || []
       };

       $(".btn.save").data("article", noteData);
       renderNotesList(noteData);
      });
    }

    function handleNoteSave(){
      var noteData;
      var newNote = $(".bootbox-body textarea").val().trim();

      if(newNote){
        noteData = {
          _id: $(this).data("article")._id,
          noteText: newNote
        };
        $.post("/api/notes", noteData).then(function(){
          bootbox.hideAll();
        });

      }
      }
    
      function handleNoteDelete(){
        var noteToDelete = $(this).data("_id");
        $.ajax({
          url: "/api/notes/" + noteToDelete,
          method: "DELETE"
        }).then(function(){
          bootbox.hideAll();
        });
      }
      













       

       

       
     
   

   
 
/* Note Taker (18.2.6)
 * front-end
 * ==================== */

// Loads results onto the page

  // Empty any results currently on the page
 

 
  // Grab all of the current notes
  $.getJSON("/populatedArticles", function(data) {
    // For each note...
    for (var i = 0; i < data.length; i++) {

      if (data[i].note){
        
        console.log(data[i]);


      
      // ...populate #results with a p-tag that includes the note's title and object id
      $("#results").prepend(`<div class="card m-5" data-id=" 
      ${data[i]._id} style="width: 50rem;"  >
     
      <div class="card-body">
      <h5 class="card-title" ">${data[i].title}</h5>
        <p class="card-text" >${data[i].body}<br></p>
        <div id ="will${data[i]._id}"> <div>
      </div>
        <p class="card-text" ">
        <div class="comments ${data[i]._id}" >
        <form><div class="form-group m-3">
    <label for="exampleFormControlTextarea1">Leave a Comment</label>
    <textarea class="form-control"    id='body' rows="3"></textarea>
  </div>
  
  <button class="btn btn-primary m-auto create" data-id="${data[i]._id}" >Submit</button>
</form>
</div><div>
        </div>
 <button type="submit" id="${data[i]._id}" class="btn btn-primary makenew"   >Comment</button>
      </div>
    
      
    `)}

    else{ $("#results").prepend(`<div class="card m-5" data-id=" 
     ${data[i]._id} style="width: 50rem;"  >
  
    <div class="card-body">
    <h5 class="card-title" ">${data[i].title}</h5>
      <p class="card-text" ">${data[i].body}</p>
      <p class="card-text" ">
      <div class="comments ${data[i]._id}" >
       <form><div class="form-group m-3">
   <label for="exampleFormControlTextarea1">Leave a Comment</label>
   <textarea class="form-control"    id='body' rows="3"></textarea>
 </div>

 <button class="btn btn-primary m-auto create" data-id="${data[i]._id}" >Submit</button>
 </form>
 </div><div>
       </div>
 <button type="submit" id="${data[i]._id}" class="btn btn-primary makenew"   >Comment</button>
     </div>
    `)}
     console.log(data);}
   })
    
    .then(function(data) {
      console.log(data);
      $(".comments").hide();
  });
 

    $(document).on("click", ".makenew", function() {
    console.log("hey");
     name = this.id;
     console.log(name);
     $(`.${name}`).show();
    });
// Runs the getResults function as soon as the script is executed
$(document).on("click", "#new", function() {
  $.ajax({
    type: "GET",
    url: "/scrape/"
  
  }).then(function(data){

  // window.location.reload();
  })
})

$(document).on("click", ".reate", function() {
  
event.preventDefault();
   var thisId = $(this).attr("data-id");
  $.ajax({
     
       method: "GET",
    url: "/articles/" + thisId
  
  }).then(function(data){
console.log(data);
$("#oldcomments").prepend(`${data.note.body}`);
  // window.location.reload();
  })
})


// When the #makenew button is clicked
$(document).on("click", ".create", function() {
  // AJAX POST call to the submit route on the server
  // This will take the data from the form and send it to the server
  event.preventDefault();
  var thisId = $(this).attr("data-id");
 
  //name = $("#bodyinput").val();

  console.log(thisId);
  $.ajax({
    type: "POST",
    url: "/articles/" + thisId,
    data: {
       body: $("#body").val()
       }
  })
  // If that API call succeeds, add the title and a delete button for the note to the page
    .then(function() {
    // Add the title and delete button to the #results section

       $.ajax({
     
       method: "GET",
    url: "/articles/" + thisId
  
  }).then(function(data){
console.log(data);
$(`#will${thisId}`).prepend(`${data.note.body}`);
  // window.location.reload();
  })
})
  .catch(function(err) {
    console.log(err.message);
  });
});
    // If that API call succeeds, add the title and a delete button for the note to the page});

// When user click's on note title, show the note, and allow for updates


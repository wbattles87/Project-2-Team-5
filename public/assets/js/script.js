$(document).ready(function () {
    //SIGN UP MODAL JAVASCRIPT
    $(".innersignuptext").click(function () {
        $('#signup-modal').trigger('click');
        $("#signup-modal").css({ opacity: 0.95 });
    });

    //Recipe Search Function
    $(".search-button").on("click", function() {
        
    });

    //Ingredient To-Do List
    $(".ingredientChecklist").on("click", function() {
        
    });

    //Recipe -> Ingredient Button (convert to ingredient page when clicked)
    $(".recipeName").on("click", function() {
        $ajax({
            url:`/burgers/eat/${$(this).attr("data-id")}`,
            method: "GET"
        }).then(function(data){
            console.log("Then data: " + data);
            location.reload();
        })
    });

    //Delete Ajax (DELETE) Calls
    $(".recipeDelete").on("click", function() {
        $ajax({
            url:`/burgers/eat/${$(this).attr("data-id")}`,
            method: "DELETE"
        }).then(function(data){
            console.log("Then data: " + data);
            location.reload();
        })
    });

    //Delete Ajax (PUT) Calls
    $(".recipeEdit").on("click", function() {
        $ajax({
            url:`/burgers/eat/${$(this).attr("data-id")}`,
            method: "PUT"
        }).then(function(data){
            console.log("Then data: " + data);
            location.reload();
        })
    });

    /*TEMPORARY Burgers thing - TEMPLATE*/
    $(".eatit").on("click", function(){
        $.ajax({
            url:`/burgers/eat/${$(this).attr("data-id")}`,
            method: "PUT"
        }).then(function(data){
            console.log("Then data: " + data);
            location.reload();
        });
        
    });
});
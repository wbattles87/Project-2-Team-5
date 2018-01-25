$(document).ready(function () {

    //SIGN UP MODAL JAVASCRIPT
    $(".innersignuptext").click(function () {
        $('#signup-modal').trigger('click');
        $("#signup-modal").css({
            opacity: 0.95
        });
    });

    //Recipe Search Function
    $(".search-button").on("click", function () {
        event.preventDefault();

        var searchQuery = $("#userSearch").val().trim().split(' ');
        console.log(searchQuery);

        $.ajax({
            url: `RECIPE NAMES`,
            method: "GET"
        }).then(function (data) {
            console.log("Then data: " + data);

            for (i = 0; i < searchQuery.length; i += 1) {
                //break recipe name into array - two for loops?
                //need to compare searchQuery array against each recipe name array
            };
        })
    });

    //Ingredient To-Do List
    $(".ingredientChecklist").on("click", function (ev) {
        ev.target.parentElement.classList.toggle("checked");
    });

    //Delete Ajax (DELETE) Calls
    $(".recipeDelete").on("click", function () {
        var id = $(this).attr("data-id");
        console.log(id);
        $.ajax({
                method: "DELETE",
                url: "/api/recipes/" + id
            }).then(function(data) {
                console.log("deleted recipe", id);
            })
    });

    //Toggle Recipe complete
    $(".recipeComplete").on("click", function () {
        var id = $(this).data("id");

        console.log(id);

        var recipeState = {
            recipe_checkbox: true,
        };

        // Send the DELETE request.
        $.ajax("/api/recipes/update/" + id, {
            type: "PUT",
            data: recipeState,
        }).then(
            function () {
                console.log("Cooked recipe:", id);
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

    //Edit Ajax (PUT) Calls
    $(".recipeEdit").on("click", function () {
        $.ajax({
            url: `/burgers/eat/${$(this).attr("data-id")}`,
            method: "PUT"
        }).then(function (data) {
            console.log("Then data: " + data);
            location.reload();
        })
    });
});
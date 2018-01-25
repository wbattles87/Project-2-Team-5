$(document).ready(function () {

    //SIGN UP MODAL JAVASCRIPT
    $(".innersignuptext").click(function () {
        $('#signup-modal').trigger('click');
        $("#signup-modal").css({
            opacity: 0.95
        });
    });

    //NavBar Logo to return to Homepage
    $("#navbarlogo").on("click", function () {
        $.ajax({
            url: `/`,
            method: "GET",
        }).then(function (data) {
            console.log(data);
            console.log("Returning to Home");
            $(".body-template").html(data); //need better way - should load original page/path
        })
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

    //Recipe -> Ingredient Button (convert to ingredient page when clicked)
    $(".recipeName").on("click", function () {
        $.ajax({
            url: `/burgers/eat/${$(this).attr("data-id")}`,
            method: "GET"
        }).then(function (data) {
            console.log("Then data: " + data);
            location.reload();
        })
    });

    //Delete Ajax (DELETE) Calls
    $(".recipeDelete").on("click", function () {
        var listItemData = $(this).parent("td").parent("tr").data("RecipeId");
        var id = listItemData.id;
        $.ajax({
                method: "DELETE",
                url: "/api/authors/" + id
            })
            .then(getAuthors);
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
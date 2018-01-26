'use strict'

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

    //Logout Button
    $(".logoutBtn").on("click", function () {
        location.href = "/";
    });

    //Delete Ajax (DELETE) Calls
    $(".recipeDelete").on("click", function () {
        var id = $(this).attr("data-id");
        console.log(id);
        $.ajax({
            method: "DELETE",
            url: "/api/recipes/" + id
        }).then(function (data) {
            console.log("deleted recipe: " +  id);
            console.log(data);
            alert(data);
            location.href=("/recipe");
        })
    });

    //Toggle Recipe complete
    $(".recipeComplete").on("click", function () {
        var id = $(this).data("id");
        var recipe_checkbox = $(this).data("checkbox");
        var recipeState;

        console.log(recipe_checkbox);

        if (recipe_checkbox === true) {
            recipeState = {
                recipe_checkbox: false
            };
        } else {
            recipeState = {
                recipe_checkbox: true
            };
        }

        // Send the DELETE request.
        $.ajax("/api/recipes/update/" + id, {
            type: "PUT",
            data: recipeState,
        }).then(
            function () {
                console.log("Cooked recipe:", id);
                location.href = "/recipe";
            }
        );
    });

    //EDIT BUTTON
    $(".recipeEdit").on("click", function () {
        var id = $(this).data("id");
        console.log(id);
        location.href = "/recipe/edit/" + id;
    });

    //EDIT FORM SUMBITS
    $(".titleBtn").on("click", function (post) {
        event.preventDefault();
        var id = $(this).data("id");
        console.log(id);

        var newTitle = $("#editTitle").val();
        console.log(newTitle);

        var newObject = {
            recipe_name: newTitle,
        };

        $.ajax({
            method: "PUT",
            url: "/api/recipes/edit/" + id,
            data: newObject
        })
        .then(function () {
            window.location.href = "/recipe/" + id;
        });
    });

    $(".ingredientBtn").on("click", function () {
        event.preventDefault();
        var id = $(this).attr("data-id");

        var ingredientid = $(this).data("ingredientid");
        console.log(ingredientid);

        var newIngredient = {
            ingredient_info: $(`#editIngredient-${ingredientid}`).val(),
        };

        console.log(newIngredient.ingredient_info);

        $.ajax({
            method: "PUT",
            url: "/api/ingredients/edit/" + ingredientid,
            data: newIngredient,
        })
        .then(function () {
            console.log("Igred updated: " + ingredientid);
            $(`#editIngredient-${ingredientid}`).css("font-weight", "bold");
          // window.location.href = "/recipe/" + id;
        });
    });

    $(".instructionBtn").on("click", function (post) {
        event.preventDefault();
        var id = $(this).attr("data-id");
        var instructionid = $(this).data("instructionid");
        console.log(instructionid);

        var newInstruction = {
            instruction_info: $("#editInstruction").val(),
        }

        $.ajax({
            method: "PUT",
            url: "/api/instructions/edit/" + instructionid,
            data: newInstruction
        })
        .then(function () {
            window.location.href = "/recipe/" + id;
        });
    });
});
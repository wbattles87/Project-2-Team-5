var expect = require("chai").expect;

//var parseItempropIngredients = require("../controllers/recipe-api-routes");
//parseItempropIngredients($, recipeId) 
const cheerio = require('cheerio');

const $ = cheerio.load(`<ul>
<li class="ingredient" itemprop="ingredients">2 (1 1/2- to 2-inch thick) ribeye, strip, porterhouse or t-bone (about 1 pound each), or 4 tenderloin steaks (6 to 8 ounces each)</li>
<li class="ingredient" itemprop="ingredients">Kosher salt and freshly ground black pepper</li>
<li class="ingredient" itemprop="ingredients">4 sprigs thyme or rosemary (optional)</li>
<li class="ingredient" itemprop="ingredients">2 garlic cloves (optional)</li>
<li class="ingredient" itemprop="ingredients">2 shallots, thinly sliced (optional)</li>
<li class="ingredient" itemprop="ingredients">2 tablespoons canola oil</li>
<li class="ingredient" itemprop="ingredients">2 tablespoons butter</li>
</ul>`);

function parseItempropIngredients($, recipeId) {
    var ingredientsArray = [];
    var jsonFound = false;

    //Look for JSON object in page
    $("script").each(function () {
        if ($(this).attr("type") === "application/ld+json") {
            if (JSON.parse($(this).html())["@type"] === "Recipe") {
                if (JSON.parse($(this).html())["recipeIngredient"]) {
                    ingredientsArray = JSON.parse($(this).html())["recipeIngredient"];
                    jsonFound = true;
                    console.log(ingredientsArray);
                } else
                    console.log("No Ingredients");
            } else
                console.log("No Recipe in JSON OBJ");
        } else
            console.log("No JSON Obj");
    });

    if (jsonFound && ingredientsArray.length) { //push objects with RecipeID
        for (let i = 0; i < ingredientsArray.length; i++) {
            ingredientsArray[i] = {
                ingredient_info: ingredientsArray[i],
                RecipeId: recipeId
            };
        }
    }

    if (!ingredientsArray.length) { //check that no JSON obj in page then continue parsing
        //$('[itemprop="ingredients"]')
        $('[itemprop]').map(function (i, el) { //get list of elements with itemprop attr
            // this === el 
            if ($(this).attr("itemprop").match(/ngredient/)) //all itemprops that match I/ingredient
                ingredientsArray.push({
                    ingredient_info: $(this).text(),
                    RecipeId: recipeId
                }); //pushes an object
        });
    }


    return ingredientsArray;
}

console.log( parseItempropIngredients($, 1) );

var ingredsArray = [{ ingredient_info: "2 (1 1/2- to 2-inch thick) ribeye, strip, porterhouse or t-bone (about 1 pound each), or 4 tenderloin steaks (6 to 8 ounces each)", RecipeId: 1 },
{ ingredient_info: "Kosher salt and freshly ground black pepper", RecipeId: 1 },
{ ingredient_info: "4 sprigs thyme or rosemary (optional)", RecipeId: 1 },
{ ingredient_info: "2 garlic cloves (optional)", RecipeId: 1 },
{ ingredient_info: "2 shallots, thinly sliced (optional)", RecipeId: 1 },
{ ingredient_info: "2 tablespoons canola oil", RecipeId: 1 },
{ ingredient_info: "2 tablespoons butter", RecipeId: 1 }];

describe("parseItempropIngredients", function() {
    it("should return array of ingreds", function() {
      expect(parseItempropIngredients($, 1).length).to.equal(ingredsArray.length);
    });
});

$(document).ready(function () {
    $(".innersignuptext").click(function () {
        $('#signup-modal').modal('show');
        $("#signup-modal").css({ opacity: 0.95 });
    });

    /*TEMPORARY Burgers thing*/
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
$(".menu-item").on("click", function(){
    let target = $(this).attr('data-target');
    $('.overlap').css("width", "0");
    $("#"+target).css('width', '100%');
});

$(".overlap .dismiss").on("click", function(){
    $(this).closest('.overlap').css('width', '0');
});
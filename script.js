$(".menu-item").on("click", function(){
    let target = $(this).attr('data-target');
    $('overlap').css("display", "none");
    console.log(target)
    $("#"+target).css('display', 'flex');
});

$(".overlap .dismiss").on("click", function(){
    $(this).closest('.overlap').css('display', 'none');
});
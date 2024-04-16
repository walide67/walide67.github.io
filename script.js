$(".menu-item").on("click", function(){
    let target = $(this).attr('data-target');
    $('.overlap').css("width", "0");
    $('.overlap-body').css("display", "none");
    $('.overlap-shadow').css("display", "none");

    $("#"+target).css('width', '100%');
    $('.overlap-body', "#"+target).css('display', 'flex');
    let timeout = setTimeout(function(){
        $('.overlap-shadow', "#"+target).css('display', 'block');
    }, 700);
});

$(".overlap .dismiss").on("click", function(){
    $(this).closest('.overlap').css('width', '0');
    $(this).closest('.overlap-body').css('display', 'none');
    $(this).closest('.overlap-shadow').css('display', 'none');
});
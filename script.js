$(".menu-item").on("click", function(){
    let target = $(this).attr('data-target');
    console.log(target)
    $("#"+target).css('display', 'flex');
});
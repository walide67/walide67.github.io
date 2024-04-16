$(".menu-item").on("click", function(){
    let target = $(this).attr('data-target');
    if($(this).hasClass('active')){
        $(this).removeClass('active');
        dismissOverlap($("#"+target))
    }else{
        $('.overlap .overlap-body').css("display", "none");
        $('.overlap .overlap-shadow').css("display", "none");
        $('.overlap').css("width", "0");
        $('.menu-item.active').removeClass('active');
        $(this).addClass('active');

        $("#"+target).css('width', '100%');
        $('.overlap-body', "#"+target).css('display', 'flex');
        let timeout = setTimeout(function(){
            $('.overlap-shadow', "#"+target).css('display', 'block');
            $('.skill-item', "#"+target).css('display', 'flex!important');
        }, 700);
    }
    
});

$(".overlap .dismiss").on("click", dismissOverlap);

function dismissOverlap(elem){
    console.log(elem);
    elem.closest('.overlap-body').css('display', 'none');
    elem.closest('.overlap-body .skill-item').css('display', 'none!important');
    elem.closest('.overlap-shadow').css('display', 'none');
    elem.closest('.overlap').css('width', '0');
}
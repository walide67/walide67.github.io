$(".menu-item").on("click", function(){
    if($(this).hasClass('active')){
        dismissOverlap($(this))
    }else{
        $('.overlap').css("width", "0");
        $('.overlap .overlap-body').css("display", "none");
        $('.overlap .overlap-shadow').css("display", "none");

        let target = $(this).attr('data-target');
        $(this).addClass('active');
        $("#"+target).css('width', '100%');
        $('.overlap-body', "#"+target).css('display', 'flex');
        let timeout = setTimeout(function(){
            $('.overlap-shadow', "#"+target).css('display', 'block');
        }, 700);
    }
    
});

$(".overlap .dismiss").on("click", dismissOverlap($(this)));

function dismissOverlap(thi){
    $(this).removeClass('active');
    thi.closest('.overlap').css('width', '0');
    thi.closest('.overlap-body').css('display', 'none');
    thi.closest('.overlap-shadow').css('display', 'none');
}
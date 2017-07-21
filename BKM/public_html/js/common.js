$(function(){
    
    $(".selectable *").click(function(){
        $(this).addClass('selected').siblings().removeClass('selected');
    });
    
});


function showPanel(id){
    $(".floatpanel").hide();
    $("#"+id).show();
    if($(".mask").length===0){
        $("body").append('<div class="mask">&nbsp;</div>');
        $(".mask").click(function(){
            $(".floatpanel").hide();
            $(this).remove();
        });
    }
}
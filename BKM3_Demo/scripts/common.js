$(function(){
    
    $(".selectable *").click(function(){
        $(this).addClass('selected').siblings().removeClass('selected');
    });
    //panel + X
    $(".floatpanel").each(function(){
        $(this).append('<a class="close" onclick="hidePanel();"><span class="glyphicon glyphicon-remove"></span></a>');
    });
    
});


function showPanel(id){
    $(".floatpanel").hide();
    $("#"+id).show();
    if($(".mask").length===0){
        $("body").append('<div class="mask">&nbsp;</div>');
        $(".mask").click(function(){
            hidePanel();
        });
    }
}

function hidePanel(){
    $(".floatpanel").hide();
    $(".mask").remove();
}
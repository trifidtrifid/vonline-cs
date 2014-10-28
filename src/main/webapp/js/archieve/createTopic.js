//$(document).ready(function(){
    var w = $(window);

/* появление wysiwig редактора */
    $('.create-topic .widget-box .wysiwyg-editor').css({'height':'300px'}).ace_wysiwyg({
        toolbar_place: function(toolbar) {
            return $(this).closest('.widget-box').find('.widget-header').prepend(toolbar).children(0).addClass('inline');
        },
        toolbar:
            [
                'bold',
                {name:'italic' , title:'Change Title!', icon: 'icon-leaf'},
                'strikethrough',
                null,
                'insertunorderedlist',
                'insertorderedlist',
                null,
                'justifyleft',
                'justifycenter',
                'justifyright'
            ],
        speech_button:false
    });
/* --- */

    var transport = new Thrift.Transport("/thrift/UserService");
    var protocol = new Thrift.Protocol(transport);
    var client = new com.vmesteonline.be.thrift.UserServiceClient(protocol);

    var Groups = client.getUserGroups();
    var Rubrics = client.getUserRubrics();

    transport = new Thrift.Transport("/thrift/MessageService");
    protocol = new Thrift.Protocol(transport);
    client = new com.vmesteonline.be.thrift.MessageServiceClient(protocol);

    $('.create-topic .wysiwig-box .btn-primary').click(function(){
        alert('1');
        var message = $(this).closest('.widget-body').find('.wysiwyg-editor').html();
        message = message.replace(new RegExp('&nbsp;','g'),' ');
        message = message.replace(new RegExp('<div>','g'),'<div> ');
        var head = $('.head').val();
        var messageWithGoodLinks = AutoReplaceLinkAndVideo(message);
        messageWithGoodLinks = messageWithGoodLinks.replace(new RegExp('undefined','g'),"");
        var groupID = $('.submenu .active .btn').data('groupid');
        client.createTopic(groupID,head,1,messageWithGoodLinks,0,0,Rubrics[0].id,1);
        document.location.replace("/main.jsp");
    });

/*
 -----------------------------------------------------------
 АВТОМАТИЧЕСКОЕ ОПРЕДЕЛЕНИЕ ССЫЛКИ В СТРОКЕ
 -----------------------------------------------------------
 */
function AutoReplaceLinkAndVideo(str) {
    var regexp = /^(.* )?(http[s]?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})(\/[\/\da-z\.=\-?]*)*\/?( ?.*)?$/gmi,
        arrayWithLinks = regexp.exec(str),
        res = str;
    if (arrayWithLinks && arrayWithLinks.length > 0){
        var currentLink = arrayWithLinks[2]+arrayWithLinks[3]+'.'+arrayWithLinks[4]+arrayWithLinks[5];
        var prefix = arrayWithLinks[1];
        var suffix = arrayWithLinks[6];
        var iframe = "";

        if (arrayWithLinks[3].indexOf('youtu') != -1){
            // у ютуба несколько отличается ссылка и айфрэйм
            var youtubeLink="";
            var indexSymbolRavno = arrayWithLinks[5].indexOf('=');
            if (indexSymbolRavno != -1){
                youtubeLink = arrayWithLinks[5].substr(indexSymbolRavno+1);
            }else{
                youtubeLink = arrayWithLinks[5];
            }
            iframe = '<iframe width="560" height="315" src="//www.youtube.com/embed/'+ youtubeLink +'" frameborder="0" allowfullscreen></iframe>';
        }else if(arrayWithLinks[3].indexOf('vimeo') != -1){
            iframe = '<iframe src="'+ currentLink +'" width="500" height="281" frameborder="0"'+
                ' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
        }else{
            iframe = '<a href="'+currentLink+'" target="_blank">'+currentLink+'</a>';
        }

        res = AutoReplaceLinkAndVideo(prefix) + iframe + AutoReplaceLinkAndVideo(suffix)
    }
    return res;
}
/* ------------ */

//});
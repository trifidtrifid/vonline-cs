$(document).ready(function(){
    var transport = new Thrift.Transport("/thrift/AuthService");
    var protocol = new Thrift.Protocol(transport);
    var authClient = new com.vmesteonline.be.thrift.authservice.AuthServiceClient(protocol);

    var URL,URLArray, email;

    if($('.btn-remember-passw').length){
        // если восстановление пароля
        URL = document.location.hash;
        URL = URL.slice(1);
        URLArray = URL.split('-');
        email = decodeURIComponent(URLArray[1]);
        var remindPassw = URLArray[0];

        var isGood_1 = authClient.checkRemindCode(remindPassw,email);

        if(isGood_1){
            $('.login-main>form').removeClass('hidden');
        }else{
            $('.remember-error').removeClass('hidden');
        }

        $('.btn-remember-passw').click(function(e){
            e.preventDefault();

            if($('#new_pass_1').val().length > 3 && $('#new_pass_2').val().length > 3 ){
                var isGood_2 = authClient.changePasswordByRemidCode(remindPassw,email,$('#new_pass_1').val());

                if(isGood_2){
                    document.location.replace('/');
                }else{
                    $('.login-error').html('Смена пароля не произошла. <a href="#" class="show-remember-2">попробуйте еще раз</a>.').show();
                    showRemember($('.show-remember-2'));
                }
            }else{

                $('.login-error').text('Пароль должен быть длиннее 3-х символов.').show();

            }


        });
    }else{
        // если страница регистрации или логина
        URL = document.location.hash;
        var href = document.location.href;

        if(!URL) {
            if(href.indexOf('https') == -1 && (href.indexOf('127.0.0.1') == -1 && href.indexOf('localhost') == -1) && href.indexOf('appspot.com') == -1)
                document.location.replace('https://www.vmesteonline.ru/login');
        }

        var hrefInd = href.indexOf("/",9);
        $('input[name="redirect_uri"]').val(href.substring(0,hrefInd)+"/oauth");

        if(URL) {
            // если страница регистрации

            URLArray = URL.split(';');

            email = URLArray[0].split('=')[1];
            var address = decodeURIComponent(URLArray[2].split('=')[1]),
                code = URLArray[3].split('=')[1];

            $('#vk_state').val('inviteCode:'+code);
            var mapUrlTemp = URLArray[1].split('=');
            mapUrlTemp.shift();
            var mapUrl = mapUrlTemp.join('=');

            $('#email').val(email);
            $('.mapUrl').attr('src', mapUrl);
            $('.address').text(address);

            document.location.hash = "";
        }
    }

    $('#login-box .btn-login').click(function(e){
        e.preventDefault();

        var url = "/main";
        var toURL = $(this).attr('data-tourl');
        if(toURL && toURL.indexOf('favicon') == -1) {
            url = toURL;
            $(this).attr('data-tourl',"");
        }

        login(url);
    });

    $('.btn-reg').click(function(){
        var gender,
            email = $('#email').val(),
            firstName = $('#ufirstname').val(),
            lastName = $('#ulastname').val(),
            pass = $('#password').val();

        $('input[name="sex"]').each(function(){
            if($(this).prop("checked")){
                gender = $(this).closest('.radio').index()+1;
            }
        });

        if(!firstName || !lastName || !email || !pass || gender === undefined){

            $('.error-info').text('Ошибка регистрации. Вы указали не все данные').show();

        }else{

            try{
                authClient.registerNewUser(firstName, lastName, pass, email, code, gender);
                document.location.replace('coming-soon.html');
            }catch(e){
                $('.error-info').html('Такой адрес email уже зарегистрирован. <a href="#" class="reg-remember">Забыли пароль?</a>').show();

                $('.reg-remember').click(function(e){
                    e.preventDefault();

                    authClient.remindPassword(email);
                    $('.login-error').removeClass('error-info').addClass('info-good').text('На ваш email отправлен код подтверждения').show();
                });
            }
        }

    });

    var resourcefileName = "mailTemplates/changePasswordConfirm.html";

    function login(toURL) {
        try {
            var loginResult = authClient.login($("#uname").val(), $("#password").val());
            if (loginResult == 1) {
                $('.login-error').hide();

                document.location.replace(toURL);
            } else if(loginResult == 3){
                $('.login-error').text('Ваш email не подтвержден').removeClass('info-good').show();
            }else{
                $('.login-error').text('Вы ввели некорректный e-mail или пароль').removeClass('info-good').show();
            }
        } catch (e) {
            $('.login-error').text('Вы ввели некорректный e-mail или пароль').removeClass('info-good').show();
        }
    }

    function showRemember(selector){
        selector.click(function(e){
            e.preventDefault();

            $('.login-main').addClass('hidden');
            $('.remember').removeClass('hidden');
            $('.login-error').hide();
        });

    }
    showRemember($('.show-remember'));


    $('.btn-back').click(function(e){
        e.preventDefault();

        $('.remember').addClass('hidden');
        $('.login-main').removeClass('hidden');
        $('.login-error').hide();

    });

    $('.btn-remember').click(function(e){
        var email = $('#email').val();

        if(email) {
            var isUserExist = authClient.remindPassword(email);
            if(isUserExist){
                $('.login-error').removeClass('.error-info').addClass('info-good').text('Вам отправлено письмо для восстановления пароля').show();
            }else{
                $('.login-error').text('Пользователь с таким email не зарегистрирован').show();
            }

        }else{
            $('.login-error').text('Введите пожалуйста email').show();
        }

    });

    $('.login-forum').keypress(function(eventObject){
        if(eventObject.which == 13){

             var url = "/main";
             var toURL = $('#login-box .btn-login').attr('data-tourl');
             if(toURL && toURL.indexOf('favicon') == -1) {
             url = toURL;
             $('#login-box .btn-login').attr('data-tourl',"");
             }

             login(url);

        }
        //alert('Вы ввели символ с клавиатуры. Его код равен ' + eventObject.which);
    });
});

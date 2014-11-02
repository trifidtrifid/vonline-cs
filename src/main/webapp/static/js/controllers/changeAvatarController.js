
forumControllers.controller('changeAvatarController',function($state,$rootScope){

        var changeAvatar = this, newSrc,
            x1 = 50, y1 = 50, x2 = 200, y2 = 200,
            imageWidth = 150, imageHeight = 150;

        changeAvatar.save = function(){

            var saveSrc = newSrc+"?w="+ imageWidth +"&h="+ imageHeight +"&s="+x1+","+y1+","+x2+","+y2;
            userClient.updateUserAvatar(saveSrc);
            $rootScope.base.user.avatar = $rootScope.base.avatarBuffer = saveSrc;

            $("#dialog-message").dialog('close');
            $state.go('profile');

            $('.preview-container').addClass('hidden');

            $('.ui-dialog').each(function(){
                if($(this).attr('aria-describedby') == 'dialog-message'){
                    $(this).detach();
                }
            });
        };

        changeAvatar.back = function(){
            $('.load-avatar').find('.file-label').html("").
                removeClass("hide-placeholder selected").
                attr("data-title","Загрузить аватар");

            $('.loadAvatar-area').removeClass('hidden');
            $('.crop-area').addClass('hidden');

            $('.preview-container').addClass('hidden');
            $('.loading').removeClass('hidden');

            $('#image-for-crop').detach();
            $('.jcrop-holder').detach();

            $('.btn-save-avatar').before('<img src="#" id="image-for-crop" alt="#" class="hidden" />');

        };

        initModalAndCrop();

        function initModalAndCrop() {

            $("#dialog-message").removeClass('hide').dialog({
                modal: true,
                width: 504,
                position: ['center', 100],
                title_html: false,
                closeText: "",
                create: function (event, ui) {

                    $('.load-avatar input').ace_file_input({
                        style: 'well',
                        btn_choose: 'Загрузить аватар',
                        btn_change: null,
                        no_icon: '',
                        droppable: true,
                        thumbnail: 'large',
                        icon_remove: null
                    }).on('change', function () {
                        var imageForCrop = $('#image-for-crop');

                        $('.loadAvatar-area,.load-avatar-error').addClass('hidden');
                        $('.crop-area').removeClass('hidden');

                        setTimeout(saveNewAva, 1000);

                        function saveNewAva() {
                            var avaImg = $('.load-avatar').find('.file-label img');
                            if(parseInt(avaImg.css('width')) < 200 || parseInt(avaImg.css('height')) < 200){

                                $('.loading,.btn-save-avatar').addClass('hidden');

                                $('.load-avatar-error')
                                    .text('Изображение должно быть не менее 200px в ширину и высоту. Попробуйте загрузить другое изображение.').removeClass('hidden');

                            }else {
                                $('.loading').addClass('hidden');

                                var bg = avaImg.css('background-image'),
                                    src = avaImg.attr('src');

                                newSrc = fileClient.saveFileContent(bg, true);

                                $('#preview').attr('src', newSrc);

                                imageForCrop.attr('src', newSrc);
                                imageForCrop.css({'max-width': '500px', 'max-height': '500px'});

                                imageForCrop.Jcrop({
                                    aspectRatio: 1,
                                    setSelect: [ 200, 200, 50, 50 ],
                                    onChange: updateCoords,
                                    onSelect: updateCoords
                                }).removeClass('hidden');

                                $('.preview-container,.btn-save-avatar').removeClass('hidden');

                            }
                        }

                        function updateCoords(c) {
                            imageWidth = imageForCrop.width();
                            imageHeight = imageForCrop.height();

                            x1 = c.x;
                            y1 = c.y;
                            x2 = c.x2;
                            y2 = c.y2;
                            $('#x').val(c.x);
                             $('#y').val(c.y);
                             $('#w').val(c.w);
                             $('#h').val(c.h);

                             $('#x2').val(c.x2);
                             $('#y2').val(c.y2);

                            var rx = 150 / c.w; // 150 - размер окна предварительного просмотра
                            var ry = 150 / c.h;

                            $('#preview').css({
                                width: Math.round(rx * imageWidth) + 'px',
                                height: Math.round(ry * imageHeight) + 'px',
                                marginLeft: '-' + Math.round(rx * c.x) + 'px',
                                marginTop: '-' + Math.round(ry * c.y) + 'px'
                            });
                        };
                    });

                },
                close: function (event, ui) {
                    $state.go('profile');

                    $('.preview-container').addClass('hidden');

                    $('.ui-dialog').each(function(){
                        if($(this).attr('aria-describedby') == 'dialog-message'){
                            $(this).detach();
                        }
                    });
                }
            });
        }
    })
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page import="com.vmesteonline.be.AuthServiceImpl"%>
<%@ page import="com.vmesteonline.be.thrift.InvalidOperation"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<%
    HttpSession sess = request.getSession();

    try {

        AuthServiceImpl.checkIfAuthorised(sess.getId());
        response.sendRedirect("/main");

    }catch(InvalidOperation ioe){

    }

%>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Логин</title>
        <link rel="shortcut icon" href="statis/i/landing/vmesteonline.png">
		<meta name="description" content="Вход вместе онлайн" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="stylesheet" href="static/css/style.css"/>

        <script src="./static/js/lib/jquery-2.1.1.min.js" type="text/javascript"></script>
        <script type="text/javascript">
            globalUserAuth = false;
        </script>

	</head>

	<body class="login-layout login-forum">
		<div class="main-container">
			<div class="main-content">

				<div class="row clearfix">
					<div class="col-sm-10 col-sm-offset-1">
                        <c:if test="${MESSAGE_TO_SHOW != null && MESSAGE_TO_SHOW != '' }">
                            <div class="message-to-show"><span><c:out value="${MESSAGE_TO_SHOW}"/></span></div>
                        </c:if>
                        <% pageContext.removeAttribute("MESSAGE_TO_SHOW"); %>

                        <div class="login-left col-md-5 ">
                            <a href="/"><img src="static/i/logo.png" alt="логотип"/></a>
                            <h1>Закрытая социальная сеть<br>только для соседей</h1>
                        </div>
                        <div class="col-md-2"></div>
                        <div class="col-md-5">
						<div class="login-container">

							<div class="position-relative">
								<div id="login-box" class="login-box visible widget-box no-border">
									<div class="widget-body">
										<div class="widget-main">
                                            <div class="login-main">
                                                <div class="clearfix">

                                                    <FORM action="https://oauth.vk.com/authorize" method="get">
                                                        <input type="hidden" name="client_id" value="4429306">
                                                        <input type="hidden" name="redirect_uri" value="https://1-dot-algebraic-depot-657.appspot.com/oauth">
                                                        <input type="hidden" name="scope" value="4194305">
                                                        <input type="hidden" name="v" value="5.21">
                                                        <INPUT type="submit" class="width-100 btn btn-sm no-border btn-primary" value="Войти через Вконтакте">
                                                    </FORM>

                                                    <div class="or">или</div>
                                                </div>

                                                <form>
                                                    <fieldset>
                                                        <label class="block clearfix">
                                                            <span class="block input-icon input-icon-right">
                                                                <input type="text" id="uname" class="form-control" placeholder="Ваш email" />
                                                                <i class="icon-user"></i>
                                                            </span>
                                                        </label>

                                                        <label class="block clearfix">
                                                            <span class="block input-icon input-icon-right">
                                                                <input type="password" id="password" class="form-control" placeholder="Пароль" />
                                                                <i class="icon-lock"></i>
                                                            </span>
                                                        </label>

                                                        <div class="tools">
                                                            <!--<div class="checkbox">
                                                                <label>
                                                                    <input name="form-field-checkbox" type="checkbox" class="ace">
                                                                    <span class="lbl"> Запомнить меня</span>
                                                                </label>
                                                            </div>-->
                                                            <a href="#" class="show-remember">Напомнить пароль</a>
                                                        </div>


                                                        <div class="error-info login-error"></div>


                                                        <div class="clearfix">

                                                            <button type="button" data-tourl="<%=session.getAttribute("toURL")%>" class="width-100 btn btn-sm btn-primary no-border btn-login">
                                                                Войти
                                                            </button>
                                                            <br>
                                                            <br>
                                                            <div><a href="/index.html" class="reg-link">Зарегистрируйтесь</a> если у вас нет аккаунта</div>
                                                        </div>

                                                    </fieldset>

                                                </form>
                                            </div>

                                            <div class="remember hidden">
                                                <form>
                                                    <fieldset>
                                                        <label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="email" id="email" class="form-control" placeholder="Ваш email" />
															<i class="icon-user"></i>
														</span>
                                                        </label>

                                                        <div class="error-info login-error"></div>
                                                        <br>

                                                        <div class="clearfix">
                                                            <button type="button" class="width-100 btn btn-sm btn-primary no-border btn-remember">
                                                                Восстановить пароль
                                                            </button>

                                                            <a href="#" class="btn-back pull-left">Назад</a>
                                                        </div>

                                                    </fieldset>
                                                </form>
                                            </div>

										</div>
									</div>
								</div>

							</div>
						</div>
                        </div>

					</div>
				</div>

			</div>
		</div>


        <div class="footer footer-bottom footer-login footer-white col-sm-10 col-sm-offset-1">
                <div class="pull-left"><span class="copypast">&copy;</span> ВместеОнлайн 2014</div>
                <div class="pull-right">
                    <ul>
                        <li><a href="about">О сайте</a></li>
                        <li><a href="blog">Блог</a></li>
                        <li><a href="contacts">Контакты</a></li>
                    </ul>
                </div>
        </div>


        <!-- файлы thrift -->
        <script src="static/js/thrift.js" type="text/javascript"></script>
        <script src="gen-js/authservice_types.js" type="text/javascript"></script>
        <script src="gen-js/AuthService.js" type="text/javascript"></script>        <!-- -->

        <script src="static/js/login.js"></script>

        <!-- Yandex.Metrika counter -->
        <script type="text/javascript">
            (function (d, w, c) {
                (w[c] = w[c] || []).push(function() {
                    try {
                        w.yaCounter25964365 = new Ya.Metrika({id:25964365,
                            clickmap:true,
                            trackLinks:true,
                            accurateTrackBounce:true,
                            trackHash:true,
                            ut:"noindex"});
                    } catch(e) { }
                });

                var n = d.getElementsByTagName("script")[0],
                        s = d.createElement("script"),
                        f = function () { n.parentNode.insertBefore(s, n); };
                s.type = "text/javascript";
                s.async = true;
                s.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//mc.yandex.ru/metrika/watch.js";

                if (w.opera == "[object Opera]") {
                    d.addEventListener("DOMContentLoaded", f, false);
                } else { f(); }
            })(document, window, "yandex_metrika_callbacks");
        </script>
        <noscript><div><img src="//mc.yandex.ru/watch/25964365?ut=noindex" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
        <!-- /Yandex.Metrika counter -->
	</body>
</html>

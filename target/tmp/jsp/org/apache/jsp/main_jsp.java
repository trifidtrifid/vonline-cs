package org.apache.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import com.vmesteonline.be.AuthServiceImpl;
import com.vmesteonline.be.UserServiceImpl;
import com.vmesteonline.be.MessageServiceImpl;
import com.vmesteonline.be.thrift.InvalidOperation;

public final class main_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static java.util.Vector _jspx_dependants;

  private org.apache.jasper.runtime.ResourceInjector _jspx_resourceInjector;

  public Object getDependants() {
    return _jspx_dependants;
  }

  public void _jspService(HttpServletRequest request, HttpServletResponse response)
        throws java.io.IOException, ServletException {

    JspFactory _jspxFactory = null;
    PageContext pageContext = null;
    HttpSession session = null;
    ServletContext application = null;
    ServletConfig config = null;
    JspWriter out = null;
    Object page = this;
    JspWriter _jspx_out = null;
    PageContext _jspx_page_context = null;


    try {
      _jspxFactory = JspFactory.getDefaultFactory();
      response.setContentType("text/html;charset=UTF-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;

      String resourceInjectorClassName = config.getInitParameter("com.sun.appserv.jsp.resource.injector");
      if (resourceInjectorClassName != null) {
        _jspx_resourceInjector = (org.apache.jasper.runtime.ResourceInjector) Class.forName(resourceInjectorClassName).newInstance();
        _jspx_resourceInjector.setContext(application);
      }

      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");

	HttpSession sess = request.getSession();
    pageContext.setAttribute("auth",true);

	try {
	 	AuthServiceImpl.checkIfAuthorised(sess.getId());
        UserServiceImpl userService = new UserServiceImpl(request.getSession());

        MessageServiceImpl messageService = new MessageServiceImpl(request.getSession().getId());

        session.setAttribute("toURL","");

	} catch (InvalidOperation ioe) {
        pageContext.setAttribute("auth",false);
        session.setAttribute("toURL", request.getRequestURL());
		response.sendRedirect("/login");
		return;
	}



      out.write("\r\n");
      out.write("\r\n");
      out.write("<!DOCTYPE html>\r\n");
      out.write("<html ng-app=\"forum\">\r\n");
      out.write("<head>\r\n");
      out.write("<meta charset=\"utf-8\" />\r\n");
      out.write("<title>Главная</title>\r\n");
      out.write("    <link rel=\"icon\" href=\"i/landing/vmesteonline.png\" type=\"image/x-icon\" />\r\n");
      out.write("    <link rel=\"shortcut icon\" href=\"i/landing/vmesteonline.png\" type=\"image/x-icon\" />\r\n");
      out.write("\r\n");
      out.write("    <link rel=\"stylesheet\" href=\"static/css/lib/jquery-ui-1.10.3.full.min.css\" />\r\n");
      out.write("<link rel=\"stylesheet\" href=\"static/css/style.css\" />\r\n");
      out.write("<link rel=\"stylesheet\" href=\"static/css/lib/fancybox/jquery.fancybox.css\"/>\r\n");
      out.write("<link rel=\"stylesheet\" href=\"static/css/lib/jquery.Jcrop.css\"/>\r\n");
      out.write("<link rel=\"stylesheet\" href=\"static/js/bower_components/select2/select2.css\"/>\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("    <script type=\"text/javascript\" src=\"//api-maps.yandex.ru/2.1/?load=package.full&lang=ru_RU&coordorder=longlat\"></script>\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("    <script src=\"static/js/lib/jquery-2.0.3.js\"></script>\r\n");
      out.write("    <script src=\"static/js/angular/angular.js\"></script>\r\n");
      out.write("<!--[if lt IE 9]>\r\n");
      out.write("    <script>\r\n");
      out.write("        document.createElement('header');\r\n");
      out.write("        document.createElement('section');\r\n");
      out.write("        document.createElement('footer');\r\n");
      out.write("        document.createElement('aside');\r\n");
      out.write("        document.createElement('nav');\r\n");
      out.write("    </script>\r\n");
      out.write("    <![endif]-->\r\n");
      out.write("\r\n");
      out.write("    <script src=\"static/js/lib/jquery.Jcrop.min.js\"></script>\r\n");
      out.write("    <script src=\"static/js/bower_components/select2/select2.min.js\"></script>\r\n");
      out.write("    <script src=\"static/js/bower_components/angular-ui-select2/src/select2.js\"></script>\r\n");
      out.write("    <script src=\"static/js/angular/ng-infinite-scroll.js\"></script>\r\n");
      out.write("\r\n");
      out.write("</head>\r\n");
      out.write("<body ng-controller=\"baseController as base\" ng-cloak ng-class=\"{'height100': !base.isFooterBottom}\"> <!--  -->\r\n");
      out.write("<div class=\"navbar navbar-default\" id=\"navbar\">\r\n");
      out.write("    <script type=\"text/javascript\">\r\n");
      out.write("        try {\r\n");
      out.write("            ace.settings.check('navbar', 'fixed')\r\n");
      out.write("        } catch (e) {\r\n");
      out.write("        }\r\n");
      out.write("    </script>\r\n");
      out.write("\r\n");
      out.write("    <div class=\"navbar-container ng-cloak\" id=\"navbar-container\" ng-controller=\"navbarController as navbar\">\r\n");
      out.write("        <div class=\"navbar-header pull-left\">\r\n");
      out.write("            <a href=\"/\" class=\"navbar-brand\">\r\n");
      out.write("                <img src=\"static/i/logo.png\" alt=\"логотип\"/>\r\n");
      out.write("            </a>\r\n");
      out.write("        </div>\r\n");
      out.write("\r\n");
      out.write("        <div class=\"navbar-header pull-right\" role=\"navigation\">\r\n");
      out.write("            <ul class=\"nav ace-nav\">\r\n");
      out.write("                <li ng-class=\"navbar.mapsBtnStatus\"><a class=\"btn btn-info no-border private-messages-link\"\r\n");
      out.write("                                                                  ui-sref=\"maps\">Карты</a></li>\r\n");
      out.write("\r\n");
      out.write("                ");
      out.write("\r\n");
      out.write("\r\n");
      out.write("                <li ng-class=\"navbar.neighboursBtnStatus\"><a class=\"btn btn-info no-border nextdoors-link\"\r\n");
      out.write("                                                            ui-sref=\"neighbours\">Соседи</a></li>\r\n");
      out.write("\r\n");
      out.write("                <li class=\"user-short light-blue\">\r\n");
      out.write("                    <a data-toggle=\"dropdown\" href=\"#\" class=\"dropdown-toggle\">\r\n");
      out.write("                        <div class=\"nav-user-photo\" style=\"background-image: url('{{ base.user.avatar }}')\"></div> <!-- -->\r\n");
      out.write("                        <span class=\"user-info\">\r\n");
      out.write("                            <small>{{base.me.firstName}}</small>\r\n");
      out.write("                            {{ base.me.lastName }}\r\n");
      out.write("                        </span>\r\n");
      out.write("                        <i class=\"icon-caret-down\"></i>\r\n");
      out.write("                    </a>\r\n");
      out.write("\r\n");
      out.write("                    <ul class=\"user-menu pull-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close\">\r\n");
      out.write("                        <li><a ui-sref=\"profile({ userId : 0})\"> <i class=\"icon-user\"></i>\r\n");
      out.write("                            Профиль\r\n");
      out.write("                        </a></li>\r\n");
      out.write("                        <li ng-if=\"base.me.countersEnabled\"><a ui-sref=\"counters\"> <i class=\"icon-fa fa fa-tachometer\"></i>\r\n");
      out.write("                            Счетчики\r\n");
      out.write("                        </a></li>\r\n");
      out.write("\r\n");
      out.write("                        <li><a ui-sref=\"settings\"> <i class=\"icon-cog\"></i> <!--   -->\r\n");
      out.write("                            Настройки\r\n");
      out.write("                        </a></li>\r\n");
      out.write("\r\n");
      out.write("                        <li class=\"divider\"></li>\r\n");
      out.write("\r\n");
      out.write("                        <li><a href=\"#\"  ng-click=\"navbar.logout($event)\"> <i class=\"icon-off\"></i> Выход\r\n");
      out.write("                        </a></li>\r\n");
      out.write("                    </ul></li>\r\n");
      out.write("            </ul>\r\n");
      out.write("        </div>\r\n");
      out.write("\r\n");
      out.write("    </div>\r\n");
      out.write("\r\n");
      out.write("</div>\r\n");
      out.write("\r\n");
      out.write("\t<div class=\"container\">\r\n");
      out.write("\r\n");
      out.write("\t\t<div class=\"main-container\" id=\"main-container\">\r\n");
      out.write("\t\t\t<div class=\"main-container-inner\">\r\n");
      out.write("\r\n");
      out.write("\t\t\t\t<aside class=\"sidebar\" id=\"sidebar\" ng-controller=\"leftBarController as leftbar\">\r\n");
      out.write("\t\t\t\t\t<script type=\"text/javascript\">\r\n");
      out.write("\t\t\t\t\t\ttry {\r\n");
      out.write("\t\t\t\t\t\t\tace.settings.check('sidebar', 'fixed')\r\n");
      out.write("\t\t\t\t\t\t} catch (e) {\r\n");
      out.write("\t\t\t\t\t\t}\r\n");
      out.write("\t\t\t\t\t</script>\r\n");
      out.write("\t\t\t\t\t<ul class=\"nav nav-list\">\r\n");
      out.write("                        <li>\r\n");
      out.write("                            <a ui-sref=\"important\">\r\n");
      out.write("                                <span class=\"menu-text\">\r\n");
      out.write("                                    Важные сообщения\r\n");
      out.write("                                    <span class=\"new-message-count bold\" ng-if=\"newImportantCount\">+{{newImportantCount}}</span>\r\n");
      out.write("                                </span>\r\n");
      out.write("                            </a>\r\n");
      out.write("                        </li>\r\n");
      out.write("                        <li ng-class=\"{active:base.newPrivateMessagesCount}\">\r\n");
      out.write("                            <a ui-sref=\"dialogs\">\r\n");
      out.write("                                <span class=\"menu-text\">\r\n");
      out.write("                                    Личные сообщения\r\n");
      out.write("                                    <span class=\"new-message-count bold\" ng-if=\"base.newPrivateMessagesCount\">+{{base.newPrivateMessagesCount}}</span>\r\n");
      out.write("                                </span>\r\n");
      out.write("                            </a>\r\n");
      out.write("                            ");
      out.write("\r\n");
      out.write("                        </li>\r\n");
      out.write("                        <li><a ui-sref=\"main\"> <span class=\"menu-text\">Новости</span> </a></li>\r\n");
      out.write("                        <li><a ui-sref=\"talks\"> <span class=\"menu-text\">Обсуждения</span> </a></li> <!-- ng-click=\"setTab($event,2)\" -->\r\n");
      out.write("                        <li><a ui-sref=\"profit\"> <span class=\"menu-text\">Услуги и объявления</span> </a></li>\r\n");
      out.write("\r\n");
      out.write("\t\t\t\t\t</ul>\r\n");
      out.write("                    <div class=\"footer footer-left\" ng-hide=\"base.isFooterBottom\">\r\n");
      out.write("                        <span class=\"copypast\">&copy;</span> ВместеОнлайн 2014\r\n");
      out.write("                        <!-- временная обработка ссылок пока не адаптирован блог, о нас и контакты под ангуляр -->\r\n");
      out.write("                        <ul>\r\n");
      out.write("                            <li><a href=\"about\" onclick=\"document.location.replace('about');\">О сайте</a></li>\r\n");
      out.write("                            <li><a href=\"blog\" onclick=\"document.location.replace('blog');\">Блог</a></li>\r\n");
      out.write("                            <li><a href=\"contacts\" onclick=\"document.location.replace('contacts');\">Контакты</a></li>\r\n");
      out.write("                        </ul>\r\n");
      out.write("                    </div>\r\n");
      out.write("\t\t\t\t</aside>\r\n");
      out.write("                ");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\t\t\t\t<div class=\"main-content dynamic ng-cloak\">\r\n");
      out.write("\r\n");
      out.write("                    <div class=\"user-notification\" ng-show=\"base.me.userNotification && base.me.notificationIsShow\">\r\n");
      out.write("                        <a href=\"#\" class=\"pull-right\" ng-click=\"base.nextNotification()\">&times;</a>\r\n");
      out.write("                        <span>\r\n");
      out.write("                            {{ base.me.userNotification }}\r\n");
      out.write("                        </span>\r\n");
      out.write("                    </div>\r\n");
      out.write("\r\n");
      out.write("                    <div class=\"main-content-top\" ng-hide=\"base.mainContentTopIsHide\" ng-controller=\"mainContentTopController as mainContentTop\"\r\n");
      out.write("                         ng-class=\"{'top-overflow-auto' : base.pageTitle.length}\" ng-cloak>\r\n");
      out.write("\r\n");
      out.write("                        <div class=\"ng-cloak\">\r\n");
      out.write("                        <div class=\"page-title pull-left\" ng-show=\"base.pageTitle.length\">{{base.pageTitle}}</div>\r\n");
      out.write("                        </div>\r\n");
      out.write("\r\n");
      out.write("                        <nav class=\"submenu pull-right clearfix\">\r\n");
      out.write("                            <button class=\"btn btn-sm btn-info no-border pull-right\" ng-repeat=\"group in groups\"\r\n");
      out.write("                            id=\"{{group.id}}\" ng-class=\"{active : currentGroup.id == group.id && group.id != 0}\" ng-click=\"selectGroup(group)\" ng-show=\"group.isShow\">{{group.visibleName}}</button> <!-- {active : group.selected} -->\r\n");
      out.write("                        </nav>\r\n");
      out.write("\r\n");
      out.write("                        <div class=\"create-topic-btn pull-right ng-cloak\" ng-show=\"base.talksIsActive || base.advertsIsActive\">\r\n");
      out.write("                            <a class=\"btn btn-primary btn-sm no-border clearfix\" href=\"#\" ng-click=\"showCreateTopic($event)\">\r\n");
      out.write("                                <span ng-show=\"base.talksIsActive\">Создать тему</span>\r\n");
      out.write("                                <span ng-hide=\"base.talksIsActive\">Создать объявление</span>\r\n");
      out.write("                            </a>\r\n");
      out.write("                        </div>\r\n");
      out.write("                    </div>\r\n");
      out.write("\r\n");
      out.write("\t\t\t\t\t\t<div class=\"forum-wrap\" ng-cloak ui-view>\r\n");
      out.write("\r\n");
      out.write("\t\t\t\t\t\t</div>\r\n");
      out.write("\r\n");
      out.write("\t\t\t\t</div>\r\n");
      out.write("\t\t\t</div>\r\n");
      out.write("\t\t</div>\r\n");
      out.write("        \r\n");
      out.write("        <div class=\"footer footer-bottom clearfix ng-cloak\" ng-show=\"base.isFooterBottom\">\r\n");
      out.write("            <div class=\"pull-left\"><span class=\"copypast\">&copy;</span> ВместеОнлайн 2014</div>\r\n");
      out.write("            <div class=\"pull-right\">\r\n");
      out.write("                <ul>\r\n");
      out.write("                    <li><a href=\"about\" onclick=\"document.location.replace('about');\">О сайте</a></li>\r\n");
      out.write("                    <li><a href=\"blog\" onclick=\"document.location.replace('blog');\">Блог</a></li>\r\n");
      out.write("                    <li><a href=\"contacts\" onclick=\"document.location.replace('contacts');\">Контакты</a></li>\r\n");
      out.write("                </ul>\r\n");
      out.write("            </div>\r\n");
      out.write("        </div>\r\n");
      out.write("\r\n");
      out.write("\t</div>\r\n");
      out.write("\r\n");
      out.write("\t<!-- общие библиотеки -->\r\n");
      out.write("\r\n");
      out.write("\t<script src=\"static/js/lib/bootstrap.min.js\"></script>\r\n");
      out.write("    <script src=\"static/js/lib/jquery-ui-1.10.3.full.min.js\"></script>\r\n");
      out.write("    <script src=\"static/js/lib/jquery.ui.datepicker-ru.js\"></script>\r\n");
      out.write("\t<script src=\"static/js/lib/ace-extra.min.js\"></script>\r\n");
      out.write("\t");
      out.write("\r\n");
      out.write("\t<script src=\"static/js/ace-elements.js\"></script>\r\n");
      out.write("\r\n");
      out.write("    <script src=\"static/js/lib/jquery.fancybox.js\"></script>\r\n");
      out.write("\r\n");
      out.write("\t<!-- конкретные плагины -->\r\n");
      out.write("\r\n");
      out.write("\t<!-- библиотеки для wysiwig редактора  -->\r\n");
      out.write("\t<script src=\"static/js/lib/markdown/markdown.min.js\"></script>\r\n");
      out.write("\t<script src=\"static/js/lib/markdown/bootstrap-markdown.min.js\"></script>\r\n");
      out.write("\t<script src=\"static/js/lib/jquery.hotkeys.min.js\"></script>\r\n");
      out.write("\t<script src=\"static/js/lib/bootstrap-wysiwyg.min.js\"></script>\r\n");
      out.write("\t<script src=\"static/js/bootbox.min.js\"></script>\r\n");
      out.write("\t<!-- -->\r\n");
      out.write("\t<script src=\"static/js/lib/jquery.scrollTo.min.js\"></script>\r\n");
      out.write("    <script src=\"static/js/lib/ace.min.js\"></script>\r\n");
      out.write("\r\n");
      out.write("\t<!-- -->\r\n");
      out.write("\t<!-- файлы thrift -->\r\n");
      out.write("\t<script src=\"static/js/thrift.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t<script src=\"gen-js/bedata_types.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t<script src=\"gen-js/messageservice_types.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t<script src=\"gen-js/MessageService.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t<script src=\"gen-js/DialogService.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t<script src=\"gen-js/userservice_types.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t<script src=\"gen-js/UserService.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t<script src=\"gen-js/authservice_types.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t<script src=\"gen-js/AuthService.js\" type=\"text/javascript\"></script>\r\n");
      out.write("    <script src=\"gen-js/utilityservces_types.js\" type=\"text/javascript\"></script>\r\n");
      out.write("    <script src=\"gen-js/UtilityService.js\" type=\"text/javascript\"></script>\r\n");
      out.write("    <script src=\"gen-js/fileutils_types.js\" type=\"text/javascript\"></script>\r\n");
      out.write("    <script src=\"gen-js/FileService.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\t<!-- -->\r\n");
      out.write("\r\n");
      out.write("\t<!-- собственные скрипты  -->\r\n");
      out.write("<script src=\"static/js/common.js\"></script>\r\n");
      out.write("<script src=\"static/js/directives.js\"></script>\r\n");
      out.write("<script src=\"static/js/services.js\"></script>\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("<script src=\"static/js/controllers/baseController.js\"></script>\r\n");
      out.write("<script src=\"static/js/controllers/mainContentTopController.js\"></script>\r\n");
      out.write("<script src=\"static/js/controllers/leftbarController.js\"></script>\r\n");
      out.write("<script src=\"static/js/controllers/navbarController.js\"></script>\r\n");
      out.write("<script src=\"static/js/controllers/LentaController.js\"></script>\r\n");
      out.write("<script src=\"static/js/controllers/WallSingleController.js\"></script>\r\n");
      out.write("<script src=\"static/js/controllers/TalksController.js\"></script>\r\n");
      out.write("<script src=\"static/js/controllers/TalksSingleController.js\"></script>\r\n");
      out.write("<script src=\"static/js/controllers/AdvertsController.js\"></script>\r\n");
      out.write("<script src=\"static/js/controllers/AdvertsSingleController.js\"></script>\r\n");
      out.write("<script src=\"static/js/controllers/neighboursController.js\"></script>\r\n");
      out.write("<script src=\"static/js/controllers/ProfileController.js\"></script>\r\n");
      out.write("<script src=\"static/js/controllers/SettingsController.js\"></script>\r\n");
      out.write("<script src=\"static/js/controllers/dialogsController.js\"></script>\r\n");
      out.write("<script src=\"static/js/controllers/dialogController.js\"></script>\r\n");
      out.write("<script src=\"static/js/controllers/changeAvatarController.js\"></script>\r\n");
      out.write("<script src=\"static/js/controllers/MapsController.js\"></script>\r\n");
      out.write("<script src=\"static/js/controllers/SetInfoController.js\"></script>\r\n");
      out.write("<script src=\"static/js/controllers/CountersController.js\"></script>\r\n");
      out.write("<script src=\"static/js/controllers/ModalInstanceCtrl.js\"></script>\r\n");
      out.write("<script src=\"static/js/controllers/CountersHistoryController.js\"></script>\r\n");
      out.write("<script src=\"static/js/controllers/importantController.js\"></script>\r\n");
      out.write("\r\n");
      out.write("<script src=\"static/js/angular/angular-ui-router.js\"></script>\r\n");
      out.write("<script src=\"static/js/angular/sanitize.js\"></script>\r\n");
      out.write("<script src=\"static/js/angular/linky-custom.js\"></script>\r\n");
      out.write("<script src=\"static/js/angular/ui-bootstrap-tpls-0.11.2.min.js\"></script>\r\n");
      out.write("\r\n");
      out.write("\t<script src=\"static/js/app.js\"></script>\r\n");
      out.write("\r\n");
      out.write("<script src=\"static/js/angular/ya-map-2.1.min.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\r\n");
      out.write("<!-- Yandex.Metrika counter -->\r\n");
      out.write("<script type=\"text/javascript\">\r\n");
      out.write("    (function (d, w, c) {\r\n");
      out.write("        (w[c] = w[c] || []).push(function() {\r\n");
      out.write("            try {\r\n");
      out.write("                w.yaCounter25964365 = new Ya.Metrika({id:25964365,\r\n");
      out.write("                    clickmap:true,\r\n");
      out.write("                    trackLinks:true,\r\n");
      out.write("                    accurateTrackBounce:true,\r\n");
      out.write("                    trackHash:true,\r\n");
      out.write("                    ut:\"noindex\"});\r\n");
      out.write("            } catch(e) { }\r\n");
      out.write("        });\r\n");
      out.write("\r\n");
      out.write("        var n = d.getElementsByTagName(\"script\")[0],\r\n");
      out.write("                s = d.createElement(\"script\"),\r\n");
      out.write("                f = function () { n.parentNode.insertBefore(s, n); };\r\n");
      out.write("        s.type = \"text/javascript\";\r\n");
      out.write("        s.async = true;\r\n");
      out.write("        s.src = (d.location.protocol == \"https:\" ? \"https:\" : \"http:\") + \"//mc.yandex.ru/metrika/watch.js\";\r\n");
      out.write("\r\n");
      out.write("        if (w.opera == \"[object Opera]\") {\r\n");
      out.write("            d.addEventListener(\"DOMContentLoaded\", f, false);\r\n");
      out.write("        } else { f(); }\r\n");
      out.write("    })(document, window, \"yandex_metrika_callbacks\");\r\n");
      out.write("</script>\r\n");
      out.write("<noscript><div><img src=\"//mc.yandex.ru/watch/25964365?ut=noindex\" style=\"position:absolute; left:-9999px;\" alt=\"\" /></div></noscript>\r\n");
      out.write("<!-- /Yandex.Metrika counter -->\r\n");
      out.write("\r\n");
      out.write("</body>\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("</html>\r\n");
    } catch (Throwable t) {
      if (!(t instanceof SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          out.clearBuffer();
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
      }
    } finally {
      if (_jspxFactory != null) _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}

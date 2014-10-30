package org.apache.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import com.vmesteonline.be.AuthServiceImpl;
import com.vmesteonline.be.thrift.InvalidOperation;

public final class login_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static java.util.Vector _jspx_dependants;

  private org.apache.jasper.runtime.TagHandlerPool _jspx_tagPool_c_if_test;
  private org.apache.jasper.runtime.TagHandlerPool _jspx_tagPool_c_out_value_nobody;

  private org.apache.jasper.runtime.ResourceInjector _jspx_resourceInjector;

  public Object getDependants() {
    return _jspx_dependants;
  }

  public void _jspInit() {
    _jspx_tagPool_c_if_test = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _jspx_tagPool_c_out_value_nobody = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
  }

  public void _jspDestroy() {
    _jspx_tagPool_c_if_test.release();
    _jspx_tagPool_c_out_value_nobody.release();
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

    HttpSession sess = request.getSession();

    try {

        AuthServiceImpl.checkIfAuthorised(sess.getId());
        response.sendRedirect("/main");

    }catch(InvalidOperation ioe){

    }


      out.write("\r\n");
      out.write("\r\n");
      out.write("<!DOCTYPE html>\r\n");
      out.write("<html>\r\n");
      out.write("\t<head>\r\n");
      out.write("\t\t<meta charset=\"utf-8\" />\r\n");
      out.write("\t\t<title>Логин</title>\r\n");
      out.write("        <link rel=\"shortcut icon\" href=\"statis/i/landing/vmesteonline.png\">\r\n");
      out.write("\t\t<meta name=\"description\" content=\"Вход вместе онлайн\" />\r\n");
      out.write("\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\r\n");
      out.write("\r\n");
      out.write("        <link rel=\"stylesheet\" href=\"static/css/style.css\"/>\r\n");
      out.write("\r\n");
      out.write("        <script src=\"./static/js/lib/jquery-2.1.1.min.js\" type=\"text/javascript\"></script>\r\n");
      out.write("        <script type=\"text/javascript\">\r\n");
      out.write("            globalUserAuth = false;\r\n");
      out.write("        </script>\r\n");
      out.write("\r\n");
      out.write("\t</head>\r\n");
      out.write("\r\n");
      out.write("\t<body class=\"login-layout login-forum\">\r\n");
      out.write("\t\t<div class=\"main-container\">\r\n");
      out.write("\t\t\t<div class=\"main-content\">\r\n");
      out.write("\r\n");
      out.write("\t\t\t\t<div class=\"row clearfix\">\r\n");
      out.write("\t\t\t\t\t<div class=\"col-sm-10 col-sm-offset-1\">\r\n");
      out.write("                        ");
      if (_jspx_meth_c_if_0(_jspx_page_context))
        return;
      out.write("\r\n");
      out.write("                        ");
 pageContext.removeAttribute("MESSAGE_TO_SHOW"); 
      out.write("\r\n");
      out.write("\r\n");
      out.write("                        <div class=\"login-left col-md-5 \">\r\n");
      out.write("                            <a href=\"/\"><img src=\"static/i/logo.png\" alt=\"логотип\"/></a>\r\n");
      out.write("                            <h1>Закрытая социальная сеть<br>только для соседей</h1>\r\n");
      out.write("                        </div>\r\n");
      out.write("                        <div class=\"col-md-2\"></div>\r\n");
      out.write("                        <div class=\"col-md-5\">\r\n");
      out.write("\t\t\t\t\t\t<div class=\"login-container\">\r\n");
      out.write("\r\n");
      out.write("\t\t\t\t\t\t\t<div class=\"position-relative\">\r\n");
      out.write("\t\t\t\t\t\t\t\t<div id=\"login-box\" class=\"login-box visible widget-box no-border\">\r\n");
      out.write("\t\t\t\t\t\t\t\t\t<div class=\"widget-body\">\r\n");
      out.write("\t\t\t\t\t\t\t\t\t\t<div class=\"widget-main\">\r\n");
      out.write("                                            <div class=\"login-main\">\r\n");
      out.write("                                                <div class=\"clearfix\">\r\n");
      out.write("\r\n");
      out.write("                                                    <FORM action=\"https://oauth.vk.com/authorize\" method=\"get\">\r\n");
      out.write("                                                        <input type=\"hidden\" name=\"client_id\" value=\"4429306\">\r\n");
      out.write("                                                        <input type=\"hidden\" name=\"redirect_uri\" value=\"https://1-dot-algebraic-depot-657.appspot.com/oauth\">\r\n");
      out.write("                                                        <input type=\"hidden\" name=\"scope\" value=\"4194305\">\r\n");
      out.write("                                                        <input type=\"hidden\" name=\"v\" value=\"5.21\">\r\n");
      out.write("                                                        <INPUT type=\"submit\" class=\"width-100 btn btn-sm no-border btn-primary\" value=\"Войти через Вконтакте\">\r\n");
      out.write("                                                    </FORM>\r\n");
      out.write("\r\n");
      out.write("                                                    <div class=\"or\">или</div>\r\n");
      out.write("                                                </div>\r\n");
      out.write("\r\n");
      out.write("                                                <form>\r\n");
      out.write("                                                    <fieldset>\r\n");
      out.write("                                                        <label class=\"block clearfix\">\r\n");
      out.write("                                                            <span class=\"block input-icon input-icon-right\">\r\n");
      out.write("                                                                <input type=\"text\" id=\"uname\" class=\"form-control\" placeholder=\"Ваш email\" />\r\n");
      out.write("                                                                <i class=\"icon-user\"></i>\r\n");
      out.write("                                                            </span>\r\n");
      out.write("                                                        </label>\r\n");
      out.write("\r\n");
      out.write("                                                        <label class=\"block clearfix\">\r\n");
      out.write("                                                            <span class=\"block input-icon input-icon-right\">\r\n");
      out.write("                                                                <input type=\"password\" id=\"password\" class=\"form-control\" placeholder=\"Пароль\" />\r\n");
      out.write("                                                                <i class=\"icon-lock\"></i>\r\n");
      out.write("                                                            </span>\r\n");
      out.write("                                                        </label>\r\n");
      out.write("\r\n");
      out.write("                                                        <div class=\"tools\">\r\n");
      out.write("                                                            <!--<div class=\"checkbox\">\r\n");
      out.write("                                                                <label>\r\n");
      out.write("                                                                    <input name=\"form-field-checkbox\" type=\"checkbox\" class=\"ace\">\r\n");
      out.write("                                                                    <span class=\"lbl\"> Запомнить меня</span>\r\n");
      out.write("                                                                </label>\r\n");
      out.write("                                                            </div>-->\r\n");
      out.write("                                                            <a href=\"#\" class=\"show-remember\">Напомнить пароль</a>\r\n");
      out.write("                                                        </div>\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("                                                        <div class=\"error-info login-error\"></div>\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("                                                        <div class=\"clearfix\">\r\n");
      out.write("\r\n");
      out.write("                                                            <button type=\"button\" data-tourl=\"");
      out.print(session.getAttribute("toURL"));
      out.write("\" class=\"width-100 btn btn-sm btn-primary no-border btn-login\">\r\n");
      out.write("                                                                Войти\r\n");
      out.write("                                                            </button>\r\n");
      out.write("                                                            <br>\r\n");
      out.write("                                                            <br>\r\n");
      out.write("                                                            <div><a href=\"/index.html\" class=\"reg-link\">Зарегистрируйтесь</a> если у вас нет аккаунта</div>\r\n");
      out.write("                                                        </div>\r\n");
      out.write("\r\n");
      out.write("                                                    </fieldset>\r\n");
      out.write("\r\n");
      out.write("                                                </form>\r\n");
      out.write("                                            </div>\r\n");
      out.write("\r\n");
      out.write("                                            <div class=\"remember hidden\">\r\n");
      out.write("                                                <form>\r\n");
      out.write("                                                    <fieldset>\r\n");
      out.write("                                                        <label class=\"block clearfix\">\r\n");
      out.write("\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"block input-icon input-icon-right\">\r\n");
      out.write("\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"email\" id=\"email\" class=\"form-control\" placeholder=\"Ваш email\" />\r\n");
      out.write("\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<i class=\"icon-user\"></i>\r\n");
      out.write("\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\r\n");
      out.write("                                                        </label>\r\n");
      out.write("\r\n");
      out.write("                                                        <div class=\"error-info login-error\"></div>\r\n");
      out.write("                                                        <br>\r\n");
      out.write("\r\n");
      out.write("                                                        <div class=\"clearfix\">\r\n");
      out.write("                                                            <button type=\"button\" class=\"width-100 btn btn-sm btn-primary no-border btn-remember\">\r\n");
      out.write("                                                                Восстановить пароль\r\n");
      out.write("                                                            </button>\r\n");
      out.write("\r\n");
      out.write("                                                            <a href=\"#\" class=\"btn-back pull-left\">Назад</a>\r\n");
      out.write("                                                        </div>\r\n");
      out.write("\r\n");
      out.write("                                                    </fieldset>\r\n");
      out.write("                                                </form>\r\n");
      out.write("                                            </div>\r\n");
      out.write("\r\n");
      out.write("\t\t\t\t\t\t\t\t\t\t</div>\r\n");
      out.write("\t\t\t\t\t\t\t\t\t</div>\r\n");
      out.write("\t\t\t\t\t\t\t\t</div>\r\n");
      out.write("\r\n");
      out.write("\t\t\t\t\t\t\t</div>\r\n");
      out.write("\t\t\t\t\t\t</div>\r\n");
      out.write("                        </div>\r\n");
      out.write("\r\n");
      out.write("\t\t\t\t\t</div>\r\n");
      out.write("\t\t\t\t</div>\r\n");
      out.write("\r\n");
      out.write("\t\t\t</div>\r\n");
      out.write("\t\t</div>\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("        <div class=\"footer footer-bottom footer-login footer-white col-sm-10 col-sm-offset-1\">\r\n");
      out.write("                <div class=\"pull-left\"><span class=\"copypast\">&copy;</span> ВместеОнлайн 2014</div>\r\n");
      out.write("                <div class=\"pull-right\">\r\n");
      out.write("                    <ul>\r\n");
      out.write("                        <li><a href=\"about\">О сайте</a></li>\r\n");
      out.write("                        <li><a href=\"blog\">Блог</a></li>\r\n");
      out.write("                        <li><a href=\"contacts\">Контакты</a></li>\r\n");
      out.write("                    </ul>\r\n");
      out.write("                </div>\r\n");
      out.write("        </div>\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("        <!-- файлы thrift -->\r\n");
      out.write("        <script src=\"static/js/thrift.js\" type=\"text/javascript\"></script>\r\n");
      out.write("        <script src=\"gen-js/authservice_types.js\" type=\"text/javascript\"></script>\r\n");
      out.write("        <script src=\"gen-js/AuthService.js\" type=\"text/javascript\"></script>        <!-- -->\r\n");
      out.write("\r\n");
      out.write("        <script src=\"static/js/login.js\"></script>\r\n");
      out.write("\r\n");
      out.write("        <!-- Yandex.Metrika counter -->\r\n");
      out.write("        <script type=\"text/javascript\">\r\n");
      out.write("            (function (d, w, c) {\r\n");
      out.write("                (w[c] = w[c] || []).push(function() {\r\n");
      out.write("                    try {\r\n");
      out.write("                        w.yaCounter25964365 = new Ya.Metrika({id:25964365,\r\n");
      out.write("                            clickmap:true,\r\n");
      out.write("                            trackLinks:true,\r\n");
      out.write("                            accurateTrackBounce:true,\r\n");
      out.write("                            trackHash:true,\r\n");
      out.write("                            ut:\"noindex\"});\r\n");
      out.write("                    } catch(e) { }\r\n");
      out.write("                });\r\n");
      out.write("\r\n");
      out.write("                var n = d.getElementsByTagName(\"script\")[0],\r\n");
      out.write("                        s = d.createElement(\"script\"),\r\n");
      out.write("                        f = function () { n.parentNode.insertBefore(s, n); };\r\n");
      out.write("                s.type = \"text/javascript\";\r\n");
      out.write("                s.async = true;\r\n");
      out.write("                s.src = (d.location.protocol == \"https:\" ? \"https:\" : \"http:\") + \"//mc.yandex.ru/metrika/watch.js\";\r\n");
      out.write("\r\n");
      out.write("                if (w.opera == \"[object Opera]\") {\r\n");
      out.write("                    d.addEventListener(\"DOMContentLoaded\", f, false);\r\n");
      out.write("                } else { f(); }\r\n");
      out.write("            })(document, window, \"yandex_metrika_callbacks\");\r\n");
      out.write("        </script>\r\n");
      out.write("        <noscript><div><img src=\"//mc.yandex.ru/watch/25964365?ut=noindex\" style=\"position:absolute; left:-9999px;\" alt=\"\" /></div></noscript>\r\n");
      out.write("        <!-- /Yandex.Metrika counter -->\r\n");
      out.write("\t</body>\r\n");
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

  private boolean _jspx_meth_c_if_0(PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  c:if
    org.apache.taglibs.standard.tag.rt.core.IfTag _jspx_th_c_if_0 = (org.apache.taglibs.standard.tag.rt.core.IfTag) _jspx_tagPool_c_if_test.get(org.apache.taglibs.standard.tag.rt.core.IfTag.class);
    _jspx_th_c_if_0.setPageContext(_jspx_page_context);
    _jspx_th_c_if_0.setParent(null);
    _jspx_th_c_if_0.setTest(((java.lang.Boolean) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${MESSAGE_TO_SHOW != null && MESSAGE_TO_SHOW != '' }", java.lang.Boolean.class, (PageContext)_jspx_page_context, null)).booleanValue());
    int _jspx_eval_c_if_0 = _jspx_th_c_if_0.doStartTag();
    if (_jspx_eval_c_if_0 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
      do {
        out.write("\r\n");
        out.write("                            <div class=\"message-to-show\"><span>");
        if (_jspx_meth_c_out_0((javax.servlet.jsp.tagext.JspTag) _jspx_th_c_if_0, _jspx_page_context))
          return true;
        out.write("</span></div>\r\n");
        out.write("                        ");
        int evalDoAfterBody = _jspx_th_c_if_0.doAfterBody();
        if (evalDoAfterBody != javax.servlet.jsp.tagext.BodyTag.EVAL_BODY_AGAIN)
          break;
      } while (true);
    }
    if (_jspx_th_c_if_0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _jspx_tagPool_c_if_test.reuse(_jspx_th_c_if_0);
      return true;
    }
    _jspx_tagPool_c_if_test.reuse(_jspx_th_c_if_0);
    return false;
  }

  private boolean _jspx_meth_c_out_0(javax.servlet.jsp.tagext.JspTag _jspx_th_c_if_0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  c:out
    org.apache.taglibs.standard.tag.rt.core.OutTag _jspx_th_c_out_0 = (org.apache.taglibs.standard.tag.rt.core.OutTag) _jspx_tagPool_c_out_value_nobody.get(org.apache.taglibs.standard.tag.rt.core.OutTag.class);
    _jspx_th_c_out_0.setPageContext(_jspx_page_context);
    _jspx_th_c_out_0.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_c_if_0);
    _jspx_th_c_out_0.setValue((java.lang.Object) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${MESSAGE_TO_SHOW}", java.lang.Object.class, (PageContext)_jspx_page_context, null));
    int _jspx_eval_c_out_0 = _jspx_th_c_out_0.doStartTag();
    if (_jspx_th_c_out_0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _jspx_tagPool_c_out_value_nobody.reuse(_jspx_th_c_out_0);
      return true;
    }
    _jspx_tagPool_c_out_value_nobody.reuse(_jspx_th_c_out_0);
    return false;
  }
}

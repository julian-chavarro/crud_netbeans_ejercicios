/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package controlador;

import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import modelo.Usuario;
import modelo.UsuarioDao;

@WebServlet(name = "UsuarioControlador", urlPatterns = {"/UsuarioControlador"})
public class UsuarioControlador extends HttpServlet {

    private final String NUEVOUSUARIO = "/vista/registroUsuario.jsp";
    UsuarioDao dao = new UsuarioDao();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        String accion = req.getParameter("accion");

        if (accion == null) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Acción no especificada");
            return;
        }

        switch (accion) {
            case "login":
                loginUsuario(req, resp);
                break;

            case "registrar":
                registrarUsuario(req, resp);
                break;

            default:
                resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Acción POST no válida: " + accion);
        }
    }

    
    // ====================================================
    //                    LOGIN
    // ====================================================
    private void loginUsuario(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        String correo = req.getParameter("correo");
        String password = req.getParameter("password");

        Usuario u = dao.Login(correo, password);

        if (u != null) {
            req.getSession().setAttribute("usuario", u);

            // REDIRECCIÓN CORRECTA (EVITA 404)
            resp.sendRedirect(req.getContextPath() + "/index.jsp");

        } else {
            req.getSession().setAttribute("error", "Credenciales incorrectas");

            // REDIRECCIÓN CORRECTA
            resp.sendRedirect(req.getContextPath() + "/vista/errorLogin.jsp");
        }
    }


    // ====================================================
    //               REGISTRAR USUARIO
    // ====================================================
    private void registrarUsuario(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        String nombre = req.getParameter("nombre");
        String correo = req.getParameter("correo");
        String password = req.getParameter("password");

        Usuario u = new Usuario();
        u.setNombre(nombre);
        u.setCorreo(correo);
        u.setPassword(password);

        boolean registrado = dao.registrar(u);

        if (registrado) {

            req.getSession().setAttribute("success", "Usuario registrado correctamente");

            // REDIRECCIÓN CORRECTA
            resp.sendRedirect(req.getContextPath() + "/vista/Login.jsp");

        } else {

            req.getSession().setAttribute("error", "Error al registrar usuario");

            // REDIRECCIÓN CORRECTA
            resp.sendRedirect(req.getContextPath() + "/vista/registroUsuario.jsp");
        }
    }

    
    @Override
    public String getServletInfo() {
        return "Controlador de usuarios";
    }
}


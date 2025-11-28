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

import modelo.objetivo;
import modelo.objetivoDao;

@WebServlet(name = "objetivoControlador", urlPatterns = {"/objetivoControlador"})
public class objetivoControlador extends HttpServlet {

    objetivoDao dao = new objetivoDao();

    // ====================================================
    //                    GET  (LISTAR, NUEVO, EDITAR)
    // ====================================================
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        String accion = req.getParameter("accion");

        if (accion == null) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Acción no especificada");
            return;
        }

        switch (accion) {

            case "listar":
                listar(req, resp);
                break;

            case "nuevo":
                req.getRequestDispatcher("/vista/objetivoNuevo.jsp").forward(req, resp);
                break;

            case "editar":
                editar(req, resp);
                break;

            default:
                resp.sendError(HttpServletResponse.SC_BAD_REQUEST,
                        "Acción GET no válida: " + accion);
        }
    }

    private void listar(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        req.setAttribute("lista", dao.listar());
        req.getRequestDispatcher("/vista/objetivos/listar.jsp").forward(req, resp);
    }

    private void editar(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        int id = Integer.parseInt(req.getParameter("id"));
        objetivo o = dao.obtenerPorId(id);

        req.setAttribute("item", o);
        req.getRequestDispatcher("/vista/objetivoEditar.jsp").forward(req, resp);
    }

    // ====================================================
    //                    POST (GUARDAR, ACTUALIZAR)
    // ====================================================
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        String accion = req.getParameter("accion");

        if (accion == null) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Acción no especificada");
            return;
        }

        switch (accion) {

            case "guardar":
                guardarObjetivo(req, resp);
                break;

            case "actualizar":
                actualizarObjetivo(req, resp);
                break;

            default:
                resp.sendError(HttpServletResponse.SC_BAD_REQUEST,
                        "Acción POST no válida: " + accion);
        }
    }

    // ====================================================
    //                  GUARDAR OBJETIVO
    // ====================================================
    private void guardarObjetivo(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        try {
            objetivo o = new objetivo();

            o.setUsuarioId(Integer.parseInt(req.getParameter("usuario_id")));
            o.setObjetivo(req.getParameter("objetivo"));
            o.setEdad(Integer.parseInt(req.getParameter("edad")));
            o.setEstatura(Double.parseDouble(req.getParameter("estatura")));
            o.setPeso(Double.parseDouble(req.getParameter("peso")));
            o.setActividad(req.getParameter("actividad"));

            if (dao.guardar(o)) {
                resp.sendRedirect(req.getContextPath() + "/index.jsp");
            } else {
                resp.sendRedirect(req.getContextPath() + "/vista/objetivoNuevo.jsp?error=1");
            }

        } catch (Exception e) {
            resp.sendRedirect(req.getContextPath() + "/vista/objetivoNuevo.jsp?error=1");
        }
    }

    // ====================================================
    //                 ACTUALIZAR OBJETIVO
    // ====================================================
    private void actualizarObjetivo(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        try {
            objetivo o = new objetivo();

            o.setId(Integer.parseInt(req.getParameter("id")));
            o.setObjetivo(req.getParameter("objetivo"));
            o.setEdad(Integer.parseInt(req.getParameter("edad")));
            o.setEstatura(Double.parseDouble(req.getParameter("estatura")));
            o.setPeso(Double.parseDouble(req.getParameter("peso")));
            o.setActividad(req.getParameter("actividad"));

            if (dao.actualizar(o)) {
                resp.sendRedirect(req.getContextPath() + "/index.");
            } else {
                resp.sendRedirect(req.getContextPath() + "/vista/objetivoEditar.jsp?error=1");
            }

        } catch (Exception e) {
            resp.sendRedirect(req.getContextPath() + "/vista/objetivoEditar.jsp?error=1");
        }
    }

}

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
 /*
 * Controlador para la gestión de ejercicios en la aplicación AdsoFitness
 */
package controlador;

import java.io.IOException;
import java.util.List;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import modelo.Ejercicio;
import modelo.EjercicioDao;

@WebServlet(name = "EjerciciosControlador", urlPatterns = {"/EjerciciosControlador"})
public class EjerciciosControlador extends HttpServlet {

    private final EjercicioDao ejercicioDao = new EjercicioDao();
    private final String LISTAR = "/vista/ejercicios/listar.jsp";
    private final String NUEVO = "/vista/ejercicios/nuevo.jsp";

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String accion = request.getParameter("accion");
        if (accion == null) {
            accion = "listar";
        }

        switch (accion) {
            case "listar":
                listar(request, response);
                break;
            case "nuevo":
                nuevo(request, response);
                break;
            case "editar":
                editar(request, response);
                break;
            case "eliminar":
                eliminar(request, response);
                break;
            default:
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Acción no válida: " + accion);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String accion = request.getParameter("accion");

        if ("guardar".equals(accion)) {
            guardar(request, response);
        } else {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Acción POST no válida: " + accion);
        }
    }

    // ✅ Mostrar lista de ejercicios
    private void listar(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        List<Ejercicio> lista = ejercicioDao.ListarTodosEjercicios();
        request.setAttribute("ejercicios", lista);
        request.getRequestDispatcher(LISTAR).forward(request, response);
    }

    // ✅ Mostrar formulario de nuevo ejercicio
    private void nuevo(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        request.setAttribute("ejercicio", new Ejercicio());
        request.getRequestDispatcher(NUEVO).forward(request, response);
    }

    // ✅ Guardar o actualizar ejercicio
    private void guardar(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        Ejercicio e = new Ejercicio();
        String idParam = request.getParameter("id");
        int id = (idParam != null && !idParam.isEmpty()) ? Integer.parseInt(idParam) : 0;
        e.setId(id);
        e.setNombre(request.getParameter("nombre"));
        e.setDescripcion(request.getParameter("descripcion"));
        e.setCategoria(request.getParameter("categoria"));
        e.setNivel(request.getParameter("nivel"));

        int result;
        if (e.getId() == 0) {
            result = ejercicioDao.RegistrarNuevoEjercicio(e);
        } else {
            result = ejercicioDao.EditarEjercicio(e);
        }

        if (result > 0) {
            request.getSession().setAttribute("success", "✅ Ejercicio guardado correctamente");
            response.sendRedirect("EjerciciosControlador?accion=listar");
        } else {
            request.getSession().setAttribute("error", "❌ No se pudo guardar el ejercicio");
            request.setAttribute("ejercicio", e);
            request.getRequestDispatcher(NUEVO).forward(request, response);
        }
    }

    // ✅ Editar ejercicio existente
    private void editar(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        int id = Integer.parseInt(request.getParameter("id"));
        Ejercicio e = ejercicioDao.BuscarEjercicioPorId(id);

        if (e != null) {
            request.setAttribute("ejercicio", e);
            request.getRequestDispatcher(NUEVO).forward(request, response);
        } else {
            request.getSession().setAttribute("error", "❌ No se encontró el ejercicio con ID: " + id);
            response.sendRedirect("EjerciciosControlador?accion=listar");
        }
    }

    // ✅ Eliminar ejercicio
    private void eliminar(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        int id = Integer.parseInt(request.getParameter("id"));
        int result = ejercicioDao.EliminarEjercicio(id);

        if (result > 0) {
            request.getSession().setAttribute("success", "🗑️ Ejercicio eliminado correctamente");
        } else {
            request.getSession().setAttribute("error", "❌ No se pudo eliminar el ejercicio");
        }

        response.sendRedirect("EjerciciosControlador?accion=listar");
    }

    @Override
    public String getServletInfo() {
        return "Controlador de ejercicios para AppFitness";
    }
}


/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
 /*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package modelo;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

public class EjercicioDao {

    private Connection conn = null;
    private PreparedStatement stmt = null;
    private ResultSet rs = null;

    // ✅ Listar todos los ejercicios
    public ArrayList<Ejercicio> ListarTodosEjercicios() {
        ArrayList<Ejercicio> ejercicios = new ArrayList<>();
        try {
            conn = ConexionDao.ObtenerConexion();
            String sql = "SELECT * FROM ejercicios_ejercicio";
            stmt = conn.prepareStatement(sql);
            rs = stmt.executeQuery();

            while (rs.next()) {
                Ejercicio e = new Ejercicio();
                e.setId(rs.getInt("id"));
                e.setNombre(rs.getString("nombre"));
                e.setDescripcion(rs.getString("descripcion"));
                e.setCategoria(rs.getString("categoria"));
                e.setNivel(rs.getString("nivel"));
                ejercicios.add(e);
            }

        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            cerrarRecursos();
        }
        return ejercicios;
    }

    // ✅ Registrar un nuevo ejercicio
    public int RegistrarNuevoEjercicio(Ejercicio e) {
        int result = 0;
        try {
            conn = ConexionDao.ObtenerConexion();
            String sql = "INSERT INTO ejercicios_ejercicio(nombre, descripcion, categoria, nivel, creado) VALUES(?,?,?,?,?)";
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, e.getNombre());
            stmt.setString(2, e.getDescripcion());
            stmt.setString(3, e.getCategoria());
            stmt.setString(4, e.getNivel());
            stmt.setDate(5, new Date(2025,10,2));
            result = stmt.executeUpdate();

        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            cerrarRecursos();
        }
        return result;
    }

    // ✅ Editar un ejercicio existente
    public int EditarEjercicio(Ejercicio e) {
        int result = 0;
        try {
            conn = ConexionDao.ObtenerConexion();
            String sql = "UPDATE ejercicios_ejercicio SET nombre=?, descripcion=?, categoria=?, nivel=? WHERE id=?";
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, e.getNombre());
            stmt.setString(2, e.getDescripcion());
            stmt.setString(3, e.getCategoria());
            stmt.setString(4, e.getNivel());
            stmt.setInt(5, e.getId());
            result = stmt.executeUpdate();

        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            cerrarRecursos();
        }
        return result;
    }

    // ✅ Buscar ejercicio por ID
    public Ejercicio BuscarEjercicioPorId(int id) {
        Ejercicio e = null;
        try {
            conn = ConexionDao.ObtenerConexion();
            String sql = "SELECT * FROM ejercicios_ejercicio WHERE id=?";
            stmt = conn.prepareStatement(sql);
            stmt.setInt(1, id);
            rs = stmt.executeQuery();

            if (rs.next()) {
                e = new Ejercicio();
                e.setId(rs.getInt("id"));
                e.setNombre(rs.getString("nombre"));
                e.setDescripcion(rs.getString("descripcion"));
                e.setCategoria(rs.getString("categoria"));
                e.setNivel(rs.getString("nivel"));
            }

        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            cerrarRecursos();
        }
        return e;
    }

    // ✅ Eliminar ejercicio
    public int EliminarEjercicio(int id) {
        int result = 0;
        try {
            conn = ConexionDao.ObtenerConexion();
            String sql = "DELETE FROM ejercicios_ejercicio WHERE id=?";
            stmt = conn.prepareStatement(sql);
            stmt.setInt(1, id);
            result = stmt.executeUpdate();

        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            cerrarRecursos();
        }
        return result;
    }

    // ✅ Método para cerrar recursos
    private void cerrarRecursos() {
        try {
            if (rs != null) rs.close();
            if (stmt != null) stmt.close();
            if (conn != null) conn.close();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}



   
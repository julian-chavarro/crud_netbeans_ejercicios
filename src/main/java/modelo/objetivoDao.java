/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package modelo;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class objetivoDao {

    Connection con;
    ConexionDao cn = new ConexionDao();
    PreparedStatement ps;
    ResultSet rs;

    // ====================================================
    //                GUARDAR OBJETIVO
    // ====================================================
    public boolean guardar(objetivo o) {
        String sql = "INSERT INTO objetivos (usuario_id, objetivo, edad, estatura, peso, actividad) "
                   + "VALUES (?, ?, ?, ?, ?, ?)";

        try {
            con = cn.conectar();
            ps = con.prepareStatement(sql);

            ps.setInt(1, o.getUsuarioId());
            ps.setString(2, o.getObjetivo());
            ps.setInt(3, o.getEdad());
            ps.setDouble(4, o.getEstatura());
            ps.setDouble(5, o.getPeso());
            ps.setString(6, o.getActividad());

            ps.executeUpdate();
            return true;

        } catch (SQLException e) {
            System.out.println("❌ Error al guardar objetivo: " + e.getMessage());
            return false;
        }
    }

    // ====================================================
    //               ACTUALIZAR OBJETIVO
    // ====================================================
    public boolean actualizar(objetivo o) {
        String sql = "UPDATE objetivos SET objetivo=?, edad=?, estatura=?, peso=?, actividad=? "
                   + "WHERE id=?";

        try {
            con = cn.conectar();
            ps = con.prepareStatement(sql);

            ps.setString(1, o.getObjetivo());
            ps.setInt(2, o.getEdad());
            ps.setDouble(3, o.getEstatura());
            ps.setDouble(4, o.getPeso());
            ps.setString(5, o.getActividad());
            ps.setInt(6, o.getId());

            ps.executeUpdate();
            return true;

        } catch (SQLException e) {
            System.out.println("❌ Error al actualizar objetivo: " + e.getMessage());
            return false;
        }
    }

    // ====================================================
    //         OBTENER OBJETIVO POR ID_USUARIO
    // ====================================================
    public objetivo obtenerPorUsuario(int usuarioId) {
        String sql = "SELECT * FROM objetivos WHERE usuario_id = ?";
        objetivo o = null;

        try {
            con = cn.conectar();
            ps = con.prepareStatement(sql);
            ps.setInt(1, usuarioId);
            rs = ps.executeQuery();

            if (rs.next()) {
                o = new objetivo();
                o.setId(rs.getInt("id"));
                o.setUsuarioId(rs.getInt("usuario_id"));
                o.setObjetivo(rs.getString("objetivo"));
                o.setEdad(rs.getInt("edad"));
                o.setEstatura(rs.getDouble("estatura"));
                o.setPeso(rs.getDouble("peso"));
                o.setActividad(rs.getString("actividad"));
            }

        } catch (SQLException e) {
            System.out.println("❌ Error al obtener objetivo: " + e.getMessage());
        }

        return o;
    }

    // ====================================================
    //                   LISTAR OBJETIVOS
    // ====================================================
    public List<objetivo> listar() {
        List<objetivo> lista = new ArrayList<>();
        String sql = "SELECT * FROM objetivos";

        try {
            con = cn.conectar();
            ps = con.prepareStatement(sql);
            rs = ps.executeQuery();

            while (rs.next()) {
                objetivo o = new objetivo();
                o.setId(rs.getInt("id"));
                o.setUsuarioId(rs.getInt("usuario_id"));
                o.setObjetivo(rs.getString("objetivo"));
                o.setEdad(rs.getInt("edad"));
                o.setEstatura(rs.getDouble("estatura"));
                o.setPeso(rs.getDouble("peso"));
                o.setActividad(rs.getString("actividad"));

                lista.add(o);
            }

        } catch (SQLException e) {
            System.out.println("❌ Error en listar objetivos: " + e.getMessage());
        }

        return lista;
    }

    // ====================================================
    //             OBTENER OBJETIVO POR ID
    // ====================================================
    public objetivo obtenerPorId(int id) {
        objetivo o = null;
        String sql = "SELECT * FROM objetivos WHERE id = ?";

        try {
            con = cn.conectar();
            ps = con.prepareStatement(sql);
            ps.setInt(1, id);
            rs = ps.executeQuery();

            if (rs.next()) {
                o = new objetivo();
                o.setId(rs.getInt("id"));
                o.setUsuarioId(rs.getInt("usuario_id"));
                o.setObjetivo(rs.getString("objetivo"));
                o.setEdad(rs.getInt("edad"));
                o.setEstatura(rs.getDouble("estatura"));
                o.setPeso(rs.getDouble("peso"));
                o.setActividad(rs.getString("actividad"));
            }

        } catch (SQLException e) {
            System.out.println("❌ Error en obtener objetivo por ID: " + e.getMessage());
        }

        return o;
    }
}

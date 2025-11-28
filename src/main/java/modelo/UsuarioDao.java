/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package modelo;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class UsuarioDao {

    Connection con;
    ConexionDao cn = new ConexionDao();
    PreparedStatement ps;

    // ============================
    //  REGISTRAR USUARIO
    // ============================
    public boolean registrar(Usuario u) {
        String sql = "INSERT INTO usuario(nombre, correo, password) VALUES (?,?,?)";

        try {
            con = cn.conectar();
            ps = con.prepareStatement(sql);

            ps.setString(1, u.getNombre());
            ps.setString(2, u.getCorreo());
            ps.setString(3, u.getPassword());

            ps.executeUpdate();
            return true;

        } catch (Exception e) {
            System.out.println("Error al registrar: " + e.getMessage());
            return false;
        }
    }

    // ============================
    //        LOGIN USUARIO
    // ============================
    public Usuario Login(String correo, String password) {
        String sql = "SELECT * FROM usuario WHERE correo=? AND password=?";
        Usuario user = null;

        try {
            con = cn.conectar();
            ps = con.prepareStatement(sql);

            ps.setString(1, correo);
            ps.setString(2, password);

            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                user = new Usuario();
                user.setId(rs.getInt("id"));
                user.setNombre(rs.getString("nombre"));
                user.setCorreo(rs.getString("correo"));
            }

        } catch (Exception e) {
            System.out.println("❌ Error en login: " + e.getMessage());
        }

        return user;  // si es null = credenciales incorrectas
    }

}

    

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package modelo;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConexionDao {

    private static final String URL = "jdbc:mysql://127.0.0.1:3306/adsofitness?useSSL=false&serverTimezone=UTC";
    private static final String USER = "root";
    private static final String PASSWORD = "";

    // Método principal para obtener conexión
    public static Connection ObtenerConexion() {
        Connection conn = null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(URL, USER, PASSWORD);
            System.out.println("✅ Conexión exitosa a la base de datos");
        } catch (ClassNotFoundException e) {
            System.out.println("❌ Driver no encontrado: " + e.getMessage());
        } catch (SQLException e) {
            System.out.println("❌ Error de conexión: " + e.getMessage());
        }
        return conn;
    }

    // Método compatible con DAOs
    public static Connection getConnection() {
        return ObtenerConexion();
    }

    // Para depuración
    public static void main(String[] args) {
        try (Connection conn = ConexionDao.ObtenerConexion()) {
            if (conn != null && !conn.isClosed()) {
                System.out.println("Conexión exitosa!");
            } else {
                System.out.println("No se pudo conectar.");
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    // MÉTODO QUE USAN TUS DAO
    public Connection conectar() {
        return ObtenerConexion();
    }
}





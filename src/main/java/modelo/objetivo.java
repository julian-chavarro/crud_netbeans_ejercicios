/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package modelo;

public class objetivo {

    private int id;
    private int usuarioId;
    private String objetivo;   // ganar_masa, perder_grasa, tonificar, mantener
    private int edad;
    private double estatura;
    private double peso;
    private String actividad;  // baja, media, alta

    public objetivo() {
    }

    public objetivo(int id, int usuarioId, String objetivo, int edad, double estatura, double peso, String actividad) {
        this.id = id;
        this.usuarioId = usuarioId;
        this.objetivo = objetivo;
        this.edad = edad;
        this.estatura = estatura;
        this.peso = peso;
        this.actividad = actividad;
    }

    // ===================== GETTERS Y SETTERS =====================

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(int usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getObjetivo() {
        return objetivo;
    }

    public void setObjetivo(String objetivo) {
        this.objetivo = objetivo;
    }

    public int getEdad() {
        return edad;
    }

    public void setEdad(int edad) {
        this.edad = edad;
    }

    public double getEstatura() {
        return estatura;
    }

    public void setEstatura(double estatura) {
        this.estatura = estatura;
    }

    public double getPeso() {
        return peso;
    }

    public void setPeso(double peso) {
        this.peso = peso;
    }

    public String getActividad() {
        return actividad;
    }

    public void setActividad(String actividad) {
        this.actividad = actividad;
    }
}

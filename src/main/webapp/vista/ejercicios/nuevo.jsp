<%-- 
    Document   : nuevo
    Created on : 12/10/2025, 7:25:07 p. m.
    Author     : ASUS
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="jakarta.tags.core" %>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>AppFitness | Nuevo Ejercicio</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet">

        <style>
            body {
                background: #f2f4f7;
            }
            .custom-container {
                background: #fff;
                border-radius: 18px;
                box-shadow: 0 4px 24px rgba(0,0,0,0.10);
                margin: 40px auto;
                padding: 32px;
                max-width: 1000px;
            }
            .custom-title {
                font-weight: 700;
                color: #222;
                margin-bottom: 25px;
            }
            .btn i {
                margin-right: 4px;
            }
        </style>
    </head>
    <body>

        <div class="custom-container">
            <h2>Nuevo Ejercicio</h2>
            <form action="EjerciciosControlador?accion=guardar" method="post">
            <input type="hidden" name="id" value="${ejercicio.id}">
            <div class="form-group">
              <label for="nombre">Nombre:</label>
              <input type="text" class="form-control" id="nombre" name="nombre" value="${ejercicio.nombre}">
            </div>
            <div class="form-group">
              <label for="descripcion">Descripción:</label>
              <input type="text" class="form-control" id="descripcion" name="descripcion" value="${ejercicio.descripcion}">
            </div>
            <div class="form-group">
              <label for="categoria">Categoría:</label>
              <input type="text" class="form-control" id="categoria" name="categoria" value="${ejercicio.categoria}" >
            </div>
            <div class="form-group">
              <label for="nivel">Nivel:</label>
              <input type="text" class="form-control" id="nivel" name="nivel" value="${ejercicio.nivel}" >
            </div>
            <br>
            <input type="submit" class="btn btn-primary" value="Guardar">
          </form>
            <%-- <form action="EjerciciosControlador?accion=guardar" method="post">
                <input type="hidden" name="id" value="${ejercicio.id}">
                Nombre: <input type="text" name="nombre" value="${ejercicio.nombre}"><br>
                Descripción: <input type="text" name="descripcion" value="${ejercicio.descripcion}"><br>
                Categoría: <input type="text" name="categoria" value="${ejercicio.categoria}"><br>
                Nivel: <input type="text" name="nivel" value="${ejercicio.nivel}"><br>
                <input type="submit" value="Guardar">
            </form> --%>
        </div>

        <script src="https://kit.fontawesome.com/a2e0e9e6f6.js" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js"></script>
    </body>
</html>
 

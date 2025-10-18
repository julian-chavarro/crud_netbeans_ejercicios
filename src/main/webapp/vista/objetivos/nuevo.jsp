<%-- 
    Document   : nuevo
    Created on : 12/10/2025, 7:21:18 p. m.
    Author     : ASUS
--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Nuevo Ejercicio</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
</head>
<body class="bg-light">

<div class="container mt-4">
    <h2 class="text-center mb-4">📝 Agregar Nuevo Ejercicio</h2>

    <form action="EjerciciosControlador" method="get" class="card p-4 shadow-sm">
        <input type="hidden" name="action" value="insertar">

        <div class="mb-3">
            <label class="form-label">Nombre</label>
            <input type="text" name="nombre" class="form-control" required>
        </div>

        <div class="mb-3">
            <label class="form-label">Descripción</label>
            <textarea name="descripcion" class="form-control" rows="3" required></textarea>
        </div>

        <div class="mb-3">
            <label class="form-label">Categoría</label>
            <input type="text" name="categoria" class="form-control" required>
        </div>

        <div class="d-flex justify-content-between">
            <a href="EjerciciosControlador?action=listar" class="btn btn-secondary">🔙 Volver</a>
            <button type="submit" class="btn btn-success">💾 Guardar</button>
        </div>
    </form>
</div>

</body>
</html>

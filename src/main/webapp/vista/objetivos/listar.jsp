<%-- 
    Document   : listar
    Created on : 12/10/2025, 7:20:51 p. m.
    Author     : ASUS
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="jakarta.tags.core" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>AppFitness | Configurar Objetivo</title>

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
            max-width: 650px;
        }
        .custom-title {
            font-weight: 700;
            color: #222;
            margin-bottom: 22px;
        }
    </style>
</head>

<body>

    <div class="custom-container">
        <h2 class="custom-title text-center">Configurar Mi Objetivo</h2>
        <hr>

        <form action="objetivoControlador" method="post">

            <input type="hidden" name="accion" value="guardarObjetivo">
            <input type="hidden" name="usuario_id" value="${sessionScope.usuario.id}">

            <!-- OBJETIVO -->
            <div class="mb-3">
                <label class="form-label">Selecciona tu objetivo</label>
                <select name="objetivo" class="form-select" required>
                    <option value="">-- Selecciona --</option>
                    <option value="ganar_masa">Ganar masa muscular</option>
                    <option value="perder_grasa">Perder grasa</option>
                    <option value="tonificar">Tonificar</option>
                    <option value="mantener">Mantenerme igual</option>
                </select>
            </div>

            <!-- EDAD -->
            <div class="mb-3">
                <label class="form-label">Edad</label>
                <input type="number" name="edad" class="form-control" min="12" max="90" required>
            </div>

            <!-- ESTATURA -->
            <div class="mb-3">
                <label class="form-label">Estatura (cm)</label>
                <input type="number" name="estatura" class="form-control" required>
            </div>

            <!-- PESO -->
            <div class="mb-3">
                <label class="form-label">Peso (kg)</label>
                <input type="number" name="peso" class="form-control" step="0.1" required>
            </div>

            <!-- ACTIVIDAD -->
            <div class="mb-3">
                <label class="form-label">Actividad física diaria</label>
                <select name="actividad" class="form-select" required>
                    <option value="">-- Selecciona --</option>
                    <option value="baja">Baja</option>
                    <option value="media">Media</option>
                    <option value="alta">Alta</option>
                </select>
            </div>

            <button class="btn btn-success w-100 mt-3">
                Guardar Objetivo
            </button>
        </form>

    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>


<%-- 
    Document   : index
    Created on : 12/10/2025, 7:08:29 p. m.
    Author     : ASUS
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Dashboard - App Fitness</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        body {
            background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
            font-family: 'Arial', sans-serif;
            min-height: 100vh;
        }
        .main-container {
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            margin: 30px auto;
            max-width: 900px;
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #6c5ce7, #a29bfe);
            color: white;
            text-align: center;
            padding: 30px 20px;
        }
        .menu-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 30px;
        }
        .menu-item {
            background: #f8f9fa;
            border-radius: 10px;
            text-align: center;
            padding: 25px;
            text-decoration: none;
            color: #333;
            transition: all 0.3s ease;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .menu-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 20px rgba(0,0,0,0.15);
        }
        .menu-icon { font-size: 3rem; margin-bottom: 15px; display: block; }
        .menu-title { font-weight: bold; font-size: 1.2rem; margin-bottom: 5px; }
        .menu-desc { font-size: 0.9rem; color: #666; }
    </style>
</head>
<body>
    <div class="container main-container">
        <div class="header">
            <h1><i class="fas fa-dumbbell"></i> App Fitness</h1>
            <p>Gestiona tu entrenamiento y dieta</p>
        </div>

        <div class="menu-grid">
            <!-- ✅ Objetivos -->
            <a href="ObjetivosServlet" class="menu-item">
                <i class="fas fa-bullseye menu-icon"></i>
                <div class="menu-title">Objetivos</div>
                <div class="menu-desc">Configura tus metas de entrenamiento</div>
            </a>

            <!-- ✅ Ejercicios -->
            <a href="EjerciciosControlador?accion=listar" class="menu-item">
                <i class="fas fa-dumbbell menu-icon"></i>
                <div class="menu-title">Ejercicios</div>
                <div class="menu-desc">Visualiza tus ejercicios</div>
            </a>

            <!-- ✅ Comidas -->
            <a href="ComidasServlet" class="menu-item">
                <i class="fas fa-utensils menu-icon"></i>
                <div class="menu-title">Comidas</div>
                <div class="menu-desc">Planifica tu dieta diaria</div>
            </a>

            <!-- ✅ Progreso -->
            <a href="ProgresoServlet" class="menu-item">
                <i class="fas fa-chart-line menu-icon"></i>
                <div class="menu-title">Progreso</div>
                <div class="menu-desc">Consulta tus estadísticas</div>
            </a>
        </div>
    </div>
</body>
</html>


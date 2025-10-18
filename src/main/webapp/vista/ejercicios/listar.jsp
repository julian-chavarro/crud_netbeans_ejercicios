<%-- 
    Document   : listar
    Created on : 12/10/2025, 7:24:58 p. m.
    Author     : ASUS
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="jakarta.tags.core" %>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>AppFitness | Gestión de Ejercicios</title>
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
            <h2 class="custom-title text-center">AppFitness | Gestión de Ejercicios</h2>
            <hr/>

            <div class="d-flex justify-content-end mb-3">
                <a href="EjerciciosControlador?accion=nuevo" class="btn btn-success btn-sm">
                    <i class="fa-solid fa-plus"></i> Nuevo Ejercicio
                </a>
            </div>

            <table class="table table-striped table-hover">
                <thead class="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Categoría</th>
                        <th>Nivel</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <c:forEach items="${ejercicios}" var="item">
                        <tr>
                            <td>${item.id}</td>
                            <td>${item.nombre}</td>
                            <td>${item.descripcion}</td>
                            <td>${item.categoria}</td>
                            <td>${item.nivel}</td>
                            <td>
                                <div class="d-flex gap-2">
                                    <a href="EjerciciosControlador?accion=editar&id=${item.id}" class="btn btn-warning btn-sm">
                                        <i class="fa-solid fa-pencil"></i> Editar
                                    </a>
                                    <a href="EjerciciosControlador?accion=eliminar&id=${item.id}" class="btn btn-danger btn-sm" onclick="return confirm('¿Seguro que deseas eliminar este ejercicio?')">
                                        <i class="fa-solid fa-trash"></i> Eliminar
                                    </a>
                                </div>
                            </td>
                        </tr>
                    </c:forEach>

                    <c:if test="${ejercicios.size() == 0}">
                        <tr>
                            <td colspan="6" class="text-center text-muted">
                                No hay ejercicios registrados.
                            </td>
                        </tr>
                    </c:if>
                </tbody>
            </table>
        </div>

        <script src="https://kit.fontawesome.com/a2e0e9e6f6.js" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js"></script>
    </body>
</html>

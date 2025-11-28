<%-- 
    Document   : registroUsuario
    Created on : 16/11/2025, 10:29:00 a. m.
    Author     : ASUS
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Crear Cuenta | ADSO Fitness</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

    <style>
        body {
            background: linear-gradient(135deg, #0f0f0f, #1a1a1a);
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: 'Poppins', sans-serif;
        }
        .login-card {
            width: 380px;
            background: #ffffff;
            border-radius: 15px;
            padding: 35px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.25);
        }
        .btn-primary {
            background-color: #198754;
            border: none;
        }
        .btn-primary:hover {
            background-color: #157347;
        }
        .links a {
            text-decoration: none;
            color: #198754;
            font-weight: 500;
        }
        .links a:hover {
            text-decoration: underline;
        }
        .logo {
            font-size: 28px;
            font-weight: bold;
            color: #198754;
            text-align: center;
            margin-bottom: 15px;
        }
    </style>
</head>

<body>

    <div class="login-card">

        <div class="logo">ADSO Fitness</div>
        <h4 class="text-center mb-4">Crear Cuenta</h4>

        <form action="UsuarioControlador" method="post">
            <input type="hidden" name="accion" value="registrar">

            <div class="mb-3">
                <label class="form-label">Nombre Completo</label>
                <input type="text" class="form-control" name="nombre" required>
            </div>

            <div class="mb-3">
                <label class="form-label">Correo Electrónico</label>
                <input type="email" class="form-control" name="correo" required>
            </div>

            <div class="mb-3">
                <label class="form-label">Contraseña</label>
                <input type="password" class="form-control" name="password" required>
            </div>

            <button type="submit" class="btn btn-primary w-100 py-2 mt-2">
                Crear Cuenta
            </button>
        </form>

        <div class="text-center mt-4 links">
            <a href="login.jsp">¿Ya tienes cuenta? Inicia sesión</a>
        </div>

    </div>

</body>
</html>

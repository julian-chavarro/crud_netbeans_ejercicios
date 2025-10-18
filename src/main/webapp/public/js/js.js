/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */
function showScreen(screenId) {
  const screens = [
    'loginContainer',
    'createAccount',
    'welcomeScreen',
    'objetivosForm',
    'mainApp',
    'comidasRecomendadas',
    'rutinaSemanal',
    'recoverContainer',     
    'resetContainer'         
  ];
  screens.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });
  const showEl = document.getElementById(screenId);
  if (showEl) showEl.classList.remove('hidden');
}

function createAccount() {
  showScreen('createAccount');
}

function gotologin() {
  showScreen('loginContainer');
}


function registrarUsuario() {
  const user = document.getElementById("userName").value.trim();
  const pass = document.getElementById("userPass").value;
  const confirm = document.getElementById("userPassConfirm").value;
  const error = document.getElementById("errorMsg");

  // Validaciones
  const userValido = user.length >= 5;
  const passValida = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(pass);

  if (!userValido) {
    error.textContent = "❌ El nombre de usuario debe tener al menos 5 caracteres.";
    error.classList.remove("hidden");
  } else if (!passValida) {
    error.textContent = "❌ La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.";
    error.classList.remove("hidden");
  } else if (pass !== confirm) {
    error.textContent = "❌ Las contraseñas no coinciden.";
    error.classList.remove("hidden");
  } else {
    error.classList.add("hidden");

    const usuario = {
      nombre: user,
      clave: pass,
      objetivosCompletos: false,
    };

    localStorage.setItem("usuarioActual", JSON.stringify(usuario));
    showScreen('welcomeScreen');
  }
}

function login() {
  const inputUser = document.getElementById("loginUser").value;
  const inputPass = document.getElementById("loginPass").value;
  const loginError = document.getElementById("loginError");
  const recordar = document.getElementById("recordarDatos").checked;

  const usuarioGuardado = JSON.parse(localStorage.getItem("usuarioActual"));

  // Guardar usuario y contraseña si el checkbox está marcado
  if (recordar) {
    localStorage.setItem("loginUser", inputUser);
    localStorage.setItem("loginPass", inputPass);
  } else {
    localStorage.removeItem("loginUser");
    localStorage.removeItem("loginPass");
  }

  if (usuarioGuardado) {
    if (inputUser === usuarioGuardado.nombre && inputPass === usuarioGuardado.clave) {
      loginError.classList.add("hidden");
      if (usuarioGuardado.objetivosCompletos) {
        document.getElementById("welcomeMessage").textContent = `¡Hola ${usuarioGuardado.nombre}!`;
        document.getElementById("objetivo-usuario").textContent = usuarioGuardado.objetivos?.objetivo || '';
        document.getElementById("calorias-total-main").textContent = usuarioGuardado.objetivos?.tdee || '';
        showScreen('mainApp');
      } else {
        showScreen('objetivosForm');
      }
    } else {
      loginError.classList.remove("hidden");
    }
  } else {
    loginError.textContent = "❌ No hay usuario registrado. Por favor, regístrate primero.";
    loginError.classList.remove("hidden");
  }
}

// Al cargar la página, autocompleta si hay datos guardados
window.addEventListener("DOMContentLoaded", function() {
  const savedUser = localStorage.getItem("loginUser");
  const savedPass = localStorage.getItem("loginPass");
  if (savedUser && savedPass) {
    document.getElementById("loginUser").value = savedUser;
    document.getElementById("loginPass").value = savedPass;
    document.getElementById("recordarDatos").checked = true;
  }
});

function mostrarMainApp() {
  const usuario = JSON.parse(localStorage.getItem("usuarioActual"));
  const mainApp = document.getElementById("mainApp");
  const welcomeMessage = document.getElementById("welcomeMessage");
  const objetivosSection = document.getElementById("objetivosForm");

  welcomeMessage.textContent = `Hola, ${usuario.nombre}!`;

  if (usuario.objetivosCompletos) {
    objetivosSection.classList.add("hidden");
    mainApp.classList.remove("hidden");
  } else {
    objetivosSection.classList.remove("hidden");
  }
}


function volverMain() {
  document.getElementById("rutinaSemanal").classList.add("hidden");
  document.getElementById("comidasRecomendadas").classList.add("hidden");
  document.getElementById("mainApp").classList.remove("hidden");
}

function Objetivos() {
  const edad = parseInt(document.getElementById("edad").value);
  const sexo = document.getElementById("sexo").value;
  const peso = parseFloat(document.getElementById("peso").value);
  const estatura = parseFloat(document.getElementById("estatura").value);
  const actividad = document.getElementById("actividad").value;
  const trabajo = document.getElementById("trabajo").value;
  const objetivo = document.getElementById("objetivo").value;
  const diasEntreno = parseInt(document.getElementById("diasEntreno").value);

  if (!edad || !sexo || !peso || !estatura || !actividad || !trabajo || !objetivo || !diasEntreno) {
    alert("Por favor, llena todos los campos.");
    return;
  }

  let tmb = (sexo === "masculino")
    ? (10 * peso) + (6.25 * estatura) - (5 * edad) + 5
    : (10 * peso) + (6.25 * estatura) - (5 * edad) - 161;

  let factor = 1.2;
  if (actividad === "ligero") factor = 1.375;
  else if (actividad === "moderado") factor = 1.55;
  else if (actividad === "intenso") factor = 1.725;
  else if (actividad === "muy_intenso") factor = 1.9;

  if (trabajo === "activo") factor += 0.1;
  else if (trabajo === "fisico") factor += 0.2;

  const tdee = Math.round(tmb * factor);

  const usuario = JSON.parse(localStorage.getItem("usuarioActual"));
  usuario.objetivos = {
    edad, sexo, peso, estatura, actividad, trabajo, objetivo, diasEntreno,
    tmb: Math.round(tmb),
    tdee
  };
  usuario.objetivosCompletos = true;

  localStorage.setItem("usuarioActual", JSON.stringify(usuario));

  document.getElementById("calorias-total-main").textContent = tdee;
  document.getElementById("welcomeMessage").textContent = `¡Hola ${usuario.nombre}!`;

  document.getElementById("objetivosForm").classList.add("hidden");
  document.getElementById("mainApp").classList.remove("hidden");
  document.getElementById("objetivo-usuario").textContent = objetivo;
}

const menusComidas = {
  masculino: {
    "Ganar masa muscular": [
      { min: 1500, max: 2000, menu: [
        { nombre: "Desayuno", items: ["5 claras de huevo (170 kcal)", "80g avena (312 kcal)", "1 plátano (105 kcal)", "20g nueces (133 kcal)"], total: 720 },
        { nombre: "Almuerzo", items: ["150g pechuga de pollo (248 kcal)", "200g arroz integral (220 kcal)", "100g brócoli (34 kcal)", "1 cda. aceite de oliva (119 kcal)"], total: 621 },
        { nombre: "Cena", items: ["150g salmón (309 kcal)", "200g patata cocida (172 kcal)", "100g espinacas (23 kcal)", "1 yogur natural (80 kcal)"], total: 584 }
      ]},
      { min: 2001, max: 2500, menu: [
        { nombre: "Desayuno", items: ["6 claras de huevo (204 kcal)", "100g avena (389 kcal)", "1 plátano (105 kcal)", "30g nueces (200 kcal)"], total: 898 },
        { nombre: "Almuerzo", items: ["200g pechuga de pollo (330 kcal)", "250g arroz integral (275 kcal)", "100g brócoli (34 kcal)", "1 cda. aceite de oliva (119 kcal)"], total: 758 },
        { nombre: "Cena", items: ["200g salmón (412 kcal)", "250g patata cocida (215 kcal)", "100g espinacas (23 kcal)", "1 yogur natural (80 kcal)"], total: 730 }
      ]},
      { min: 2501, max: 3000, menu: [
        { nombre: "Desayuno", items: ["7 claras de huevo (238 kcal)", "120g avena (467 kcal)", "1 plátano (105 kcal)", "40g nueces (267 kcal)"], total: 1077 },
        { nombre: "Almuerzo", items: ["250g pechuga de pollo (413 kcal)", "300g arroz integral (330 kcal)", "150g brócoli (51 kcal)", "1 cda. aceite de oliva (119 kcal)"], total: 913 },
        { nombre: "Cena", items: ["250g salmón (515 kcal)", "300g patata cocida (258 kcal)", "150g espinacas (35 kcal)", "1 yogur natural (80 kcal)"], total: 888 }
      ]},
      { min: 3001, max: 3500, menu: [
        { nombre: "Desayuno", items: ["8 claras de huevo (272 kcal)", "140g avena (545 kcal)", "1 plátano (105 kcal)", "50g nueces (333 kcal)"], total: 1255 },
        { nombre: "Almuerzo", items: ["300g pechuga de pollo (495 kcal)", "350g arroz integral (385 kcal)", "200g brócoli (68 kcal)", "1 cda. aceite de oliva (119 kcal)"], total: 1067 },
        { nombre: "Cena", items: ["300g salmón (618 kcal)", "350g patata cocida (301 kcal)", "200g espinacas (46 kcal)", "1 yogur natural (80 kcal)"], total: 1045 }
      ]},
      { min: 3501, max: 4000, menu: [
        { nombre: "Desayuno", items: ["9 claras de huevo (306 kcal)", "160g avena (623 kcal)", "1 plátano (105 kcal)", "60g nueces (400 kcal)"], total: 1434 },
        { nombre: "Almuerzo", items: ["350g pechuga de pollo (578 kcal)", "400g arroz integral (440 kcal)", "200g brócoli (68 kcal)", "2 cda. aceite de oliva (238 kcal)"], total: 1324 },
        { nombre: "Cena", items: ["350g salmón (721 kcal)", "400g patata cocida (344 kcal)", "200g espinacas (46 kcal)", "2 yogures naturales (160 kcal)"], total: 1271 }
      ]},
      { min: 4001, max: 4500, menu: [
        { nombre: "Desayuno", items: ["10 claras de huevo (340 kcal)", "180g avena (701 kcal)", "2 plátanos (210 kcal)", "70g nueces (467 kcal)"], total: 1718 },
        { nombre: "Almuerzo", items: ["400g pechuga de pollo (660 kcal)", "450g arroz integral (495 kcal)", "250g brócoli (85 kcal)", "2 cda. aceite de oliva (238 kcal)"], total: 1478 },
        { nombre: "Cena", items: ["400g salmón (824 kcal)", "450g patata cocida (387 kcal)", "250g espinacas (58 kcal)", "2 yogures naturales (160 kcal)"], total: 1429 }
      ]},
      { min: 4501, max: 5000, menu: [
        { nombre: "Desayuno", items: ["12 claras de huevo (408 kcal)", "200g avena (778 kcal)", "2 plátanos (210 kcal)", "80g nueces (533 kcal)"], total: 1929 },
        { nombre: "Almuerzo", items: ["450g pechuga de pollo (743 kcal)", "500g arroz integral (550 kcal)", "300g brócoli (102 kcal)", "3 cda. aceite de oliva (357 kcal)"], total: 1752 },
        { nombre: "Cena", items: ["450g salmón (927 kcal)", "500g patata cocida (430 kcal)", "300g espinacas (69 kcal)", "2 yogures naturales (160 kcal)"], total: 1586 }
      ]}
    ],
    "perder grasa": [
      { min: 1500, max: 2000, menu: [
        { nombre: "Desayuno", items: ["5 claras de huevo (170 kcal)", "60g avena (234 kcal)", "1 manzana (52 kcal)"], total: 456 },
        { nombre: "Almuerzo", items: ["120g pechuga de pollo (198 kcal)", "100g arroz integral (110 kcal)", "100g ensalada verde (20 kcal)"], total: 328 },
        { nombre: "Cena", items: ["120g atún al natural (132 kcal)", "150g calabacín (27 kcal)", "1 yogur desnatado (50 kcal)"], total: 209 }
      ]},
      { min: 2001, max: 2500, menu: [
        { nombre: "Desayuno", items: ["6 claras de huevo (204 kcal)", "80g avena (312 kcal)", "1 pera (57 kcal)"], total: 573 },
        { nombre: "Almuerzo", items: ["150g pechuga de pollo (248 kcal)", "150g arroz integral (165 kcal)", "100g ensalada verde (20 kcal)"], total: 433 },
        { nombre: "Cena", items: ["150g atún al natural (165 kcal)", "150g calabacín (27 kcal)", "1 yogur desnatado (50 kcal)"], total: 242 }
      ]},
      { min: 2501, max: 3000, menu: [
        { nombre: "Desayuno", items: ["7 claras de huevo (238 kcal)", "100g avena (389 kcal)", "1 pera (57 kcal)"], total: 684 },
        { nombre: "Almuerzo", items: ["200g pechuga de pollo (330 kcal)", "200g arroz integral (220 kcal)", "150g ensalada verde (30 kcal)"], total: 580 },
        { nombre: "Cena", items: ["200g atún al natural (220 kcal)", "200g calabacín (36 kcal)", "1 yogur desnatado (50 kcal)"], total: 306 }
      ]},
      { min: 3001, max: 3500, menu: [
        { nombre: "Desayuno", items: ["8 claras de huevo (272 kcal)", "120g avena (467 kcal)", "1 pera (57 kcal)"], total: 796 },
        { nombre: "Almuerzo", items: ["250g pechuga de pollo (413 kcal)", "250g arroz integral (275 kcal)", "200g ensalada verde (40 kcal)"], total: 728 },
        { nombre: "Cena", items: ["250g atún al natural (275 kcal)", "250g calabacín (45 kcal)", "1 yogur desnatado (50 kcal)"], total: 370 }
      ]},
      { min: 3501, max: 4000, menu: [
        { nombre: "Desayuno", items: ["9 claras de huevo (306 kcal)", "140g avena (545 kcal)", "1 pera (57 kcal)"], total: 908 },
        { nombre: "Almuerzo", items: ["300g pechuga de pollo (495 kcal)", "300g arroz integral (330 kcal)", "250g ensalada verde (50 kcal)"], total: 875 },
        { nombre: "Cena", items: ["300g atún al natural (330 kcal)", "300g calabacín (54 kcal)", "1 yogur desnatado (50 kcal)"], total: 434 }
      ]},
      { min: 4001, max: 4500, menu: [
        { nombre: "Desayuno", items: ["10 claras de huevo (340 kcal)", "160g avena (623 kcal)", "1 pera (57 kcal)"], total: 1020 },
        { nombre: "Almuerzo", items: ["350g pechuga de pollo (578 kcal)", "350g arroz integral (385 kcal)", "300g ensalada verde (60 kcal)"], total: 1023 },
        { nombre: "Cena", items: ["350g atún al natural (385 kcal)", "350g calabacín (63 kcal)", "1 yogur desnatado (50 kcal)"], total: 498 }
      ]},
      { min: 4501, max: 5000, menu: [
        { nombre: "Desayuno", items: ["12 claras de huevo (408 kcal)", "180g avena (701 kcal)", "1 pera (57 kcal)"], total: 1166 },
        { nombre: "Almuerzo", items: ["400g pechuga de pollo (660 kcal)", "400g arroz integral (440 kcal)", "350g ensalada verde (70 kcal)"], total: 1170 },
        { nombre: "Cena", items: ["400g atún al natural (440 kcal)", "400g calabacín (72 kcal)", "1 yogur desnatado (50 kcal)"], total: 562 }
      ]}
    ],
    "mantener": [
      { min: 1500, max: 2000, menu: [
        { nombre: "Desayuno", items: ["4 claras de huevo (136 kcal)", "60g avena (234 kcal)", "1 manzana (52 kcal)"], total: 422 },
        { nombre: "Almuerzo", items: ["120g pechuga de pollo (198 kcal)", "120g arroz integral (132 kcal)", "100g ensalada verde (20 kcal)"], total: 350 },
        { nombre: "Cena", items: ["120g salmón (247 kcal)", "150g patata cocida (129 kcal)", "100g espinacas (23 kcal)"], total: 399 }
      ]},
      { min: 2001, max: 2500, menu: [
        { nombre: "Desayuno", items: ["5 claras de huevo (170 kcal)", "80g avena (312 kcal)", "1 plátano (105 kcal)"], total: 587 },
        { nombre: "Almuerzo", items: ["150g pechuga de pollo (248 kcal)", "150g arroz integral (165 kcal)", "100g brócoli (34 kcal)"], total: 447 },
        { nombre: "Cena", items: ["150g salmón (309 kcal)", "200g patata cocida (172 kcal)", "100g espinacas (23 kcal)"], total: 504 }
      ]},
      { min: 2501, max: 3000, menu: [
        { nombre: "Desayuno", items: ["6 claras de huevo (204 kcal)", "100g avena (389 kcal)", "1 plátano (105 kcal)"], total: 698 },
        { nombre: "Almuerzo", items: ["200g pechuga de pollo (330 kcal)", "200g arroz integral (220 kcal)", "150g brócoli (51 kcal)"], total: 601 },
        { nombre: "Cena", items: ["200g salmón (412 kcal)", "250g patata cocida (215 kcal)", "150g espinacas (35 kcal)"], total: 662 }
      ]},
      { min: 3001, max: 3500, menu: [
        { nombre: "Desayuno", items: ["7 claras de huevo (238 kcal)", "120g avena (467 kcal)", "1 plátano (105 kcal)"], total: 810 },
        { nombre: "Almuerzo", items: ["250g pechuga de pollo (413 kcal)", "250g arroz integral (275 kcal)", "200g brócoli (68 kcal)"], total: 756 },
        { nombre: "Cena", items: ["250g salmón (515 kcal)", "300g patata cocida (258 kcal)", "200g espinacas (46 kcal)"], total: 819 }
      ]},
      { min: 3501, max: 4000, menu: [
        { nombre: "Desayuno", items: ["8 claras de huevo (272 kcal)", "140g avena (545 kcal)", "1 plátano (105 kcal)"], total: 922 },
        { nombre: "Almuerzo", items: ["300g pechuga de pollo (495 kcal)", "300g arroz integral (330 kcal)", "250g brócoli (85 kcal)"], total: 910 },
        { nombre: "Cena", items: ["300g salmón (618 kcal)", "350g patata cocida (301 kcal)", "250g espinacas (58 kcal)"], total: 977 }
      ]},
      { min: 4001, max: 4500, menu: [
        { nombre: "Desayuno", items: ["9 claras de huevo (306 kcal)", "160g avena (623 kcal)", "1 plátano (105 kcal)"], total: 1034 },
        { nombre: "Almuerzo", items: ["350g pechuga de pollo (578 kcal)", "350g arroz integral (385 kcal)", "300g brócoli (102 kcal)"], total: 1065 },
        { nombre: "Cena", items: ["350g salmón (721 kcal)", "400g patata cocida (344 kcal)", "300g espinacas (69 kcal)"], total: 1134 }
      ]},
      { min: 4501, max: 5000, menu: [
        { nombre: "Desayuno", items: ["10 claras de huevo (340 kcal)", "180g avena (701 kcal)", "1 plátano (105 kcal)"], total: 1146 },
        { nombre: "Almuerzo", items: ["400g pechuga de pollo (660 kcal)", "400g arroz integral (440 kcal)", "350g brócoli (119 kcal)"], total: 1219 },
        { nombre: "Cena", items: ["400g salmón (824 kcal)", "450g patata cocida (387 kcal)", "350g espinacas (81 kcal)"], total: 1292 }
      ]}
    ],
    "tonificar": [
      { min: 1500, max: 2000, menu: [
        { nombre: "Desayuno", items: ["4 claras de huevo (136 kcal)", "50g avena (195 kcal)", "1 pera (57 kcal)"], total: 388 },
        { nombre: "Almuerzo", items: ["100g pechuga de pollo (165 kcal)", "100g arroz integral (110 kcal)", "100g ensalada verde (20 kcal)"], total: 295 },
        { nombre: "Cena", items: ["100g atún al natural (110 kcal)", "100g calabacín (18 kcal)", "1 yogur desnatado (50 kcal)"], total: 178 }
      ]},
      { min: 2001, max: 2500, menu: [
        { nombre: "Desayuno", items: ["5 claras de huevo (170 kcal)", "70g avena (273 kcal)", "1 pera (57 kcal)"], total: 500 },
        { nombre: "Almuerzo", items: ["120g pechuga de pollo (198 kcal)", "120g arroz integral (132 kcal)", "100g ensalada verde (20 kcal)"], total: 350 },
        { nombre: "Cena", items: ["120g atún al natural (132 kcal)", "120g calabacín (22 kcal)", "1 yogur desnatado (50 kcal)"], total: 204 }
      ]},
      { min: 2501, max: 3000, menu: [
        { nombre: "Desayuno", items: ["6 claras de huevo (204 kcal)", "90g avena (351 kcal)", "1 pera (57 kcal)"], total: 612 },
        { nombre: "Almuerzo", items: ["150g pechuga de pollo (248 kcal)", "150g arroz integral (165 kcal)", "100g ensalada verde (20 kcal)"], total: 433 },
        { nombre: "Cena", items: ["150g atún al natural (165 kcal)", "150g calabacín (27 kcal)", "1 yogur desnatado (50 kcal)"], total: 242 }
      ]},
      { min: 3001, max: 3500, menu: [
        { nombre: "Desayuno", items: ["7 claras de huevo (238 kcal)", "110g avena (429 kcal)", "1 pera (57 kcal)"], total: 724 },
        { nombre: "Almuerzo", items: ["180g pechuga de pollo (297 kcal)", "180g arroz integral (198 kcal)", "120g ensalada verde (24 kcal)"], total: 519 },
        { nombre: "Cena", items: ["180g atún al natural (198 kcal)", "180g calabacín (32 kcal)", "1 yogur desnatado (50 kcal)"], total: 280 }
      ]},
      { min: 3501, max: 4000, menu: [
        { nombre: "Desayuno", items: ["8 claras de huevo (272 kcal)", "130g avena (507 kcal)", "1 pera (57 kcal)"], total: 836 },
        { nombre: "Almuerzo", items: ["200g pechuga de pollo (330 kcal)", "200g arroz integral (220 kcal)", "150g ensalada verde (30 kcal)"], total: 580 },
        { nombre: "Cena", items: ["200g atún al natural (220 kcal)", "200g calabacín (36 kcal)", "1 yogur desnatado (50 kcal)"], total: 306 }
      ]},
      { min: 4001, max: 4500, menu: [
        { nombre: "Desayuno", items: ["9 claras de huevo (306 kcal)", "150g avena (585 kcal)", "1 pera (57 kcal)"], total: 948 },
        { nombre: "Almuerzo", items: ["220g pechuga de pollo (363 kcal)", "220g arroz integral (242 kcal)", "180g ensalada verde (36 kcal)"], total: 641 },
        { nombre: "Cena", items: ["220g atún al natural (242 kcal)", "220g calabacín (40 kcal)", "1 yogur desnatado (50 kcal)"], total: 332 }
      ]},
      { min: 4501, max: 5000, menu: [
        { nombre: "Desayuno", items: ["10 claras de huevo (340 kcal)", "170g avena (663 kcal)", "1 pera (57 kcal)"], total: 1060 },
        { nombre: "Almuerzo", items: ["250g pechuga de pollo (413 kcal)", "250g arroz integral (275 kcal)", "200g ensalada verde (40 kcal)"], total: 728 },
        { nombre: "Cena", items: ["250g atún al natural (275 kcal)", "250g calabacín (45 kcal)", "1 yogur desnatado (50 kcal)"], total: 370 }
      ]}
    ]
  },
  femenino: {
  "Ganar masa muscular": [
    { min: 1500, max: 2000, menu: [
      { nombre: "Desayuno", items: ["4 claras de huevo (136 kcal)", "60g avena (234 kcal)", "1 plátano (105 kcal)", "15g nueces (100 kcal)"], total: 575 },
      { nombre: "Almuerzo", items: ["120g pechuga de pollo (198 kcal)", "150g arroz integral (165 kcal)", "100g brócoli (34 kcal)", "1 cda. aceite de oliva (119 kcal)"], total: 516 },
      { nombre: "Cena", items: ["120g salmón (247 kcal)", "150g patata cocida (129 kcal)", "100g espinacas (23 kcal)", "1 yogur natural (80 kcal)"], total: 479 }
    ]},
    { min: 2001, max: 2500, menu: [
      { nombre: "Desayuno", items: ["5 claras de huevo (170 kcal)", "80g avena (312 kcal)", "1 plátano (105 kcal)", "20g nueces (133 kcal)"], total: 720 },
      { nombre: "Almuerzo", items: ["150g pechuga de pollo (248 kcal)", "200g arroz integral (220 kcal)", "100g brócoli (34 kcal)", "1 cda. aceite de oliva (119 kcal)"], total: 621 },
      { nombre: "Cena", items: ["150g salmón (309 kcal)", "200g patata cocida (172 kcal)", "100g espinacas (23 kcal)", "1 yogur natural (80 kcal)"], total: 584 }
    ]},
    { min: 2501, max: 3000, menu: [
      { nombre: "Desayuno", items: ["6 claras de huevo (204 kcal)", "100g avena (389 kcal)", "1 plátano (105 kcal)", "30g nueces (200 kcal)"], total: 898 },
      { nombre: "Almuerzo", items: ["200g pechuga de pollo (330 kcal)", "250g arroz integral (275 kcal)", "150g brócoli (51 kcal)", "1 cda. aceite de oliva (119 kcal)"], total: 775 },
      { nombre: "Cena", items: ["200g salmón (412 kcal)", "250g patata cocida (215 kcal)", "150g espinacas (35 kcal)", "1 yogur natural (80 kcal)"], total: 742 }
    ]},
    { min: 3001, max: 3500, menu: [
      { nombre: "Desayuno", items: ["7 claras de huevo (238 kcal)", "120g avena (467 kcal)", "1 plátano (105 kcal)", "40g nueces (267 kcal)"], total: 1077 },
      { nombre: "Almuerzo", items: ["250g pechuga de pollo (413 kcal)", "300g arroz integral (330 kcal)", "200g brócoli (68 kcal)", "1 cda. aceite de oliva (119 kcal)"], total: 930 },
      { nombre: "Cena", items: ["250g salmón (515 kcal)", "300g patata cocida (258 kcal)", "200g espinacas (46 kcal)", "1 yogur natural (80 kcal)"], total: 899 }
    ]},
    { min: 3501, max: 4000, menu: [
      { nombre: "Desayuno", items: ["8 claras de huevo (272 kcal)", "140g avena (545 kcal)", "1 plátano (105 kcal)", "50g nueces (333 kcal)"], total: 1255 },
      { nombre: "Almuerzo", items: ["300g pechuga de pollo (495 kcal)", "350g arroz integral (385 kcal)", "200g brócoli (68 kcal)", "2 cda. aceite de oliva (238 kcal)"], total: 1186 },
      { nombre: "Cena", items: ["300g salmón (618 kcal)", "350g patata cocida (301 kcal)", "200g espinacas (46 kcal)", "2 yogures naturales (160 kcal)"], total: 1125 }
    ]},
    { min: 4001, max: 4500, menu: [
      { nombre: "Desayuno", items: ["9 claras de huevo (306 kcal)", "160g avena (623 kcal)", "2 plátanos (210 kcal)", "60g nueces (400 kcal)"], total: 1539 },
      { nombre: "Almuerzo", items: ["350g pechuga de pollo (578 kcal)", "400g arroz integral (440 kcal)", "250g brócoli (85 kcal)", "2 cda. aceite de oliva (238 kcal)"], total: 1341 },
      { nombre: "Cena", items: ["350g salmón (721 kcal)", "400g patata cocida (344 kcal)", "250g espinacas (58 kcal)", "2 yogures naturales (160 kcal)"], total: 1283 }
    ]},
    { min: 4501, max: 5000, menu: [
      { nombre: "Desayuno", items: ["10 claras de huevo (340 kcal)", "180g avena (701 kcal)", "2 plátanos (210 kcal)", "70g nueces (467 kcal)"], total: 1718 },
      { nombre: "Almuerzo", items: ["400g pechuga de pollo (660 kcal)", "450g arroz integral (495 kcal)", "300g brócoli (102 kcal)", "3 cda. aceite de oliva (357 kcal)"], total: 1614 },
      { nombre: "Cena", items: ["400g salmón (824 kcal)", "450g patata cocida (387 kcal)", "300g espinacas (69 kcal)", "2 yogures naturales (160 kcal)"], total: 1440 }
    ]}
  ],
  "perder grasa": [
    { min: 1500, max: 2000, menu: [
      { nombre: "Desayuno", items: ["4 claras de huevo (136 kcal)", "40g avena (156 kcal)", "1 manzana (52 kcal)"], total: 344 },
      { nombre: "Almuerzo", items: ["100g pechuga de pollo (165 kcal)", "100g arroz integral (110 kcal)", "100g ensalada verde (20 kcal)"], total: 295 },
      { nombre: "Cena", items: ["100g atún al natural (110 kcal)", "100g calabacín (18 kcal)", "1 yogur desnatado (50 kcal)"], total: 178 }
    ]},
    { min: 2001, max: 2500, menu: [
      { nombre: "Desayuno", items: ["5 claras de huevo (170 kcal)", "60g avena (234 kcal)", "1 pera (57 kcal)"], total: 461 },
      { nombre: "Almuerzo", items: ["120g pechuga de pollo (198 kcal)", "120g arroz integral (132 kcal)", "100g ensalada verde (20 kcal)"], total: 350 },
      { nombre: "Cena", items: ["120g atún al natural (132 kcal)", "120g calabacín (22 kcal)", "1 yogur desnatado (50 kcal)"], total: 204 }
    ]},
    { min: 2501, max: 3000, menu: [
      { nombre: "Desayuno", items: ["6 claras de huevo (204 kcal)", "80g avena (312 kcal)", "1 pera (57 kcal)"], total: 573 },
      { nombre: "Almuerzo", items: ["150g pechuga de pollo (248 kcal)", "150g arroz integral (165 kcal)", "100g ensalada verde (20 kcal)"], total: 433 },
      { nombre: "Cena", items: ["150g atún al natural (165 kcal)", "150g calabacín (27 kcal)", "1 yogur desnatado (50 kcal)"], total: 242 }
    ]},
    { min: 3001, max: 3500, menu: [
      { nombre: "Desayuno", items: ["7 claras de huevo (238 kcal)", "100g avena (389 kcal)", "1 pera (57 kcal)"], total: 684 },
      { nombre: "Almuerzo", items: ["180g pechuga de pollo (297 kcal)", "180g arroz integral (198 kcal)", "120g ensalada verde (24 kcal)"], total: 519 },
      { nombre: "Cena", items: ["180g atún al natural (198 kcal)", "180g calabacín (32 kcal)", "1 yogur desnatado (50 kcal)"], total: 280 }
    ]},
    { min: 3501, max: 4000, menu: [
      { nombre: "Desayuno", items: ["8 claras de huevo (272 kcal)", "120g avena (467 kcal)", "1 pera (57 kcal)"], total: 796 },
      { nombre: "Almuerzo", items: ["200g pechuga de pollo (330 kcal)", "200g arroz integral (220 kcal)", "150g ensalada verde (30 kcal)"], total: 580 },
      { nombre: "Cena", items: ["200g atún al natural (220 kcal)", "200g calabacín (36 kcal)", "1 yogur desnatado (50 kcal)"], total: 306 }
    ]},
    { min: 4001, max: 4500, menu: [
      { nombre: "Desayuno", items: ["9 claras de huevo (306 kcal)", "140g avena (545 kcal)", "1 pera (57 kcal)"], total: 908 },
      { nombre: "Almuerzo", items: ["220g pechuga de pollo (363 kcal)", "220g arroz integral (242 kcal)", "180g ensalada verde (36 kcal)"], total: 641 },
      { nombre: "Cena", items: ["220g atún al natural (242 kcal)", "220g calabacín (40 kcal)", "1 yogur desnatado (50 kcal)"], total: 332 }
    ]},
    { min: 4501, max: 5000, menu: [
      { nombre: "Desayuno", items: ["10 claras de huevo (340 kcal)", "160g avena (623 kcal)", "1 pera (57 kcal)"], total: 1020 },
      { nombre: "Almuerzo", items: ["250g pechuga de pollo (413 kcal)", "250g arroz integral (275 kcal)", "200g ensalada verde (40 kcal)"], total: 728 },
      { nombre: "Cena", items: ["250g atún al natural (275 kcal)", "250g calabacín (45 kcal)", "1 yogur desnatado (50 kcal)"], total: 370 }
    ]}
  ],
  "mantener": [
    { min: 1500, max: 2000, menu: [
      { nombre: "Desayuno", items: ["3 claras de huevo (102 kcal)", "40g avena (156 kcal)", "1 manzana (52 kcal)"], total: 310 },
      { nombre: "Almuerzo", items: ["100g pechuga de pollo (165 kcal)", "100g arroz integral (110 kcal)", "100g ensalada verde (20 kcal)"], total: 295 },
      { nombre: "Cena", items: ["100g salmón (205 kcal)", "100g patata cocida (86 kcal)", "100g espinacas (23 kcal)"], total: 314 }
    ]},
    { min: 2001, max: 2500, menu: [
      { nombre: "Desayuno", items: ["4 claras de huevo (136 kcal)", "60g avena (234 kcal)", "1 plátano (105 kcal)"], total: 475 },
      { nombre: "Almuerzo", items: ["120g pechuga de pollo (198 kcal)", "120g arroz integral (132 kcal)", "100g brócoli (34 kcal)"], total: 364 },
      { nombre: "Cena", items: ["120g salmón (247 kcal)", "150g patata cocida (129 kcal)", "100g espinacas (23 kcal)"], total: 399 }
    ]},
    { min: 2501, max: 3000, menu: [
      { nombre: "Desayuno", items: ["5 claras de huevo (170 kcal)", "80g avena (312 kcal)", "1 plátano (105 kcal)"], total: 587 },
      { nombre: "Almuerzo", items: ["150g pechuga de pollo (248 kcal)", "150g arroz integral (165 kcal)", "100g brócoli (34 kcal)"], total: 447 },
      { nombre: "Cena", items: ["150g salmón (309 kcal)", "200g patata cocida (172 kcal)", "100g espinacas (23 kcal)"], total: 504 }
    ]},
    { min: 3001, max: 3500, menu: [
      { nombre: "Desayuno", items: ["6 claras de huevo (204 kcal)", "100g avena (389 kcal)", "1 plátano (105 kcal)"], total: 698 },
      { nombre: "Almuerzo", items: ["180g pechuga de pollo (297 kcal)", "180g arroz integral (198 kcal)", "120g brócoli (27 kcal)"], total: 522 },
      { nombre: "Cena", items: ["180g salmón (370 kcal)", "220g patata cocida (189 kcal)", "120g espinacas (28 kcal)"], total: 587 }
    ]},
    { min: 3501, max: 4000, menu: [
      { nombre: "Desayuno", items: ["7 claras de huevo (238 kcal)", "120g avena (467 kcal)", "1 plátano (105 kcal)"], total: 810 },
      { nombre: "Almuerzo", items: ["200g pechuga de pollo (330 kcal)", "200g arroz integral (220 kcal)", "150g brócoli (34 kcal)"], total: 584 },
      { nombre: "Cena", items: ["200g salmón (412 kcal)", "250g patata cocida (215 kcal)", "150g espinacas (35 kcal)"], total: 662 }
    ]},
    { min: 4001, max: 4500, menu: [
      { nombre: "Desayuno", items: ["8 claras de huevo (272 kcal)", "140g avena (545 kcal)", "1 plátano (105 kcal)"], total: 922 },
      { nombre: "Almuerzo", items: ["220g pechuga de pollo (363 kcal)", "220g arroz integral (242 kcal)", "180g brócoli (41 kcal)"], total: 646 },
      { nombre: "Cena", items: ["220g salmón (453 kcal)", "270g patata cocida (232 kcal)", "180g espinacas (42 kcal)"], total: 727 }
    ]},
    { min: 4501, max: 5000, menu: [
      { nombre: "Desayuno", items: ["9 claras de huevo (306 kcal)", "160g avena (623 kcal)", "1 plátano (105 kcal)"], total: 1034 },
      { nombre: "Almuerzo", items: ["250g pechuga de pollo (413 kcal)", "250g arroz integral (275 kcal)", "200g brócoli (46 kcal)"], total: 734 },
      { nombre: "Cena", items: ["250g salmón (515 kcal)", "300g patata cocida (258 kcal)", "200g espinacas (46 kcal)"], total: 819 }
    ]}
  ],
  "tonificar": [
    { min: 1500, max: 2000, menu: [
      { nombre: "Desayuno", items: ["3 claras de huevo (102 kcal)", "40g avena (156 kcal)", "1 pera (57 kcal)"], total: 315 },
      { nombre: "Almuerzo", items: ["100g pechuga de pollo (165 kcal)", "100g arroz integral (110 kcal)", "100g ensalada verde (20 kcal)"], total: 295 },
      { nombre: "Cena", items: ["100g atún al natural (110 kcal)", "100g calabacín (18 kcal)", "1 yogur desnatado (50 kcal)"], total: 178 }
    ]},
    { min: 2001, max: 2500, menu: [
      { nombre: "Desayuno", items: ["4 claras de huevo (136 kcal)", "60g avena (234 kcal)", "1 pera (57 kcal)"], total: 427 },
      { nombre: "Almuerzo", items: ["120g pechuga de pollo (198 kcal)", "120g arroz integral (132 kcal)", "100g ensalada verde (20 kcal)"], total: 350 },
      { nombre: "Cena", items: ["120g atún al natural (132 kcal)", "120g calabacín (22 kcal)", "1 yogur desnatado (50 kcal)"], total: 204 }
    ]},
    { min: 2501, max: 3000, menu: [
      { nombre: "Desayuno", items: ["5 claras de huevo (170 kcal)", "80g avena (312 kcal)", "1 pera (57 kcal)"], total: 539 },
      { nombre: "Almuerzo", items: ["150g pechuga de pollo (248 kcal)", "150g arroz integral (165 kcal)", "100g ensalada verde (20 kcal)"], total: 433 },
      { nombre: "Cena", items: ["150g atún al natural (165 kcal)", "150g calabacín (27 kcal)", "1 yogur desnatado (50 kcal)"], total: 242 }
    ]},
    { min: 3001, max: 3500, menu: [
      { nombre: "Desayuno", items: ["6 claras de huevo (204 kcal)", "100g avena (389 kcal)", "1 pera (57 kcal)"], total: 650 },
      { nombre: "Almuerzo", items: ["180g pechuga de pollo (297 kcal)", "180g arroz integral (198 kcal)", "120g ensalada verde (24 kcal)"], total: 519 },
      { nombre: "Cena", items: ["180g atún al natural (198 kcal)", "180g calabacín (32 kcal)", "1 yogur desnatado (50 kcal)"], total: 280 }
    ]},
    { min: 3501, max: 4000, menu: [
      { nombre: "Desayuno", items: ["7 claras de huevo (238 kcal)", "120g avena (467 kcal)", "1 pera (57 kcal)"], total: 762 },
      { nombre: "Almuerzo", items: ["200g pechuga de pollo (330 kcal)", "200g arroz integral (220 kcal)", "150g ensalada verde (30 kcal)"], total: 580 },
      { nombre: "Cena", items: ["200g atún al natural (220 kcal)", "200g calabacín (36 kcal)", "1 yogur desnatado (50 kcal)"], total: 306 }
    ]},
    { min: 4001, max: 4500, menu: [
      { nombre: "Desayuno", items: ["8 claras de huevo (272 kcal)", "140g avena (545 kcal)", "1 pera (57 kcal)"], total: 874 },
      { nombre: "Almuerzo", items: ["220g pechuga de pollo (363 kcal)", "220g arroz integral (242 kcal)", "180g ensalada verde (36 kcal)"], total: 641 },
      { nombre: "Cena", items: ["220g atún al natural (242 kcal)", "220g calabacín (40 kcal)", "1 yogur desnatado (50 kcal)"], total: 332 }
    ]},
    { min: 4501, max: 5000, menu: [
      { nombre: "Desayuno", items: ["9 claras de huevo (306 kcal)", "160g avena (623 kcal)", "1 pera (57 kcal)"], total: 986 },
      { nombre: "Almuerzo", items: ["250g pechuga de pollo (413 kcal)", "250g arroz integral (275 kcal)", "200g ensalada verde (40 kcal)"], total: 728 },
      { nombre: "Cena", items: ["250g atún al natural (275 kcal)", "250g calabacín (45 kcal)", "1 yogur desnatado (50 kcal)"], total: 370 }
    ]}
  ]
}
};
const rutinas = {
  masa: {
    masculino: [
  `✅ Lunes – Torso: Empuje (Pecho – Hombro – Tríceps)
Ejercicio\t\t\t\tSeries x Reps\t%1RM\tDescanso
Press inclinado con barra\t4x10\t70-75%\t90 seg
Press plano con mancuernas\t3x10\t70%\t60 seg
Fondos asistidos o en paralelas\t3x12\tPeso corporal o 60%\t60 seg
Press militar con mancuernas\t3x10\t65%\t60 seg
Extensión de tríceps en polea\t3x15\tLigero/moderado\t45 seg`,

  `✅ Martes – Pierna: Cuádriceps y glúteos
Ejercicio\t\t\t\tSeries x Reps\t%1RM\tDescanso
Sentadilla profunda con barra\t4x10\t70-75%\t90 seg
Prensa inclinada\t4x12\t70%\t90 seg
Zancadas con mancuernas\t3x12 c/pierna\t65%\t60 seg
Extensión de cuádriceps (pausa)\t3x15\tLigero\t45 seg
Abducción en máquina o banda\t3x20\tLigero\t30 seg`,

  `✅ Miércoles – Torso: Tirón (Espalda – Bíceps – Trapecio)
Ejercicio\t\t\t\tSeries x Reps\t%1RM\tDescanso
Dominadas (asistidas o libres)\t4x8-10\tPeso corporal o 70%\t90 seg
Remo con barra o mancuerna\t3x10\t70%\t60 seg
Jalón al pecho\t3x12\t65%\t60 seg
Curl de bíceps con barra\t3x12\tLigero/moderado\t45 seg
Face pull (trapecio/posterior)\t3x15\tLigero\t45 seg`,

  `✅ Jueves – Pierna: Glúteos y femorales
Ejercicio\t\t\t\tSeries x Reps\t%1RM\tDescanso
Peso muerto rumano\t4x10\t70-75%\t90 seg
Curl femoral en máquina\t3x12\t65%\t60 seg
Hip Thrust con barra (con pausa)\t4x12\t75%\t90 seg
Sentadilla búlgara\t3x10 c/pierna\t65%\t60 seg
Patada de glúteo en polea\t3x15\tLigero\t45 seg`,

  `✅ Viernes – Full estética (Hombro – Bíceps – Abdomen – Core)
Ejercicio\t\t\t\tSeries x Reps\t%1RM\tDescanso
Elevaciones laterales (banda o mancuerna)\t3x15\tLigero\t45 seg
Elevaciones frontales alternadas\t3x12\tLigero\t45 seg
Curl tipo martillo\t3x12\t65%\t60 seg
Curl concentrado sentado\t3x12\tLigero\t45 seg
Crunch cable o máquina\t3x20\tN/A\t30 seg
Plancha + bird-dog\t3x30 seg\tN/A\t30 seg`,

  "Sábado: Descanso o actividad ligera",
  "Domingo: Descanso"
],
    femenino: [
      `✅ Lunes – Tren inferior (cuádriceps y glúteos)
Ejercicio\t\t\t\tSeries x Reps\t%RM\tDescanso
Sentadilla Goblet\t\t4x10\t\t65-70%\t90 seg
Prensa de piernas\t\t3x12\t\t70%\t90 seg
Zancadas caminando con mancuernas\t3x12 c/pierna\t60-65%\t60 seg
Extensión de cuádriceps (máquina)\t3x12\t\t60%\t45 seg
Crunch abdominal en colchoneta\t3x15\t\tN/A\t30 seg`,

      // Martes
      `✅ Martes – Tren superior (empuje)
Ejercicio\t\t\t\tSeries x Reps\t%RM\tDescanso
Press de banca con mancuernas\t3x10\t\t65%\t60 seg
Press militar sentado\t\t3x12\t\t60%\t60 seg
Fondos en banco (tríceps)\t3x10\t\tPeso corporal\t60 seg
Elevaciones laterales (hombros)\t3x15\t\tLigero\t45 seg
Plancha frontal\t\t\t3x30 seg\tN/A\t30 seg`,

      // Miércoles
      `✅ Miércoles – Tren inferior (glúteos y femorales)
Ejercicio\t\t\t\tSeries x Reps\t%RM\tDescanso
Peso muerto rumano con mancuernas\t4x10\t\t70%\t90 seg
Curl femoral en máquina\t\t3x12\t\t60%\t60 seg
Hip Thrust con barra\t\t4x12\t\t70-75%\t90 seg
Abducción de cadera en máquina\t3x15\t\tLigero\t45 seg
Bird-dog / plancha lateral\t3x30 seg c/lado\tN/A\t30 seg`,

      // Jueves
      `✅ Jueves – Tren superior (tirón)
Ejercicio\t\t\t\tSeries x Reps\t%RM\tDescanso
Jalón al pecho\t\t\t3x12\t\t65%\t60 seg
Remo con barra o mancuerna\t3x10\t\t65-70%\t90 seg
Curl de bíceps con mancuernas\t3x12\t\tLigero\t45 seg
Remo invertido o TRX (asistido)\t3x8\t\tPeso corporal\t60 seg
Elevaciones de piernas colgando o en banco\t3x12\tN/A\t30 seg`,

      // Viernes
      `✅ Viernes – Glúteos full + estética
Ejercicio\t\t\t\tSeries x Reps\t%RM\tDescanso
Hip Thrust con pausa\t\t4x10\t\t70-75%\t90 seg
Sentadilla Búlgara\t\t3x10 c/pierna\t65%\t60 seg
Patada de glúteo en polea o máquina\t3x15\tLigero\t45 seg
Abducción de glúteo en banda elástica\t3x20\tLigero\t30 seg
Crunch con cable / Crunch oblicuo\t3x15\tN/A\t30 seg`,

      // Sábado y Domingo (puedes personalizar)
      "Sábado: Descanso o actividad ligera",
      "Domingo: Descanso"
    ]
  },
  grasa: {
    masculino: [
      `✅ Lunes – Torso: Empuje (Pecho – Hombro – Tríceps)
Ejercicio\tSeries x Reps\t%1RM\tDescanso
Press inclinado con barra\t4x10\t70-75%\t90 seg
Press plano con mancuernas\t3x10\t70%\t60 seg
Fondos asistidos o en paralelas\t3x12\tPeso corporal o 60%\t60 seg
Press militar con mancuernas\t3x10\t65%\t60 seg
Extensión de tríceps en polea\t3x15\tLigero/moderado (60-65%)\t45 seg`,

      `✅ Martes – Tren inferior (Piernas + Core)
Ejercicio\tSeries x Reps\t%1RM\tDescanso
Sentadilla libre\t4x8\t75-80%\t90 seg
Prensa 45°\t3x12\t70-75%\t60 seg
Peso muerto rumano (barra o mancuernas)\t3x10\t70-75%\t60 seg
Zancadas caminando (con mancuernas)\t3x10 por pierna\t60-65%\t60 seg
Crunch inverso / elevación de piernas\t3x15-20\tPeso corporal\t30 seg`,

      `✅ Miércoles – Torso: Tracción (Espalda – Bíceps – Posterior)
Ejercicio\tSeries x Reps\t%1RM\tDescanso
Dominadas (asistidas o con lastre)\t4x8\tPeso corporal o 70-80%\t90 seg
Remo con barra o mancuernas\t3x10\t75%\t60-90 seg
Jalón al pecho o remo en polea\t3x12\t65-70%\t60 seg
Curl bíceps con barra o mancuernas\t3x12\t65%\t60 seg
Face pull (polea)\t3x15\tLigero (60-65%)\t45 seg`,

      `✅ Jueves – Full Body Metabólico
Circuito por rondas (4 vueltas)
Descanso entre ejercicios: 15-30 seg – Entre rondas: 90 seg

Ejercicio\tReps\t%1RM
Sentadilla con mancuernas\t15\t50-60%
Flexiones (push-ups)\t12-15\tPeso corporal
Peso muerto con mancuernas\t12\t50-60%
Remo con mancuernas\t12\t50-60%
Plancha\t45 seg\t—`,

      `✅ Viernes – Tren inferior (Glúteos – Femoral – Núcleo)
Ejercicio\tSeries x Reps\t%1RM\tDescanso
Sentadilla frontal o goblet squat\t3x12\t70-75%\t60-90 seg
Hip thrust con barra\t4x10-12\t70-80%\t60 seg
Curl femoral en máquina\t3x15\t60-65%\t45 seg
Elevación de talones (gemelos)\t4x15-20\t60%\t30 seg
Crunch con cuerda en polea alta\t3x15\tLigero/moderado\t30-45 seg`,

      "Sábado: Caminata larga o ciclismo",
      "Domingo: Descanso"
    ],
    femenino: [
    `✅ Lunes – Tren inferior (Glúteo – Pierna completa)
Ejercicio\tSeries x Reps\t%1RM\tDescanso
Hip thrust con barra\t4x10\t70-80%\t90 seg
Sentadilla con barra (back squat)\t4x8\t75-80%\t90 seg
Zancadas caminando (con mancuernas)\t3x12 por pierna\t60-65%\t60 seg
Abducción en máquina o banda\t3x15-20\tLigero\t30 seg
Plancha con elevación de piernas\t3x30 seg por lado\tPeso corporal\t30 seg`,

    `✅ Martes – Torso (Espalda – Brazos – Abdomen)
Ejercicio\tSeries x Reps\t%1RM\tDescanso
Jalón al pecho\t4x10\t70%\t60 seg
Remo en polea baja o con mancuerna\t3x10\t65-70%\t60 seg
Dominadas asistidas (máquina o banda)\t3x8-10\tPeso corporal\t90 seg
Curl bíceps con mancuernas\t3x12\t60-65%\t45 seg
Crunch con peso\t3x20\tLigero\t30 seg`,

    `✅ Miércoles – Glúteo + Femoral (Enfoque posterior)
Ejercicio\tSeries x Reps\t%1RM\tDescanso
Peso muerto rumano con barra/mancuerna\t4x10\t70-75%\t90 seg
Curl femoral en máquina\t3x15\t60-65%\t45 seg
Hip thrust con pausa arriba\t3x12\t70%\t60 seg
Abducción con banda en el suelo\t3x20\tBanda ligera\t30 seg
Planchas + toques de hombro\t3x30 seg\tPeso corporal\t30 seg`,

    `✅ Jueves – Full Body Funcional / Metabólico
Circuito 4 rondas – Ritmo constante
Descanso entre ejercicios: 20 seg – entre rondas: 90 seg

Ejercicio\tReps\t%1RM
Sentadilla goblet con mancuerna\t15\t50-60%
Push-ups con rodillas o normales\t10-15\tPeso corporal
Peso muerto con mancuernas\t12\t60%
Remo con mancuerna\t12\t60%
Escaladores (mountain climbers)\t30 seg\t—`,

    `✅ Viernes – Tren inferior (Glúteo – Cuádriceps)
Ejercicio\tSeries x Reps\t%1RM\tDescanso
Sentadilla búlgara con mancuernas\t3x10 por pierna\t60-65%\t60 seg
Hip thrust en banco unilateral\t3x12 por pierna\t60-70%\t60 seg
Prensa de piernas\t3x15\t70%\t60 seg
Extensión de cuádriceps en máquina\t3x15\t60-65%\t45 seg
Abdominales tipo V\t3x15\tPeso corporal\t30 seg`,

    "Sábado: Caminata larga o ciclismo",
    "Domingo: Descanso"
  ]
},
   tonificar: {
    masculino: [
      `✅ Lunes – Torso: Empuje (Pecho – Hombros – Tríceps)
Ejercicio\tSeries x Reps\t%1RM\tDescanso
Press inclinado con barra\t4x10\t70-75%\t90 seg
Press plano con mancuernas\t3x10\t70%\t60 seg
Fondos en paralelas (o asistidos)\t3x12\t60% o peso corporal\t60 seg
Press militar con mancuernas\t3x10\t65%\t60 seg
Extensión de tríceps en cuerda\t3x15\tLigero\t45 seg`,

      `✅ Martes – Tren Inferior (Cuádriceps – Glúteo – Core)
Ejercicio\tSeries x Reps\t%1RM\tDescanso
Sentadilla trasera (back squat)\t4x8\t75-80%\t90 seg
Zancadas con mancuernas\t3x12 por pierna\t65%\t60 seg
Hip thrust con barra\t3x10\t70%\t60 seg
Crunch con peso\t3x15-20\tLigero\t30 seg
Plancha frontal\t3x30-45 seg\t—\t30 seg`,

      `✅ Miércoles – Metabólico Full Body (Quema grasa)
Circuito funcional x 4 rondas
Descanso entre ejercicios: 20 seg – entre rondas: 90 seg

Ejercicio\tReps\t%1RM
Sentadilla con mancuernas\t15\t60%
Flexiones\t15\tPeso corporal
Peso muerto rumano con mancuernas\t12\t60%
Remo con mancuernas\t12\t60%
Escaladores\t30 seg\t—`,

      `✅ Jueves – Torso: Tracción (Espalda – Bíceps – Posterior)
Ejercicio\tSeries x Reps\t%1RM\tDescanso
Dominadas (o jalón al pecho)\t4x8-10\tPeso corporal o 70%\t90 seg
Remo con barra o polea baja\t3x10\t70%\t60 seg
Remo unilateral con mancuerna\t3x10 por lado\t65%\t60 seg
Curl de bíceps con barra\t3x12\t60-65%\t45 seg
Face pull\t3x15\tLigero\t45 seg`,

      `✅ Viernes – Tren inferior: Femoral – Glúteo – Core
Ejercicio\tSeries x Reps\t%1RM\tDescanso
Peso muerto rumano\t4x10\t70%\t90 seg
Curl femoral en máquina\t3x15\t60%\t45 seg
Hip thrust con pausa arriba\t3x12\t65-70%\t60 seg
Ab-wheel (o crunch bicicleta)\t3x12-15\t—\t30 seg
Plancha + elevaciones alternas\t3x30 seg\t—\t30 seg`,

      "Sábado: Caminata larga o ciclismo",
      "Domingo: Descanso"
    ],
    femenino: [
      `✅ Lunes – Tren inferior (Glúteo – Cuádriceps – Core)
Ejercicio\tSeries x Reps\t%1RM\tDescanso
Sentadilla libre o goblet squat\t4x10\t70-75%\t90 seg
Zancadas caminando con mancuernas\t3x12 por pierna\t60-65%\t60 seg
Hip thrust con barra\t4x10\t75-80%\t90 seg
Abducción de cadera (banda o máquina)\t3x20\tBanda ligera\t30 seg
Crunch con peso o elevación de piernas\t3x15-20\t—\t30 seg`,

      `✅ Martes – Torso: Empuje (Pecho – Hombros – Tríceps)
Ejercicio\tSeries x Reps\t%1RM\tDescanso
Press inclinado con mancuernas\t3x10\t65-70%\t60 seg
Fondos asistidos (banco o máquina)\t3x12\t60% o peso corporal\t60 seg
Press militar con mancuernas\t3x10\t60-65%\t60 seg
Elevaciones laterales con mancuernas\t3x15\tLigero\t45 seg
Extensión de tríceps en cuerda\t3x15\tLigero\t45 seg`,

      `✅ Miércoles – Full Body Funcional (Quema de grasa)
Circuito x 4 rondas
Descanso entre ejercicios: 20 seg – entre rondas: 90 seg

Ejercicio\tReps\t%1RM
Sentadilla con press (mancuernas)\t12-15\t60%
Flexiones (normales o con rodillas)\t10-12\t—
Peso muerto rumano con mancuernas\t12\t60%
Remo con mancuerna\t12\t60%
Plancha con toques de hombros\t30 seg\t—`,

      `✅ Jueves – Torso: Tracción (Espalda – Bíceps – Core)
Ejercicio\tSeries x Reps\t%1RM\tDescanso
Jalón al pecho (agarre cerrado o ancho)\t4x10\t70%\t90 seg
Remo con mancuerna unilateral\t3x10 por lado\t65%\t60 seg
Remo en polea baja o barra\t3x10\t70%\t60 seg
Curl de bíceps con mancuernas\t3x12\t60-65%\t45 seg
Crunch bicicleta o plancha frontal\t3x20 o 30 seg\t—\t30 seg`,

      `✅ Viernes – Glúteo y pierna posterior (Enfoque femenino)
Ejercicio\tSeries x Reps\t%1RM\tDescanso
Hip thrust con pausa arriba\t4x10\t70-75%\t60-90 seg
Peso muerto rumano\t3x10\t70%\t60 seg
Curl femoral en máquina\t3x15\t60-65%\t45 seg
Patada de glúteo (máquina o cable)\t3x15 por pierna\tLigero\t30 seg
Abducción de cadera (banda/bulgaro)\t3x20\tBanda ligera\t30 seg`,

      "Sábado: Caminata larga o ciclismo",
      "Domingo: Descanso"
    ]
  },
  mantener: {
    masculino: [
      `✅ Lunes – Torso: Empuje (Pecho – Hombro – Tríceps)
Ejercicio\tSeries x Reps\t%1RM\tDescanso
Press inclinado con barra\t4x8-10\t70-75%\t90 seg
Press plano con mancuernas\t3x10\t70%\t60 seg
Fondos en paralelas (o asistidos)\t3x10-12\tPeso corporal\t60 seg
Press militar con mancuernas\t3x10\t65%\t60 seg
Extensión de tríceps en cuerda\t3x15\tLigero\t45 seg`,

      `✅ Martes – Tren inferior (Pierna completa – Core)
Ejercicio\tSeries x Reps\t%1RM\tDescanso
Sentadilla libre (back squat)\t4x8\t75-80%\t90 seg
Peso muerto rumano con mancuernas\t3x10\t70%\t60 seg
Zancadas caminando\t3x12 por pierna\t60%\t60 seg
Elevación de talones (gemelos)\t3x20\t—\t30 seg
Crunch con peso\t3x15-20\t—\t30 seg`,

      `✅ Miércoles – Full Body Funcional (Movilidad + Cardio + Core)
Circuito funcional x 4 rondas
Descanso entre ejercicios: 20 seg – entre rondas: 90 seg

Ejercicio\tReps\t%1RM
Sentadilla con press\t15\t60%
Flexiones\t15\t—
Kettlebell swing o peso muerto\t15\t60%
Remo con mancuernas\t12\t60%
Plancha con toques de hombros\t30 seg\t—`,

      `✅ Jueves – Torso: Tracción (Espalda – Bíceps)
Ejercicio\tSeries x Reps\t%1RM\tDescanso
Dominadas o jalón al pecho\t4x8-10\t70%\t90 seg
Remo con barra\t3x10\t70%\t60 seg
Remo con mancuerna unilateral\t3x10 por lado\t65%\t60 seg
Curl de bíceps con barra recta\t3x12\t60%\t45 seg
Face pull o remo en polea alta\t3x15\tLigero\t45 seg`,

      `✅ Viernes – Glúteo + Pierna posterior + Core
Ejercicio\tSeries x Reps\t%1RM\tDescanso
Peso muerto rumano con barra\t4x10\t70%\t90 seg
Curl femoral en máquina\t3x15\t60%\t60 seg
Hip thrust\t3x12\t70%\t60 seg
Elevación de piernas colgado\t3x12-15\t—\t30 seg
Plancha frontal + twist\t3x30 seg\t—\t30 seg`,

      "Sábado: Cardio suave o recreativo",
      "Domingo: Descanso"
    ],
    femenino: [
      `✅ Lunes – Tren inferior (Glúteo – Piernas)
Ejercicio\tSeries x Reps\t%1RM\tDescanso
Sentadilla libre o en multipower\t4x10\t65-70%\t90 seg
Hip Thrust con barra\t4x12\t70%\t60 seg
Zancadas con mancuernas\t3x12 c/pierna\t60%\t60 seg
Abducción en máquina o banda\t3x15\tLigero\t45 seg
Plancha con elevación de piernas\t3x30 seg\t—\t30 seg`,

  `✅ Martes – Tren superior (Espalda – Hombros – Brazos)
Ejercicio\tSeries x Reps\t%1RM\tDescanso
Remo en polea baja o barra\t4x10\t70%\t90 seg
Jalón al pecho o dominadas asist.\t3x10-12\t65%\t60 seg
Press militar con mancuernas\t3x12\t60%\t60 seg
Elevaciones laterales\t3x15\tLigero\t45 seg
Curl de bíceps + tríceps en polea\t3x15 combo\tLigero\t45 seg`,

  `✅ Miércoles – Full Body + Cardio HIIT
Circuito x 3-4 rondas
Descanso: 20 seg entre ejercicios – 1 min entre rondas

Ejercicio\tReps o Tiempo\t%1RM
Sentadilla con salto o air squat\t20 reps\t—
Flexiones (rodillas si es necesario)\t12 reps\t—
Kettlebell swing o peso muerto\t15 reps\t60%
Plancha con toque de hombros\t30 seg\t—
Mountain climbers\t30 seg\t—`,

  `✅ Jueves – Glúteo + Core
Ejercicio\tSeries x Reps\t%1RM\tDescanso
Hip thrust + pausa arriba\t4x15\t65-70%\t60 seg
Peso muerto rumano con mancuernas\t3x12\t65%\t60 seg
Sentadilla sumo con mancuerna\t3x15\t60%\t60 seg
Crunch con peso\t3x20\t—\t30 seg
Plancha + twist\t3x30 seg\t—\t30 seg`,

  `✅ Viernes – Activación general + movilidad + abdomen
Ejercicio\tSeries x Reps\t%1RM\tDescanso
Sentadillas isométricas\t3x30 seg\t—\t30 seg
Caminata lateral con banda\t3x15 por lado\t—\t30 seg
Elevaciones de pierna tumbada\t3x15 por pierna\t—\t30 seg
Abdominales en V\t3x15\t—\t30 seg
Estiramientos + movilidad general\t5-10 minutos\t—\t—`,

  "Sábado: Descanso o actividad ligera",
  "Domingo: Descanso"
  ] 
},
};

function obtenerMenuComidas(sexo, calorias, objetivo) {
  const menusPorObjetivo = menusComidas[sexo]?.[objetivo];
  if (!menusPorObjetivo) return null;
  for (const rango of menusPorObjetivo) {
    if (calorias >= rango.min && calorias <= rango.max) {
      return rango.menu;
    }
  }
  return null;
}

// --- FUNCIÓN PARA MOSTRAR EL MENÚ EN LA PANTALLA DE COMIDAS RECOMENDADAS ---
function mostrarMenuComidasMainApp() {
  const usuario = JSON.parse(localStorage.getItem("usuarioActual"));
  if (!usuario || !usuario.objetivos) return;

  let calorias = Number(document.getElementById("calorias-total-main").textContent);
  const sexo = usuario.objetivos.sexo;
  const objetivo = usuario.objetivos.objetivo;

  console.log("DEBUG comidas:", { sexo, calorias, objetivo });

  const menu = obtenerMenuComidas(sexo, calorias, objetivo);

  // Mostrar menú en tarjetas bonitas
  if (menu && menu.length === 3) {
    document.getElementById("desayunoLista").innerHTML = `
      <div class="comida-card">
        <strong>${menu[0].nombre} (${menu[0].total} kcal)</strong>
        <ul>
          ${menu[0].items.map(item => `<li>${item}</li>`).join("")}
        </ul>
      </div>
    `;
    document.getElementById("almuerzoLista").innerHTML = `
      <div class="comida-card">
        <strong>${menu[1].nombre} (${menu[1].total} kcal)</strong>
        <ul>
          ${menu[1].items.map(item => `<li>${item}</li>`).join("")}
        </ul>
      </div>
    `;
    document.getElementById("cenaLista").innerHTML = `
      <div class="comida-card">
        <strong>${menu[2].nombre} (${menu[2].total} kcal)</strong>
        <ul>
          ${menu[2].items.map(item => `<li>${item}</li>`).join("")}
        </ul>
      </div>
    `;
  } else {
    document.getElementById("desayunoLista").innerHTML = "<li>No hay menú disponible para tus datos.</li>";
    document.getElementById("almuerzoLista").innerHTML = "";
    document.getElementById("cenaLista").innerHTML = "";
  }
}

// --- LLAMA A ESTA FUNCIÓN AL MOSTRAR LA PANTALLA DE COMIDAS RECOMENDADAS ---
function mostrarComidas() {
  mostrarMenuComidasMainApp();
  showScreen('comidasRecomendadas');
}

function seleccionarRutina() {
  const usuario = JSON.parse(localStorage.getItem("usuarioActual"));
  let objetivo = usuario && usuario.objetivos ? usuario.objetivos.objetivo : "";
  let sexo = usuario && usuario.objetivos ? usuario.objetivos.sexo : "";

  if (!objetivo || !sexo) {
    alert("Por favor selecciona tu sexo y objetivo para ver la rutina.");
    return;
  }

  // Traducción de objetivo para rutinas
  switch (objetivo.toLowerCase()) {
    case "ganar masa muscular":
      objetivo = "masa";
      break;
    case "perder grasa":
      objetivo = "grasa";
      break;
    case "mantener":
    case "mantener estado físico":
      objetivo = "mantener";
      break;
    case "tonificar":
      objetivo = "tonificar";
      break;
    default:
      alert("Objetivo no reconocido.");
      return;
  }

  if (!rutinas[objetivo] || !rutinas[objetivo][sexo]) {
    document.getElementById("listaRutina").innerHTML = "<li>No hay rutina disponible para esta selección.</li>";
    return;
  }

  const rutinaUsuario = rutinas[objetivo][sexo];
  const listaRutina = document.getElementById("listaRutina");
  listaRutina.innerHTML = "";

  rutinaUsuario.forEach((dia) => {
    if (dia.includes("Ejercicio")) {
      const lineas = dia.split('\n');
      const titulo = lineas[0];
      const headers = lineas[1].split('\t').filter(Boolean);
      const rows = lineas.slice(2).map(l => l.split('\t').filter(Boolean));

      let tabla = `<h3>${titulo}</h3><table border="1" style="margin-bottom:16px;"><thead><tr>`;
      headers.forEach(h => tabla += `<th>${h}</th>`);
      tabla += `</tr></thead><tbody>`;
      rows.forEach(cols => {
        tabla += "<tr>";
        cols.forEach(c => tabla += `<td>${c}</td>`);
        tabla += "</tr>";
      });
      tabla += "</tbody></table>";

      const li = document.createElement("li");
      li.innerHTML = tabla;
      listaRutina.appendChild(li);
    } else {
      const li = document.createElement("li");
      li.textContent = dia;
      listaRutina.appendChild(li);
    }
  });

  document.getElementById("rutinaSemanal").classList.remove("hidden");
  document.getElementById("mainApp").classList.add("hidden");
}

function recoverPassword() {
  showScreen('recoverContainer');
}

function enviarCorreoRecuperacion() {
  const email = document.getElementById("recoverEmail").value.trim();
  const msg = document.getElementById("recoverMsg");
  const usuario = JSON.parse(localStorage.getItem("usuarioActual"));

  if (!email) {
    msg.textContent = "❌ Ingresa tu correo electrónico.";
    msg.classList.remove("hidden");
    return;
  }

  if (!usuario || usuario.correo !== email) {
    msg.textContent = "❌ No existe una cuenta con ese correo.";
    msg.classList.remove("hidden");
    return;
  }

  // Simulación de envío de correo
  msg.textContent = "✅ Se ha enviado un enlace de recuperación a tu correo. (Simulado)";
  msg.classList.remove("hidden");

  // Simula el enlace recibido y muestra el formulario para restablecer contraseña
  setTimeout(() => {
    showScreen('resetContainer');
    document.getElementById("resetEmail").value = email;
    msg.classList.add("hidden");
  }, 2000);
}

function modificarObjetivos() {
  const usuario = JSON.parse(localStorage.getItem("usuarioActual"));
  if (!usuario || !usuario.objetivos) {
    showScreen('objetivosForm');
    return;
  }
  const obj = usuario.objetivos;
  document.getElementById("sexo").value = obj.sexo || "";
  document.getElementById("actividad").value = obj.actividad || "";
  document.getElementById("trabajo").value = obj.trabajo || "";
  document.getElementById("objetivo").value = obj.objetivo || "";
  document.getElementById("edad").value = obj.edad || "";
  document.getElementById("peso").value = obj.peso || "";
  document.getElementById("estatura").value = obj.estatura || "";
  document.getElementById("diasEntreno").value = obj.diasEntreno || "";

  showScreen('objetivosForm');
}
// HORA EN MAIN APP
function mostrarFechaHoraMainApp() {
  const fechaHora = new Date();
  const opciones = { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  };
  const texto = fechaHora.toLocaleDateString('es-ES', opciones);
  document.getElementById("fecha-hora-main").textContent = texto.charAt(0).toUpperCase() + texto.slice(1);
}
// Mostrar fecha y hora al cargar la página
mostrarFechaHoraMainApp();
setInterval(mostrarFechaHoraMainApp, 60000); 

function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  const icon = btn.querySelector('img');
  if (input.type === "password") {
    input.type = "text";
    icon.src = "images/ojoabierto.png"; // Ojo tachado (mostrar)
    icon.alt = "Ocultar contraseña";
  } else {
    input.type = "password";
    icon.src = "images/ojocerrado.png"; // Ojo cerrado (ocultar)
    icon.alt = "Mostrar contraseña";
  }
  btn.classList.toggle("active");
}



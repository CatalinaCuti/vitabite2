const productos = {
    granola: {
        nombre: "Granola casera",
        imagen: "assets/img/granola.jpg",
        descripcion: "Una opción rica y saludable para comenzar el día. Ideal con yogur, leche o fruta.",
        ingredientes: "Avena, almendras, nueces, pasas, coco rallado y miel.",
        presentacion: "Bolsa de 300 g.",
        precio: "$180"
    },
    barras: {
        nombre: "Barras de cereal",
        imagen: "assets/img/barras.jpg",
        descripcion: "Prácticas y deliciosas para llevar a cualquier lugar. Perfectas para el recreo o después de entrenar.",
        ingredientes: "Avena, maní, miel, arándanos y semillas.",
        presentacion: "Pack de 4 barras.",
        precio: "$120"
    },
    cookies: {
        nombre: "Cookies de avena",
        imagen: "assets/img/cookies.jpg",
        descripcion: "Cookies caseras hechas con ingredientes simples, crocantes por fuera y suaves por dentro.",
        ingredientes: "Avena, harina integral, banana, pasas y canela.",
        presentacion: "Pack de 6 cookies.",
        precio: "$150"
    }
};

const modal = document.getElementById("modal");
const botonesVer = document.querySelectorAll(".btn-ver");
const botonCerrar = document.getElementById("cerrar-modal");
const botonPedir = document.getElementById("modal-pedir");

let productoActual = "";

function abrirModal(clave) {
    const producto = productos[clave];
    productoActual = producto.nombre;

    document.getElementById("modal-imagen").src = producto.imagen;
    document.getElementById("modal-imagen").alt = producto.nombre;
    document.getElementById("modal-nombre").textContent = producto.nombre;
    document.getElementById("modal-descripcion").textContent = producto.descripcion;
    document.getElementById("modal-ingredientes").textContent = producto.ingredientes;
    document.getElementById("modal-presentacion").textContent = producto.presentacion;
    document.getElementById("modal-precio").textContent = producto.precio;

    modal.classList.add("activo");
}

function cerrarModal() {
    modal.classList.remove("activo");
}

botonesVer.forEach(function (boton) {
    boton.addEventListener("click", function () {
        abrirModal(boton.dataset.producto);
    });
});

botonCerrar.addEventListener("click", cerrarModal);

modal.addEventListener("click", function (evento) {
    if (evento.target === modal) {
        cerrarModal();
    }
});

document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") {
        cerrarModal();
    }
});

botonPedir.addEventListener("click", function () {
    document.getElementById("mensaje").value = "Hola, me interesa el producto: " + productoActual + ".";
    cerrarModal();
});

const formulario = document.getElementById("form-contacto");
const aviso = document.getElementById("form-aviso");

function mostrarAviso(texto, tipo) {
    aviso.textContent = texto;
    aviso.className = tipo;
}

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    if (nombre === "" || email === "" || mensaje === "") {
        mostrarAviso("Por favor completá todos los campos.", "aviso-error");
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        mostrarAviso("Ingresá un correo electrónico válido.", "aviso-error");
        return;
    }

    const consultas = JSON.parse(localStorage.getItem("consultas")) || [];

    consultas.push({
        nombre: nombre,
        email: email,
        mensaje: mensaje,
        fecha: new Date().toLocaleString()
    });

    localStorage.setItem("consultas", JSON.stringify(consultas));

    mostrarAviso("¡Gracias " + nombre + "! Recibimos tu consulta y te vamos a responder pronto.", "aviso-ok");
    formulario.reset();
});

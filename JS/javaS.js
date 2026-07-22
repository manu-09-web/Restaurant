document.addEventListener('DOMContentLoaded', () => {

    // ---- 1. FORMULARIO DE CONTACTO / AWS ----
    const form = document.getElementById("form-contacto");
    const respuesta = document.getElementById("form-response");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const datos = {
                nombre: document.getElementById("nombre").value.trim(),
                correo: document.getElementById("correo").value.trim(),
                telefono: document.getElementById("telefono").value.trim(),
                preparatoria: document.getElementById("prepa").value.trim(),
                dudas: document.getElementById("mensaje").value.trim()
            };

            // ---- VALIDACIÓN ----
            const telefonoValido = /^[0-9]{10}$/.test(datos.telefono);

            if (!datos.nombre || !datos.correo || !datos.telefono || !datos.preparatoria) {
                respuesta.textContent = "Por favor llena todos los campos obligatorios.";
                respuesta.style.color = "red";
                respuesta.classList.remove("hidden-message");
                return;
            }

            if (!telefonoValido) {
                respuesta.textContent = "El teléfono debe tener exactamente 10 dígitos numéricos.";
                respuesta.style.color = "red";
                respuesta.classList.remove("hidden-message");
                return;
            }

            
        });
    }

    // ---- 2. SLIDER DE IMÁGENES ----
    const anterior = document.getElementById('anterior');
    const siguiente = document.getElementById('siguiente');
    const slider = document.querySelector('.imagenes-slide');
    const imagenes = document.querySelectorAll('.imagenes-slide img');

    if (anterior && siguiente && slider && imagenes.length > 0) {
        let indiceActual = 0;

        function mostrarImagen(indice) {
            slider.style.transform = `translateX(-${indice * 100}%)`;
        }

        siguiente.addEventListener('click', () => {
            indiceActual = (indiceActual + 1) % imagenes.length;
            mostrarImagen(indiceActual);
        });

        anterior.addEventListener('click', () => {
            indiceActual = (indiceActual - 1 + imagenes.length) % imagenes.length;
            mostrarImagen(indiceActual);
        });

        setInterval(() => {
            indiceActual = (indiceActual + 1) % imagenes.length;
            mostrarImagen(indiceActual);
        }, 3000);
    }

    // ---- 3. MODAL DEL MENÚ (BOTONES "+") ----
    const modal = document.getElementById('modalAgregar');
    const modalMensaje = document.getElementById('modalMensaje');
    const botonesAgregar = document.querySelectorAll('.btn-agregar');

    if (modal && botonesAgregar.length > 0) {
        botonesAgregar.forEach(boton => {
            boton.addEventListener('click', (e) => {
                const card = e.target.closest('.menu-card');
                if (card) {
                    const nombrePlatillo = card.querySelector('h3').textContent;
                    if (modalMensaje) {
                        modalMensaje.textContent = `Has agregado "${nombrePlatillo}" a tu pedido.`;
                    }
                    modal.classList.add('active');
                }
            });
        });

        // Evento para cerrar haciendo clic fuera o en botón
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('btn-cerrar-modal')) {
                modal.classList.remove('active');
            }
        });
    }

});
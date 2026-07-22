document.addEventListener('DOMContentLoaded', () => {
    // ---- FORMULARIO DE CONTACTO ----
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

            // ---- ENVÍO AL BACKEND ----
            try {
                //const res = await fetch("http://localhost:7000/api/formulario", //PARA LA BD LOCAL
                const res = await fetch("https://formularioup.duckdns.org/api/formulario",  { //PARA LA BD CORRIENDO EN AWS
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(datos)
                });

                if (res.ok) {
                    respuesta.textContent = `¡Gracias por tu interés, ${datos.nombre}! Hemos recibido tu solicitud. Pronto nos comunicaremos contigo al correo ${datos.correo}.`;
                    respuesta.className = 'hidden-message success';
                    respuesta.classList.remove("hidden-message");
                    form.reset();
                } else {
                    const error = await res.text();
                    respuesta.textContent = "Error al enviar: " + error;
                    respuesta.className = 'hidden-message';
                    respuesta.style.color = "red";
                    respuesta.classList.remove("hidden-message");
                }
            } catch (err) {
                respuesta.textContent = "No se pudo conectar con el servidor. ¿Está corriendo el backend?";
                respuesta.style.color = "red";
                respuesta.classList.remove("hidden-message");
                console.error(err);
            }
        });
    }

    // ---- SLIDER DE IMÁGENES ----
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
});
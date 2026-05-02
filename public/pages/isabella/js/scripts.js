document.addEventListener("DOMContentLoaded", () => {
  // --- Lógica Dialog QR ---
  const qrBtn = document.getElementById("qr");
  const qrDialog = document.getElementById("qr-dialog");
  const closeBtn = document.getElementById("close-qr-dialog");

  if (qrBtn && qrDialog && closeBtn) {
    qrBtn.addEventListener("click", () => {
      qrDialog.showModal();
    });

    closeBtn.addEventListener("click", () => {
      qrDialog.classList.add("closing");
      setTimeout(() => {
        qrDialog.close();
        qrDialog.classList.remove("closing");
      }, 300);
    });

    qrDialog.addEventListener("cancel", (e) => {
      e.preventDefault();
    });
  }

  // --- Lógica Dialog Send (Regalo) ---
  const sendBtn = document.getElementById("send");
  const sendDialog = document.getElementById("send-dialog");
  const closeSendBtn = document.getElementById("close-send-dialog");

  if (sendBtn && sendDialog && closeSendBtn) {
    sendBtn.addEventListener("click", () => {
      sendDialog.showModal();
    });

    closeSendBtn.addEventListener("click", () => {
      sendDialog.classList.add("closing");
      setTimeout(() => {
        sendDialog.close();
        sendDialog.classList.remove("closing");
      }, 300);
    });

    sendDialog.addEventListener("cancel", (e) => {
      e.preventDefault();
    });
  }

  // --- Lógica Portapapeles (Clipboard API) ---
  const copyBtns = document.querySelectorAll(".copy-btn");
  copyBtns.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const targetId = btn.getAttribute("data-target");
      const textToCopy = document.getElementById(targetId).innerText;

      try {
        await navigator.clipboard.writeText(textToCopy);

        // Feedback visual (cambiar icono temporalmente)
        const icon = btn.querySelector("i");
        const originalClass = icon.className;

        icon.className = "bi bi-check2"; // Icono de check
        btn.classList.replace("btn-outline-primary", "btn-success");

        // Restaurar después de 2 segundos
        setTimeout(() => {
          icon.className = originalClass;
          btn.classList.replace("btn-success", "btn-outline-primary");
        }, 2000);
      } catch (err) {
        console.error("Error al copiar al portapapeles: ", err);
        alert("No se pudo copiar el texto. Intenta seleccionarlo manualmente.");
      }
    });
  });
});

// Compartir por whatsapp
const btn = document.getElementById("share-wa");

btn.addEventListener("click", () => {
  // 1. Obtenemos la URL actual de la barra de direcciones
  const urlActual = window.location.href;

  // 2. Creamos el mensaje (importante usar encodeURIComponent para los símbolos)
  const mensaje = encodeURIComponent(
    `¡Hola! Te comparto mi invitación: ${urlActual}`,
  );

  // 3. Abrimos la ventana de WhatsApp
  window.open(`https://wa.me/?text=${mensaje}`, "_blank");
});

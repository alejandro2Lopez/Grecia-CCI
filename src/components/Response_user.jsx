import Swal from 'sweetalert2';

/**
 * Muestra un alerta de error reutilizable con SweetAlert2.
 * @param {string} title - Título principal del mensaje.
 * @param {string} [text] - Mensaje detallado opcional.
 * @param {string} [icon] - Tipo de ícono: 'error', 'warning', 'info' (default: 'error').
 */
export function showErrorAlert(title, text = '', icon = 'error') {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: 'Aceptar',
  });
}
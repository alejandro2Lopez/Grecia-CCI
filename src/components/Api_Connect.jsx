import { showErrorAlert } from "./Response_user";

// getFetch.js
export const getFetch = async (sb, path) => {
  try {
    const session = await sb.auth.getSession();
    const access_token = session.data.session?.access_token;
    const res = await fetch(`https://vhdqfwgegjootyegkllk.supabase.co/functions/v1/${path}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (!res.ok) {
      showErrorAlert("Error", "Ocurrió un error inesperado. Intenta nuevamente.", "error");
      console.error('Error del servidor:', await res.json());
      return false;
    }
    else {
      const response = await res.json().catch(() => {
        throw new Error('Respuesta del servidor no es JSON válido');
      });;
      console.log(response);
      return response;
    }

  } catch (error) {
    showErrorAlert("Error", "Hubo un problema. Refresca la página o contáctanos.", "error");
    // DEBUG: console.error('Error de red o ejecución:', error);
    return false;
  }
};
export const postFetch = async (sb, path, data) => {
  try {
    const session = await sb.auth.getSession();
    const access_token = session.data.session?.access_token;
    const res = await fetch(`https://vhdqfwgegjootyegkllk.supabase.co/functions/v1/${path}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      showErrorAlert("Error", "Ocurrió un error inesperado. Intenta nuevamente.", "error");
      // DEBUG: console.error('Error del servidor:', response);
      return false;
    }
    else {
      const response = await res.json().catch(() => {
        throw new Error('Respuesta del servidor no es JSON válido');
      });
      console.log(response);
      return response;
    }
  } catch (error) {
    showErrorAlert("Error", "Hubo un problema. Refresca la página o contáctanos.", "error");
    // DEBUG: console.error('Error de red o ejecución:', error);
    return false;
  }

};
export const putFetch = async (sb, path, data) => {
  try {
    const session = await sb.auth.getSession();
    const access_token = session.data.session?.access_token;

    const res = await fetch(`https://vhdqfwgegjootyegkllk.supabase.co/functions/v1/${path}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      showErrorAlert("Error", "Ocurrió un error inesperado. Intenta nuevamente.", "error");
      // DEBUG:   console.error('Error del servidor:', response);
      return false;
    } else {
      const response = await res.json().catch(() => {
        throw new Error('Respuesta del servidor no es JSON válido');

      });
      console.log(response);
      return response;
    }
  } catch (error) {
    showErrorAlert("Error", "Hubo un problema. Refresca la página o contáctanos.", "error");
    // DEBUG: console.error('Error de red o ejecución:', error);
    return false;
  }
};
export const deleteFetch = async (sb, path, data = null) => {
  try {
    const session = await sb.auth.getSession();
    const access_token = session.data.session?.access_token;

    const res = await fetch(`https://vhdqfwgegjootyegkllk.supabase.co/functions/v1/${path}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      body: data ? JSON.stringify(data) : null,
    });

    if (!res.ok) {
      showErrorAlert("Error", "Ocurrió un error inesperado. Intenta nuevamente.", "error");
      return false;
    } else {
      const response = await res.json().catch(() => {
        return {}; // En caso de que no retorne JSON
      });
      console.log(response);
      return response;
    }
  } catch (error) {
    showErrorAlert("Error", "Hubo un problema. Refresca la página o contáctanos.", "error");
    return false;
  }
};

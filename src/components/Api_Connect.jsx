// getFetch.js
import { showErrorAlert } from "./Response_user";

// Puedes definir la región que deseas usar globalmente:
const REGION = 'ca-central-1';

export const getFetch = async (sb, path) => {
  try {
    const session = await sb.auth.getSession();
    const access_token = session.data.session?.access_token;
    const res = await fetch(`https://vhdqfwgegjootyegkllk.supabase.co/functions/v1/${path}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'x-region': REGION
      },
    });
    if (!res.ok) {
      showErrorAlert("Error", "Ocurrió un error inesperado. Intenta nuevamente.", "error");
      return false;
    } else {
      const response = await res.json().catch(() => {
        throw new Error('Respuesta del servidor no es JSON válido');
      });
      return response;
    }
  } catch (error) {
    showErrorAlert("Error", "Hubo un problema. Refresca la página o contáctanos.", "error");
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
        'x-region': REGION
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      showErrorAlert("Error", "Ocurrió un error inesperado. Intenta nuevamente.", "error");
      return false;
    } else {
      const response = await res.json().catch(() => {
        throw new Error('Respuesta del servidor no es JSON válido');
      });
      return response;
    }
  } catch (error) {
    showErrorAlert("Error", "Hubo un problema. Refresca la página o contáctanos.", "error");
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
        'x-region': REGION
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      showErrorAlert("Error", "Ocurrió un error inesperado. Intenta nuevamente.", "error");
      return false;
    } else {
      const response = await res.json().catch(() => {
        throw new Error('Respuesta del servidor no es JSON válido');
      });

      return response;
    }
  } catch (error) {
    showErrorAlert("Error", "Hubo un problema. Refresca la página o contáctanos.", "error");
    return false;
  }
};

export const deleteFetch = async (sb, path, data = null) => {
  try {
    const session = await sb.auth.getSession();
    const access_token = session.data.session?.access_token;

    const res = await fetch(`https://vhdqfwgegjootyegkllk.supabase.co/functions/v1/${path}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
        'x-region': REGION
      },
      body: JSON.stringify(data || {}),
    });

    if (!res.ok) {
      showErrorAlert("Error", "Ocurrió un error inesperado. Intenta nuevamente.", "error");
      return false;
    } else {
      const response = await res.json().catch(() => {
        return {};
      });
      return response;
    }
  } catch (error) {
    showErrorAlert("Error", "Hubo un problema. Refresca la página o contáctanos.", "error");
    return false;
  }
};

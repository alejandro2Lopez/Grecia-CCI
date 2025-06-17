import { z } from 'zod';

// Nombre con solo letras y sin contenido peligroso
export const nameString = z.string()
  .trim()
  .min(1, "El campo es requerido")
  .refine(val => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]+$/.test(val), {
    message: "El campo no debe contener números ni símbolos extraños",
  })
  .refine(val => !/<[^>]*script|onerror=|onload=|<img/i.test(val), {
    message: "Contenido inválido detectado",
  });

// Correo válido
export const email = z.string()
  .trim()
  .email({ message: "Correo inválido" });

// Teléfono CR: 8 dígitos


export const phoneCR = z
  .string()
  .trim()
  .regex(/^\+\d{1,3}\d{7,12}$/, {
    message: "Teléfono inválido. Debe incluir el prefijo internacional (ej. +506) seguido de 7 a 12 dígitos.",
  });

// Fecha requerida
export const requiredDate = z.coerce.date({
  required_error: "La fecha es requerida",
  invalid_type_error: "Formato de fecha inválido",
}).refine(
  (date) => !isNaN(date.getTime()),
  { message: "Fecha inválida" }
);

// Número requerido mayor o igual a cero
export const requiredPositiveNumber = z.coerce.number({
  required_error: "El número es requerido",
  invalid_type_error: "Debe ser un número válido",
}).min(0, { message: "Debe ser un número mayor o igual a 0" });

export const buildSafeID = (
  minLen = 1,
  minMsg = "Este campo es requerido"
) =>
  z
    .string()
    .trim()
    .min(minLen, { message: minMsg })
    .refine(
      val => !/<[^>]*script|onerror=|onload=|<img/i.test(val),
      { message: "Contenido inválido detectado (script o carga maliciosa)" }
    )
    .refine(
      val => !val.includes(" "),
      { message: "No se permiten espacios en blanco" }
    )
    .refine(
      val => !val.includes("-"),
      { message: "No se permiten guiones (-)" }
    );

// Reusable builder para textos seguros
export const buildSafeString = (minLen = 1, minMsg = "Este campo es requerido") =>
  z.string()
    .trim()
    .min(minLen, { message: minMsg })
    .refine(
      val => !/<[^>]*script|onerror=|onload=|<img/i.test(val),
      { message: "Contenido inválido detectado" }
    );

// Texto alfanumérico con validaciones relajadas
export const text_normal = z.string()
  .trim()
  .refine(val => val === '' || /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s'-]+$/.test(val), {
    message: "El campo solo puede contener letras, números y espacios",
  })
  .refine(val => val === '' || !/<[^>]*script|onerror=|onload=|<img/i.test(val), {
    message: "Contenido inválido detectado",
  });

// Campos reutilizables
export const idCard = buildSafeID(5, "Cédula inválida");
export const nationality = buildSafeString();
export const address = buildSafeString();

// Validación de parámetro seguro
export const schema_params = z.object({
  param: z.string()
    .min(1, { message: "Parámetro requerido" })
    .max(50, { message: "Debe tener máximo 50 caracteres" })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: "Solo se permiten letras, números, guiones y guiones bajos",
    }),
});

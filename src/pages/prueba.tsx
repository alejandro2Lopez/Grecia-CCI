import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Definir el esquema
const formSchema = z.object({
  p_full_name: z.preprocess(
    val => typeof val === "string" ? val.trim() : val,
    z.string().min(1, "Nombre completo requerido")
  ),

  p_email: z.string().email("Correo inválido"),
  p_birth_date: z.coerce.date({ required_error: "Fecha de nacimiento requerida" }),
  p_card_id: z.string().min(5, "Cédula inválida"),
  p_phone_number: z.string().regex(/^[+]{1}506\d{8}$/, "Teléfono inválido"),
  p_phone_number_optional: z
    .string()
    .trim()
    .optional()
    .refine(
      val => !val || /^[+]{1}506\d{8}$/.test(val),
      { message: "Teléfono inválido" }
    ),
  p_nationality: z.string().min(1, "Nacionalidad requerida"),
  p_home_direction: z.string().min(1, "Dirección requerida"),
  p_occupation: z
    .string()
    .min(1, "Ocupación requerida")
    .refine(
      val => !/<[^>]*script|onerror=|onload=|<img/i.test(val),
      { message: "Contenido inválido" }
    ),


  ce_full_name: z.string().min(1, "Nombre de contacto requerido"),
  ce_kindred: z.string().min(1, "Parentesco requerido"),
  ce_phone_number: z.string().regex(/^[+]{1}506\d{8}$/, "Teléfono de contacto inválido"),

  e_start_date: z.coerce.date({ required_error: "Fecha de inicio requerida" }),
  e_schedule: z.coerce.date({ required_error: "Horario requerido" }),
  e_enrollement_date: z.coerce.date({ required_error: "Fecha de matrícula requerida" }),
  e_next_payment: z.coerce.date({ required_error: "Próximo pago requerido" }),

  e_course_id: z.coerce.number().min(1, "Curso requerido"),
  e_person_teacher_id: z.coerce.number().min(1, "Profesor requerido"),
});

type FormData = z.infer<typeof formSchema>;

const Formulario: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data: FormData) => {
    console.log("Datos enviados:", data);
  };

  const renderStatusIcon = (name: keyof FormData) => {
    const hasError = !!errors[name];
    const isTouched = touchedFields[name];

    if (isTouched || hasError) {
      return hasError ? (
        <span className="text-red-500 ml-2">❌</span>
      ) : (
        <span className="text-green-500 ml-2">✅</span>
      );
    }

    return null;
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-2xl mx-auto p-4">
      {(Object.keys(formSchema.shape) as Array<keyof FormData>).map((key) => {
        const fieldSchema = formSchema.shape[key];
        const isDateField = key.includes('date');
        const isEmailField = key.includes('email');
        const isNumberField = 'schema' in fieldSchema._def && fieldSchema._def.schema instanceof z.ZodNumber;

        const inputType = isDateField
          ? 'date'
          : isEmailField
            ? 'email'
            : isNumberField
              ? 'number'
              : 'text';

        return (
          <div key={key} className="flex flex-col">
            <label htmlFor={key} className="capitalize font-medium">
              {key.replace(/_/g, ' ')}
            </label>
            <div className="flex items-center">
              <input
                {...register(key)}
                id={key}
                type={inputType}
                className="border p-2 flex-1"
              />
              {renderStatusIcon(key)}
            </div>
            {errors[key] && (
              <p className="text-red-500 text-sm">{errors[key]?.message as string}</p>
            )}
          </div>
        );
      })}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Enviar
      </button>
    </form>
  );
};

export default Formulario;

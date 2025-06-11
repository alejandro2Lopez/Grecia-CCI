//import React, { useEffect, useState } from "react";

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema_Student, courseSchema } from "../components/schemas";
import { getFetch, postFetch } from "../components/Api_Connect";
import { useAuth } from "../context/AuthContext";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import AddUserComponent from "../components/AddUserComponent";
//Editar o ver 
import React, { useMemo, useState, useEffect } from 'react';

type FormData = z.infer<typeof formSchema_Student>;
const Add_student: React.FC = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState<Array<{ course_id: number; description: string }>>([]);
    const { sb } = useAuth();
    const [teachers, setTeachers] = useState<Array<{ teacher_id: number; teacher_name: string }>>([]);
    const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    //Ver o editar
    //const [data, setData] = useState(() => []);

    const [globalFilter, setGlobalFilter] = useState('');
    // Supongamos este es el dato que viene de la BD:
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors: mainErrors, touchedFields },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema_Student),
        mode: 'all',
        defaultValues: {
            p_birth_date: undefined, // o new Date()
        },
    });



    useEffect(() => {


        // Cargamos cursos
        const get_courses = async () => {
            const res = await getFetch(sb, 'common-service?action=getCourses');
            if (res) {
                setCourses(res.data);
            }
        };

        // Cargamos profesores
        const get_teachers = async () => {
            const res = await getFetch(sb, 'common-service?action=getTeachers');
            if (res) {
                setTeachers(res.data);
            }
        };

        get_teachers();
        get_courses();
    }, []);

    const onError = (errors: any) => {
        Swal.fire({
            title: 'Revisa la informacion!',
            text: 'Por favor revisa los datos. Hay campos incompletos o incorrectos.',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false, // No deja cerrar haciendo clic fuera
            allowEscapeKey: false,    // No deja cerrar con Esc
            backdrop: true,
            customClass: {
                confirmButton: 'button-alert'
            }           // Asegura que se bloquee el fondo
        })

    };
    const onSubmit = async (data: FormData) => {

        const isValid = await courseForm.trigger(); // Validamos manualmente el form de curso

        if (enrolledCourses.length === 0) {
            alert("Por favor revisa los datos del curso. Hay campos incompletos o incorrectos.");
            Swal.fire({
                title: 'Olvidaste agregar el curso!',
                text: 'Para continuar con la matricula debes agregar almenos un curso ',
                icon: 'warning',
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false, // No deja cerrar haciendo clic fuera
                allowEscapeKey: false,    // No deja cerrar con Esc
                backdrop: true,
                customClass: {
                    confirmButton: 'button-alert'
                }           // Asegura que se bloquee el fondo
            })

            return;
        }
        setIsSubmitting(true); // Activar loading
        const fullData = {
            student: data,
            enrolled_courses: enrolledCourses,
        };

        const resultado = await postFetch(sb, "hello-world", fullData);
        if (resultado) {
            setIsSubmitting(false);

            Swal.fire({
                title: 'Estudiante matriculado!',
                text: 'El estudiante se ha matriculado correctamente.',
                icon: 'success',
                confirmButtonText: 'Ver estudiantes',
                allowOutsideClick: false, // No deja cerrar haciendo clic fuera
                allowEscapeKey: false,    // No deja cerrar con Esc
                backdrop: true            // Asegura que se bloquee el fondo
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/estudiantes'); // o usa navigate(...)
                }
            });
        }

    };
    type CourseFormData = {
        e_schedule: string;
        e_course_payment: number;
        e_first_course_payment: number;
        e_enrolment_payment: number;
        e_course_id: number;
        e_person_teacher_id: number;
        e_start_date: Date;
        e_next_payment: Date;
        e_notes: string;
        e_enrollment_paymentSN: number
    };
    const courseForm = useForm<CourseFormData>({
        resolver: zodResolver(courseSchema), mode: 'all',
        defaultValues: {
            
            e_schedule: "",
            e_course_payment: 0,
            e_first_course_payment: 1,
          
            e_enrolment_payment: 0,
            e_course_id: 1,
            e_person_teacher_id: 6,
            e_notes: "",
            e_enrollment_paymentSN: 1

        },
    });
    const {
        formState: { errors: courseErrors },
        reset: resetCourseForm,
        watch: watchCourse
    } = courseForm;
    const formatDate = (date: any) => {
         if (!date) return '';

 

  // Usa los métodos UTC para obtener los componentes de la fecha basados en la hora UTC.
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
        
    };





    return <>
        <AddUserComponent
            isSubmitting={isSubmitting}
            handleState={null}
            readOnly={false}
            handleSubmit={handleSubmit}
            formatDate={formatDate}
            courseErrors={courseErrors}
            courseForm={courseForm}
            register={register}
            titleAction={"Matricular estudiante"}
            setEnrolledCourses={setEnrolledCourses}
            resetCourseForm={resetCourseForm}
            onSubmit={onSubmit}
            onError={onError}
            isReadOnly={false}
            mainErrors={mainErrors}
            teachers={teachers}
            courses={courses}
            action={""}
            enrolledCourses={enrolledCourses}
            watch={watch}
            isEdit={false}
            setGlobalFilter={setGlobalFilter}
            globalFilter={globalFilter}
            data={null}
            table={null}
            button_action={"Matricular Estudiante"}
            watchCourse={watchCourse}
        />
    </>
}
export default Add_student;

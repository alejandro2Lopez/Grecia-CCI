
import React, { useMemo, useState, useEffect } from 'react';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema_StudentUpdate, courseSchema } from "../components/schemas";
import { deleteFetch, getFetch, postFetch, putFetch } from "../components/Api_Connect";
import { useAuth } from "../context/AuthContext";
import Swal from 'sweetalert2';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AddUserComponent from "../components/AddUserComponent";
import { schema_params } from '../components/validators';
import { faDeleteLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//Editar o ver 

import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender, ColumnDef, CellContext
} from '@tanstack/react-table';
import { Loading } from '../components/Component_loading';

const Student: React.FC<any> = ({ isReadOnly, isEdit, titleAction }) => {
    type FormDataUpdate = z.infer<typeof formSchema_StudentUpdate>;
    const navigate = useNavigate();
    const [courses, setCourses] = useState<Array<{ course_id: number; description: string }>>([]);
    const { sb } = useAuth();
    const [teachers, setTeachers] = useState<Array<{ teacher_id: number; teacher_name: string }>>([]);
    const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    //Ver o editar
    //const [data, setData] = useState(() => []);
    const [data, setData] = useState<CourseFormDataV[]>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    // Supongamos este es el dato que viene de la BD:
    const [readOnly, setReadOnly] = useState(isReadOnly);
    const [searchParams] = useSearchParams();
    const [refresh, setRefresh] = useState(true);
    const [isSubmittingEnroll, setIsSubmittingEnroll] = useState(false);
    const [isSelectFillout, setSelectFillout] = useState(true);
    const [submittingRowIndex, setSubmittingRowIndex] = useState<number | null>(null);
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors: mainErrors, touchedFields },
    } = useForm<FormDataUpdate>({
        resolver: zodResolver(formSchema_StudentUpdate),
        mode: 'all',
        defaultValues: {
            p_birth_date: undefined, // o new Date()
        },
    });
    const get_courses = async () => {
        const res = await getFetch(sb, 'common-service?action=getCourses');
        if (res) setCourses(res.data);
    };

    const get_teachers = async () => {
        const res = await getFetch(sb, 'common-service?action=getTeachers');
        if (res) setTeachers(res.data);
    };
    useEffect(() => {


        const get_student = async () => {
            try {
                const paramValue = searchParams.get('estudiante') ?? '';
                const parsed = schema_params.safeParse({ param: paramValue });

                if (!parsed.success) {
                    console.warn('Parámetro inválido:', parsed.error.issues);
                    navigate('/error');
                    return;
                }

                const res = await getFetch(sb, `hello-world/${paramValue}`);

                if (res && res.data && Array.isArray(res.data.student) && res.data.student.length > 0) {
                  
                    reset(res.data.student[0]);
                    setData(res.data.enrolment);
                    setIsLoading(false);
                } else {
                  console.log(res)
                    throw new Error('Estructura inesperada en la respuesta del servidor.');
                }

                if (isSelectFillout) {
                    setSelectFillout(false);
                    await get_teachers();
                    await get_courses();
                }
            } catch (e) {
                console.error('Error al obtener datos del estudiante:', e);
            }
        };

        if (refresh) {
            setRefresh(false);
            setEnrolledCourses([]);
            get_student();
        }
    }, [refresh]);

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
    const onSubmit = async (data: FormDataUpdate) => {



        setIsSubmitting(true); // Activar loading
        const fullData = {
            student: data,
            enrolled_courses: enrolledCourses,
        };

        const resultado = await putFetch(sb, "hello-world", fullData);
        console.log(resultado);
        if (resultado) {
            setIsSubmitting(false);

            Swal.fire({
                title: 'Estudiante actualizado!',
                text: 'El estudiante ha sido actualizado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false, // No deja cerrar haciendo clic fuera
                allowEscapeKey: false,    // No deja cerrar con Esc
                backdrop: true            // Asegura que se bloquee el fondo
            }).then((result) => {
                if (result.isConfirmed) {
                    setRefresh(true);
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
            e_start_date: new Date(),
            e_schedule: "",
            e_course_payment: 0,
            e_first_course_payment: 1,
            e_next_payment: new Date(),
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
        const d = date instanceof Date ? date : new Date(date);
        return d.toLocaleDateString('es-CR'); // Puedes cambiar el locale si quieres otro formato
    };
    // Para editar o ver 
    type CourseFormDataV = {
        e_student_id: number;
        e_enrolment_id: number;
        e_course: string;
        e_course_id: number;
        e_person_teacher_id: number;
        e_teacher: string;
        e_start_date: Date;
        e_first_course_payment: number;
        e_next_payment: string;
        e_enrolment_payment: number;
        e_notes: string;
        e_active: boolean;
    };
    const columns: ColumnDef<CourseFormDataV>[] = useMemo(() => [

        {
            accessorKey: 'e_teacher',
            header: 'Profesor',
            cell: (info) => <span>{info.getValue<string>()}</span>,
        },
        {
            accessorKey: 'e_start_date',
            header: 'Fecha de inicio',
            cell: (info) => <span>{info.getValue<string>()}</span>,
        },
        {
            accessorKey: 'e_first_course_payment',
            header: 'Pago mensual',
            cell: (info) => <span>{info.getValue<string>()}</span>,
        },
        {
            accessorKey: 'e_next_payment',
            header: 'Próximo pago',
            cell: (info) => <span>{info.getValue<string>()}</span>,
        },
        {
            accessorKey: 'e_enrolment_payment',
            header: 'Pago de matrícula',
            cell: (info) => <span>{info.getValue<string>()}</span>,
        },
        {
            accessorKey: 'e_notes',
            header: 'Notas',
            cell: (info) => <span>{info.getValue<string>()}</span>,
        }, {
            accessorKey: 'e_active',
            header: 'Estado',
            cell: (info) => {
                const rowIndex = info.row.index;
                const rowData = info.row.original;

                const handleCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
                    const newValue = e.target.checked;
                    setIsSubmittingEnroll(true);
                    setSubmittingRowIndex(rowIndex); // Marcar la fila que se está actualizando
                    console.log("da el valor" + newValue);

                    const fullData = {
                        enrollment: { e_enrolment_id: rowData.e_enrolment_id, e_active: newValue },
                    };

                    const resultado = await postFetch(sb, "enrollment", fullData);
                    console.log(resultado);

                    if (resultado) {
                        setData((old) =>
                            old.map((row, index) =>
                                index === rowIndex ? { ...row, e_active: newValue } : row
                            )
                        );

                        Swal.fire({
                            title: 'Matrícula actualizada!',
                            text: 'La matrícula ha sido actualizada correctamente',
                            icon: 'success',
                            confirmButtonText: 'Aceptar',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            backdrop: true,
                        });
                    }

                    setIsSubmittingEnroll(false);
                    setSubmittingRowIndex(null); // Limpiar después de terminar
                };

                const isThisRowLoading = isSubmittingEnroll && submittingRowIndex === rowIndex;

                return (
                    <>
                        {isThisRowLoading ? (
                            <span className="spinner-enrolment" style={{ display: 'inline-block' }}></span>
                        ) : (
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    disabled={readOnly || isSubmittingEnroll} // Deshabilita todos excepto el spinner
                                    checked={info.getValue<boolean>()}
                                    onChange={handleCheckboxChange}
                                />
                            </div>
                        )}
                    </>
                );
            },
        },


        {
            id: 'acciones',
            header: '',
            cell: ({ row }) => {
                const estudiante = row.original;

                const handleEditar = () => {
                    navigate(`/editar-matricula?matricula=${estudiante.e_enrolment_id}`)

                };
                const handleDelete = async () => {
                    Swal.fire({
                        title: 'Registrando pago...',
                        text: 'Por favor espera un momento',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        didOpen: () => {
                            Swal.showLoading();
                        }
                    });
                    const res = await deleteFetch(sb, `enrollment/${estudiante.e_enrolment_id}`);
                    console.log(res)
                    if (res.data) {
                        Swal.fire({
                            title: 'Registro completo!',
                            text: 'Se ha registrado correctamente el pago del estudiante',
                            icon: 'success',
                            confirmButtonText: 'Aceptar',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            backdrop: true
                        }).then((result) => {
                            if (result.isConfirmed) {
                                setRefresh(true);


                            }
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Ocurrió un problema al eliminar la matricula del estudiante. Intenta de nuevo.'
                        });
                    }
                }


                return (
                    <div className="flex gap-2">

                        <button
                            type="button"
                            onClick={handleEditar}

                            style={{ background: "transparent", borderColor: "transparent" }}
                        ><i
                                className="fa fa-edit pt-0 mt-0"
                                style={{ fontSize: 20, color: "#1e5e5a" }}
                            />


                        </button>
                        <button
                            type="button"
                            style={{ background: "transparent", borderColor: "transparent" }}
                            onClick={handleDelete}
                        >
                            <FontAwesomeIcon icon={faTrash} style={{ fontSize: 24, color: "red" }} />
                        </button>
                    </div>
                );
            },
        },
    ], [readOnly, isSubmittingEnroll, setIsSubmittingEnroll]);
    const handleState = (isReadOnly: boolean) => {

        setReadOnly(isReadOnly);

    }
    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });
    return <>
        {isLoading ? (
            <Loading />
        ) : (<>
            <AddUserComponent
                isSubmitting={isSubmitting}
                handleState={handleState}
                readOnly={readOnly}
                handleSubmit={handleSubmit}
                formatDate={formatDate}
                courseErrors={courseErrors}
                courseForm={courseForm}
                register={register}
                titleAction={titleAction}
                setEnrolledCourses={setEnrolledCourses}
                resetCourseForm={resetCourseForm}
                onSubmit={onSubmit}
                onError={onError}
                isReadOnly={readOnly}
                mainErrors={mainErrors}
                teachers={teachers}
                courses={courses}
                action={""}
                enrolledCourses={enrolledCourses}
                watch={watch}
                isEdit={isEdit}
                setGlobalFilter={setGlobalFilter}
                globalFilter={globalFilter}
                data={data}
                table={table}
                button_action={"Actualizar Estudiante"}
                watchCourse={watchCourse}
            />
        </>)}
    </>
}
export default Student;

import TableComponent from "./TableComponent";
import Component_enrollment from "./Component_enrollment";
import Component_basic_information from "./Component_basic_information";
const AddUserComponent = ({ watchCourse, readOnly, button_action, handleState, watch, teachers, courses, handleSubmit, isSubmitting, formatDate, titleAction, register, mainErrors, courseErrors, setEnrolledCourses, resetCourseForm, courseForm, action, onSubmit, onError, isReadOnly, enrolledCourses, isEdit, table, setGlobalFilter, globalFilter, data }) => {

    const onAddCourse = courseForm.handleSubmit((courseData) => {
        setEnrolledCourses(prev => [...prev, courseData]);

        resetCourseForm({
            e_schedule: "",
            e_course_payment: 0,
            e_first_course_payment: 1,
            e_enrolment_payment: 0,
            e_start_date: new Date(),
            e_next_payment: new Date(),
            e_course_id: 1,
            e_person_teacher_id: 6,
            e_notes: ""
            // Agrega otros campos si los usas
        });
    });
    return <><div className="container-fluid">
        <div className="card shadow">
            <div className="card-header py-3">
                <div className="row align-items-center">
                    <div className="col">
                        <p className="text-primary m-0 fw-bold">{titleAction}</p>
                    </div>
                    <div className="col text-end">
                        {isEdit && (<>
                            {!readOnly ? (<button
                                onClick={() => handleState(true)}
                                style={{ background: "transparent", borderColor: "transparent" }}
                            >

                                <i
                                    className="fa fa-eye pt-0 mt-0"
                                    style={{ fontSize: 22, color: "rgb(175, 158, 0)" }}
                                />

                            </button>) : (
                                <button
                                    onClick={() => handleState(false)}

                                    style={{ background: "transparent", borderColor: "transparent" }}
                                ><i
                                        className="far fa-edit pt-0 mt-0"
                                        style={{ fontSize: 21, color: "#1e5e5a" }}
                                    />


                                </button>
                            )} </>)}
                    </div>
                </div>
            </div>
        </div>


        <div
            className="accordion"
            id="accordion-1"
            role="tablist"
            style={{
                marginBottom: ".5rem !important",
            }}>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
                <div className="accordion-item">
                    <h2 className="accordion-header" role="tab">
                        <button
                            aria-controls="accordion-1 .item-1"
                            aria-expanded="true"
                            className="accordion-button"
                            data-bs-target="#accordion-1 .item-1"
                            data-bs-toggle="collapse"
                            type="button">
                            Datos del estudiante
                        </button>
                    </h2>
                    <div
                        className="accordion-collapse collapse item-1 collapse show item-1"
                        data-bs-parent="#accordion-1"
                        role="tabpanel">
                        <div className="accordion-body">
                            <Component_basic_information
                                mainErrors={mainErrors}
                                watch={watch}
                                register={register}
                                isReadOnly={readOnly}
                                isSubmitting={null}
                                onSubmit={null}
                                button_Action={"Agregar profesor"}
                                isEdit={isEdit}
                                isTeacher={false}
                                language={null}
                                isMode={null}
                            />
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" role="tab">
                        <button
                            aria-controls="accordion-1 .item-2"
                            aria-expanded="false"
                            className="accordion-button collapsed"
                            data-bs-target="#accordion-1 .item-2"
                            data-bs-toggle="collapse"
                            type="button">
                            Contacto de emergencia
                        </button>
                    </h2>
                    <div
                        className="accordion-collapse collapse item-2"
                        data-bs-parent="#accordion-1"
                        role="tabpanel">
                        <div className="accordion-body">
                            <p className="mb-0" />
                            <div className="row">
                                <div className="col">
                                    <div className="card shadow mb-3">
                                        <div className="card-header py-3">
                                            <p className="text-primary m-0 fw-bold">
                                                Contacto de emergencia
                                            </p>
                                        </div>
                                        <div className="card-body">

                                            <div className="row">
                                                <div className="col">
                                                    <div className="mb-3">
                                                        <label className="form-label" htmlFor="username">
                                                            <strong>Nombre completo</strong>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            id="ce_full_name"

                                                            placeholder="user.name"
                                                            type="text"
                                                            {...register("ce_full_name")} readOnly={isReadOnly} />

                                                        {isReadOnly ? "" : mainErrors.ce_full_name && <p style={{ color: "red" }}> *{mainErrors.ce_full_name.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="mb-3">
                                                        <label className="form-label" htmlFor="email">
                                                            <strong>Parentezco</strong>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            id="ce_kindred"

                                                            placeholder="Madre"
                                                            type="text"
                                                            {...register("ce_kindred")} readOnly={isReadOnly} />

                                                        {isReadOnly ? "" : mainErrors.ce_kindred && <p style={{ color: "red" }}> *{mainErrors.ce_kindred.message}</p>}

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="mb-3">
                                                        <label className="form-label" htmlFor="first_name">
                                                            <strong>Télefono</strong>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            id="ce_phone_number"

                                                            placeholder="82250"
                                                            type="text"
                                                            {...register("ce_phone_number")} readOnly={isReadOnly} />

                                                        {isReadOnly ? "" : mainErrors.ce_phone_number && <p style={{ color: "red" }}> *{mainErrors.ce_phone_number.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="mb-3" />
                                                </div>
                                            </div>
                                            <div className="mb-3" />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {!isReadOnly && (<div className="accordion-item">
                    <h2 className="accordion-header" role="tab">
                        <button
                            aria-controls="accordion-1 .item-3"
                            aria-expanded="false"
                            className="accordion-button collapsed"
                            data-bs-target="#accordion-1 .item-3"
                            data-bs-toggle="collapse"
                            type="button">
                            Curso
                        </button>
                    </h2>
                    <div
                        className="accordion-collapse collapse item-3"
                        data-bs-parent="#accordion-1"
                        role="tabpanel">
                        <div className="accordion-body">
                            <div className="col">

                                <Component_enrollment courseForm={courseForm} courses={courses} teachers={teachers} courseErrors={courseErrors} onSubmit={onAddCourse}
                                    isEditEnrollment={false} watch={watchCourse} button_Action={"Agregar Curso"} isReadOnly={null} isSubmitting={null}

                                />

                            </div>

                            <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                                <table className="table my-0">
                                    <thead
                                        style={{
                                            background: "#d9d9d9",
                                        }}>
                                        <tr>

                                            <th className="border border-gray-300 bg-gray-100 px-2 py-1 text-sm cursor-pointer text-left">Curso</th>
                                            <th className="border border-gray-300 bg-gray-100 px-2 py-1 text-sm cursor-pointer text-left">Profesor</th>
                                            <th className="border border-gray-300 bg-gray-100 px-2 py-1 text-sm cursor-pointer text-left">Inicio</th>
                                            <th className="border border-gray-300 bg-gray-100 px-2 py-1 text-sm cursor-pointer text-left">Horario</th>
                                            <th className="border border-gray-300 bg-gray-100 px-2 py-1 text-sm cursor-pointer text-left">Costo mensual</th>
                                            <th className="border border-gray-300 bg-gray-100 px-2 py-1 text-sm cursor-pointer text-left">Primer pago</th>
                                            <th className="border border-gray-300 bg-gray-100 px-2 py-1 text-sm cursor-pointer text-left">Próximo pago</th>
                                            <th className="border border-gray-300 bg-gray-100 px-2 py-1 text-sm cursor-pointer text-left">Matrícula</th>
                                            <th className="border border-gray-300 bg-gray-100 px-2 py-1 text-sm cursor-pointer text-left">Estado de pago de la matrícula</th>
                                            <th className="border border-gray-300 bg-gray-100 px-2 py-1 text-sm cursor-pointer text-left">Notas</th>
                                            <th className="border border-gray-300 bg-gray-100 px-2 py-1 text-sm cursor-pointer text-left">{action}</th>

                                            <th />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {enrolledCourses.map((c, idx) => (
                                            <tr key={idx}>
                                                <td className="border border-gray-300 px-2 py-1 text-sm">{courses.find(t => t.course_id === c.e_course_id)?.description || 'Profesor desconocido'}</td>
                                                <td className="border border-gray-300 px-2 py-1 text-sm">{teachers.find(t => t.teacher_id === c.e_person_teacher_id)?.teacher_name || 'Profesor desconocido'}</td>
                                                <td className="border border-gray-300 px-2 py-1 text-sm">{formatDate(c.e_start_date)}</td>
                                                <td className="border border-gray-300 px-2 py-1 text-sm">{c.e_schedule}</td>
                                                <td className="border border-gray-300 px-2 py-1 text-sm">{c.e_course_payment}</td>
                                                <td className="border border-gray-300 px-2 py-1 text-sm">{c.e_first_course_payment == "1" ? "Cancelado" : "Pendiente"}</td>
                                                <td className="border border-gray-300 px-2 py-1 text-sm">{formatDate(c.e_next_payment)}</td>
                                                <td className="border border-gray-300 px-2 py-1 text-sm">{c.e_enrolment_payment}</td>
                                                <td className="border border-gray-300 px-2 py-1 text-sm">{c.e_enrollment_paymentSN == "1" ? "Cancelado" : "Pendiente"}</td>
                                                <td className="border border-gray-300 px-2 py-1 text-sm">{c.e_notes}</td>
                                                <td className="border border-gray-300 px-2 py-1 text-sm">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setEnrolledCourses(prev => prev.filter((_, i) => i !== idx))
                                                        }
                                                    >
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                )}
                {isEdit && (<div className="accordion-item">
                    <h2 className="accordion-header" role="tab">
                        <button
                            aria-controls="accordion-1 .item-4"
                            aria-expanded="false"
                            className="accordion-button collapsed"
                            data-bs-target="#accordion-1 .item-4"
                            data-bs-toggle="collapse"
                            type="button">
                            Cursos matriculados

                        </button>
                    </h2>
                    <div
                        className="accordion-collapse collapse item-4"
                        data-bs-parent="#accordion-1"
                        role="tabpanel">
                        <div className="accordion-body">
                            <p className="mb-0" />
                            <div className="row">
                                <div className="col">


                                    <div className="card-body">

                                        <div className="row">
                                            <div className="col">
                                                <div className="card shadow">

                                                    <div className="card-body">
                                                        <TableComponent
                                                            isLoading={false}
                                                            table={table}
                                                            setGlobalFilter={setGlobalFilter}
                                                            globalFilter={globalFilter}
                                                            data={data}
                                                            botonName={''}
                                                            redirecTo={"/"}
                                                            displayButton={false}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="mb-3" />

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}
                {!isReadOnly && (<button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                >
                    {isSubmitting ? (
                        <>
                            <span className="spinner" style={{ display: isSubmitting ? 'inline-block' : 'none' }}></span>
                            &nbsp;  {isEdit ? "Actualizando estudiante" : "Matriculando estudiante..."}
                        </>
                    ) : (
                        <>  {button_action}</>)
                    }

                </button>)}
            </form>
        </div >


    </div >
    </>

}

export default AddUserComponent;
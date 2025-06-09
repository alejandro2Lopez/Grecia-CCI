
import { useNavigate } from "react-router-dom";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Component_enrollment = ({ button_Action, courseForm, courses, teachers, courseErrors, onSubmit, isEditEnrollment, watch, isReadOnly, isSubmitting, handleState }) => {

    const navigate = useNavigate();
    return (<div className="card shadow mb-3">
        <div className="card-header py-3">
            <div className="row">


                <div className="col">
                    {isEditEnrollment ? (<p
                        className="text-primary m-0 fw-bold"
                        style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
                        onClick={() => navigate(-1)}
                    >
                        <FontAwesomeIcon
                            icon={faArrowAltCircleLeft}
                            style={{ fontSize: 23, color: "rgb(65, 112, 214)", paddingRight: 30 }}
                        />
                        Matrícula
                    </p>) :
                        (<p className="text-primary m-0 fw-bold">Matricular curso</p>)
                    }
                </div>
                <div className="col text-end">
                    {isEditEnrollment && (<>
                        {!isReadOnly ? (<button
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
                                    className="fa fa-edit pt-0 mt-0"
                                    style={{ fontSize: 21, color: "#1e5e5a" }}
                                />


                            </button>
                        )} </>)}
                </div>

            </div>
        </div>

        <div className="card-body">

            <div className="row">
                <div className="col">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="username">
                            <strong>Curso</strong>
                        </label>
                        <select className="form-select" disabled={isReadOnly}{...courseForm.register("e_course_id", { valueAsNumber: true })}>
                            <optgroup label="Seleccione el curso a matricular">
                                {courses.map(op => (
                                    <option key={op.course_id} value={op.course_id}>{op.description}</option>
                                ))}
                            </optgroup>
                        </select>
                    </div>
                </div>
                <div className="col">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="email">
                            <strong>Profesor</strong>
                        </label>
                        <select className="form-select" disabled={isReadOnly} {...courseForm.register("e_person_teacher_id", { valueAsNumber: true })}>
                            <optgroup label="Seleccione al profesor a cargo del curso">

                                {teachers.map(op => (
                                    <option key={op.teacher_id} value={op.teacher_id}>{op.teacher_name}</option>
                                ))}
                            </optgroup>
                        </select>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label className="form-label" htmlFor="first_name">
                        <strong>Fecha de Inicio</strong>
                    </label>
                    <input className="form-control" type="date" readOnly={isReadOnly} {...courseForm.register("e_start_date")}
                        value={!isEditEnrollment
                            ? watch("e_start_date")
                                ? new Date(watch("e_start_date")).toISOString().split("T")[0]
                                : ""
                            : undefined // permite que RHF maneje el valor si no es edición
                        }
                    />
                    {courseErrors.e_start_date && <p style={{ color: "red" }}> *{courseErrors.e_start_date.message}</p>}
                    <div className="mb-3" />
                </div>
                <div className="col">
                    <label className="form-label" htmlFor="first_name">
                        <strong>Horario</strong>
                    </label>
                    <input
                        className="form-control"
                        id="e_schedule"
                        readOnly={isReadOnly}
                        placeholder="Días martes y jueves a las 6:00pm"
                        type="text"
                        {...courseForm.register("e_schedule")} />

                    {courseErrors.e_schedule && <p style={{ color: "red" }}> *{courseErrors.e_schedule.message}</p>}
                    <div className="mb-3" />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label className="form-label" htmlFor="first_name">
                        <strong>Costo mensual</strong>
                    </label>
                    <input className="form-control" type="number" readOnly={isReadOnly} placeholder="36000" {...courseForm.register("e_course_payment", { valueAsNumber: true })} />

                    {courseErrors.e_course_payment && <p style={{ color: "red" }}> *{courseErrors.e_course_payment.message}</p>}
                    <div className="mb-3" />
                </div>
                <div className="col">
                    {!isEditEnrollment ? (<><label className="form-label" htmlFor="first_name">
                        <strong>Estado del primer pago</strong>
                    </label>
                        <select className="form-select" {...courseForm.register("e_first_course_payment")}>
                            <optgroup label="Seleccione el estado de pago">

                                <option value="1" >Cancelado</option>
                                <option value="0">Pendiente</option>

                            </optgroup>
                        </select></>) : (<>

                            <label className="form-label" htmlFor="first_name">
                                <strong>Estado del estudiante</strong>
                            </label>
                            <select
                                className="form-select"
                                {...courseForm.register("e_active")}
                                disabled={isReadOnly}
                            >
                                <optgroup label="Seleccione el estado del estudiante">
                                    <option value="1">Activo</option>
                                    <option value="0">Inactivo</option>
                                </optgroup>
                            </select>
                        </>)}

                    <div className="mb-3" />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label className="form-label" htmlFor="first_name">
                        <strong>Fecha de próximo pago</strong>
                    </label>
                    <input className="form-control" type="date" readOnly={isReadOnly}  {...courseForm.register("e_next_payment")}
                        value={isEditEnrollment
                            ? watch("e_next_payment")
                                ? new Date(watch("e_next_payment")).toISOString().split("T")[0]
                                : ""
                            : undefined // permite que RHF maneje el valor si no es edición
                        }
                    />

                    {courseErrors.e_next_payment && <p style={{ color: "red" }}> *{courseErrors.e_next_payment.message}</p>}
                    <div className="mb-3" />
                </div>
                <div className="col">
                    <label className="form-label" htmlFor="first_name">
                        <strong>Costo de matricula</strong>
                    </label>
                    <input
                        className="form-control"
                        id="e_next_payment"

                        placeholder="25000"
                        type="text"
                        readOnly={isEditEnrollment}
                        {...courseForm.register("e_enrolment_payment", { valueAsNumber: true })} />

                    {courseErrors.e_enrolment_payment && <p style={{ color: "red" }}> *{courseErrors.e_enrolment_payment.message}</p>}
                    <div className="mb-3" />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label className="form-label" htmlFor="first_name">
                        <strong>Notas</strong>
                    </label>
                    <input
                        className="form-control"
                        id="e_notes"
                        readOnly={isReadOnly}
                        placeholder="Escribe ... "
                        type="text"
                        {...courseForm.register("e_notes")} />

                    {courseErrors.e_notes && <p style={{ color: "red" }}> *{courseErrors.e_notes.message}</p>}
                    <div className="mb-3" />
                </div>
                <div className="col">
                    {!isEditEnrollment && (<><label className="form-label" htmlFor="first_name">
                        <strong>Estado de pago de matricula</strong>
                    </label>
                        <select className="form-select" {...courseForm.register("e_enrollment_paymentSN")}>
                            <optgroup label="Seleccione el estado de pago">

                                <option value="1" selected>Cancelado</option>
                                <option value="0">Pendiente</option>

                            </optgroup>
                        </select></>)}
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <div className="col d-flex r align-items-center">
                        <label className="form-label" htmlFor="first_name">
                            <strong></strong>
                        </label>
                        {!isEditEnrollment && (<button
                            type="button"
                            className="btn btn-primary btn-xs w-100"
                            onClick={onSubmit}
                        >
                            {button_Action}
                        </button>
                        )}
                        {!isReadOnly && isEditEnrollment && (<button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-primary"
                            onClick={onSubmit}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="spinner" style={{ display: isSubmitting ? 'inline-block' : 'none' }}></span>
                                    &nbsp;  {isEditEnrollment ? "Actualizando curso" : "Agregando curso..."}
                                </>
                            ) : (
                                <>  {button_Action}</>)
                            }

                        </button>)}
                    </div>
                </div>

            </div>

        </div>


    </div>)
}
export default Component_enrollment;
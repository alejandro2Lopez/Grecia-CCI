


const Component_basic_information = ({ isMode, isTeacher, language, button_Action, mainErrors, register, onSubmit, watch, isReadOnly, isSubmitting, isEdit }) => {

    return (<div className="row">
        <div className="col-12 col-lg-6">
            <div className="card shadow mb-3">
                <div className="card-header py-3">
                    <p className="text-primary m-0 fw-bold">Información básica</p>
                </div>
                <div className="card-body">

                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <label className="form-label" htmlFor="username">
                                    <strong>Nombre Completo</strong>
                                </label>
                                <input
                                    className="form-control"
                                    id="username-3"

                                    placeholder="Mariela Almeda"
                                    type="text"
                                    {...register("p_full_name")} readOnly={isReadOnly} />

                                {isReadOnly ? "" : mainErrors.p_full_name && <p style={{ color: "red" }}> *{mainErrors.p_full_name.message}</p>}
                            </div>
                        </div>
                        <div className="col">
                            <div className="mb-3">
                                <label className="form-label" htmlFor="username-2">
                                    <strong>Número de cédula</strong>
                                </label>
                                <input
                                    className="form-control"
                                    id="username-2"

                                    placeholder="203560254"
                                    type="text"
                                    {...register("p_card_id")} readOnly={isReadOnly} />

                                {isReadOnly ? "" : mainErrors.p_card_id && <p style={{ color: "red" }}> *{mainErrors.p_card_id.message}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="mb-3">
                                <label className="form-label" htmlFor="last_name">
                                    <strong>Fecha de nacimiento</strong>
                                </label>
                                <input className="form-control" type={!isReadOnly ? "date" : "text"} readOnly={isReadOnly}{...register("p_birth_date")}
                                    value={isEdit
                                        ? watch("p_birth_date")
                                            ? new Date(watch("p_birth_date")).toISOString().split("T")[0]
                                            : ""
                                        : undefined // permite que RHF maneje el valor si no es edición
                                    }
                                />

                                {isReadOnly ? "" : mainErrors.p_birth_date && <p style={{ color: "red" }}> *{mainErrors.p_birth_date.message}</p>}
                            </div>
                        </div>
                        {isTeacher ? (<div className="col">
                            <div className="mb-3">
                                <label className="form-label" htmlFor="email">
                                    <strong>Lenguaje de enseñanza</strong>
                                </label>
                                <select className="form-select" disabled={isReadOnly} defaultValue={language[0]?.p_language_id}{...register("p_language_id", { valueAsNumber: true })}>
                                    <optgroup label="Seleccione al profesor a cargo del curso">

                                        {language.map(op => (
                                            <option key={op.p_language_id} value={op.p_language_id}>{op.language_description}</option>
                                        ))}
                                    </optgroup>
                                </select>
                            </div>
                        </div>) :
                            (<div className="col">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="first_name">
                                        <strong>Estado civil</strong>
                                    </label>
                                    <select className="form-select"  {...register("p_marital_status")} disabled={isReadOnly}>
                                        <optgroup label="Seleccione su estado civil">

                                            <option key="Soltero" value="Soltero" >Soltero</option>
                                            <option key="Casado" value="Casado">Casado</option>
                                            <option key="Viudo" value="Viudo">Viudo</option>
                                        </optgroup>
                                    </select>
                                    {isReadOnly ? "" : isReadOnly ? "" : mainErrors.p_marital_status && <p style={{ color: "red" }}> *{mainErrors.p_marital_status.message}</p>}
                                </div>
                            </div>

                            )}
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <label className="form-label" htmlFor="first_name">
                                    <strong>Nacionalidad</strong>
                                </label>
                                <select
                                    className="form-select"
                                    id="nacionalidad"

                                    defaultValue="Costa Rica"{...register("p_nationality")} disabled={isReadOnly}  >
                                    {[
                                        "Afganistán",
                                        "Albania",
                                        "Alemania",
                                        "Andorra",
                                        "Angola",
                                        "Antigua y Barbuda",
                                        "Arabia Saudita",
                                        "Argelia",
                                        "Argentina",
                                        "Armenia",
                                        "Australia",
                                        "Austria",
                                        "Azerbaiyán",
                                        "Bahamas",
                                        "Bangladés",
                                        "Barbados",
                                        "Baréin",
                                        "Bélgica",
                                        "Belice",
                                        "Benín",
                                        "Bielorrusia",
                                        "Birmania/Myanmar",
                                        "Bolivia",
                                        "Bosnia y Herzegovina",
                                        "Botsuana",
                                        "Brasil",
                                        "Brunéi",
                                        "Bulgaria",
                                        "Burkina Faso",
                                        "Burundi",
                                        "Bután",
                                        "Cabo Verde",
                                        "Camboya",
                                        "Camerún",
                                        "Canadá",
                                        "Catar",
                                        "Chad",
                                        "Chile",
                                        "China",
                                        "Chipre",
                                        "Ciudad del Vaticano",
                                        "Colombia",
                                        "Comoras",
                                        "Corea del Norte",
                                        "Corea del Sur",
                                        "Costa de Marfil",
                                        "Costa Rica",
                                        "Croacia",
                                        "Cuba",
                                        "Dinamarca",
                                        "Dominica",
                                        "Ecuador",
                                        "Egipto",
                                        "El Salvador",
                                        "Emiratos Árabes Unidos",
                                        "Eritrea",
                                        "Eslovaquia",
                                        "Eslovenia",
                                        "España",
                                        "Estados Unidos",
                                        "Estonia",
                                        "Etiopía",
                                        "Filipinas",
                                        "Finlandia",
                                        "Fiyi",
                                        "Francia",
                                        "Gabón",
                                        "Gambia",
                                        "Georgia",
                                        "Ghana",
                                        "Granada",
                                        "Grecia",
                                        "Guatemala",
                                        "Guyana",
                                        "Guinea",
                                        "Guinea ecuatorial",
                                        "Guinea-Bisáu",
                                        "Haití",
                                        "Honduras",
                                        "Hungría",
                                        "India",
                                        "Indonesia",
                                        "Irak",
                                        "Irán",
                                        "Irlanda",
                                        "Islandia",
                                        "Islas Marshall",
                                        "Islas Salomón",
                                        "Israel",
                                        "Italia",
                                        "Jamaica",
                                        "Japón",
                                        "Jordania",
                                        "Kazajistán",
                                        "Kenia",
                                        "Kirguistán",
                                        "Kiribati",
                                        "Kuwait",
                                        "Laos",
                                        "Lesoto",
                                        "Letonia",
                                        "Líbano",
                                        "Liberia",
                                        "Libia",
                                        "Liechtenstein",
                                        "Lituania",
                                        "Luxemburgo",
                                        "Macedonia del Norte",
                                        "Madagascar",
                                        "Malasia",
                                        "Malaui",
                                        "Maldivas",
                                        "Malí",
                                        "Malta",
                                        "Marruecos",
                                        "Mauricio",
                                        "Mauritania",
                                        "México",
                                        "Micronesia",
                                        "Moldavia",
                                        "Mónaco",
                                        "Mongolia",
                                        "Montenegro",
                                        "Mozambique",
                                        "Namibia",
                                        "Nauru",
                                        "Nepal",
                                        "Nicaragua",
                                        "Níger",
                                        "Nigeria",
                                        "Noruega",
                                        "Nueva Zelanda",
                                        "Omán",
                                        "Países Bajos",
                                        "Pakistán",
                                    ].map((pais) => (
                                        <option key={pais} value={pais}>
                                            {pais}
                                        </option>
                                    ))}


                                </select>

                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="mb-3">
                                <label className="form-label" htmlFor="last_name">
                                    <strong>Ocupación</strong>
                                </label>
                                <input
                                    className="form-control"
                                    id="username"

                                    placeholder="Pastelero"
                                    type="text"
                                    {...register("p_occupation")} readOnly={isReadOnly} />

                                {isReadOnly ? "" : mainErrors.p_occupation && <p style={{ color: "red" }}> *{mainErrors.p_occupation.message}</p>}

                            </div>
                        </div>
                    </div>
                    <div className="mb-3" />

                </div>
            </div>
        </div>
        <div className="col-12 col-lg-6">
            <div className="card shadow">
                <div className="card-header py-3">
                    <p className="text-primary m-0 fw-bold">
                        Información de contacto
                    </p>
                </div>
                <div className="card-body mb-0 pb-4">

                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <label className="form-label" htmlFor="city">
                                    <strong>Número de télefono</strong>
                                </label>
                                <input
                                    className="form-control"
                                    id="p_phone_number"

                                    placeholder="+50688888888"
                                    type="text"
                                    {...register("p_phone_number")} readOnly={isReadOnly} />

                                {isReadOnly ? "" : mainErrors.p_phone_number && <p style={{ color: "red" }}> *{mainErrors.p_phone_number.message}</p>}

                            </div>
                        </div>
                        <div className="col">
                            <div className="mb-3">
                                <label className="form-label" htmlFor="city-2">
                                    <strong>Número de télefono (Opcional)</strong>
                                </label>
                                <input
                                    className="form-control"
                                    id="p_phone_number_optional"

                                    placeholder="+50688888888"
                                    type="text"
                                    {...register("p_phone_number_optional")} readOnly={isReadOnly} />

                                {isReadOnly ? "" : mainErrors.p_phone_number_optional && <p style={{ color: "red" }}> *{mainErrors.p_phone_number_optional.message}</p>}

                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <label className="form-label" htmlFor="address">
                                    <strong>Domicilio</strong>
                                </label>
                                <input
                                    className="form-control"
                                    id="address"

                                    placeholder="Alajuela, Grecia ..."
                                    type="text"
                                    {...register("p_home_direction")} readOnly={isReadOnly} />

                                {isReadOnly ? "" : mainErrors.p_home_direction && <p style={{ color: "red" }}> *{mainErrors.p_home_direction.message}</p>}

                            </div>
                        </div>
                        <div className="col">
                            <div className="mb-3">
                                <label className="form-label" htmlFor="email">
                                    <strong>Correo electróncio</strong>
                                </label>
                                <input
                                    className="form-control"
                                    id="email"

                                    placeholder="user@example.com"
                                    type="email"
                                    {...register("p_email")} readOnly={isReadOnly} />

                                {isReadOnly ? "" : mainErrors.p_email && <p style={{ color: "red" }}> *{mainErrors.p_email.message}</p>}

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        {isTeacher && (<div className="row">
            <div className="col">
                <div className="mb-3">
                    {(isMode === "create" || isMode === "edit") && (
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-primary"
                            onClick={onSubmit}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="spinner"  style={{ display: isSubmitting ? 'inline-block' : 'none' }} />&nbsp;
                                    {isMode === "edit" ? "Guardando cambios..." : "Agregando profesor..."}
                                </>
                            ) : (
                                <>{button_Action}</>
                            )}
                        </button>
                    )}

                </div>
            </div>
        </div>)}
    </div>
    )
}

export default Component_basic_information;
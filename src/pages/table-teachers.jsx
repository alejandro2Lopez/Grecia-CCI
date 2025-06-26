import React, { useMemo, useState, useEffect } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table';
import { getFetch, deleteFetch } from '../components/Api_Connect';
import { useAuth } from '../context/AuthContext';
import TableComponent from '../components/TableComponent'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router';
import { faDownload, faTrash } from '@fortawesome/free-solid-svg-icons';
import { downloadTableToExcel } from '../components/download_file';
import Swal from 'sweetalert2';


const Table_teacher = () => {

    const [data, setData] = useState(() => []);
    const [globalFilter, setGlobalFilter] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { sb } = useAuth();
    const navigate = useNavigate();
    const [submittingRowIndex, setSubmittingRowIndex] = useState(null);
    const [isSubmittingStatus, setIsSubmittingStatus] = useState(false);
    const [refresh, setRefresh] = useState(true)
    useEffect(() => {
        const table_st = async () => {
            const res = await getFetch(sb, 'teacher/');
            if (res.data) {
                setData(res.data);
            }
            setIsLoading(false);

        };
        if (refresh) {
            table_st();
            setRefresh(false);// <-- importante
        }

    }, [refresh]);


    const columns = useMemo(
        () => [
            {
                accessorKey: 'language_user',
                header: 'Lenguage de enseñanza',
                cell: ({ getValue }) => (
                    <span className="px-2 py-1 text-sm  bg-indigo-500 rounded">
                        {getValue()}
                    </span>
                ),
            }, {
                accessorKey: 'fullname',
                header: 'Nombre',
                cell: ({ getValue }) => <span>{getValue()}</span>,
            },
            {
                accessorKey: 'emailuser',
                header: 'Correo',
                cell: ({ getValue }) => <span>{getValue()}</span>,
            },
            {
                accessorKey: 'phonenumber',
                header: 'Teléfono',
                cell: ({ getValue }) => <span>{getValue()}</span>,
            },
            {
                accessorKey: 'phonenumberoptional',
                header: 'Teléfono opcional',
                cell: ({ getValue }) => <span>{getValue()}</span>,
            },
            {
                accessorKey: 'active',
                header: 'Estado',
                cell: (info) => {
                    const rowIndex = info.row.index;
                    const rowData = info.row.original;

                    const handleCheckboxChange = async (e) => {
                        const newValue = e.target.checked;
                        setIsSubmittingStatus(true);
                        setSubmittingRowIndex(rowIndex); // Marcar la fila que se está actualizando
                        console.log("da el valor" + newValue);

                        const fullData = {
                            teacher: { p_person_id: rowData.personid, p_active: newValue },
                        };

                        const resultado = await deleteFetch(sb, "teacher", fullData);
                        console.log(resultado);

                        if (resultado) {
                            setData((old) =>
                                old.map((row, index) =>
                                    index === rowIndex ? { ...row, e_active: newValue } : row
                                )
                            );

                            Swal.fire({
                                title: 'Profesor actualizada!',
                                text: 'El estado del profesor ha sido actualizado correctamente.',
                                icon: 'success',
                                confirmButtonText: 'Aceptar',
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                backdrop: true,
                            });
                        }

                        setIsSubmittingStatus(false);
                        setSubmittingRowIndex(null); // Limpiar después de terminar
                        setRefresh(true);
                        setIsLoading(true);
                    };

                    const isThisRowLoading = isSubmittingStatus && submittingRowIndex === rowIndex;

                    return (
                        <>
                            {isThisRowLoading ? (
                                <span className="spinner-enrolment" style={{ display: 'inline-block' }}></span>
                            ) : (
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        disabled={isSubmittingStatus} // Deshabilita todos excepto el spinner
                                        checked={info.getValue()}
                                        onChange={handleCheckboxChange}
                                    />
                                </div>
                            )}
                        </>
                    );
                }
            }
            , {
                id: 'acciones',
                header: '',
                cell: ({ row }) => {
                    const teacher = row.original;

                    const editTeacher = () => {
                        navigate(`/editar-profesor?profesor=${teacher.personid}`)

                    };

                    const showTeacher = () => {
                        navigate(`/mostrar-profesor?profesor=${teacher.personid}`)

                    };
                    const handleWhatsAppContact = () => {
                        const url = `https://api.whatsapp.com/send/?phone=${teacher.phonenumber}&text=Hola,%20estimado%20${encodeURIComponent(teacher.fullname)},%20espero%20se%20encuentre%20muy%20bien`;

                        window.open(url, '_blank');
                    };
                    const handleDeleteTeacher = async () => {

                        Swal.fire({
                            title: 'Eliminado profesor...',
                            text: 'Por favor espera un momento',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            didOpen: () => {
                                Swal.showLoading();
                            }
                        });
                        const resultado = await deleteFetch(sb, `hello-world/${teacher.personid}`);
                        console.log(resultado)

                        if (resultado) {

                            setRefresh(true);
                            Swal.fire({
                                title: 'El profesor ha sido eliminado!',
                                text: 'El profesor ha sido eliminado correctamente.',
                                icon: 'success',
                                confirmButtonText: 'Aceptar',
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                backdrop: true,
                            });
                        }


                    };
                    return (
                        <div className="d-flex justify-content-center align-items-center gap-2">
                            <button
                                onClick={handleWhatsAppContact}
                                style={{ background: "transparent", borderColor: "transparent" }}
                            >

                                <FontAwesomeIcon icon={faWhatsapp} style={{ fontSize: 24, color: "green" }} />

                            </button>
                            <button
                                onClick={editTeacher}

                                style={{ background: "transparent", borderColor: "transparent" }}
                            ><i
                                    className="fa fa-edit pt-0 mt-0"
                                    style={{ fontSize: 22, color: "#1e5e5a" }}
                                />


                            </button>
                            <button
                                onClick={showTeacher}
                                style={{ background: "transparent", borderColor: "transparent" }}
                            >

                                <i
                                    className="fa fa-eye pt-0 mt-0"
                                    style={{ fontSize: 22, color: "rgb(175, 158, 0)" }}
                                />

                            </button>
                            {!teacher.hasgroups && (<button
                                type="button"
                                style={{ background: "transparent", borderColor: "transparent" }}
                                onClick={handleDeleteTeacher}
                            >
                                <FontAwesomeIcon icon={faTrash} style={{ fontSize: 18, color: "red" }} />
                            </button>)}
                        </div>
                    );
                },
            },

        ],
        [isSubmittingStatus, setIsSubmittingStatus]
    );


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

    return (
        <div className="container-fluid pb-5">

            <h3 className="text-dark mb-4"></h3>
            <div className="card shadow">
                <div className="card-header py-3 d-flex justify-content-between align-items-center">
                    <p className="text-primary m-0 fw-bold">Lista de Profesores</p>

                    <button className="btn btn-success" style={{ color: "white" }} onClick={() => { downloadTableToExcel(table, columns, "Lista de profesores.xlsx") }}>
                        <FontAwesomeIcon icon={faDownload} style={{ fontSize: 20, color: "white", paddingRight: "10px" }} />
                        Descargar lista
                    </button>
                </div>
                <div className="card-body">
                    <TableComponent
                        isLoading={isLoading}
                        table={table}
                        setGlobalFilter={setGlobalFilter}
                        globalFilter={globalFilter}
                        data={data}
                        botonName={'Agregar profesor'}
                        redirecTo={"/agregar-profesor"}
                        displayButton={true}
                    />
                </div>
            </div>
        </div>
    );
}

export default Table_teacher;
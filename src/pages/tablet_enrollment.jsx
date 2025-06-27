import React, { useMemo, useState, useEffect } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table';
import { getFetch, postFetch } from '../components/Api_Connect';
import { useAuth } from '../context/AuthContext';
import TableComponent from '../components/TableComponent'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router';
import { faCheck, faCogs } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';


const Table_enrollment = () => {

    const [data, setData] = useState(() => []);
    const [globalFilter, setGlobalFilter] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [refresh, setRefresh] = useState(true);
    const { sb } = useAuth();
    const [isSubmittingPayment, setIsSubmittingPayment] = useState();
    const [submittingRowIndex, setSubmittingRowIndex] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        const table_st = async () => {
            const res = await getFetch(sb, 'enrollment/');
            if (res.data) {
                setData(res.data);
            }
            setIsLoading(false); // <-- importante
        };
        if (refresh) {

            table_st();
            setRefresh(false)
        }
    }, [refresh]);

    const add_automatic_payment = async (p_enrolment_id, p_next_payment, rowIndex) => {

        const action = "automatic"
        setIsSubmittingPayment(true)
        setSubmittingRowIndex(rowIndex)
        const full_data = {

            action: action,
            payment: {
                p_enrolment_id: p_enrolment_id,
                p_next_payment: p_next_payment
            }
        }
      //  console.log(full_data);
        const res = await postFetch(sb, 'payment', full_data);
        if (res.data) {
            Swal.fire({
                title: 'Registro completo!',
                text: 'Se ha registrado correctamente el pago del estudiante',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false, // No deja cerrar haciendo clic fuera
                allowEscapeKey: false,    // No deja cerrar con Esc
                backdrop: true            // Asegura que se bloquee el fondo
            }).then((result) => {
                if (result.isConfirmed) {
                    setRefresh(true)
                    setIsSubmittingPayment(false)
                    setSubmittingRowIndex(null); // Limpiar después de terminar
                }
            });
        }
        setIsLoading(false); // <-- importante
    };

    const add_manual_payment = async (p_next_payment, p_enrolment_id) => {
        Swal.fire({
            title: 'Ingresa los datos de pago',
            html: `
<div style="display: flex; flex-direction: column; text-align: left; font-size: 16px;">
    <label for="swal-input-reason" style="margin-bottom: -8px; display: block; font-weight: 500;">Motivo del pago</label>
    <input id="swal-input-reason" class="swal2-input" placeholder="Ej: Mensualidad" type="text" 
      style="padding: 6px 10px; height: auto; margin-bottom: 16px" />

    <label for="swal-input-total" style="margin-bottom: -8px; display: block; font-weight: 500;">Monto pagado</label>
    <input id="swal-input-total" class="swal2-input" placeholder="Ej: 5000" type="number"
      style="padding: 6px 10px; height: auto; margin-bottom: 16px" />

    <label for="swal-input-date" style="margin-bottom: -8px; display: block; font-weight: 500;">Fecha del siguiente pago</label>
    <input id="swal-input-date" class="swal2-input" value="${p_next_payment}" type="date"
      style="padding: 6px 10px; height: auto; margin-bottom: 16px" />
</div>
        `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Registrar pago',
            preConfirm: () => {
                const reason = document.getElementById('swal-input-reason').value;
                const total = document.getElementById('swal-input-total').value;
                const date = document.getElementById('swal-input-date').value;

                if (!reason || !total || !date) {
                    Swal.showValidationMessage('Por favor completa todos los campos');
                    return false;
                }
                if (parseFloat(total) < 0) {
                    Swal.showValidationMessage('El monto no puede ser negativo');
                    return false;
                }

                return { reason, total, date };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const full_data = {
                    action: "manual",
                    payment: {
                        p_enrolment_id: p_enrolment_id,
                        p_next_payment: result.value.date,
                        p_reason: result.value.reason,
                        p_course_payment: result.value.total
                    }
                };

                // 🔄 Mostrar spinner de carga
                Swal.fire({
                    title: 'Registrando pago...',
                    text: 'Por favor espera un momento',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                const res = await postFetch(sb, 'payment', full_data);

                // ✅ Finalizado
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
                            setIsSubmittingPaymentManual(false);
                            setSubmittingRowIndex(null);
                        }
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ocurrió un problema al registrar el pago. Intenta de nuevo.'
                    });
                }
            }
        });
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'p_full_name',
                header: 'Nombre',
                cell: ({ getValue }) => <span>{getValue()}</span>,
            },
            {
                accessorKey: 'p_emailuser',
                header: 'Correo',
                cell: ({ getValue }) => (
                    <span className="truncate-text" title={getValue()}>
                        {getValue()}
                    </span>
                )
            },
            {
                accessorKey: 'p_phonenumber',
                header: 'Teléfono',
                cell: ({ getValue }) => <span className="truncate-text"  title={getValue()}>{getValue()}</span>,
            },
            {
                accessorKey: 'e_course',
                header: 'Cursos',
                cell: ({ getValue }) => (
                    <span className="px-2 py-1 text-sm  bg-indigo-500 rounded">
                        {getValue()}
                    </span>
                ),
            },
            {
                accessorKey: 'e_course_payment',
                header: 'Mensualidad',
                cell: ({ getValue }) => <span>{getValue()}</span>,
            }, {
                accessorKey: 'e_nextpayment',
                header: 'Próximo Pago',
                cell: ({ getValue }) => {
                    const value = getValue();
                    const today = new Date();
                    const paymentDate = new Date(value);
                    const isOverdue = paymentDate < today;

                    return (
                        <p
                            className="d-xxl-flex justify-content-xxl-center align-items-xxl-center"
                            style={{
                                background: isOverdue ? "#eaa7bb" : "#b8eaa7",
                                textAlign: "center",
                                borderRadius: 30,
                                fontSize: 15
                            }}

                        >
                            {value}
                        </p>
                    );
                },
            },
            {
                accessorKey: 'e_notes',
                header: 'Notas',
                cell: ({ getValue }) => (
                    <span className="truncate-text" title={getValue()}>
                        {getValue()}
                    </span>
                ),
            },
            {
                id: 'payments',
                header: 'Pago',
                cell: ({ row }) => {
                    const enrollment = row.original;
                    const p_next_payment = enrollment.e_nextpayment;
                    const p_enrolment_id = enrollment.e_enrollment_id;
                    const rowIndex = row.index;
                    const isThisRowLoading = isSubmittingPayment && submittingRowIndex === rowIndex;

                    return (<div className="container mt-4 ">
                        <div className="row justify-content-center "> <div className="flex gap-2">
                            <div className="col">
                                <button
                                    type="button"
                                    onClick={() => add_automatic_payment(p_enrolment_id, p_next_payment, rowIndex)}
                                    className="btn btn-success"
                                    style={{ color: "rgb(255, 255, 255)" }}
                                >
                                    {isThisRowLoading ? (
                                        <span className="spinner" style={{ display: "inline-block" }}></span>
                                    ) : (
                                        <FontAwesomeIcon icon={faCheck} style={{ fontSize: 16, color: "rgb(255, 255, 255)" }} />
                                    )}
                                    {" "}Automático
                                </button>
                            </div>
                            <hr />
                            <div className="col">
                                <button
                                    onClick={() => { add_manual_payment(p_next_payment, p_enrolment_id) }}

                                    className='btn btn-secondary'
                                >   <FontAwesomeIcon icon={faCogs} style={{ fontSize: 16, color: "rgb(255, 255, 255)", paddingRight: 15 }} />
                                    Manual
                                </button>

                            </div>
                        </div>
                        </div>
                    </div>
                    );
                },
            },
            {
                id: 'acciones',
                header: '',
                cell: ({ row }) => {
                    const enrollment = row.original;

                    const handleEdit = () => {
                        navigate(`/editar-matricula?matricula=${enrollment.e_enrollment_id}`);
                    };

                    const handleWatch = () => {
                        navigate(`/mostrar-matricula?matricula=${enrollment.e_enrollment_id}`);
                    };
                     const handleWhatsAppContact = () => {
                        const url = `https://api.whatsapp.com/send/?phone=${enrollment.p_phonenumber}&text=Hola,%20estimado%20${encodeURIComponent(enrollment.p_full_name)},%20espero%20se%20encuentre%20muy%20bien`;

                        window.open(url, '_blank');
                    };

                    return (
                        <div className="d-flex justify-content-center align-items-center gap-3">
                            {/* Botón WhatsApp */}
                            <button
                                onClick={handleWhatsAppContact}
                                className="btn p-0 border-0 bg-transparent"
                                title="WhatsApp"
                            >
                                <FontAwesomeIcon icon={faWhatsapp} style={{ fontSize: 23, color: "rgb(0, 94, 5)" }} />
                            </button>

                            {/* Botón Editar */}
                            <button
                                onClick={handleEdit}
                                className="btn p-0 border-0 bg-transparent"
                                title="Editar"
                            >
                                <i className="fa fa-edit" style={{ fontSize: 22, color: "#1e5e5a" }} />
                            </button>

                            {/* Botón Ver */}
                            <button
                                onClick={handleWatch}
                                className="btn p-0 border-0 bg-transparent"
                                title="Ver"
                            >
                                <i className="fa fa-eye" style={{ fontSize: 20, color: "rgb(175, 158, 0)" }} />
                            </button>
                        </div>
                    );
                },

            },
        ],
        [isSubmittingPayment, setIsSubmittingPayment]
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

            <h3 className="text-dark mb-4" ></h3>
            <div className="card shadow">
                <div className="card-header py-3">
                    <p className="text-primary m-0 fw-bold">Lista de gestión de pagos</p>
                </div>
                <div className="card-body">
                    <TableComponent
                        isLoading={isLoading}
                        table={table}
                        setGlobalFilter={setGlobalFilter}
                        globalFilter={globalFilter}
                        data={data}
                        botonName={'Agregar estudiante'}
                        redirecTo={"/agregar-estudiante"}
                        displayButton={false}
                    />
                </div>
            </div>
        </div>
    );
}

export default Table_enrollment;
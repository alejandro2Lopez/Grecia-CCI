
import React, { useMemo, useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { faCoins, faCashRegister, faWallet, faMoneyBill, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getFetch } from '../components/Api_Connect';
import { useAuth } from '../context/AuthContext';
import { Loading } from '../components/Component_loading';
export const Statistics_payment = () => {
    const [labels_barline, setLabels_barline] = useState({});
    const [values_barline, setValues_barline] = useState({});
    const [refresh, setRefresh] = useState(true);
    const { sb } = useAuth();
    const [general_statitics, setGeneral_Statitics] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [pieChartData, setPieChartData] = useState({});
    useEffect(() => {
        const statistics = async () => {
            const res = await getFetch(sb, 'payment/');
            if (res.data) {
                setGeneral_Statitics(res.data.general_earned_money[0]);
                setLabels_barline(res.data.earned_last_four_week.map(item => item.range_date));
                setValues_barline(res.data.earned_last_four_week.map(item => item.earned));
                setPieChartData(
                    res.data.month_earned_money.map((item, index) => ({
                        id: index,
                        value: item.total_ganancias,
                        label: item.mes
                    }))
                );
            }
            setIsLoading(false);
        };

        if (refresh) {
            statistics();
            setRefresh(false);

        }
    }, [refresh]);
    return (isLoading ? (
        <Loading></Loading>
    ) : (<div className="container-fluid">
        <div className="row justify-content-center">

            <div className="col-md-6 col-xl-3 mb-4">
                <div className="card shadow border-left-primary py-2">
                    <div className="card-body">
                        <div className="row g-0 align-items-center">
                            <div className="col me-2">
                                <div className="text-uppercase text-primary fw-bold text-xs mb-1">
                                    <span>Ganancias del día</span>
                                </div>
                                <div className="text-dark fw-bold h5 mb-0">
                                    <span>₡ {general_statitics?.ganancias_dia
                                        ?? 'Cargando...'}</span>

                                </div>
                            </div>
                            <div className="col-auto">
                                <FontAwesomeIcon icon={faMoneyBill} className="text-gray-300  fa-2x " />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-6 col-xl-3 mb-4">
                <div className="card shadow border-left-success py-2">
                    <div className="card-body">
                        <div className="row g-0 align-items-center">
                            <div className="col me-2">
                                <div className="text-uppercase text-success fw-bold text-xs mb-1">
                                    <span>Ganancias de la semana actual</span>
                                </div>
                                <div className="text-dark fw-bold h5 mb-0">
                                    <span>₡ {general_statitics?.ganancias_semana ?? 'Cargando...'}</span>
                                </div>
                            </div>
                            <div className="col-auto">
                                <FontAwesomeIcon icon={faCoins} className="text-gray-300  fa-2x " />

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*<div className="col-md-6 col-xl-3 mb-4">
                <div className="card shadow border-left-info py-2">
                    <div className="card-body">
                        <div className="row g-0 align-items-center">
                            <div className="col me-2">
                                <div className="text-uppercase text-info fw-bold text-xs mb-1">
                                    <span>Ganacias de la última semana</span>
                                </div>
                                <div className="text-dark fw-bold h5 mb-0">
                                    <span>₡ {general_statitics?.ganancias_semana_anterior
                                        ?? 'Cargando...'}</span>
                                </div>
                            </div>
                            <div className="col-auto">
                                <FontAwesomeIcon icon={faWallet} className="text-gray-300  fa-2x " />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            */}
            <div className="col-md-6 col-xl-3 mb-4">
                <div className="card shadow border-left-danger py-2">
                    <div className="card-body">
                        <div className="row g-0 align-items-center">
                            <div className="col me-2">
                                <div className="text-uppercase text-danger fw-bold text-xs mb-1">
                                    <span>Ganacias mes actual</span>
                                </div>
                                <div className="text-dark fw-bold h5 mb-0">
                                    <span>₡ {general_statitics?.ganancias_mes
                                        ?? 'Cargando...'}</span>
                                </div>
                            </div>
                            <div className="col-auto">
                                <FontAwesomeIcon icon={faCalendarDays} className="text-gray-300  fa-2x " />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-6 col-xl-3 mb-4">
                <div className="card shadow border-left-secondary py-2">
                    <div className="card-body">
                        <div className="row g-0 align-items-center">
                            <div className="col me-2">
                                <div className="text-uppercase text-secondary fw-bold text-xs mb-1">
                                    <span>Ganacias del último mes</span>
                                </div>
                                <div className="text-dark fw-bold h5 mb-0">
                                    <span>₡ {general_statitics?.ganancias_mes_anterior
                                        ?? 'Cargando...'}</span>
                                </div>
                            </div>
                            <div className="col-auto">
                                <FontAwesomeIcon icon={faCashRegister} className="text-gray-300  fa-2x " />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div className="row">
            <div className="col-lg-7 col-xl-8">
                <div className="card shadow mb-4">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h6 className="text-primary fw-bold m-0">Tendencias de las Últimas 4 semanas</h6>

                    </div>
                    <div className="card-body">
                        <div className="chart-area" style={{ width: '100%', height: 300 }}>
                            {values_barline.length > 0 && (<BarChart
                                width={undefined}
                                xAxis={[{ data: labels_barline }]} // ← etiquetas de los ejes X (las fechas)
                                series={[
                                    {
                                        data: values_barline,           // ← valores ganados
                                        barWidth: 5,
                                        color: '#03a9f4'
                                    },
                                ]}
                                height={300}
                            />)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-5 col-xl-4">
                <div className="card shadow mb-4">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h6 className="text-primary fw-bold m-0">Estadísticas Mensuales</h6>

                    </div>
                    <div className="card-body">
                        <div className="chart-area" style={{ width: '100%', height: 300 }}>
                            {pieChartData.length > 0 && (
                                <PieChart
                                    width={undefined}
                                    height={300}
                                    series={[
                                        {
                                            data: pieChartData,
                                            innerRadius: 30,
                                            outerRadius: 100,
                                            paddingAngle: 5,
                                            cornerRadius: 5,
                                            startAngle: -45,
                                            endAngle: 225,
                                            cx: 150,
                                            cy: 150,
                                        }
                                    ]}
                                />
                            )}

                        </div>

                    </div>
                </div>
            </div>
        </div>


    </div>
    ));
}
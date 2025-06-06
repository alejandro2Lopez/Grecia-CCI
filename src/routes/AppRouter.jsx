import React, { lazy, Suspense, useState } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { NavbarTop } from "../components/Navbar_Top";

import Table_student from "../pages/table-students";

import Table_teacher from "../pages/table-teachers";
import Add_student from "../pages/add-students";
import Student from "../pages/Student";
import Enrollment from "../pages/enrollment";
import Teacher from "../pages/Teacher";
import { Statistics_payment } from "../pages/statistics_payment";
import Table_enrollment from "../pages/tablet_enrollment";
import { Loading } from "../components/Component_loading";
import { Not_found } from "../pages/Not_Found";
import Tablet_history_payment from "../pages/tablet_history_payment_tablet";


const Login = lazy(() => import("../pages/login"));
const Dashboard = lazy(() => import("../pages/dashboard"));

const AppRouter = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <>
            <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
            <div
                className={(collapsed ? "no-collapse main-content" : " main-content yes-collapse ")}
                style={{

                    transition: "margin-left 0.3s ease"
                }}
            >
                <NavbarTop collapsed={collapsed} setCollapsed={setCollapsed} />
                <div style={{ paddingTop: "100px" }}>
                    <Suspense fallback={<Loading></Loading>}>
                        <Routes>
                            <Route path="/login" element={<Login  />} />
                            <Route path="/estudiantes" element={<Table_student />} />
                            <Route path="/pagina-no-encontrada" element={<Not_found navigate_to={"/estudiantes"} />} />
                            <Route path="/matricular-estudiante" element={<Add_student />} />
                            <Route path="/mostrar-estudiante" element={<Student isEdit={true} isReadOnly={true} titleAction={"Estudiante"} />} />
                            <Route path="/editar-estudiante" element={<Student isEdit={true} isReadOnly={false} titleAction={"Estudiante"} />} />
                            <Route path="/agregar-profesor" element={<Teacher isEdit={false} readOnly={false} mode={"create"} />} />
                            <Route path="/editar-profesor" element={<Teacher isEdit={true} readOnly={false} mode={"edit"} />} />
                            <Route path="/mostrar-profesor" element={<Teacher isEdit={false} readOnly={true} mode={"view"} />} />
                            <Route path="/profesores" element={<Table_teacher />} />
                            <Route path="/gestion-de-pagos" element={<Table_enrollment />} />
                            <Route path="/editar-matricula" element={<Enrollment readOnly={false} />} />
                            <Route path="/mostrar-matricula" element={<Enrollment readOnly={true} />} />
                            <Route path="/informe-de-pagos" element={<Statistics_payment />} />
                               <Route path="/historial-de-pagos" element={<Tablet_history_payment />} />
                            <Route path="*" element={<Navigate to="/estudiantes" />} />
                        </Routes>
                    </Suspense>
                </div>
            </div>
        </>
    );
};

export default AppRouter;

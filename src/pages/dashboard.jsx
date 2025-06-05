import React, { useContext, useState } from "react";
import { sb } from "../components/supabaseClient";

const callEdgeFunction = async () => {
    const session = await sb.auth.getSession()
    const access_token = session.data.session?.access_token

    const res = await fetch('https://vhdqfwgegjootyegkllk.supabase.co/functions/v1/auth-review', {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    })

    const text = await res.json();
    console.log(text)
}
const Dashboard = () => {
    return (
        <><div style={{ textAlign: "left" }}><h1>Este será dashboardK</h1>
            <button onClick={() => callEdgeFunction()} >Consulta aca</button>
        </div>
        </>

    );

};

export default Dashboard;
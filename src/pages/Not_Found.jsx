import { NavLink } from "react-router-dom";

export const Not_found = (navigate_to) => {


    return (<div className="container-fluid">
        <div className="text-center mt-5">
            <div className="error mx-auto" data-text="404">
                <p className="m-0">404</p>
            </div>
            <p className="text-dark mb-5 lead">Page Not Found</p>
            <p className="text-black-50 mb-0">It looks like you found a glitch in the matrix...</p><NavLink className="nav-link" to="/estudiantes">Go back</NavLink >
        </div>
    </div>)
}
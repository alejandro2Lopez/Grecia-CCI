import { NavLink } from "react-router-dom";

export const Not_found = (navigate_to) => {


    return (<div class="container-fluid">
        <div class="text-center mt-5">
            <div class="error mx-auto" data-text="404">
                <p class="m-0">404</p>
            </div>
            <p class="text-dark mb-5 lead">Page Not Found</p>
            <p class="text-black-50 mb-0">It looks like you found a glitch in the matrix...</p><NavLink className="nav-link" to="/estudiantes">Go back</NavLink >
        </div>
    </div>)
}
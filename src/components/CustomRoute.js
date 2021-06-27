import { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const CustomRoute = (props) => {
    const [returnedRoute, setReturnedRoute] = useState("");
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        switch (props.condition) {
            case "doctor":
            case "patient":
            case "pharmacy_owner":
                return setReturnedRoute(auth.role === props.condition ? <Route {...props} /> : <Redirect to="/" />);
            case "doctor || pharmacy_owner":
                return setReturnedRoute(
                    auth.role === "doctor" || auth.role === "pharmacy_owner" ? <Route {...props} /> : <Redirect to="/" />
                );
            case "isLoggedIn":
                return setReturnedRoute(auth.isLoggedIn ? <Route {...props} /> : <Redirect to="/" />);
            default:
                return setReturnedRoute(<Route {...props} />);
        }
    }, [auth.isLoggedIn, auth.role, props]);

    return <>{returnedRoute}</>;
};

export default CustomRoute;

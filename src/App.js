import { BrowserRouter, Switch, Route } from "react-router-dom";

import RegisterPage from "./containers/RegistrationPage";
import MedicalOfficesPage from "./containers/MedicalOfficesPage";
import MedicalOfficePage from "./containers/MedicalOfficePage";
import PharmaciesPage from "./containers/PharmaciesPage";
import PharmacyPage from "./containers/PharmacyPage";
import MedicinesPage from "./containers/MedicinesPage";
import NewMedicinePage from "./containers/NewMedicinePage";
import Layout from "./hoc/Layout";

function App() {
    let routes = (
        <Switch>
            <Route exact path="/register" component={RegisterPage} />

            <Route exact path="/medical-offices" component={MedicalOfficesPage} />
            <Route exact path="/medical-offices/:id" component={MedicalOfficePage} />
            <Route exact path="/pharmacies" component={PharmaciesPage} />
            <Route exact path="/pharmacies/:id" component={PharmacyPage} />
            <Route exact path="/medicines/new" component={NewMedicinePage} />
            <Route exact path="/medicines" component={MedicinesPage} />
            <Route exact path="/"></Route>
        </Switch>
    );

    return (
        <BrowserRouter>
            <Layout>{routes}</Layout>
        </BrowserRouter>
    );
}

export default App;

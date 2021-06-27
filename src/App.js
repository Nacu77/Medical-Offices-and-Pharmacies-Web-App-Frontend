import { Switch } from "react-router-dom";

import CustomRoute from "./components/CustomRoute";
import MainPage from "./containers/MainPage";
import RegisterPage from "./containers/auth/RegisterPage";
import LoginPage from "./containers/auth/LoginPage";
import MedicalOfficesPage from "./containers/medical_offices/MedicalOfficesPage";
import MedicalOfficePage from "./containers/medical_offices/MedicalOfficePage";
import MyMedicalOfficesPage from "./containers/medical_offices/MyMedicalOfficesPage";
import NewOrEditMedicalOfficePage from "./containers/medical_offices/NewOrEditMedicalOfficePage";
import MedicinesPage from "./containers/medicines/MedicinesPage";
import NewMedicinePage from "./containers/medicines/NewMedicinePage";
import NewMedicineStockPage from "./containers/medicines/NewMedicineStockPage";
import BuyMedicinePage from "./containers/medicines/BuyMedicinePage";
import EditMedicineStockPage from "./containers/medicines/EditMedicineStockPage";
import PharmaciesPage from "./containers/pharmacies/PharmaciesPage";
import PharmacyPage from "./containers/pharmacies/PharmacyPage";
import NewOrEditPharmacyPage from "./containers/pharmacies/NewOrEditPharmacyPage";
import MyPharmaciesPage from "./containers/pharmacies/MyPharmaciesPage";
import MyAppointmentsPage from "./containers/appointments/MyAppointmentsPage";
import NewAppointmentPage from "./containers/appointments/NewAppointmentPage";
import AppointmentsToMedicalOfficePage from "./containers/appointments/AppointmentsToMedicalOfficePage";
import NewRecipePage from "./containers/recipes/NewRecipePage";
import MyRecipesPage from "./containers/recipes/MyRecipesPage";
import Layout from "./hoc/Layout";

function App() {
    const routes = (
        <Switch>
            <CustomRoute exact path="/register" component={RegisterPage} />
            <CustomRoute exact path="/login" component={LoginPage} />
            <CustomRoute exact path="/logout" component={LoginPage} />

            <CustomRoute exact path="/medical-offices/:id" component={MedicalOfficePage} />
            <CustomRoute exact path="/medical-offices" component={MedicalOfficesPage} />
            <CustomRoute exact path="/pharmacies/:id" component={PharmacyPage} />
            <CustomRoute exact path="/pharmacies" component={PharmaciesPage} />
            <CustomRoute exact path="/medicines" component={MedicinesPage} />

            <CustomRoute condition="doctor" exact path="/my-medical-offices/new" component={NewOrEditMedicalOfficePage} />
            <CustomRoute condition="doctor" exact path="/my-medical-offices/edit/:id" component={NewOrEditMedicalOfficePage} />
            <CustomRoute condition="doctor" exact path="/my-medical-offices" component={MyMedicalOfficesPage} />
            <CustomRoute
                condition="doctor"
                exact
                path="/medical-offices/:id/appointments"
                component={AppointmentsToMedicalOfficePage}
            />
            <CustomRoute condition="doctor" exact path="/recipes/new/:patientId/:appointmentId" component={NewRecipePage} />

            <CustomRoute condition="patient" exact path="/my-appointments" component={MyAppointmentsPage} />
            <CustomRoute condition="patient" exact path="/appointments/new/:id" component={NewAppointmentPage} />
            <CustomRoute condition="patient" exact path="/my-recipes" component={MyRecipesPage} />
            <CustomRoute condition="patient" exact path="/medicine-stock/buy/:id" component={BuyMedicinePage} />

            <CustomRoute condition="pharmacy_owner" exact path="/my-pharmacies" component={MyPharmaciesPage} />
            <CustomRoute condition="pharmacy_owner" exact path="/my-pharmacies/new" component={NewOrEditPharmacyPage} />
            <CustomRoute condition="pharmacy_owner" exact path="/my-pharmacies/edit/:id" component={NewOrEditPharmacyPage} />
            <CustomRoute condition="pharmacy_owner" exact path="/medicine-stock/new/:id" component={NewMedicineStockPage} />
            <CustomRoute condition="pharmacy_owner" exact path="/medicine-stock/edit/:id" component={EditMedicineStockPage} />

            <CustomRoute condition="doctor || pharmacy_owner" exact path="/medicines/new" component={NewMedicinePage} />

            <CustomRoute path="/" component={MainPage} />
        </Switch>
    );

    return <Layout>{routes}</Layout>;
}

export default App;

import { Grid } from "@material-ui/core";

import Appointment from "./Appointment";

const Appointments = (props) => {
    return (
        <Grid container spacing={4} justify="center">
            {props.appointments.map((appointment) => (
                <Grid item key={appointment.id} xs={12} md={6}>
                    <Appointment {...appointment} handleCancel={props.handleCancel} forMedicalOffice={props.forMedicalOffice} />
                </Grid>
            ))}
        </Grid>
    );
};

export default Appointments;

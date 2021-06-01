import { Grid } from "@material-ui/core";

import MedicalOffice from "./MedicalOffice";

const MedicalOffices = (props) => {
    return (
        <Grid container spacing={4} justify="center">
            {props.medicalOffices.map((medicalOffice) => (
                <Grid item key={medicalOffice.id} xs={12} md={6}>
                    <MedicalOffice {...medicalOffice} />
                </Grid>
            ))}
        </Grid>
    );
};

export default MedicalOffices;

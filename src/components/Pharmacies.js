import { Grid } from "@material-ui/core";

import Pharmacy from "./Pharmacy";

const Pharmacies = (props) => {
    return (
        <Grid container spacing={4} justify="center">
            {props.pharmacies.map((pharmacy) => (
                <Grid item key={pharmacy.id} xs={12} md={6}>
                    <Pharmacy {...pharmacy} />
                </Grid>
            ))}
        </Grid>
    );
};

export default Pharmacies;

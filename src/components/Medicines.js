import { Grid } from "@material-ui/core";

import Medicine from "./Medicine";
import MedicineStock from "./MedicineStock";

const Medicines = (props) => {
    return (
        <Grid container spacing={4} justify="center">
            {props.medicines.map((medicine) => (
                <Grid item key={medicine.id} xs={6} sm={4} md={3}>
                    {props.for === "medicines" && <Medicine {...medicine} />}
                    {props.for === "pharmacy" && <MedicineStock {...medicine} handleDelete={props.handleDelete} />}
                </Grid>
            ))}
        </Grid>
    );
};

export default Medicines;

import { useState, useEffect } from "react";
import axios from "../../axios";
import { Container, Typography, Grid, TextField, Button } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import Medicines from "../../components/Medicines";

const MedicinesPage = (props) => {
    const history = useHistory();
    const auth = useSelector((state) => state.auth);
    const [medicines, setMedicines] = useState([]);
    const [filteredMedicines, setFilteredMedicines] = useState([]);
    const [medicineStocks, setMedicineStocks] = useState([]);
    const [filteredMedicineStocks, setFilteredMedicineStocks] = useState([]);
    const [displayAll, setDisplayAll] = useState(false);

    useEffect(() => {
        axios
            .get("/medicines")
            .then((res) => {
                const medicines = res.data;
                setMedicines(medicines);
                setFilteredMedicines(medicines);
            })
            .catch((err) => {
                console.log(err);
            });

        axios
            .get("/medicine-stock")
            .then((res) => {
                const medicines = res.data;
                setMedicineStocks(medicines);
                setFilteredMedicineStocks(medicines);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const inputChangedHandler = (event) => {
        let meds = medicines.filter((medicine) => medicine.name.toLowerCase().includes(event.target.value.toLowerCase()));
        setFilteredMedicines(meds);
        meds = medicineStocks.filter((medicineStock) =>
            medicineStock.medicine.name.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setFilteredMedicineStocks(meds);
    };

    return (
        <Container>
            <Typography variant="h2" align="center" gutterBottom>
                Medicines
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                This is the list with de medicines currently available on the website.
            </Typography>

            <Grid container spacing={1} alignItems="center" justify="center">
                <Grid item>
                    <Search />
                </Grid>
                <Grid item>
                    <TextField label="Medicine Name" variant="outlined" onChange={inputChangedHandler} />
                </Grid>
                {(auth.role === "doctor" || auth.role === "pharmacy_owner" || auth.role === "admin") && (
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                history.push("/medicines/new");
                            }}
                        >
                            New Medicine
                        </Button>
                    </Grid>
                )}
            </Grid>
            <br />

            <Grid container justify="center">
                <Grid item>
                    {!displayAll ? (
                        <Button
                            variant="contained"
                            onClick={() => {
                                setDisplayAll(true);
                            }}
                        >
                            View All
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            onClick={() => {
                                setDisplayAll(false);
                            }}
                        >
                            View Unique
                        </Button>
                    )}
                </Grid>
            </Grid>
            <br />

            {displayAll ? (
                <Medicines medicines={filteredMedicineStocks} for="pharmacy" />
            ) : (
                <Medicines medicines={filteredMedicines} for="medicines" />
            )}
        </Container>
    );
};

export default MedicinesPage;

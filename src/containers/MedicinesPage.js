import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Grid, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Search } from "@material-ui/icons";
import { Link } from "react-router-dom";

import Medicines from "../components/Medicines";

const useStyles = makeStyles({
    hero: {
        paddingBottom: "50px",
    },
});

const MedicinesPage = (props) => {
    const classes = useStyles();

    const [medicines, setMedicines] = useState([]);
    const [filteredMedicines, setFilteredMedicines] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/medicines").then((res) => {
            const medicines = res.data;
            setMedicines(medicines);
            setFilteredMedicines(medicines);
        });
    }, []);

    const inputChangedHandler = (event) => {
        const meds = medicines.filter((medicine) => medicine.name.toLowerCase().includes(event.target.value.toLowerCase()));
        setFilteredMedicines(meds);
    };

    return (
        <>
            <Container className={classes.hero}>
                <Typography variant="h2" align="center" gutterBottom>
                    Medicines
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    This is the list with de medicines currently available on the website. Only users with medical offices or
                    pharmacies cand add or edit the medicines (but be careful if you do those things).
                </Typography>

                <Grid container spacing={1} alignItems="center" justify="center">
                    <Grid item>
                        <Search />
                    </Grid>
                    <Grid item>
                        <TextField label="Medicine Name" variant="outlined" onChange={inputChangedHandler} />
                    </Grid>
                    <Grid item>
                        <Button component={Link} to={"/medicines/new"} variant="contained" color="primary">
                            New Medicine
                        </Button>
                    </Grid>
                </Grid>
            </Container>

            <Container>
                <Medicines medicines={filteredMedicines} for="medicines" />
            </Container>
        </>
    );
};

export default MedicinesPage;

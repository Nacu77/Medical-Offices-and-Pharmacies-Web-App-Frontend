import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Pharmacies from "../components/Pharmacies";

const useStyles = makeStyles({
    hero: {
        paddingBottom: "50px",
    },
});

const PharmaciesPage = (props) => {
    const classes = useStyles();

    const [pharmacies, setPharmacies] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/pharmacies").then((res) => {
            const pharmacies = res.data;
            setPharmacies(pharmacies);
        });
    }, []);

    return (
        <>
            <Container className={classes.hero}>
                <Typography variant="h2" align="center" gutterBottom>
                    Pharmacies
                </Typography>
            </Container>

            <Container>
                <Pharmacies pharmacies={pharmacies} />
            </Container>
        </>
    );
};

export default PharmaciesPage;

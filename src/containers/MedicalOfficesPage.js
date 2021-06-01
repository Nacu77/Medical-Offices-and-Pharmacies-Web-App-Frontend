import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import MedicalOffices from "../components/MedicalOffices";

const useStyles = makeStyles({
    hero: {
        paddingBottom: "50px",
    },
});

const MedicalOfficesPage = () => {
    const classes = useStyles();

    const [medicalOffices, setMedicalOffices] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/medical-offices").then((res) => {
            const medicalOffices = res.data;
            setMedicalOffices(medicalOffices);
        });
    }, []);

    return (
        <>
            <Container className={classes.hero}>
                <Typography variant="h2" align="center" gutterBottom>
                    Medical Offices
                </Typography>
            </Container>

            <Container>
                <MedicalOffices medicalOffices={medicalOffices} />
            </Container>
        </>
    );
};

export default MedicalOfficesPage;

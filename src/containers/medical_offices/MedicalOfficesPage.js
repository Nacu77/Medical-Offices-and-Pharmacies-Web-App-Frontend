import { useState, useEffect } from "react";
import axios from "../../axios";
import { Container, Typography } from "@material-ui/core";

import MedicalOffices from "../../components/MedicalOffices";

const MedicalOfficesPage = () => {
    const [medicalOffices, setMedicalOffices] = useState([]);

    useEffect(() => {
        axios
            .get("/medical-offices")
            .then((res) => {
                const medicalOffices = res.data;
                setMedicalOffices(medicalOffices);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <Container>
            <Typography variant="h2" align="center" gutterBottom>
                Medical Offices
            </Typography>
            <br />
            <br />

            <MedicalOffices medicalOffices={medicalOffices} />
        </Container>
    );
};

export default MedicalOfficesPage;

import { useState, useEffect } from "react";
import { Container, Typography } from "@material-ui/core";

import Pharmacies from "../../components/Pharmacies";
import axios from "../../axios";

const PharmaciesPage = (props) => {
    const [pharmacies, setPharmacies] = useState([]);

    useEffect(() => {
        axios.get("/pharmacies").then((res) => {
            const pharmacies = res.data;
            setPharmacies(pharmacies);
        });
    }, []);

    return (
        <Container>
            <Typography variant="h2" align="center" gutterBottom>
                Pharmacies
            </Typography>
            <br />
            <br />

            <Pharmacies pharmacies={pharmacies} />
        </Container>
    );
};

export default PharmaciesPage;

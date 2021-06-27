import { useState, useEffect } from "react";
import { Button, Container, Typography, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import axios from "../../axios";
import MedicalOffices from "../../components/MedicalOffices";

const MyMedicalOfficesPage = (props) => {
    const history = useHistory();
    const [medicalOffices, setMedicalOffices] = useState([]);
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        axios
            .get(`/users/${auth.user.id}`)
            .then((res) => {
                const medicalOffices = res.data.doctor.medicalOffices;
                setMedicalOffices(medicalOffices);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [auth.user.id]);

    return (
        <Container>
            <Typography variant="h2" align="center" gutterBottom>
                My Medical Offices
            </Typography>
            <br />
            <br />

            <Grid container justify="center">
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => {
                        history.push("/my-medical-offices/new");
                    }}
                >
                    Register Your Medical Office
                </Button>
            </Grid>
            <br />
            <br />

            <MedicalOffices medicalOffices={medicalOffices} />
        </Container>
    );
};

export default MyMedicalOfficesPage;

import { useState, useEffect } from "react";
import { Button, Container, Typography, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import axios from "../../axios";
import Pharmacies from "../../components/Pharmacies";

const MyPharmaciesPage = (props) => {
    const history = useHistory();
    const [pharmacies, setPharmacies] = useState([]);
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        axios
            .get(`/users/${auth.user.id}`)
            .then((res) => {
                setPharmacies(res.data.pharmacyOwner.pharmacies);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [auth.user.id]);

    return (
        <Container>
            <Typography variant="h2" align="center" gutterBottom>
                My Pharmacies
            </Typography>
            <br />
            <br />

            <Grid container justify="center">
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => {
                        history.push("/my-pharmacies/new");
                    }}
                >
                    Register Your Pharmacy
                </Button>
            </Grid>
            <br />
            <br />

            <Pharmacies pharmacies={pharmacies} />
        </Container>
    );
};

export default MyPharmaciesPage;

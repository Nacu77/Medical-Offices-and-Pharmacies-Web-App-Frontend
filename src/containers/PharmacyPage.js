import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";

import Medicines from "../components/Medicines";

const PharmacyPage = (props) => {
    const [pharmacy, setPharmacy] = useState();
    const [owner, setOwner] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8080/api/pharmacies/${props.match.params.id}`).then((res) => {
            const pharmacy = res.data;
            setPharmacy(pharmacy);
            axios.get(`http://localhost:8080/api/pharmacy-owners/${pharmacy.ownerId}`).then((res) => {
                const owner = res.data;
                setOwner(owner);
            });
        });
    }, [props.match.params.id]);

    return (
        <Container>
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    props.history.push("/pharmacies");
                }}
            >
                Back to Pharmacies
            </Button>
            {pharmacy && (
                <>
                    <Typography variant="h2" align="center" gutterBottom>
                        {pharmacy.name}
                    </Typography>
                    <Typography variant="subtitle1" align="center" gutterBottom>
                        Owned by: {owner.firstName} {owner.lastName}
                    </Typography>
                    <br />

                    <Typography variant="body1" gutterBottom>
                        Address: {pharmacy.address.country}, {pharmacy.address.city}, {pharmacy.address.street},{" "}
                        {pharmacy.address.number}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Contact Data: {pharmacy.contactData.phoneNumber}, {pharmacy.contactData.email}
                    </Typography>
                    <br />

                    <Typography variant="h2" align="center" gutterBottom>
                        Medicines in stock
                    </Typography>
                    <Medicines medicines={pharmacy.medicineStock} for="pharmacy" />
                </>
            )}
        </Container>
    );
};

export default withRouter(PharmacyPage);

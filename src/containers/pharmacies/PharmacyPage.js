import { useState, useEffect } from "react";
import { Container, Typography, Grid, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Medicines from "../../components/Medicines";
import axios from "../../axios";

const PharmacyPage = (props) => {
    const [pharmacy, setPharmacy] = useState();
    const [owner, setOwner] = useState({});
    const auth = useSelector((state) => state.auth);
    const history = useHistory();

    useEffect(() => {
        axios
            .get(`/pharmacies/${props.match.params.id}`)
            .then((res) => {
                const pharmacy = res.data;
                setPharmacy(pharmacy);
                axios
                    .get(`/pharmacy-owners/${pharmacy.ownerId}`)
                    .then((res) => {
                        const owner = res.data;
                        setOwner(owner);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }, [props.match.params.id]);

    const handleDelete = (id) => {
        axios
            .delete(`/medicine-stock/${id}`)
            .then((res) => {
                const updatedPharmacy = { ...pharmacy };
                updatedPharmacy.medicineStock = pharmacy.medicineStock.filter((medicineStock) => medicineStock.id !== id);
                setPharmacy(updatedPharmacy);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const isHisPharmacy = (auth.role === "pharmacy_owner" && auth.user.pharmacyOwner.id === owner.id) || auth.role === "admin";

    return pharmacy ? (
        <Container>
            <Typography variant="h2" align="center" gutterBottom>
                {pharmacy.name}
            </Typography>
            <Typography variant="subtitle1" align="center" gutterBottom>
                Owned by: {owner.firstName} {owner.lastName}
            </Typography>
            <br />
            <br />

            {isHisPharmacy && (
                <>
                    <Grid container spacing={5} justify="center">
                        <Grid item>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => {
                                    axios
                                        .delete(`/pharmacies/${pharmacy.id}`)
                                        .then((res) => {
                                            history.push("/my-pharmacies");
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                        });
                                }}
                            >
                                Delete Pharmacy
                            </Button>
                        </Grid>

                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    history.push(`/my-pharmacies/edit/${pharmacy.id}`);
                                }}
                            >
                                Edit Pharmacy
                            </Button>
                        </Grid>
                    </Grid>
                    <br />
                    <br />
                </>
            )}

            <Typography variant="body1" align="center" gutterBottom>
                Address: {pharmacy.address.country}, {pharmacy.address.city}, {pharmacy.address.street}, {pharmacy.address.number}
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
                Contact Data: {pharmacy.contactData.phoneNumber}, {pharmacy.contactData.email}
            </Typography>
            <br />
            <br />

            <Typography variant="h4" align="center" gutterBottom>
                Medicines in stock
            </Typography>
            <br />
            {isHisPharmacy && (
                <>
                    <Grid container spacing={5} justify="center">
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    history.push(`/medicine-stock/new/${pharmacy.id}`);
                                }}
                            >
                                Add Medicine in Stock
                            </Button>
                        </Grid>
                    </Grid>
                    <br />
                    <br />
                </>
            )}
            <Medicines medicines={pharmacy.medicineStock} for="pharmacy" handleDelete={handleDelete} />
        </Container>
    ) : (
        <> </>
    );
};

export default PharmacyPage;

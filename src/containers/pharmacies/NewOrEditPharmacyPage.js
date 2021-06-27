import { Formik, Form, Field } from "formik";
import { Button, Container, LinearProgress, Card, CardHeader, CardContent, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "formik-material-ui";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import axios from "../../axios";

const useStyles = makeStyles((theme) => ({
    porgressbar: {
        marginTop: theme.spacing(1),
    },
}));

const NewOrEditPharmacyPage = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [ownerId, setOwnerId] = useState();
    const [pharmacy, setPharmacy] = useState();
    const auth = useSelector((state) => state.auth);

    const mode = props.match.params.id ? "edit" : "new";

    useEffect(() => {
        setOwnerId(auth.user.pharmacyOwner.id);

        if (mode === "edit") {
            axios
                .get(`/pharmacies/${props.match.params.id}`)
                .then((res) => {
                    setPharmacy(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [auth.user.pharmacyOwner.id, mode, props.match.params.id]);

    return (
        <Container>
            <Grid container justify="center">
                <Grid item xs={10} sm={6} md={4}>
                    <Card style={{ textAlign: "center" }} raised>
                        <CardHeader title={mode === "new" ? "Register Pharmacy" : "Edit Pharmacy"} />
                        <CardContent>
                            {((mode === "edit" && pharmacy) || mode === "new") && (
                                <Formik
                                    initialValues={{
                                        name: mode === "edit" ? pharmacy.name : "",
                                        phoneNumber: mode === "edit" ? pharmacy.contactData.phoneNumber : "",
                                        email: mode === "edit" ? pharmacy.contactData.email : "",
                                        country: mode === "edit" ? pharmacy.address.country : "",
                                        city: mode === "edit" ? pharmacy.address.city : "",
                                        street: mode === "edit" ? pharmacy.address.street : "",
                                        number: mode === "edit" ? pharmacy.address.number : "",
                                    }}
                                    validate={(values) => {
                                        const errors = {};
                                        if (!values.name) {
                                            errors.name = "Required";
                                        }
                                        if (!values.phoneNumber) {
                                            errors.phoneNumber = "Required";
                                        }
                                        if (!values.email) {
                                            errors.email = "Required";
                                        }
                                        if (!values.country) {
                                            errors.country = "Required";
                                        }
                                        if (!values.city) {
                                            errors.city = "Required";
                                        }
                                        if (!values.street) {
                                            errors.street = "Required";
                                        }
                                        if (!values.number) {
                                            errors.number = "Required";
                                        }
                                        return errors;
                                    }}
                                    onSubmit={(values, { setSubmitting }) => {
                                        const pharm = {
                                            name: values.name,
                                            contactData: {
                                                phoneNumber: values.phoneNumber,
                                                email: values.email,
                                            },
                                            address: {
                                                country: values.country,
                                                city: values.city,
                                                street: values.street,
                                                number: values.number,
                                            },
                                            ownerId: ownerId,
                                        };

                                        if (mode === "edit") {
                                            pharm.id = pharmacy.id;
                                            pharm.medicineStock = pharmacy.medicineStock;
                                        } else {
                                            pharm.medicineStock = [];
                                        }

                                        setTimeout(() => {
                                            if (mode === "new") {
                                                axios
                                                    .post("/pharmacies", pharm)
                                                    .then((res) => {
                                                        setSubmitting(false);
                                                        history.push("/my-pharmacies");
                                                    })
                                                    .catch((err) => {
                                                        setSubmitting(false);
                                                        console.log(err);
                                                    });
                                            } else {
                                                axios
                                                    .put(`/pharmacies/${pharmacy.id}`, pharm)
                                                    .then((res) => {
                                                        setSubmitting(false);
                                                        history.push(`/pharmacies/${pharmacy.id}`);
                                                    })
                                                    .catch((err) => {
                                                        setSubmitting(false);
                                                        console.log(err);
                                                    });
                                            }
                                        }, 500);
                                    }}
                                >
                                    {({ submitForm, isSubmitting }) => (
                                        <Form>
                                            <Field component={TextField} name="name" type="text" label="Pharmacy's name" />
                                            <br />
                                            <br />
                                            <Field component={TextField} name="phoneNumber" type="text" label="Phone Number" />
                                            <br />
                                            <br />
                                            <Field component={TextField} name="email" type="text" label="Email" />
                                            <br />
                                            <br />
                                            <Field component={TextField} name="country" type="text" label="Country" />
                                            <br />
                                            <br />
                                            <Field component={TextField} name="city" type="text" label="City" />
                                            <br />
                                            <br />
                                            <Field component={TextField} name="street" type="text" label="Street" />
                                            <br />
                                            <br />
                                            <Field component={TextField} name="number" type="text" label="Number" />
                                            <br />
                                            <br />

                                            <Button
                                                variant="contained"
                                                color="primary"
                                                disabled={isSubmitting}
                                                onClick={submitForm}
                                            >
                                                Submit
                                            </Button>
                                            {isSubmitting && <LinearProgress className={classes.porgressbar} />}
                                        </Form>
                                    )}
                                </Formik>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default NewOrEditPharmacyPage;

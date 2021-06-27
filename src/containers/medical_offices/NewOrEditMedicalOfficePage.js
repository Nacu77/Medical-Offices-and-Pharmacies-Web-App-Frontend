import { Formik, Form, Field } from "formik";
import { Button, Container, LinearProgress, Card, CardHeader, CardContent, Grid, MenuItem } from "@material-ui/core";
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

const NewOrEditMedicalOfficePage = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [specialties, setSpecialties] = useState();
    const [doctorId, setDoctorId] = useState();
    const [medicalOffice, setMedicalOffice] = useState();
    const auth = useSelector((state) => state.auth);

    const mode = props.match.params.id ? "edit" : "new";

    useEffect(() => {
        axios
            .get("/specialties")
            .then((res) => {
                setSpecialties(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        setDoctorId(auth.user.doctor.id);

        if (mode === "edit") {
            axios
                .get(`/medical-offices/${props.match.params.id}`)
                .then((res) => {
                    setMedicalOffice(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [auth.user.doctor.id, auth.user.id, mode, props.match.params.id]);

    return (
        <Container>
            <Grid container justify="center">
                <Grid item xs={10} sm={6} md={4}>
                    <Card style={{ textAlign: "center" }} raised>
                        <CardHeader title={mode === "new" ? "Register Medical Office" : "Edit Medical Office"} />
                        <CardContent>
                            {((mode === "edit" && specialties && medicalOffice) || (mode === "new" && specialties)) && (
                                <Formik
                                    initialValues={{
                                        name: mode === "edit" ? medicalOffice.name : "",
                                        phoneNumber: mode === "edit" ? medicalOffice.contactData.phoneNumber : "",
                                        email: mode === "edit" ? medicalOffice.contactData.email : "",
                                        country: mode === "edit" ? medicalOffice.address.country : "",
                                        city: mode === "edit" ? medicalOffice.address.city : "",
                                        street: mode === "edit" ? medicalOffice.address.street : "",
                                        number: mode === "edit" ? medicalOffice.address.number : "",
                                        specialtyName: mode === "edit" ? medicalOffice.specialty.name : specialties[0].name,
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
                                        if (!values.specialtyName) {
                                            errors.specialtyName = "Required";
                                        }
                                        return errors;
                                    }}
                                    onSubmit={(values, { setSubmitting }) => {
                                        const office = {
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
                                            specialty: {
                                                name: values.specialtyName,
                                            },
                                            doctorId: doctorId,
                                        };

                                        if (mode === "edit") {
                                            office.id = medicalOffice.id;
                                            office.schedule = medicalOffice.schedule;
                                            office.appointments = medicalOffice.appointments;
                                        } else {
                                            office.schedule = {};
                                        }

                                        setTimeout(() => {
                                            if (mode === "new") {
                                                axios
                                                    .post("/medical-offices", office)
                                                    .then((res) => {
                                                        setSubmitting(false);
                                                        history.push("/my-medical-offices");
                                                    })
                                                    .catch((err) => {
                                                        setSubmitting(false);
                                                        console.log(err);
                                                    });
                                            } else {
                                                axios
                                                    .put(`/medical-offices/${medicalOffice.id}`, office)
                                                    .then((res) => {
                                                        setSubmitting(false);
                                                        history.push(`/medical-offices/${medicalOffice.id}`);
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
                                            <Field component={TextField} name="name" type="text" label="Medical Office's name" />
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
                                            <Field
                                                component={TextField}
                                                select
                                                name="specialtyName"
                                                type="text"
                                                label="Specialty"
                                                margin="normal"
                                            >
                                                {specialties.map((specialty) => (
                                                    <MenuItem value={specialty.name} key={specialty.name}>
                                                        {specialty.name}
                                                    </MenuItem>
                                                ))}
                                            </Field>
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

export default NewOrEditMedicalOfficePage;

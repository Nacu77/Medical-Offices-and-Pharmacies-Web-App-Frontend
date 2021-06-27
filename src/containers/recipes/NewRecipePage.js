import { Formik, Form, Field } from "formik";
import { Button, Container, LinearProgress, Card, CardHeader, CardContent, Grid, Typography } from "@material-ui/core";
import MuiTextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "formik-material-ui";
import { Autocomplete } from "formik-material-ui-lab";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "../../axios";
import NewMedicinePage from "../medicines/NewMedicinePage";

const useStyles = makeStyles((theme) => ({
    porgressbar: {
        marginTop: theme.spacing(1),
    },
}));

const NewRecipePage = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [medicines, setMedicines] = useState([]);
    const [isAddingMedicine, setIsAddingMedicine] = useState(false);

    useEffect(() => {
        axios
            .get("/medicines")
            .then((res) => {
                setMedicines(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const onSubmitMedicine = (values) => {
        axios.post("/medicines", values).then(
            (res) => {
                setIsAddingMedicine(false);
                const meds = [...medicines];
                meds.push(res.data);
                setMedicines(meds);
            },
            (err) => {
                console.log(err);
            }
        );
    };

    return (
        <Container>
            <Grid container justify="center">
                <Grid item xs={10} sm={6} md={4}>
                    <Card style={{ textAlign: "center" }} raised>
                        <CardHeader title="Release Prescription" subheader="Please make sure the info is correct" />
                        <CardContent>
                            <Formik
                                initialValues={{
                                    description: "",
                                    medicines: [],
                                }}
                                validate={(values) => {
                                    const errors = {};
                                    if (!values.description) {
                                        errors.description = "Required";
                                    }
                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    const recipe = {
                                        patientId: props.match.params.patientId,
                                        description: values.description,
                                        medicines: values.medicines,
                                    };

                                    setTimeout(() => {
                                        axios
                                            .post("/recipes", recipe)
                                            .then((res) => {
                                                axios.delete(`/appointments/${props.match.params.appointmentId}`).catch((err) => {
                                                    console.log(err);
                                                });
                                                history.goBack();
                                                setSubmitting(false);
                                            })
                                            .catch((err) => {
                                                console.log(err);
                                                setSubmitting(false);
                                            });
                                    }, 500);
                                }}
                            >
                                {({ submitForm, isSubmitting, touched, errors }) => (
                                    <Form>
                                        <Field component={TextField} name="description" type="text" label="Description" />
                                        <br />
                                        <br />

                                        <Field
                                            name="medicines"
                                            multiple
                                            component={Autocomplete}
                                            options={medicines}
                                            getOptionLabel={(medicine) => medicine.name}
                                            renderInput={(params) => (
                                                <MuiTextField
                                                    {...params}
                                                    error={touched["medicine"] && !!errors["medicine"]}
                                                    helperText={touched["medicine"] && errors["medicine"]}
                                                    label="Medicine"
                                                    variant="outlined"
                                                />
                                            )}
                                        />
                                        <br />
                                        <br />

                                        <Button variant="contained" color="primary" disabled={isSubmitting} onClick={submitForm}>
                                            Release
                                        </Button>
                                        {isSubmitting && <LinearProgress className={classes.porgressbar} />}
                                    </Form>
                                )}
                            </Formik>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <br />
            <br />

            <Typography align="center" variant="subtitle2" gutterBottom>
                If you don't find the medicine, you can add it, but make sure the information provided is correct
            </Typography>

            {!isAddingMedicine ? (
                <Grid container justify="center">
                    <Grid item>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => {
                                setIsAddingMedicine(true);
                            }}
                        >
                            Add New Medicine
                        </Button>
                    </Grid>
                </Grid>
            ) : (
                <>
                    <br />
                    <NewMedicinePage customOnSubmit={onSubmitMedicine} />
                </>
            )}
        </Container>
    );
};

export default NewRecipePage;

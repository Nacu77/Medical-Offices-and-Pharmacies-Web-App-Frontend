import { Formik, Form, Field } from "formik";
import { Button, Container, LinearProgress, Card, CardHeader, CardContent, Grid, Typography } from "@material-ui/core";
import MuiTextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "formik-material-ui";
import { Autocomplete } from "formik-material-ui-lab";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "../../axios";
import NewMedicinePage from "./NewMedicinePage";

const useStyles = makeStyles((theme) => ({
    porgressbar: {
        marginTop: theme.spacing(1),
    },
}));

const NewMedicineStockPage = (props) => {
    const [medicines, setMedicines] = useState();
    const classes = useStyles();
    const history = useHistory();
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
                meds.push(values);
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
                        <CardHeader title="Add a new medicine stock" subheader="Please make sure the info is correct" />
                        <CardContent>
                            {medicines && (
                                <Formik
                                    initialValues={{
                                        medicine: null,
                                        amount: "",
                                        price: "",
                                    }}
                                    validate={(values) => {
                                        const errors = {};
                                        if (!values.amount) {
                                            errors.amount = "Required";
                                        }
                                        if (!values.price) {
                                            errors.price = "Required";
                                        }
                                        if (!values.medicine) {
                                            errors.medicine = "Required";
                                        }
                                        return errors;
                                    }}
                                    onSubmit={(values, { setSubmitting }) => {
                                        const medicineStock = {
                                            amount: values.amount,
                                            price: values.price,
                                            pharmacyId: props.match.params.id,
                                            medicine: {
                                                name: values.medicine.name,
                                            },
                                        };

                                        setTimeout(() => {
                                            axios
                                                .post("/medicine-stock", medicineStock)
                                                .then((res) => {
                                                    setSubmitting(false);
                                                    history.push(`/pharmacies/${props.match.params.id}`);
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
                                            <Field
                                                name="medicine"
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
                                            <Field component={TextField} name="amount" type="text" label="Amount" />
                                            <br />
                                            <br />
                                            <Field component={TextField} name="price" type="text" label="Price" />
                                            <br />
                                            <br />

                                            <Button
                                                variant="contained"
                                                color="primary"
                                                disabled={isSubmitting}
                                                onClick={submitForm}
                                            >
                                                Add Stock
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

export default NewMedicineStockPage;

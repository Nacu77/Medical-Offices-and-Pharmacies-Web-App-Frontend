import { Formik, Form, Field } from "formik";
import { Button, Container, LinearProgress, Card, CardHeader, CardContent, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "formik-material-ui";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "../../axios";

const useStyles = makeStyles((theme) => ({
    porgressbar: {
        marginTop: theme.spacing(1),
    },
}));

const EditMedicineStockPage = (props) => {
    const [medicineStock, setMedicineStock] = useState();
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        axios
            .get(`/medicine-stock/${props.match.params.id}`)
            .then((res) => {
                setMedicineStock(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [props.match.params.id]);

    return medicineStock ? (
        <Container>
            <Grid container justify="center">
                <Grid item xs={10} sm={6} md={4}>
                    <Card style={{ textAlign: "center" }} raised>
                        <CardHeader title="Edit medicine stock" subheader={medicineStock.medicine.name} />
                        <CardContent>
                            <Formik
                                initialValues={{
                                    amount: medicineStock.amount,
                                    price: medicineStock.price,
                                }}
                                validate={(values) => {
                                    const errors = {};
                                    if (!values.amount) {
                                        errors.amount = "Required";
                                    }
                                    if (!values.price) {
                                        errors.price = "Required";
                                    }
                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    const medStock = {
                                        id: medicineStock.id,
                                        amount: values.amount,
                                        price: values.price,
                                        pharmacyId: medicineStock.pharmacyId,
                                        medicine: {
                                            name: medicineStock.medicine.name,
                                        },
                                    };

                                    setTimeout(() => {
                                        axios
                                            .put(`/medicine-stock/${medicineStock.id}`, medStock)
                                            .then((res) => {
                                                setSubmitting(false);
                                                history.push(`/pharmacies/${medicineStock.pharmacyId}`);
                                            })
                                            .catch((err) => {
                                                console.log(err);
                                                setSubmitting(false);
                                            });
                                    }, 500);
                                }}
                            >
                                {({ submitForm, isSubmitting }) => (
                                    <Form>
                                        <Field component={TextField} name="amount" type="text" label="Amount" />
                                        <br />
                                        <br />
                                        <Field component={TextField} name="price" type="text" label="Price" />
                                        <br />
                                        <br />

                                        <Button variant="contained" color="primary" disabled={isSubmitting} onClick={submitForm}>
                                            Edit Stock
                                        </Button>
                                        {isSubmitting && <LinearProgress className={classes.porgressbar} />}
                                    </Form>
                                )}
                            </Formik>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    ) : (
        <> </>
    );
};

export default EditMedicineStockPage;

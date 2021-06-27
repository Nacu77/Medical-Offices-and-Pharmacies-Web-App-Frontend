import { Formik, Form, Field } from "formik";
import { Button, Container, LinearProgress, Card, CardHeader, CardContent, Grid, Typography } from "@material-ui/core";
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

const BuyMedicinePage = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [medicineStock, setMedicineStock] = useState();

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
                        <CardHeader title={`Buy ${medicineStock.medicine.name}`} />
                        <CardContent>
                            <Formik
                                initialValues={{
                                    amount: "",
                                }}
                                validate={(values) => {
                                    const errors = {};
                                    if (!values.amount) {
                                        errors.amount = "Required";
                                    }
                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    const med = { ...medicineStock };
                                    med.amount = medicineStock.amount - values.amount;

                                    setTimeout(() => {
                                        axios
                                            .put(`/medicine-stock/${medicineStock.id}`, med)
                                            .then((res) => {
                                                history.goBack();
                                            })
                                            .catch((err) => {
                                                console.log(err);
                                            });
                                        setSubmitting(false);
                                    }, 500);
                                }}
                            >
                                {({ submitForm, isSubmitting }) => (
                                    <Form>
                                        <Typography variant="subtitle1" gutterBottom>
                                            Medicines in Stock: {medicineStock.amount}
                                        </Typography>
                                        <Typography variant="subtitle1" gutterBottom>
                                            Price: {medicineStock.price}
                                        </Typography>
                                        <Field component={TextField} name="amount" type="text" label="Amount" />
                                        <br />
                                        <br />

                                        <Button variant="contained" color="primary" disabled={isSubmitting} onClick={submitForm}>
                                            Submit
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
        <></>
    );
};

export default BuyMedicinePage;

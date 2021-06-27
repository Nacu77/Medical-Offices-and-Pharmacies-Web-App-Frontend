import { Formik, Form, Field } from "formik";
import { Button, Container, LinearProgress, Card, CardHeader, CardContent, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { TextField } from "formik-material-ui";
import { DatePicker, TimePicker } from "formik-material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "../../axios";

const useStyles = makeStyles((theme) => ({
    porgressbar: {
        marginTop: theme.spacing(1),
    },
}));

const NewAppointmentPage = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const auth = useSelector((state) => state.auth);

    return (
        <Container>
            <Grid container justify="center">
                <Grid item xs={10} md={4}>
                    <Card style={{ textAlign: "center" }} raised>
                        <CardHeader title="Make Appointment" subheader="Please complete the following fields" />
                        <CardContent>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Formik
                                    initialValues={{
                                        date: new Date(),
                                        time: new Date(),
                                        description: "",
                                    }}
                                    validate={(values) => {
                                        const errors = {};
                                        if (!values.description) {
                                            errors.description = "Required";
                                        }
                                        return errors;
                                    }}
                                    onSubmit={(values, { setSubmitting }) => {
                                        const date =
                                            values.date.getFullYear() +
                                            "-" +
                                            (values.date.getMonth() + 1 < 10
                                                ? "0" + (values.date.getMonth() + 1)
                                                : values.date.getMonth() + 1) +
                                            "-" +
                                            (values.date.getDate() + 1 < 10
                                                ? "0" + (values.date.getDate() + 1)
                                                : values.date.getDate() + 1) +
                                            "T" +
                                            values.time.getHours() +
                                            ":00:00.0";

                                        const appointment = {
                                            description: values.description,
                                            date: date,
                                            patientId: auth.user.patient.id,
                                            medicalOfficeId: props.match.params.id,
                                        };

                                        setTimeout(() => {
                                            axios
                                                .post("/appointments", appointment)
                                                .then((res) => {
                                                    history.push("/my-appointments");
                                                    setSubmitting(false);
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
                                            <Field component={DatePicker} name="date" label="Date" />
                                            <br />
                                            <br />
                                            <Field component={TimePicker} name="time" label="Time" />
                                            <br />
                                            <br />
                                            <Field component={TextField} name="description" type="text" label="Description" />
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
                            </MuiPickersUtilsProvider>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default NewAppointmentPage;

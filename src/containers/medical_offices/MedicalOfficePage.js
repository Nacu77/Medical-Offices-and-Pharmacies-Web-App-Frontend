import { useState, useEffect } from "react";
import axios from "../../axios";
import { Container, Typography, Button, Grid, LinearProgress, CardHeader, CardContent, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import Schedule from "../../components/Schedule";

const useStyles = makeStyles((theme) => ({
    porgressbar: {
        marginTop: theme.spacing(1),
    },
}));

const MedicalOfficePage = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [medicalOffice, setMedicalOffice] = useState();
    const [doctor, setDoctor] = useState({});
    const [scheduleEdit, setScheduleEdit] = useState(false);
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        axios
            .get(`/medical-offices/${props.match.params.id}`)
            .then((res) => {
                const medicalOffice = res.data;
                setMedicalOffice(medicalOffice);
                axios
                    .get(`/doctors/${medicalOffice.doctorId}`)
                    .then((res) => {
                        const doctor = res.data;
                        setDoctor(doctor);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }, [props.match.params.id]);

    let scheduleForm = <></>;
    if (medicalOffice) {
        const schedule = medicalOffice.schedule;
        scheduleForm = (
            <Grid container justify="center">
                <Grid item xs={10} sm={6} md={4}>
                    <Card style={{ textAlign: "center" }} raised>
                        <CardHeader title="Edit Schedule" />
                        <CardContent>
                            <Formik
                                initialValues={{
                                    mondayStart: schedule.mondayStart ? schedule.mondayStart : "",
                                    mondayEnd: schedule.mondayEnd ? schedule.mondayEnd : "",
                                    tuesdayStart: schedule.tuesdayStart ? schedule.tuesdayStart : "",
                                    tuesdayEnd: schedule.tuesdayEnd ? schedule.tuesdayEnd : "",
                                    wednesdayStart: schedule.wednesdayStart ? schedule.wednesdayStart : "",
                                    wednesdayEnd: schedule.wednesdayEnd ? schedule.wednesdayEnd : "",
                                    thursdayStart: schedule.thursdayStart ? schedule.thursdayStart : "",
                                    thursdayEnd: schedule.thursdayEnd ? schedule.thursdayEnd : "",
                                    fridayStart: schedule.fridayStart ? schedule.fridayStart : "",
                                    fridayEnd: schedule.fridayEnd ? schedule.fridayEnd : "",
                                    saturdayStart: schedule.saturdayStart ? schedule.saturdayStart : "",
                                    saturdayEnd: schedule.saturdayEnd ? schedule.saturdayEnd : "",
                                    sundayStart: schedule.sundayStart ? schedule.sundayStart : "",
                                    sundayEnd: schedule.sundayEnd ? schedule.sundayEnd : "",
                                }}
                                validate={(values) => {
                                    const errors = {};
                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    setTimeout(() => {
                                        const office = { ...medicalOffice };
                                        office.schedule = { ...values };
                                        office.schedule.id = medicalOffice.schedule.id;
                                        axios
                                            .put(`/medical-offices/${medicalOffice.id}`, office)
                                            .then((res) => {
                                                setMedicalOffice(office);
                                                setScheduleEdit(false);
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
                                        <Grid container spacing={3}>
                                            <Grid item xs={6}>
                                                <Field
                                                    component={TextField}
                                                    name="mondayStart"
                                                    type="text"
                                                    label="Monday Start"
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Field component={TextField} name="mondayEnd" type="text" label="Monday End" />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Field
                                                    component={TextField}
                                                    name="tuesdayStart"
                                                    type="text"
                                                    label="Tuesday Start"
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Field component={TextField} name="tuesdayEnd" type="text" label="Tuesday End" />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Field
                                                    component={TextField}
                                                    name="wednesdayStart"
                                                    type="text"
                                                    label="Wednesday Start"
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Field
                                                    component={TextField}
                                                    name="wednesdayEnd"
                                                    type="text"
                                                    label="Wednesday End"
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Field
                                                    component={TextField}
                                                    name="thursdayStart"
                                                    type="text"
                                                    label="Thursday Start"
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Field
                                                    component={TextField}
                                                    name="thursdayEnd"
                                                    type="text"
                                                    label="Thursday End"
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Field
                                                    component={TextField}
                                                    name="fridayStart"
                                                    type="text"
                                                    label="Friday Start"
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Field component={TextField} name="fridayEnd" type="text" label="Friday End" />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Field
                                                    component={TextField}
                                                    name="saturdayStart"
                                                    type="text"
                                                    label="Saturday Start"
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Field
                                                    component={TextField}
                                                    name="saturdayEnd"
                                                    type="text"
                                                    label="Saturday End"
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Field
                                                    component={TextField}
                                                    name="sundayStart"
                                                    type="text"
                                                    label="Sunday Start"
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Field component={TextField} name="sundayEnd" type="text" label="Sunday End" />
                                            </Grid>
                                        </Grid>
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
        );
    }

    const isHisOffice = (auth.role === "doctor" && auth.user.doctor.id === doctor.id) || auth.role === "admin";

    return medicalOffice ? (
        <Container>
            <Typography variant="h2" align="center" gutterBottom>
                {medicalOffice.name}
            </Typography>
            <Typography variant="subtitle1" align="center" gutterBottom>
                Owned by: Dr. {doctor.firstName} {doctor.lastName}
            </Typography>
            <br />
            <br />

            {auth.role === "patient" && (
                <>
                    <Grid container justify="center">
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    history.push(`/appointments/new/${medicalOffice.id}`);
                                }}
                            >
                                Make An Appointment
                            </Button>
                        </Grid>
                    </Grid>
                    <br />
                    <br />
                </>
            )}

            {isHisOffice && (
                <>
                    <Grid container spacing={5} justify="center">
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    history.push(`/medical-offices/${medicalOffice.id}/appointments`);
                                }}
                            >
                                View Appointments
                            </Button>
                        </Grid>

                        <Grid item>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => {
                                    axios
                                        .delete(`/medical-offices/${medicalOffice.id}`)
                                        .then((res) => {
                                            history.push("/my-medical-offices");
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                        });
                                }}
                            >
                                Delete Medical Office
                            </Button>
                        </Grid>

                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    history.push(`/my-medical-offices/edit/${medicalOffice.id}`);
                                }}
                            >
                                Edit Medical Office
                            </Button>
                        </Grid>
                    </Grid>
                    <br />
                    <br />
                </>
            )}

            <Typography variant="body1" align="center" gutterBottom>
                Address: {medicalOffice.address.country}, {medicalOffice.address.city}, {medicalOffice.address.street},{" "}
                {medicalOffice.address.number}
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
                Contact Data: {medicalOffice.contactData.phoneNumber}, {medicalOffice.contactData.email}
            </Typography>
            <br />
            <br />

            {!scheduleEdit ? (
                <>
                    <Schedule {...medicalOffice.schedule} />
                    <br />
                    {isHisOffice && (
                        <Grid container justify="center">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    setScheduleEdit(true);
                                }}
                            >
                                Edit Schedule
                            </Button>
                        </Grid>
                    )}
                </>
            ) : (
                scheduleForm
            )}
        </Container>
    ) : (
        <></>
    );
};

export default MedicalOfficePage;

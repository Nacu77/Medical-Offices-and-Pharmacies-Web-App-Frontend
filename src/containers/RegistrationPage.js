import { Formik, Form, Field } from "formik";
import { Button, Container, LinearProgress, Card, CardHeader, CardContent, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "formik-material-ui";

const useStyles = makeStyles((theme) => ({
    porgressbar: {
        marginTop: theme.spacing(1),
    },
}));

const RegistrationPage = (props) => {
    const classes = useStyles();

    return (
        <Container>
            <Grid container justify="center">
                <Grid item xs={10} sm={6} md={4}>
                    <Card style={{ textAlign: "center" }} raised>
                        <CardHeader title="Register" subheader="Please complete the following fields" />
                        <CardContent>
                            <Formik
                                initialValues={{
                                    firstName: "",
                                    lastName: "",
                                    email: "",
                                    phoneNumber: "",
                                    password: "",
                                    confirmPassword: "",
                                }}
                                validate={(values) => {
                                    const errors = {};
                                    if (!values.firstName) {
                                        errors.firstName = "Required";
                                    }
                                    if (!values.lastName) {
                                        errors.lastName = "Required";
                                    }
                                    if (!values.email) {
                                        errors.email = "Required";
                                    }
                                    if (!values.phoneNumber) {
                                        errors.phoneNumber = "Required";
                                    }
                                    if (!values.password) {
                                        errors.password = "Required";
                                    }
                                    if (!values.confirmPassword) {
                                        errors.confirmPassword = "Required";
                                    }
                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {}}
                            >
                                {({ submitForm, isSubmitting }) => (
                                    <Form>
                                        <Field component={TextField} name="firstName" type="text" label="First Name" />
                                        <br />
                                        <br />
                                        <Field component={TextField} name="lastName" type="text" label="Last Name" />
                                        <br />
                                        <br />
                                        <Field component={TextField} name="email" type="email" label="Email" />
                                        <br />
                                        <br />
                                        <Field component={TextField} name="phoneNumber" type="text" label="Phone Number" />
                                        <br />
                                        <br />
                                        <Field component={TextField} name="password" type="password" label="Password" />
                                        <br />
                                        <br />
                                        <Field
                                            component={TextField}
                                            name="confirmPassword"
                                            type="password"
                                            label="Confirm Password"
                                        />
                                        <br />
                                        <br />

                                        <Button variant="contained" color="primary" disabled={isSubmitting} onClick={submitForm}>
                                            Register
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
    );
};

export default RegistrationPage;

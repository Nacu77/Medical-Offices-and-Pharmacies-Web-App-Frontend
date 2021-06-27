import { Formik, Form, Field } from "formik";
import { Button, Container, LinearProgress, Card, CardHeader, CardContent, Grid, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "formik-material-ui";
import { useHistory } from "react-router-dom";

import axios from "../../axios";

const useStyles = makeStyles((theme) => ({
    porgressbar: {
        marginTop: theme.spacing(1),
    },
}));

const RegisterPage = (props) => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <Container>
            <Grid container justify="center">
                <Grid item xs={10} md={4}>
                    <Card style={{ textAlign: "center" }} raised>
                        <CardHeader title="Register" subheader="Please complete the following fields" />
                        <CardContent>
                            <Formik
                                initialValues={{
                                    username: "",
                                    firstName: "",
                                    lastName: "",
                                    email: "",
                                    phoneNumber: "",
                                    password: "",
                                    confirmPassword: "",
                                    role: "patient",
                                }}
                                validate={(values) => {
                                    const errors = {};
                                    if (!values.username) {
                                        errors.username = "Required";
                                    }
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
                                    if (values.confirmPassword !== values.password) {
                                        errors.confirmPassword = "Must be the same as password";
                                    }
                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    let user = {
                                        username: values.username,
                                        password: values.password,
                                        role: {
                                            name: values.role,
                                        },
                                    };
                                    const profile = {
                                        firstName: values.firstName,
                                        lastName: values.lastName,
                                        contactData: {
                                            phoneNumber: values.phoneNumber,
                                            email: values.email,
                                        },
                                    };
                                    if (values.role === "patient") {
                                        user.patient = profile;
                                    } else if (values.role === "doctor") {
                                        user.doctor = profile;
                                    } else if (values.role === "pharmacy_owner") {
                                        user.pharmacyOwner = profile;
                                    }

                                    setTimeout(() => {
                                        axios
                                            .post("/users/register", user)
                                            .then((res) => {
                                                setSubmitting(false);
                                                history.push("/login");
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
                                        <Field component={TextField} name="username" type="text" label="Username" />
                                        <br />
                                        <br />
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
                                        <Field
                                            component={TextField}
                                            select
                                            name="role"
                                            type="text"
                                            label="User Type"
                                            margin="normal"
                                        >
                                            <MenuItem value={"patient"} key={"patient"}>
                                                Patient
                                            </MenuItem>
                                            <MenuItem value={"doctor"} key={"doctor"}>
                                                Doctor
                                            </MenuItem>
                                            <MenuItem value={"pharmacy_owner"} key={"pharmacy_owner"}>
                                                Pharmacy Owner
                                            </MenuItem>
                                        </Field>
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

export default RegisterPage;

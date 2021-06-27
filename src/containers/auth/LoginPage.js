import { Formik, Form, Field } from "formik";
import { Button, Container, LinearProgress, Card, CardHeader, CardContent, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "formik-material-ui";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import { authenticateUser } from "../../services/index";

const useStyles = makeStyles((theme) => ({
    porgressbar: {
        marginTop: theme.spacing(1),
    },
}));

const LoginPage = (props) => {
    const classes = useStyles();
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    return (
        <Container>
            {auth.isLoggedIn ? (
                <Redirect to="/" />
            ) : (
                <Grid container justify="center">
                    <Grid item xs={10} md={4}>
                        <Card style={{ textAlign: "center" }} raised>
                            <CardHeader title="Login" subheader="Please complete the following fields" />
                            <CardContent>
                                <Formik
                                    initialValues={{
                                        username: "",
                                        password: "",
                                    }}
                                    validate={(values) => {
                                        const errors = {};
                                        if (!values.username) {
                                            errors.username = "Required";
                                        }
                                        if (!values.password) {
                                            errors.password = "Required";
                                        }
                                        return errors;
                                    }}
                                    onSubmit={(values, { setSubmitting }) => {
                                        setTimeout(() => {
                                            dispatch(authenticateUser(values.username, values.password));
                                            setSubmitting(false);
                                        }, 500);
                                    }}
                                >
                                    {({ submitForm, isSubmitting }) => (
                                        <Form>
                                            <Field component={TextField} name="username" type="text" label="Username" />
                                            <br />
                                            <br />
                                            <Field component={TextField} name="password" type="password" label="Password" />
                                            <br />
                                            <br />

                                            <Button
                                                variant="contained"
                                                color="primary"
                                                disabled={isSubmitting}
                                                onClick={submitForm}
                                            >
                                                Login
                                            </Button>
                                            {isSubmitting && <LinearProgress className={classes.porgressbar} />}
                                        </Form>
                                    )}
                                </Formik>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};

export default LoginPage;

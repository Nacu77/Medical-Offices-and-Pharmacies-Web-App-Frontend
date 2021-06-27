import { Formik, Form, Field } from "formik";
import { Button, Container, LinearProgress, Card, CardHeader, CardContent, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "formik-material-ui";
import { useHistory } from "react-router-dom";

import axios from "../../axios";

const useStyles = makeStyles((theme) => ({
    porgressbar: {
        marginTop: theme.spacing(1),
    },
}));

const NewMedicinePage = (props) => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <Container>
            <Grid container justify="center">
                <Grid item xs={10} sm={6} md={4}>
                    <Card style={{ textAlign: "center" }} raised>
                        <CardHeader title="Add a new medicine" subheader="Please make sure the info is correct" />
                        <CardContent>
                            <Formik
                                initialValues={{
                                    name: "",
                                    imageUrl: "",
                                }}
                                validate={(values) => {
                                    const errors = {};
                                    if (!values.name) {
                                        errors.name = "Required";
                                    }
                                    if (!values.imageUrl) {
                                        errors.imageUrl = "Required";
                                    }
                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    if (props.customOnSubmit) {
                                        props.customOnSubmit(values);
                                        setSubmitting(false);
                                    } else {
                                        axios.post("/medicines", values).then(
                                            (res) => {
                                                setSubmitting(false);
                                                history.push("/medicines");
                                            },
                                            (err) => {
                                                setSubmitting(false);
                                                console.log(err);
                                            }
                                        );
                                    }
                                }}
                            >
                                {({ submitForm, isSubmitting }) => (
                                    <Form>
                                        <Field component={TextField} name="name" type="text" label="Medicine's name" />
                                        <br />
                                        <br />
                                        <Field component={TextField} name="imageUrl" type="text" label="Image URL" />
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
    );
};

export default NewMedicinePage;

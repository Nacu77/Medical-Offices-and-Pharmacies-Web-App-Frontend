import { Card, CardActions, CardContent, CardHeader, Typography, Button, Grid } from "@material-ui/core";
import { useHistory } from "react-router";

const Appointment = (props) => {
    const history = useHistory();

    return (
        <Card style={{ textAlign: "center" }} raised>
            <CardHeader title="Appointment" />

            <CardContent>
                {props.forMedicalOffice ? (
                    <Typography>with: {props.patientName}</Typography>
                ) : (
                    <Typography>
                        to:{" "}
                        <Button
                            variant="text"
                            color="primary"
                            onClick={() => {
                                history.push(`/medical-offices/${props.medicalOfficeId}`);
                            }}
                        >
                            {props.medicalOfficeName}
                        </Button>
                    </Typography>
                )}
                <br />
                <Typography>date: {props.date}</Typography>
                <br />
                <Typography>description: {props.description}</Typography>
            </CardContent>

            <CardActions>
                <Grid container direction="column" justify="center" spacing={1}>
                    <Grid item>
                        <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                props.handleCancel(props.id);
                            }}
                        >
                            Cancel
                        </Button>
                    </Grid>

                    {props.forMedicalOffice && (
                        <Grid item>
                            <Button
                                size="small"
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    history.push(`/recipes/new/${props.patientId}/${props.id}`);
                                }}
                            >
                                Release Prescription
                            </Button>
                        </Grid>
                    )}
                </Grid>
            </CardActions>
        </Card>
    );
};

export default Appointment;

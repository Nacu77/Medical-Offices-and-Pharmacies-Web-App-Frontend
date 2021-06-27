import { Card, CardActions, CardContent, CardHeader, Typography, Button, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const MedicalOffice = (props) => {
    const history = useHistory();
    const auth = useSelector((state) => state.auth);

    return (
        <Card style={{ textAlign: "center" }} raised>
            <CardHeader title={props.name} />
            <CardContent>
                <Typography>
                    Address: {props.address.country}, {props.address.city}, {props.address.street}, {props.address.number}
                </Typography>
                <br />
                <Typography>
                    Contact Data: {props.contactData.phoneNumber}, {props.contactData.email}
                </Typography>
                <br />
                <Typography>Specialty: {props.specialty.name}</Typography>
            </CardContent>
            <CardActions>
                <Grid container justify="center">
                    <Grid item>
                        <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                if (auth.isLoggedIn) {
                                    history.push(`/medical-offices/${props.id}`);
                                } else {
                                    history.push(`/login`);
                                }
                            }}
                        >
                            Visit
                        </Button>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
};

export default MedicalOffice;

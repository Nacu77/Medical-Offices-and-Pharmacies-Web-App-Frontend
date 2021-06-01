import { Card, CardActions, CardContent, CardHeader, Typography, Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";

const MedicalOffice = (props) => {
    return (
        <Card raised>
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
                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        props.history.push(`/medical-offices/${props.id}`);
                    }}
                >
                    Find Out More
                </Button>
            </CardActions>
        </Card>
    );
};

export default withRouter(MedicalOffice);

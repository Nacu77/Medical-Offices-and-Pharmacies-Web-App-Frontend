import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";

import Schedule from "../components/Schedule";

const MedicalOfficePage = (props) => {
    const [medicalOffice, setMedicalOffice] = useState();
    const [owner, setOwner] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8080/api/medical-offices/${props.match.params.id}`).then((res) => {
            const medicalOffice = res.data;
            setMedicalOffice(medicalOffice);
            axios.get(`http://localhost:8080/api/doctors/${medicalOffice.doctorId}`).then((res) => {
                const owner = res.data;
                setOwner(owner);
            });
        });
    }, [props.match.params.id]);

    return (
        <Container>
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    props.history.push("/medical-offices");
                }}
            >
                Back to Medical Offices
            </Button>
            {medicalOffice && (
                <>
                    <Typography variant="h2" align="center" gutterBottom>
                        {medicalOffice.name}
                    </Typography>
                    <Typography variant="subtitle1" align="center" gutterBottom>
                        Owned by: Dr. {owner.firstName} {owner.lastName}
                    </Typography>
                    <br />

                    <Typography variant="body1" gutterBottom>
                        Address: {medicalOffice.address.country}, {medicalOffice.address.city}, {medicalOffice.address.street},{" "}
                        {medicalOffice.address.number}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Contact Data: {medicalOffice.contactData.phoneNumber}, {medicalOffice.contactData.email}
                    </Typography>

                    <br />
                    <Schedule {...medicalOffice.schedule} />
                </>
            )}
        </Container>
    );
};

export default withRouter(MedicalOfficePage);

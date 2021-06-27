import { Card, CardContent, CardHeader } from "@material-ui/core";
import { useEffect, useState } from "react";

import axios from "../../axios";

const BuyRecipePage = (props) => {
    const [medicinesToBuy, setMedicinesToBuy] = useState([]);

    useEffect(() => {
        let recipe;
        axios
            .get(`/recipes/${props.match.params.id}`)
            .then((res) => {
                recipe = res.data;
                let medicineStocks;
                axios
                    .get("/medicine-stock")
                    .then((res) => {
                        medicineStocks = res.data;

                        const meds = [];
                        recipe.medicines.forEach((medicine) => {
                            medicineStocks.filter((medicineStock) => medicineStock.medicine.name === medicine.name);
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }, [props.match.params.id]);

    return (
        <Card style={{ textAlign: "center" }} raised>
            <CardHeader title="Buy All Medicines from Recipe" />
            <CardContent></CardContent>
        </Card>
    );
};

export default BuyRecipePage;

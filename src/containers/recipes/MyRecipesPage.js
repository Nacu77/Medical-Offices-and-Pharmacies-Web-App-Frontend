import { useState, useEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

import axios from "../../axios";
import Recipes from "../../components/Recipes";

const MyRecipesPage = () => {
    const [recipes, setRecipes] = useState([]);
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        axios
            .get(`/recipes/patient/${auth.user.patient.id}`)
            .then((res) => {
                setRecipes(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [auth.user.patient.id]);

    const handleDelete = (id) => {
        axios
            .delete(`/recipes/${id}`)
            .then((res) => {
                const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
                setRecipes(updatedRecipes);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Container>
            <Typography variant="h2" align="center" gutterBottom>
                My Recipes
            </Typography>
            <br />
            <br />

            <Recipes recipes={recipes} handleDelete={handleDelete} />
        </Container>
    );
};

export default MyRecipesPage;

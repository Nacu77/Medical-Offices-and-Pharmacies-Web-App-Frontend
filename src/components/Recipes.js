import { Grid } from "@material-ui/core";

import Recipe from "./Recipe";

const Recipes = (props) => {
    return (
        <Grid container spacing={4} justify="center">
            {props.recipes.map((recipe) => (
                <Grid item key={recipe.id} xs={12} md={6}>
                    <Recipe {...recipe} handleDelete={props.handleDelete} />
                </Grid>
            ))}
        </Grid>
    );
};

export default Recipes;

import { Container, Grid } from "@material-ui/core";

import HomeWelcome from "../components/HomeWelcome";
import HomeInfo from "../components/HomeInfo";

const mainFeaturedPost = {
    title: "Welcome To Offices And Pharmacies App",
    description:
        "In this app you can find medical offices where you can make appointments, and also pharmacies from where you can buy medicines.",
    image: "https://diasporaro.co.uk/wp-content/uploads/1-2-1.jpg",
    imgText: "main image description",
};

const featuredPosts = [
    {
        title: "Medical Offices",
        owner: "for Doctors",
        description:
            "You can make appointments to medical offices, then make the consultation, and after that the doctor will release a prescription.",
        image: "https://thumbs.dreamstime.com/b/docotor-s-office-11152240.jpg",
        imageText: "Image Text",
        link: "/medical-offices",
        linkText: "find Medical Offices",
    },
    {
        title: "Pharmacies",
        owner: "for Pharmacy Owners",
        description:
            "You can easily buy medicines from pharmacies, compare prices, so you can make the best choice. Feel free to check it out.",
        image: "https://media.istockphoto.com/photos/efficient-and-undeniably-friendly-service-picture-id659965266?k=6&m=659965266&s=612x612&w=0&h=R9bDkMd_HldqovosT3SPPxaN8wyCNw5mCEwA0NF3sOI=",
        imageText: "Image Text",
        link: "/pharmacies",
        linkText: "find Pharmacies",
    },
];

const MainPage = () => {
    return (
        <Container>
            <HomeWelcome post={mainFeaturedPost} />
            <Grid container spacing={4}>
                {featuredPosts.map((post) => (
                    <HomeInfo key={post.title} post={post} />
                ))}
            </Grid>
        </Container>
    );
};

export default MainPage;

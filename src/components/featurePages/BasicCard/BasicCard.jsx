// Components
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
// import CardActions from "@mui/material/CardActions";
// import Button from "@mui/material/Button";

export default function BasicCard() {
  return (
    <Card
        sx={{ maxWidth: 345, backgroundColor: "var(----card-bg-color)" }}
    >
      {/* <CardMedia
        component="img"
        height="200"
        image="https://source.unsplash.com/random/400x200/?nature"
        alt="picture representing feature"
      /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Feature
        </Typography>
        <Typography variant="body2" color="text.secondary">
          More details about this feature. Text to fill the space. More details about this feature. Text to fill the space. More details about this feature. Text to fill the space. More details about this feature. Text to fill the space.
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}

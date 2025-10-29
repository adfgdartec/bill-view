// Stylesheet
import styles from './basicCard.module.css';

// Components
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";


export default function BasicCard(props) {
  return (
    <Card
        sx={{ maxWidth: 345 }}
        className={styles.basicCard}
    >
      {/* <CardMedia
        component="img"
        height="200"
        image="https://source.unsplash.com/random/400x200/?nature"
        alt="picture representing feature"
      /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.heading}
        </Typography>
        <Typography variant="body1">
          {props.body}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}

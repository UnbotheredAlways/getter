import Card from "../card/Card";
import classes from "./Home.module.css";

const Home = (props) => {
  return (
    <Card className={classes.home}>
      <h1>You can now proceed on the desktop app.</h1>
      <p>{props.currentAccount}</p>
      <a href={'testproto://'+props.currentAccount} target="_blank" rel="noreferrer">Verify</a>
      {/* <p>{props.balance} ETH</p> */}
    </Card>
  );
};
export default Home;
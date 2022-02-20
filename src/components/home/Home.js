import { useState } from "react";
import Card from "../card/Card";
import classes from "./Home.module.css";
import { ethers } from "ethers"

const Home = (props) => {
  const [signature, setSignature] = useState();
  const [error, setError] = useState();
  const [verifying, setVerifying] = useState();


  async function handleSign(e)
  { 
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    var currentDate = new Date();

    const message = {signer: await signer.getAddress(), date: currentDate.getDate()}
    
    var TempSignature = await signer.signMessage(btoa(JSON.stringify(message)));
    setSignature(TempSignature);
    console.log(signature)
    const address = await signer.getAddress();
    setVerifying(true)
  }

  return (
    <Card className={classes.home}>
      { !verifying &&  <h1>Sign your wallet. No transaction will be made during the sign.</h1> }
      { verifying &&  <h1>Verify to continue.</h1> }
      <p>{props.currentAccount}</p>
      
      { !verifying && <button className={classes.button} onClick={handleSign}> sign </button>}
      { verifying && <a href={'testproto://'+signature+'//'+props.currentAccount} target="_blank" rel="noreferrer"><button className={classes.button}> Verify </button></a> }
      {/* <p>{props.balance} ETH</p> */}
    </Card>
  );
};
export default Home;
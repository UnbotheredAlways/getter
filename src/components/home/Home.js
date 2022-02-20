import { useState } from "react";
import Card from "../card/Card";
import classes from "./Home.module.css";
import { ethers } from "ethers"

const Home = (props) => {
  const [signature, setSignature] = useState();
  const [error, setError] = useState();

  const detectProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      window.alert("No Ethereum browser detected! Check out MetaMask");
    }
    return provider;
  };

  

  async function handleSign(e)
  {

    // const provider = detectProvider();
    // console.log(provider)
    // if (provider) {
    //   if (provider !== window.ethereum) {
    //     console.error(
    //       "Not window.ethereum provider. Do you have multiple wallet installed ?"
    //     );
    //   }
      
    //   await provider.request({
    //     method: "eth_requestAccounts",
    //   });
    // }
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    var currentDate = new Date();

    const message = {signer: await signer.getAddress(), date: currentDate.getDate()}
    
    var TempSignature = await signer.signMessage(btoa(JSON.stringify(message)));
    setSignature(TempSignature);
    console.log(signature)
    const address = await signer.getAddress();
  }

  return (
    <Card className={classes.home}>
      <h1>You can now proceed on the desktop app.</h1>
      <p>{props.currentAccount}</p>
      
      <button onClick={handleSign}> sign </button>
      <a href={'testproto://'+props.currentAccount} target="_blank" rel="noreferrer">Verify</a>
      {/* <p>{props.balance} ETH</p> */}
    </Card>
  );
};
export default Home;
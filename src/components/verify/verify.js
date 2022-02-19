import { useState } from "react";
import Home from "../home/Home";
import Login from "../login/Login";
import Web3 from "web3";

const Verify = (props) => {
    const [isConnected, setIsConnected] = useState(false);
    const [currentAccount, setCurrentAccount] = useState(null);
    const [balance, setBalance] = useState(0);
    const [name, setName] = useState("")
  
    const onLogin = async (provider) => {
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
        console.log("Please connect to MetaMask!");
      } else if (accounts[0] !== currentAccount) {
        setCurrentAccount(accounts[0]);
        const accBalanceEth = web3.utils.fromWei(
          await web3.eth.getBalance(accounts[0]),
          "ether"
        );
  
        setBalance(Number(accBalanceEth).toFixed(6));
        setIsConnected(true);
      }
    };
  
    const onLogout = () => {
      setIsConnected(false);
    };

  return (
    <div>
      <header className="main-header">
        <h1>Account verification</h1>
        <nav className="nav">
          <ul>
            <li>
              <a href="/">{currentAccount}</a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        {!isConnected && <Login onLogin={onLogin} onLogout={onLogout} />}
        {isConnected && (
          <Home currentAccount={currentAccount} balance={balance} />
        )}
      </main>
    </div>
  );
};
export default Verify;
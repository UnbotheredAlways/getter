import { useWeb3React } from '@web3-react/core';
import React from 'react';
import { injected } from './wallet/connections';
const {app} = window.require('@electron/remote');
const electron = window.require('electron');
const {ipcRenderer} = electron;

export default function LoginPage() {
    const { active, account, library, activate, deactivate } = useWeb3React();

    if ((window).chrome.ipcRenderer) {
        (window).isElectron = true;
      }
      
    function openMetamask() {
        ipcRenderer.send('open-metamask-popup');
    }

    async function connect() {
        try {
            console.log(account)
            await activate(injected)
        } catch (ex) {
            console.log(ex)
        }
    }

    async function disconnect() {
        try {
            deactivate()
        } catch (ex) {
            console.log(ex)
        }
    }

    return (
        <div>
            <button onClick={connect}>Connect to metamask</button>
            {active ? <span>Connected with <b>{account}</b></span> : <span>Not connected</span>}
            <button onClick={disconnect}>Connect to metamask</button>
        </div>
        
    )
}
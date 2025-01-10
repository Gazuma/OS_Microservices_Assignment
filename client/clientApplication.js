const crypto = require('crypto');
const fs = require('fs');
const axios = require('axios');
const forge = require('node-forge');
const path = require('path');
const e = require('express');
require('dotenv').config();

// Load client private key and server public key
const clientKeys = forge.pki.rsa.generateKeyPair(2048);



let publicKeyServer = null;

/**
 * Sends encrypted data to the server.
 * The data includes name, email, and role.
 * The data is encrypted using the server's public key.
 * 
 * @async
 * @function sendData
 * @returns {Promise<void>} - A promise that resolves when the data is sent.
 * @throws Will log an error if the request fails.
 */
const sendData = async()=>{
  try{
    const data = {
        name : "Deep Raut",
        email : "deep123@email.com",
        role : "Admin"
    }
    let encryptedData = JSON.stringify(data);
    const serverKey = process.env.PUBLIC_SERVER;
    encryptedData = crypto.publicEncrypt(serverKey, Buffer.from(encryptedData)).toString('base64');
    const response = await axios.post('http://localhost:3000/users/',{"data":encryptedData});
  } catch(err){
      console.log(err);
  }
}

/**
 * Retrieves encrypted data from the server and decrypts it.
 * The data is decrypted using the client's private key.
 * 
 * @async
 * @function getData
 * @returns {Promise<Object>} - A promise that resolves with the decrypted data.
 * @throws Will log an error if the request fails.
 */
const getData= async()=>{
    const response = await axios.get('http://localhost:3000/users/');
    const encryptedData = response.data;
    const clientKey = process.env.PRIVATE_CLIENT;
    let decryptedData = "";
    for(i = 0; i < encryptedData.length; i++){
        decryptedData+=crypto.privateDecrypt(
            clientKey,
            Buffer.from(encryptedData[i], 'base64')
          ).toString();
    }
    console.log(response.data)
    console.log(JSON.parse(decryptedData));
    return(response);

}

getData()
sendData()


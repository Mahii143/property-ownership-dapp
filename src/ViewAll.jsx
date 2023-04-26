import React from 'react'
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import PropertyOwnershipContract from './contracts/PropertyOwnership.js';
import contractAddress from './contracts/contractAddress'; // Replace with your smart contract ABI



const ViewAll = (props) => {

    const properties = props.data ? props.data : [];

    const handleBuy = async (e) => {

        try {
            const assets = props.data ? props.data : [];
            console.log(assets);
            const web3 = new Web3(Web3.givenProvider || 'http://localhost:3000'); // Replace with your Ethereum node URL
            const contract = new web3.eth.Contract(PropertyOwnershipContract, contractAddress);
            const account = await web3.eth.getAccounts();
            const id = e.target.id;
            console.log(id);
            const rateWei = assets[id][3];
            await contract.methods.buyProperty(id).send({
                from: account[0],
                value: rateWei
            });

            alert('Property purchased successfully!');
        } catch (error) {
            alert('Error purchasing property: ' + error.message);
        }
    };

    return (
        <div>
            <h1>Property List</h1>
            <ul>
                {properties.map((property, index) => (
                    ((property.owner!=='0x0000000000000000000000000000000000000000')?
                    <li key={index}>
                        <strong>Property ID:</strong> {property.propertyID}<br />
                        <strong>Owner:</strong> {property.owner}<br />
                        <strong>Details:</strong> {property.details}<br />
                        <strong>Rate:</strong> {property.rate}
                        <button id={index} type='submit' onClick={handleBuy}>Buy</button>
                        {/* <button id={index} type='submit' onClick={handleBuy}>Update</button> */}
                        {/* <button id={index} type='submit' onClick={handleBuy}>Delete</button> */}
                    </li>:<span key={index}></span>)
                ))}
            </ul>
            <Link to="../">Go Back</Link>
        </div>
    )
}

export default ViewAll
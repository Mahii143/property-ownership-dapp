import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import PropertyOwnershipContract from './contracts/PropertyOwnership.js';
import contractAddress from './contracts/contractAddress'; // Replace with your smart contract ABI



const ViewAll = (props) => {
    const [web3, setWeb3] = useState(null);
    const [cnt, setCnt] = useState(null);

    const properties = props.data ? props.data : [];

    useEffect(() => {
        const w3 = new Web3(Web3.givenProvider || 'http://localhost:3000'); // Replace with your Ethereum node URL
        const contract = new w3.eth.Contract(PropertyOwnershipContract, contractAddress);
        setCnt(contract);
        setWeb3(w3);
    }, []);

    const handleDelete = async (e) => {
        const id = parseInt(e.target.parentElement.children[2].innerText);
        const account = await web3.eth.getAccounts();
        console.log(id,account[0]);
        try {
            await cnt.methods.removeProperty(id).send({from:account[0]});
        } catch(err) {
            alert('Error deleting the property: ' + err.message);
        }
    }

    const handleBuy = async (e) => {
        try {
            const assets = props.data ? props.data : [];
            console.log(assets);
            const account = await web3.eth.getAccounts();
            const id = parseInt(e.target.parentElement.children[0].value);
            console.log(id);
            const rateWei = assets[id][3];
            await cnt.methods.buyProperty(id).send({
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
                    ((property.owner !== '0x0000000000000000000000000000000000000000') ?
                        <li key={index}>
                            <input type="hidden" value={index} />
                            <strong>Property ID:</strong> <span>{property.propertyID}</span><br />
                            <strong>Owner:</strong> {property.owner}<br />
                            <strong>Details:</strong> {property.details}<br />
                            <strong>Rate:</strong> {property.rate}
                            <button type='submit' onClick={handleBuy}>Buy</button>
                            <Link to={'../edit/'+property.propertyID}><button type='submit'>Update</button></Link>
                            <button type='submit' onClick={handleDelete}>Delete</button>
                        </li> : <span key={index}></span>)
                ))}
            </ul>
            <Link to="../">Go Back</Link>
        </div>
    )
}

export default ViewAll
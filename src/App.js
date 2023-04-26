import './App.css';
import Web3 from 'web3';
import PropertyOwnershipContract from './contracts/PropertyOwnership'; // Replace with your smart contract ABI
import contractAddress from './contracts/contractAddress'; // Replace with your smart contract ABI
import PropertyForm from './PropertyForm';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import ViewAll from './ViewAll';
import Home from './Home';

function App() {
  // window.ethereum.request({ method: 'eth_requestAccounts' });
  const web3 = new Web3(Web3.givenProvider || 'http://localhost:3000');
  // const contractAddress = '0x4B76D817096f1E3F0573EaA96721Cb4bcE4EA25D'; 

  const contract = new web3.eth.Contract(PropertyOwnershipContract, contractAddress);

  const addProperty = async (_details, _rate) => {
    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods.addProperty(_details, _rate).send({ from: accounts[0] });
      console.log('Property added successfully!');
    } catch (error) {
      console.error('Failed to add property:', error);
    }
  };
  const updateProperty = async (_propertyID, _details, _rate) => {
    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods.updateProperty(_propertyID, _details, _rate).send({ from: accounts[0] });
      console.log('Property updated successfully!');
    } catch (error) {
      console.error('Failed to update property:', error);
    }
  };

  const [properties, setProperties] = useState([]);
  const viewAllProperties = async () => {
    try {
      const propertyList = await contract.methods.viewAllProperties().call();
      console.log('Property List:', propertyList);
      setProperties(propertyList);
      // Process propertyList as needed
    } catch (error) {
      console.error('Failed to fetch property list:', error);
    }
  };

  const { id } = useParams();
  // const [asset, setAsset] = useState([]);

  // const viewProperty = async (_id) => {
  //   const ppty = await contract.methods.viewProperty(_id).call();
  //   setAsset(ppty);
  // }
  // useEffect(() => {
    
  // }, [id, asset]);

  useEffect(() => {
    viewAllProperties();
  }, []);

  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add' element={<PropertyForm addProperty={addProperty} />} />
        <Route path='/edit/:id' element={<PropertyForm data={properties} updateProperty={updateProperty} />} />
        <Route path='/viewall' element={<ViewAll data={properties} />} />
      </Routes>
    </div>
  );
}

export default App;

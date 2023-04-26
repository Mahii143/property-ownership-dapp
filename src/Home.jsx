import React from 'react'
import { Link } from 'react-router-dom';


const Home = () => {
    return (
        <div>
            <ul>
                <li><Link to="add">Add New Property</Link></li>
                <li><Link to="viewall">View All available Property</Link></li>
            </ul>
        </div>
    )
}

export default Home
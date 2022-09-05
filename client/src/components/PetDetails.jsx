import "../App";
import { useParams } from "react-router";
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
function PetDetails(props) {
    const [pet, setPet] = useState({})
    const { petId } = useParams();
    const history = useHistory();
    useEffect(() => {
        axios.get('http://localhost:8000/api/pets/' + petId)
            .then(res => setPet(res.data))
            .catch(err => console.error(err));
    }, []);

    const [likes, setLikes] = useState(0);
    const incrementlikes = () => setLikes(likes + 1);
    
    const deletePet = (petId) => {
        axios.delete('http://localhost:8000/api/pets/'+ petId +'/delete').then(res => {
        console.log("deleted pet", res.data);
        })
            history.push("/");
    }

    if( pet === null){
        return "Loading..."
    }
    
    return (
        <>
        <Link to={"/"}> Back to home </Link> 
        <div className="center1">
            <h1> Pet Shelter</h1>
            <h3>Details about {pet.name}</h3>

            <h5>Pet Type: {pet.type}</h5>
            <h5>Description: {pet.desc}</h5>
            <h5>Skills: </h5>
                <p>{pet.skill1}</p>
                <p>{pet.skill2}</p>
                <p>{pet.skill3}</p>
            <br/>
            <br/>
            <button class="btn btn-danger" onClick={(e)=>{deletePet(pet._id)}}>Adopt  {pet.name} </button>&nbsp;&nbsp;&nbsp;&nbsp;
            <button class="btn btn-success" onClick={(e)=>{incrementlikes(pet._id)}}>Like  {pet.name} </button> 
            <h5>like(s): {likes}</h5>
        </div>
        </>
        
    )

}

export default PetDetails;
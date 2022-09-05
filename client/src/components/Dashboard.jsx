import "../App";
import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
function Dashboard(props) {
    const [petsList, setPetsList] = React.useState([]);
    const [isLoaded, setLoaded] = React.useState(false);
    const history = useHistory();
    const [changed, setChanged] = React.useState(false);


    React.useEffect(() => {
        axios.get("http://localhost:8000/api/pets").then((response) => {
            setPetsList(response.data.records);
            setLoaded(true);
        });
    }, [changed]);

    return (
        <div className="container">
            {!isLoaded ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <div className="App">
                        <h1> Pet Shelter </h1>
                        <Link to={"/new"}> Add a pet to the shalter </Link>
                        <h4> These pets are looking for a good home:</h4>

                        <table class="table">
                            <thead class="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {petsList.map((pet, index) => (
                            <tr key={pet._id}>
                                <td >
                                    {pet.name}
                                </td>
                                <td >
                                    {pet.type}
                                    
                                </td>
                                <td>
                                <Link to={"/" + pet._id + "/edit"}> Edit </Link> | &nbsp;
                                    <Link to={"/" + pet._id}> Details </Link>
                                    
                                </td>
                            </tr>
                        ))}
                            </tbody>
                        </table>



                    </div>
                </div>)}
        </div>

    );
}

export default Dashboard;
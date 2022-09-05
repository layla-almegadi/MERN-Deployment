import "../App";
import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
function NewPet(props) {
    const [isLoaded, setLoaded] = React.useState(false);
    const history = useHistory();
    const [errors, setErrors] = React.useState([]);

    const [data, setData] = React.useState({
        name: "",
        type:"",
        desc:"",
        skill1:"",
        skill2:"",
        skill3: "",
    });

    React.useEffect(() => {
        axios.get("http://localhost:8000/api/pets").then((response) => {
                setLoaded(true);
        });
    }, []);

    const handleOnChange = (event) => {
        event.preventDefault();
        setData({ ...data, [event.target.name]: event.target.value })
    }

    
    function handleCreatePet(e) {
        e.preventDefault();
        axios.post('http://localhost:8000/api/pets/new', { ...data })
            .then(res=>{
                console.log(res)
                history.push("/");
            })
            .catch((err) => {
                const data = err.response.data;
                const errorMessages = [];
                if ("errors" in data) {
                for (let field in data.errors) {
                    const validationError = data.errors[field];
                    errorMessages.push(validationError.message);
                }
                }
                setErrors(errorMessages);
            });
    }

    return (
        <div className="container">
            {!isLoaded ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <Link to={"/"}> Back to home </Link> 
                    <h1 className="App"> Pet Shelter</h1>
                    <h4>know a pet needing a home?</h4>
                    {errors.map((errorMessage, index) => (
                    <div style={{color: "red"}} key={index}>Error: {errorMessage}</div>
                    ))}
                    <form onSubmit={ handleCreatePet }>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Pet Name</label>
                            <div class="col-sm-10">
                                <input name="name" value={data.name} onChange={handleOnChange} type="text" class="form-control" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Pet Type</label>
                            <div class="col-sm-10">
                                <input name="type" value={data.type} onChange={handleOnChange} type="text" class="form-control" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Pet Description</label>
                            <div class="col-sm-10">
                                <input name="desc" value={data.desc} onChange={handleOnChange} type="text" class="form-control" />
                            </div>
                        </div>
                        <h3> Skills (Optional)</h3>
                        
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Skill 1</label>
                            <div class="col-sm-10">
                                <input name="skill1" value={data.skill1} onChange={handleOnChange} type="text" class="form-control" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Skill 2</label>
                            <div class="col-sm-10">
                                <input name="skill2" value={data.skill2} onChange={handleOnChange} type="text" class="form-control" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Skill 3</label>
                            <div class="col-sm-10">
                                <input name="skill3" value={data.skill3} onChange={handleOnChange} type="text" class="form-control" />
                            </div>
                        </div>
                        <Link class="btn btn-secondary" to={"/"}> Cancel </Link>  | &nbsp;
                        <input class="btn btn-primary" type="submit" value="Add Pet" />
                    </form>
                    <br/>
                    <hr/>
                </div>)}
        </div>

    );
}

export default NewPet;
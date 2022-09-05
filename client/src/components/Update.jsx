import "../App";
import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

function Update(props) {
    const [isLoaded, setLoaded] = React.useState(false);
    const [isLoading, setLoading] = React.useState(true);
    const history = useHistory();
    // const [name, setName] = React.useState("");
    const { petId } = useParams();
    const [errors, setErrors] = React.useState([]);

    const [name, setName] = React.useState("")
    const [type, setType] = React.useState("")
    const [desc, setDesc] = React.useState("")
    const [skill1, setSkill1] = React.useState("")
    const [skill2, setSkill2] = React.useState("")
    const [skill3, setSkill3] = React.useState("")

    const [data, setData] = React.useState({
        name: "",
        type:"",
        desc:"",
        skill1:"",
        skill2:"",
        skill3: "",
    });

    React.useEffect(() => {
        axios.get('http://localhost:8000/api/pets/' + petId)
            .then(res =>{


                setName(res.data.name);
                setType(res.data.type);
                setDesc(res.data.desc);
                setSkill1(res.data.skill1);
                setSkill2(res.data.skill2);
                setSkill3(res.data.skill3);


                setLoading(false);
                setLoaded(true);
        })
            .catch(err => console.error(err));
            setLoading(false);
            console.log("We have an error");
    }, []);

    const updatePet = e => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/pets/'+ petId +'/edit', {
            name,
            type,
            desc,
            skill1,
            skill2,
            skill3,
        })
            .then(res => {
                console.log(res)
                history.push("/");
            }
            )
            .catch((err) => {
                console.log(err);
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
            
            if (isLoading) {
                return <div>...Loading</div>;
            }
    }
    if (!isLoaded) {
        return (
            <div className="container">
                <h3>
                    We're sorry, but we could not find the Pet you are looking for.
                    Would you like to add this Pet to our database?
                </h3>
                <Link to={"/new"}>Add an Pet</Link>
            </div>
        );
    }
    return (
        <div className="container">
                <div>
                    
                    <h1 className="App"> Pet Shelter</h1>
                    <h4>Edit {data.name}</h4>
                    {errors.map((errorMessage, index) => (
                    <div style={{color: "red"}} key={index}>Error: {errorMessage}</div>
                    ))}
                    <form onSubmit={ updatePet }>
                    <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Pet Name</label>
                            <div class="col-sm-10">
                                <input name="name" value={name} onChange={(e)=>setName(e.target.value)} type="text" class="form-control" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Pet Type</label>
                            <div class="col-sm-10">
                                <input name="type" value={type} onChange={(e)=>setType(e.target.value)} type="text" class="form-control" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Pet Description</label>
                            <div class="col-sm-10">
                                <input name="desc" value={desc} onChange={(e)=>setDesc(e.target.value)} type="text" class="form-control" />
                            </div>
                        </div>
                        <h3> Skills (Optional)</h3>
                        
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Skill 1</label>
                            <div class="col-sm-10">
                                <input name="skill1" value={skill1} onChange={(e)=>setSkill1(e.target.value)} type="text" class="form-control" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Skill 2</label>
                            <div class="col-sm-10">
                                <input name="skill2" value={skill2} onChange={(e)=>setSkill2(e.target.value)} type="text" class="form-control" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Skill 3</label>
                            <div class="col-sm-10">
                                <input name="skill3" value={skill3} onChange={(e)=>setSkill3(e.target.value)} type="text" class="form-control" />
                            </div>
                        </div>
                        <Link class="btn btn-secondary" to={"/"}> Cancel </Link>  | &nbsp;
                        <input class="btn btn-primary" type="submit" value="Edit Pet" />
                    </form>
                    <br/>
                    <hr/>
                </div>
        </div>

    );
}

export default Update;
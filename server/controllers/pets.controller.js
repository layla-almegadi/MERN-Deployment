const Pet = require("../models/pets.model");
function getAllPets(req, res) {
  Pet.find().sort({type:1})
    .then((allPets) =>
      res.json({
        success: true,
        records: allPets,
      })
    )
    .catch((err) => res.json({ errorMsg: "Failed to fetch all Pets" }));
}


function createNewPet(req, res) {
  Pet.create(req.body)
    .then((newPet) => res.json(newPet))
    .catch((err) => res.status(400).json(err));
    
}

function findPet(req, res) {
  const { petId } = req.params;
  Pet.findOne({ _id: petId })
    .then((result) => res.json(result))
    .catch((err) =>
    res.sendStatus(404)
    );
}

  function updatePet(req, res) {
    const { petId } = req.params;
    Pet.findOneAndUpdate(
    { _id: petId},
    req.body,
    { new: true, runValidators: true }
    
)
    .then(pet=> res.json(pet))
    .catch((err) => res.status(400).json(err));
}

function deletePet(req, res) {
  const { petId } = req.params;
  Pet.deleteOne({ _id: petId })
    .then((result) => res.json(result))
    .catch((err) =>
      res.json({ error: true, message: "Failed to delete Pet" })
    );
}


module.exports = {
  getAllPets,
  createNewPet,
  findPet,
  updatePet,
  deletePet,
};

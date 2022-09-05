const PetController = require("../controllers/pets.controller")
function registerPetRoutes(app)
{
    app.get("/api/pets", PetController.getAllPets)
    app.post("/api/pets/new", PetController.createNewPet)
    app.get("/api/pets/:petId", PetController.findPet)
    app.put("/api/pets/:petId/edit", PetController.updatePet)
    app.delete("/api/pets/:petId/delete", PetController.deletePet)
}

module.exports = registerPetRoutes
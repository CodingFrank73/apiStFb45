const { daoPersonen } = require('../db-access')
const { createPerson } = require('../domain/person');


const getPersons = async (req, res) => {

    try {
        const result = await daoPersonen.findAll();
        res.status(200).json(result);

    } catch (error) {
        console.log(error)
        res.status(500).json({ err: { message: error ? error.message : "Unknown error while loading your profile." } })
    }
}

const getPersonByID = async (req, res) => {

    try {
        const personId = req.query.id
        console.log(personId)
        const result = await daoPersonen.findById(personId);

        if (!result) {
            throw new Error("Not profile exists...")
        }

        //const person = createPerson(result);

        res.status(200).json(result);

    } catch (error) {
        console.log(error)
        res.status(500).json({ err: { message: error ? error.message : "Unknown error while loading your profile." } })
    }
}

const updatePerson = async (req, res) => {
    const { userId, dateOfBirth, ...updatedInfo } = req.body

    updatedInfo.dateOfBirth = new Date(dateOfBirth)

    try {
        const insertResult = await daoPersonen.update(userId, updatedInfo);

        const wasSuccessful = insertResult.acknowledged === true && insertResult.modifiedCount
        if (!wasSuccessful) {
            throw new Error("Editing profile failed, please try again.")
        }

        res.status(200).json({})  //<- Prüfen was hier zurück zugeben ist....

    } catch (error) {
        res.status(500).json({ err: error.message || "Error Editing Profile Settings." })
    }
}

const insertPerson = async (req, res) => {
    //const { dogName, location, postalCode, password, email, gender, size, dateOfBirth } = req.body

    // console.log('DATE OF BIRTH:', dateOfBirth);

    try {
        /* const foundUser = await daoPersonen.findByEmail(email)

        if (foundUser) {
            const errorMessage = "Account with this email already exists"
            throw new Error(errorMessage)
        } */
        const personAttributes = req.body

        const person = await createPerson(personAttributes);

        const insertResult = await daoPersonen.insert(person);

        const isRegSuccessfully =
            insertResult.acknowledged === true &&
            insertResult.insertedId;

        if (!isRegSuccessfully) {
            throw new Error("Registration failed")
        }

        res.status(201).json({})

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message || "Unknown error while registering new user." })
    }

}

module.exports = {
    getPersons,
    getPersonByID,
    updatePerson,
    insertPerson
}
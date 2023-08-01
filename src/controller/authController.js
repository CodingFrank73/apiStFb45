


const getToken = async (req, res) => {

    try {
        const result = await daoPersonen.findAll();
        res.status(200).json(result);

    } catch (error) {
        console.log(error)
        res.status(500).json({ err: { message: error ? error.message : "Unknown error while loading your profile." } })
    }
}

module.exports = {
    getToken
}
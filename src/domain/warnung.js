function createWarning() 
{
    try {
        return 
        {
            code,
            message,
            schluesselAId,
            schluesselBId,
            von,
            bis
        }

    } catch (error) {
        return error
    }

    
}

module.exports = {
    createWarning
}
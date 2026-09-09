const Node = require('../models/Node') 

const eliminarNodosHijos = async (id) => {
    try {
        const childrenNodes = await Node.find({parentId: id})
        if (childrenNodes.length > 0){

            for (const child of childrenNodes) {
                await eliminarNodos(child._id)
            }
        }

        const deletedNode = await Node.findByIdAndDelete(
            id
        )

    }
    catch (err){
        throw err
    }
}

module.exports = eliminarNodosHijos
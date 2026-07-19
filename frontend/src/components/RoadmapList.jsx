import RoadmapItem from "./RoadmapItem"

// Funcion para poder renderizar la lista completaa de items
const RoadmapList = ({ roadmapItems }) => {
    return (
    roadmapItems.map( (item) => {
        return <RoadmapItem key={item._id} item={item}/> // Ponemos tambien el key en props para uso de react a la hora de renderizar item por item
    })
    )
}

export default RoadmapList
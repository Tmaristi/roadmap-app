
// Funcion para renderizar un solo item
const RoadmapItem = ({ item }) => {
    return(
        <div>
            <p>{item.title}</p>
            <p>{item.description}</p>
            <p>{item.status}</p>
        </div>
    )
}

export default RoadmapItem
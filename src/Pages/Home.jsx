import mapa from '../assets/img/Mapa_procesos_tr.png'

  

function Home() {
    const images = [
        { id: 1, title: "Mapa de Procesos ", src:"../assets/img/Mapa_procesos_tr.png" }]
  return (
    <div className="font-meditative text-3xl mision-container flex flex-col items-center space-y-2 pt-0 pl-56">
    {/* Main Content with Images */}
    <div className="flex-1 p-4 mr-72 ml-14">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
        {images.map((image) => (
          <div 
            key={image.id} 
            className="bg-[#e7e8da]  rounded-lg shadow-md p-3 hover:shadow-lg transition-shadow"
          >
            <h3 className="mt-2 text-center text-[#6f7b2c] font-medium">
          {image.title}
        </h3>
            <img
              src={mapa}
              alt={image.title}
              className="w-full  object-cover rounded-lg"
            />
            
          </div>
        ))}
      </div>
    </div>
    {/* Login Aside */}
    
  </div>

  )
}

export default Home
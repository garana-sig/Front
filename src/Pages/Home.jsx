import mapa from '../assets/img/MapaProcesos.jpg'

  

function Home() {
    const images = [
        { id: 1, title: "Mapa de Procesos ", src:"../assets/img/MapaProcesos.jpg" }]
  return (
    <div className="font-meditative text-3xl mision-container flex flex-col items-center space-y-2 pt-0 pl-56">
    {/* Main Content with Images */}
    <div className="flex-1 p-4 mr-60 ml-14">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
        {images.map((image) => (
          <div 
            key={image.id} 
            className="bg-[#e7e8da]  rounded-lg shadow-md p-3 hover:shadow-lg transition-shadow"
          >
           
            <img
              src={mapa}
              alt={image.title}
              className="w-full h- object-cover rounded-lg"
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
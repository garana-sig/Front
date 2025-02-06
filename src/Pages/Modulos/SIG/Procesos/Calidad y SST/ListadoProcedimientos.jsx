import DocumentTable from "../../../../../Components/DocumentTable"


function ListadoProcedimientos() {
  const documents = [
    {
      codigo: 'RE-GS-01',
      vigencia: '2025-01-25',
      version: '01',
      nombre: ' PERFIL EMPLEADOS',
      procedencia: 'GESTIÓN DE DE CALIDAD Y SST',
   
    }
  ]
  return (
    <div >
        <DocumentTable titulo="Procedimientos" proceso="Gestión Calidad y SST" />
    </div>
  )
}

export default ListadoProcedimientos
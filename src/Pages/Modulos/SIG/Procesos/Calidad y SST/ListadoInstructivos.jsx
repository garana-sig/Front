import DocumentTable from "../../../../../Components/DocumentTable"

function ListadoInstructivos() {
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
        <DocumentTable titulo="Instructivos" proceso="Gestión Calidad y SST" />
    </div>
  )
}

export default ListadoInstructivos
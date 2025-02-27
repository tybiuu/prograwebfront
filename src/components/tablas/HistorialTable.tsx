export interface HistorialItem {
  id: number;
  user_id: number;
  action: string;
  firstaccess: boolean
  access_time: string;
  access_time_hour: string;
  User: User;
}

export interface User {
  name: string
  email: string
}
interface HistorialTableProps {
  data: HistorialItem[]
}

const HistorialTable = (props: HistorialTableProps) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover rounded-table">
        <thead className="custom-table-header">
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((item: HistorialItem) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.User.name}</td>
              <td>{item.User.email}</td>
              <td>{item.access_time}</td>
              <td>{item.access_time_hour}</td>
              <td>
                {item.action === "Registro" ? (
                  <p className="m-0 fw-bold" style={{ color: '#2d8cff' }}>Registro 📤</p>
                ) : item.action === "Borrar" ? (
                  <p className="text-danger m-0 fw-bold">Borrar ❌</p>
                ) : item.action === "Agregar" ? (
                  <p className="text-success m-0 fw-bold">Agregar ✚</p>
                ): item.action === "Login" ? (
                  <p className="m-0 fw-bold" style={{ color: '#8d2dff ' }}>Login 👤 </p>
                ) : (
                  <p className="m-0 fw-bold" style={{ color: '#ff822d' }}>Editar ✏️</p>
                ) 
                
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistorialTable;

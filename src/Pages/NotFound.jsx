
function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600">404 - Página no encontrada</h1>
      <p className="text-lg text-gray-700 mt-4">
        Lo sentimos, la página que buscas no existe.
      </p>
      <a
        href="/"
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Volver al inicio
      </a>
    </div>
  );
}

export default NotFound;

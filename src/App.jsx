import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./Context/AuthContext";
import { Provider } from 'react-redux';
import { store } from "./store/store";




function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <AuthProvider>
      
      <AppRoutes/>
      
      </AuthProvider>
      </BrowserRouter>
        </Provider>
  );
}
export default App;

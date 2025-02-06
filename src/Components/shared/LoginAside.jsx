import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../../Context/AuthContext";

function LoginAside() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Simular credenciales correctas
        if (formData.username === 'admin' && formData.password === 'admin') {
            const userData = {
                id: 1,
                name: formData.username,
                role: 'admin'
            };
            
            login(userData);
            navigate('/dashboard');
        } else {
            setError('Usuario o contraseña incorrectos');
        }
    };

    return (
        <aside className="w-45 mt-14 p-4 top-3 bg-gradient-to-b from-[#6dbd96]  to-[#c8d4bc] shadow-md min-h-screen fixed right-0">
            <h2 className="text-l font-bold text-[white] mb-2">Inicio de Sesión</h2>
            
            {error && (
                <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                    <label className="block text-sm font-medium text-[white]">
                        Usuario
                    </label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-[white]">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                        required
                    />
                </div>
                
                <button 
                    type="submit"
                    className="w-full bg-[#6dbd96] text-white rounded-md py-2 hover:bg-[#6f7b2c]"
                >
                    Iniciar Sesión
                </button>
                
            </form>
        </aside>
    );
}

export default LoginAside;
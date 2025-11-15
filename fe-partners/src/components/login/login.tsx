/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material'; // Importe o serviço de autenticação
import { useNavigate } from 'react-router-dom'; // Importe o hook de navegação
import './login.css';
import { loginService } from '../../services/authService';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState({ username: false, password: false });
    const [loginError, setLoginError] = useState(''); // Para exibir erros de login
    const navigate = useNavigate(); // Hook de navegação

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        if (username === '' || password === '') {
            setError({
                username: username === '',
                password: password === ''
            });
            return;
        }
        try {
            const token = await loginService(username, password); // Chama o service
            console.log("Login bem-sucedido! Token:", token);
            navigate('/main');
        } catch (loginError) {
            setLoginError('Usuário ou senha inválidos.');
        }
    };

    return (
        <div className="login-body">
            <Container maxWidth="sm">
                <form onSubmit={handleLogin}>
                    <Box className="login-container">
                        <img src="/assets/ysplogo.png" alt="Logo" className="login-logo" />
                        <Box className="login-box">
                            <Typography variant="h4" component="h1" gutterBottom className="login-title">
                                Fazer Login
                            </Typography>
                            {loginError && (
                                <Typography color="error" variant="body2" align="center">
                                    {loginError}
                                </Typography>
                            )}
                            <TextField
                                label="Nome do usuário"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    setError({ ...error, username: false });
                                }}
                                error={error.username}
                                helperText={error.username ? 'Nome do usuário é obrigatório' : ''}
                                InputProps={{ className: "input-field" }}
                                InputLabelProps={{ className: "input-label" }}
                            />
                            <TextField
                                label="Senha"
                                type={showPassword ? "text" : "password"}
                                variant="outlined"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError({ ...error, password: false });
                                }}
                                error={error.password}
                                helperText={error.password ? 'Senha é obrigatória' : ''}
                                InputProps={{
                                    className: "input-field",
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                margin="normal"
                                fullWidth
                                InputLabelProps={{ className: "input-label" }}
                            />
                            <Box className="remember-me">
                                <input type="checkbox" id="rememberMe" className="checkbox" />
                                <label htmlFor="rememberMe" className="checkbox-label">Continuar conectado?</label>
                            </Box>
                            <Box className="login-button-container">
                                <Box height={30} />
                                <Button type="submit" variant="contained" className="login-button" fullWidth>
                                    Entrar
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </form>
            </Container>
        </div>
    );
};

export default Login;

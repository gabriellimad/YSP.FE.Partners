/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { City, PartnerRequest, UFs } from '../../types/types';
import { Autocomplete } from '@mui/material';

interface PartnersCreateEditProps {
  cities: City[];
  request: PartnerRequest;
  onUfchange: (UFId: number) => void;
  setRequest: React.Dispatch<React.SetStateAction<PartnerRequest>>;
}

const PartnersCreateEdit: React.FC<PartnersCreateEditProps> = ({ cities, request, onUfchange, setRequest }) => {
  const [error, setError] = useState<string | null>(null);

  // Função para atualizar os filtros
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRequest((prevRequest) => ({
      ...prevRequest,
      [name]: value,
    }));
  };

  // Função para lidar com a mudança de data
  const handleDateChange = (field: string, newValue: any) => {
    setRequest((prevRequest) => ({
      ...prevRequest,
      [field]: newValue,
    }));
  };

  // Função de validação
  const validateForm = () => {
    if (!request.nome || !request.estado || !request.data_nascimento) {
      setError('Nome, Estado e Data de Nascimento são campos obrigatórios.');
      return false;
    }
    setError(null);  // Limpa qualquer erro anterior
    return true;
  };

  // Função de submissão do formulário
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      // Lógica de envio do formulário
      console.log('Formulário válido:', request);
    }
  };

  const lastUFId = useRef<number | null>(null);

  useEffect(() => {
    const uf = UFs.find((uf) => uf.code === request.estado);
    if (uf && uf.UFId !== lastUFId.current) {
      lastUFId.current = uf.UFId;
      onUfchange(uf.UFId);
    }
  }, [request.estado, onUfchange]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: '15px', width: '90%', justifyContent: 'flex-start' }}
        noValidate
        autoComplete="off"
      >
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <TextField
          name="nome"
          label="Nome"
          variant="outlined"
          size="small"
          value={request.nome}
          onChange={handleFilterChange}
          sx={{ width: '15%' }}
        />

        <DateField
          name="data_nascimento"
          label="Data de Nascimento"
          value={request.data_nascimento}
          onChange={(newValue) => handleDateChange('data_nascimento', newValue)}
          format="DD/MM/YYYY"
          sx={{
            width: '15%',
            height: '40px', 
            '& .MuiInputBase-root': {
              minHeight: '40px',
              padding: '4px 8px',
              fontSize: '1rem',
            },
            '& .MuiInputLabel-root': {
              top: '-6px', // Ajusta a posição vertical da label
              fontSize: '1rem', // Opcional: reduz o tamanho da label para melhor ajuste
            },
            '& .MuiInputLabel-shrink': {
              top: '0px', // Mantém a label alinhada quando flutuando
            },
          }}
        />

        <TextField
          name="numero_contato"
          label="Contato"
          variant="outlined"
          size="small"
          value={request.numero_contato}
          onChange={handleFilterChange}
          sx={{ width: '15%' }}
        />

        <TextField
          name="email"
          label="Email"
          variant="outlined"
          size="small"
          value={request.email}
          onChange={handleFilterChange}
          sx={{ width: '15%' }}
        />

        <Autocomplete
          value={UFs.find((uf) => uf.code === request.estado) || null}
          onChange={(_, value) => {
            handleFilterChange({
              target: { name: 'estado', value: value?.code || '' },
            } as React.ChangeEvent<HTMLInputElement>);
          }}
          options={UFs}
          getOptionLabel={(option) => option.name || ""}
          isOptionEqualToValue={(option, value) => option.code === value?.code}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Estado"
              variant="outlined"
              size="small"
            />
          )}
          sx={{ width: '15%' }}
        />

        <Autocomplete
          value={cities.find((city) => city.nome === request.cidade) || null}
          onChange={(_, value) => {
            handleFilterChange({
              target: { name: 'cidade', value: value?.nome || '' },
            } as React.ChangeEvent<HTMLInputElement>);
          }}
          options={cities}
          getOptionLabel={(option) => option.nome || ""}
          isOptionEqualToValue={(option, value) => option.nome === value?.nome}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Cidade"
              variant="outlined"
              size="small"
            />
          )}
          sx={{ width: '15%' }}
        />

        <TextField
          name="nome_ong_pertece"
          label="ONG"
          variant="outlined"
          size="small"
          value={request.nome_ong_pertece}
          onChange={handleFilterChange}
          sx={{ width: '15%' }}
        />

        <TextField
          name="tipo"
          label="Tipo"
          variant="outlined"
          size="small"
          value={request.tipo}
          onChange={handleFilterChange}
          sx={{ width: '15%' }}
        />

        <DateField
          name="data_associacao"
          label="Data de Associação"
          value={request.data_associacao}
          onChange={(newValue) => handleDateChange('data_associacao', newValue)}
          format="DD/MM/YYYY"
          sx={{
            width: '15%',
            height: '40px', 
            '& .MuiInputBase-root': {
              minHeight: '40px',
              padding: '4px 8px',
              fontSize: '1rem',
            },
            '& .MuiInputLabel-root': {
              top: '-6px', // Ajusta a posição vertical da label
              fontSize: '1rem', // Opcional: reduz o tamanho da label para melhor ajuste
            },
            '& .MuiInputLabel-shrink': {
              top: '0px', // Mantém a label alinhada quando flutuando
            },
          }}
        />

        <TextField
          name="profissao_ocupacao"
          label="Profissão/Ocupação"
          variant="outlined"
          size="small"
          value={request.profissao_ocupacao}
          onChange={handleFilterChange}
          sx={{ width: '15%' }}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default PartnersCreateEdit;

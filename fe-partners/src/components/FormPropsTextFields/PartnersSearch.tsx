/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { Dayjs } from 'dayjs';
import { City, PartnerFilter, UFs } from '../../types/types';
import { Autocomplete } from '@mui/material';

interface PartnersSearchProps {
  onFiltersChange: (filters: PartnerFilter) => void;
  filters: PartnerFilter;
  cities: City[];
  onUfchange: (UFId: number) => void;
  setFilters: React.Dispatch<React.SetStateAction<PartnerFilter>>;
}

const PartnersSearch: React.FC<PartnersSearchProps> = ({ cities ,filters, onUfchange ,setFilters,onFiltersChange }) => {
  const [error, setError] = useState<string | null>(null);

  // Função para atualizar o valor dos filtros
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFilters((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Função para lidar com alterações nas datas
  const handleDateChange = (name: string, value: Dayjs | null) => {
    setFilters((prev: any) => ({
      ...prev,
      [name]: value, // Agora trata null corretamente
    }));
  };

  useEffect(() => {
    // Verificando se ao menos um filtro foi preenchido
    const filledFilters = Object.values(filters).filter((value) => value && value.toString() !== '');
    const hasAtleastOneFilter = filledFilters.length > 0;

    // Setando a mensagem de erro
    if (!hasAtleastOneFilter) {
      setError('Pelo menos um filtro deve ser preenchido.');
    } else {
      setError(null);
    }

    // Enviar os filtros atualizados para o componente pai
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const lastUFId = useRef<number | null>(null);

  useEffect(() => {
    const uf = UFs.find((uf) => uf.code === filters.estado);
    if (uf && uf.UFId !== lastUFId.current) {
      lastUFId.current = uf.UFId;
      onUfchange(uf.UFId);
    }
  }, [filters.estado, onUfchange]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Box
        component="form"
        sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: '15px', width: '90%', justifyContent: 'center' }}
        noValidate
        autoComplete="off"
      >
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <TextField
          name="nome"
          label="Nome"
          variant="outlined"
          size="small"
          value={filters.nome}
          onChange={handleFilterChange}
          sx={{ width: '15%' }}
        />

        <DateField
          name="data_nascimento_inicio"
          label="Data de Nascimento Início"
          value={filters.data_nascimento_inicio}
          onChange={(newValue) => handleDateChange('data_nascimento_inicio', newValue)}
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

        <DateField
          name="data_nascimento_fim"
          label="Data de Nascimento Fim"
          value={filters.data_nascimento_fim}
          onChange={(newValue) => handleDateChange('data_nascimento_fim', newValue)}
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
          value={filters.numero_contato}
          onChange={handleFilterChange}
          sx={{ width: '15%' }}
        />

        <TextField
          name="email"
          label="Email"
          variant="outlined"
          size="small"
          value={filters.email}
          onChange={handleFilterChange}
          sx={{ width: '15%' }}
        />

        <Autocomplete
          value={UFs.find((uf) => uf.code === filters.estado) || null}
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
          value={cities.find((city) => city.nome === filters.cidade) || null}
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
          disabled={!filters.estado} // Desabilita o campo cidade caso o estado não esteja preenchido
        />

        <TextField
          name="nome_ong_pertece"
          label="ONG"
          variant="outlined"
          size="small"
          value={filters.nome_ong_pertece}
          onChange={handleFilterChange}
          sx={{ width: '15%' }}
        />

        <TextField
          name="tipo"
          label="Tipo"
          variant="outlined"
          size="small"
          value={filters.tipo}
          onChange={handleFilterChange}
          sx={{ width: '15%' }}
        />

        <DateField
          name="data_associacao_inicio"
          label="Data de Associação Início"
          value={filters.data_associacao_inicio}
          onChange={(newValue) => handleDateChange('data_associacao_inicio', newValue)}
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

        <DateField
          name="data_associacao_fim"
          label="Data de Associação Fim"
          value={filters.data_associacao_fim}
          onChange={(newValue) => handleDateChange('data_associacao_fim', newValue)}
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
          value={filters.profissao_ocupacao}
          onChange={handleFilterChange}
          sx={{ width: '15%' }}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default PartnersSearch;

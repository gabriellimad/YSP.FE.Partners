import React from 'react';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import RestoreIcon from '@mui/icons-material/Restore';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import S from './header.module.css';

interface HeaderProps {
  onSearch: () => Promise<void>;
  onClear: () => Promise<void>;
  onReset: () => Promise<void>;
  onClearRequest: () => Promise<void>;
  onEdit: () => Promise<void>;
  onCreate: () => Promise<void>;
  onExport: () => Promise<void>;
  onImport: () => Promise<void>;
  onSave: () => void;
  onCancel: () => void;
  action: 'consultar' | 'criar' | 'editar'; // Para verificar qual ação estamos
}

const Header: React.FC<HeaderProps> = ({ onSearch, onClear, onEdit, onCreate, onExport, onImport,onSave, onCancel, onClearRequest, onReset, action }) => {
  return (
    <header className={`${S.headerContainer} header-container`}>
      <h1 className={S.titleYsp}>YSP - Associados</h1>
      <nav className={S.navBar}>
        {action === 'consultar' ? (
          <>

            <Button
              variant="contained"
              startIcon={<UploadFileIcon />}
              sx={{
              color: 'black',
              backgroundColor: '#C9B8B8',
              fontWeight: 'bold',
              '&:hover': {
              backgroundColor: '#AFA8A8', // Tom mais escuro de cinza
              },
              }}
              onClick={onImport}
            >
              Importar
            </Button>

            <Button
              variant="contained"
              startIcon={<SaveIcon />} // Ícone de disquete é popular para exportar planilhas
              sx={{
              color: 'black',
              backgroundColor: '#C9B8B8',
              fontWeight: 'bold',
              '&:hover': {
              backgroundColor: '#AFA8A8', // Tom mais escuro de cinza
              },
              }}
              onClick={onExport}
            >
              Exportar
            </Button>

            <Button
              variant="contained"
              startIcon={<AddCircleIcon />}
              sx={{
                color: 'black',
                backgroundColor: '#05FF00',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#04D700', // Tom mais escuro de verde
                },
              }}
              onClick={onCreate}
            >
              Criar
            </Button>

            <Button
              variant="contained"
              startIcon={<EditIcon />}
              sx={{
                color: 'black',
                backgroundColor: '#FFD700',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#FFCC00', // Tom mais escuro de amarelo
                },
              }}
              onClick={onEdit}
            >
              Editar
            </Button>

            <Button
              variant="contained"
              startIcon={<ClearIcon />}
              sx={{
                color: 'black',
                backgroundColor: '#C9B8B8',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#AFA8A8', // Tom mais escuro de cinza
                },
              }}
              onClick={onClear}
            >
              Limpar
            </Button>

            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              sx={{
                color: 'black',
                backgroundColor: '#FFA500',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#FF8C00', // Tom mais escuro de laranja
                },
              }}
              onClick={onSearch}
            >
              Pesquisar
            </Button>
          </>
        ) : (
          <>
            {action === 'criar' || action === 'editar' ? (
              <>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  sx={{
                    color: 'black',
                    backgroundColor: '#05FF00',
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: '#04D700', // Tom mais escuro de verde
                    },
                  }}
                  onClick={onSave}
                >
                  Salvar
                </Button>

                {action === 'editar' && (
                  <Button
                    variant="contained"
                    startIcon={<RestoreIcon />}
                    sx={{
                      color: 'black',
                      backgroundColor: '#00B0FF',
                      fontWeight: 'bold',
                      '&:hover': {
                        backgroundColor: '#0099CC', // Tom mais escuro de azul
                      },
                    }}
                    onClick={onReset}
                  >
                    Resetar
                  </Button>
                )}

                <Button
                  variant="contained"
                  startIcon={<ClearIcon />}
                  sx={{
                    color: 'black',
                    backgroundColor: '#C9B8B8',
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: '#AFA8A8', // Tom mais escuro de cinza
                    },
                  }}
                  onClick={onClearRequest}
                >
                  Limpar
                </Button>

                <Button
                  variant="contained"
                  startIcon={<CancelIcon />}
                  sx={{
                    color: 'black',
                    backgroundColor: '#FF4C4C',
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: '#FF3333', // Tom mais escuro de vermelho
                    },
                  }}
                  onClick={onCancel}
                >
                  Cancelar
                </Button>

              </>
            ) : null}
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import "./table.css";
import { formatCidadeEstado, formatIdadeDataNascimento, Partner } from "../../types/types";

interface DataGridDemoProps {
  data: Partner[];
  onPageChange: (page: number, limit: number) => Promise<void>; // Agora retorna Promise para aguardar os dados
  rowCount: number;
  setSelectedRow: React.Dispatch<React.SetStateAction<Partner | null>>;
}

const columns: GridColDef[] = [
  { field: "nome", headerName: "Nome", flex: 1, minWidth: 100, editable: false },
  { field: "idade_data_nascimento", headerName: "Idade/Nascimento", type: "number", flex: 1, minWidth: 55, editable: false },
  { field: "numero_contato", headerName: "Contato", flex: 0.8, minWidth: 110, editable: false },
  { field: "email", headerName: "Email", flex: 1.2, minWidth: 180, editable: false },
  { field: "cidade_estado", headerName: "Cidade/UF", flex: 1, minWidth: 150, editable: false },
  { field: "nome_ong_pertece", headerName: "ONG", flex: 0.8, minWidth: 100, editable: false },
  { field: "tipo", headerName: "Tipo", flex: 0.7, minWidth: 100, editable: false },
  { field: "data_associacao", headerName: "Data de Associação", flex: 1, minWidth: 120, editable: false },
  { field: "profissao_ocupacao", headerName: "Profissão/Ocupação", flex: 1.2, minWidth: 140, editable: false },
  { field: "origem", headerName: "Origem", flex: 0.7, minWidth: 100, editable: false },
];

const DataGridDemo: React.FC<DataGridDemoProps> = ({ data, onPageChange, rowCount, setSelectedRow }) => {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const [selectedRow, setLocalSelectedRow] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const formattedData = data.map((partner) => ({
    ...partner,
    idade_data_nascimento: formatIdadeDataNascimento(partner),
    data_associacao: new Date(partner.data_associacao).toLocaleDateString("pt-BR"),
    cidade_estado: formatCidadeEstado(partner),
  }));

  useEffect(() => {
    const fetchData = async () => {
      if (isLoading) return; // Evita chamadas concorrentes
      setIsLoading(true);
      try {
        await onPageChange(paginationModel.page + 1, paginationModel.pageSize);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [paginationModel]);

  const handlePaginationChange = (newPagination: GridPaginationModel) => {
    if (!isLoading) {
      setPaginationModel(newPagination);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectionChange = (newSelection: any) => {
    const selectedId = newSelection.length > 0 ? newSelection[0] : null;
    setLocalSelectedRow(selectedId);
  
    const selectedPartner = selectedId ? data.find((partner) => partner.id === selectedId) || null : null;
    setSelectedRow(selectedPartner);
  };

  return (
    <Box sx={{ height: "auto", width: "90%", maxWidth: "100%", margin: "0 auto", paddingBottom: "0.5rem", paddingTop: "1rem" }}>
      <h1 className="tableTitle">Associados</h1>
      <DataGrid
        rows={formattedData}
        columns={columns}
        getRowId={(row) => row.id}
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationChange}
        pageSizeOptions={[5, 10, 20]}
        paginationMode="server"
        rowCount={rowCount}
        loading={isLoading} // Adicionado para indicar carregamento
        checkboxSelection
        onRowSelectionModelChange={handleSelectionChange}
        rowSelectionModel={selectedRow ? [selectedRow] : []}
        sx={{ boxShadow: 2 }}
      />
    </Box>
  );
};

export default DataGridDemo;

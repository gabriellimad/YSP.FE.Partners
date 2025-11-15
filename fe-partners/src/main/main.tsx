import React, { useState, useEffect } from "react";
import S from "./main.module.css";
import PartnersSearch from "../components/FormPropsTextFields/PartnersSearch";
import Header from "../components/header/header";
import DataGridDemo from "../components/table/table";
import { Partner, PartnerFilter, City, PartnerRequest } from "../types/types";
import dayjs from "dayjs";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import PartnerCreateEdit from "../components/FormPropsTextFields/PartnerCreateEdit";
import { LoadingProvider, useLoading } from "../components/helpers/LoadingContext";
import { usePartnerService } from "../services/partnersService";

const MainContent: React.FC = () => {
  const { showLoading, hideLoading } = useLoading(); // ✅ contexto correto
  const { createPartner, getCities, getPartnersByParams, updatePartner, exportPartners } = usePartnerService();

  const defaultFilters: PartnerFilter = {
    id: 0,
    numero_contato: "",
    nome: "",
    email: "",
    data_nascimento_inicio: null,
    data_nascimento_fim: dayjs(),
    nome_ong_pertece: "",
    data_associacao_inicio: null,
    data_associacao_fim: dayjs(),
    cidade: "",
    estado: "",
    profissao_ocupacao: "",
    tipo: "",
    origem: "",
  };

  const defaultRequest: PartnerRequest = {
    id: 0,
    numero_contato: "",
    nome: "",
    email: "",
    data_nascimento: dayjs(),
    nome_ong_pertece: "",
    data_associacao: dayjs(),
    cidade: "",
    estado: "",
    profissao_ocupacao: "",
    tipo: "",
    origem: "",
  };

  const [filters, setFilters] = useState<PartnerFilter>(defaultFilters);
  const [request, setRequest] = useState<PartnerRequest>(defaultRequest);
  const [selectedRow, setSelectedRow] = useState<Partner | null>(null);
  const [data, setData] = useState<Partner[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [rowCount, setRowCount] = useState(0);
  const [cities, setCities] = useState<City[]>([]);
  const [action, setAction] = useState<"consultar" | "criar" | "editar">("consultar");
  const [openDialog, setOpenDialog] = useState(false);

  const handleSearch = async () => {
    try {
      showLoading();
      const results = await getPartnersByParams({ partnerFilter: filters, page, limit });
      setData(results.partners);
      setRowCount(results.row_count);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      hideLoading();
    }
  };

  const handleCreate = async () => {
    setSelectedRow(null);
    setRequest(defaultRequest);
    setAction("criar");
  };

  const handleExport = async () => {
    try {
      showLoading();
      await exportPartners({ partnerFilter: filters, page, limit });
    } finally {
      hideLoading();
    }
  };

  const handleImport = async () => {
    try {
      showLoading();
      await exportPartners({ partnerFilter: filters, page, limit });
    } finally {
      hideLoading();
    }
  };

  const handleEdit = async () => {
    if (!selectedRow) {
      setOpenDialog(true);
      return;
    }
    setAction("editar");
    await handleResetRequest();
  };

  const handleSave = async () => {
    try {
      showLoading();
      if (action === "criar") {
        await createPartner(request);
      } else if (action === "editar" && request.id) {
        await updatePartner(request.id, request);
      }
      setAction("consultar");
    } catch (error) {
      console.error(error);
    } finally {
      hideLoading();
    }
  };

  const handleCancel = () => {
    setSelectedRow(null);
    setRequest(defaultRequest);
    setAction("consultar");
  };

  const handlePageChange = async (newPage: number, newLimit: number) => {
    setPage(newPage);
    setLimit(newLimit);
  };

  const handleClear = async () => {
    setFilters(defaultFilters);
    setData([]);
    setRowCount(0);
    setPage(1);
  };

  const handleClearRequest = async () => {
    setRequest(action === "criar" ? defaultRequest : { ...defaultRequest, id: filters.id });
  };

  const handleResetRequest = async () => {
    if (selectedRow) {
      setRequest({
        id: selectedRow.id,
        numero_contato: selectedRow.numero_contato,
        nome: selectedRow.nome,
        email: selectedRow.email,
        data_nascimento: dayjs(selectedRow.data_nascimento),
        nome_ong_pertece: selectedRow.nome_ong_pertece,
        data_associacao: dayjs(selectedRow.data_associacao),
        cidade: selectedRow.cidade,
        estado: selectedRow.estado,
        profissao_ocupacao: selectedRow.profissao_ocupacao,
        tipo: selectedRow.tipo,
        origem: selectedRow.origem,
      });
    }
  };

  const handleSearchCities = async (UFId: number) => {
    try {
      showLoading();
      const results = await getCities(UFId);
      setCities(results);
    } catch (error) {
      console.error("Erro ao buscar cidades:", error);
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    if (action === "consultar") {
      handleSearch();
    }
  }, [page, limit, action]);

  return (
    <>
      <div className={S.headerContainer}>
        <Header
          onSearch={handleSearch}
          onReset={handleResetRequest}
          onClear={handleClear}
          onEdit={handleEdit}
          onCreate={handleCreate}
          onExport={handleExport}
          onImport={handleImport}
          onSave={handleSave}
          onCancel={handleCancel}
          action={action}
          onClearRequest={handleClearRequest}
        />
      </div>
      <main className={S.mainContainer}>
        <header className={S.headerMain}>
          <h1>
            {action === "consultar"
              ? "Consulta"
              : action === "criar"
              ? "Criação de associado"
              : "Edição de associado"}
          </h1>
        </header>
        {action === "consultar" ? (
          <>
            <PartnersSearch
              filters={filters}
              setFilters={setFilters}
              onFiltersChange={setFilters}
              cities={cities}
              onUfchange={handleSearchCities}
            />
            <DataGridDemo
              data={data}
              onPageChange={handlePageChange}
              rowCount={rowCount}
              setSelectedRow={setSelectedRow}
            />
          </>
        ) : (
          <PartnerCreateEdit
            cities={cities}
            onUfchange={handleSearchCities}
            request={request}
            setRequest={setRequest}
          />
        )}
      </main>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Selecione um item</DialogTitle>
        <DialogContent>
          <p>Você precisa selecionar um item para poder editar.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

// 🔥 Wrapper principal que fornece o contexto de loading
const Main: React.FC = () => (
  <LoadingProvider>
    <MainContent />
  </LoadingProvider>
);

export default Main;

import dayjs from "dayjs";

export type Partner = {
  id: number;
  numero_contato: string;
  nome: string;
  email: string;
  data_nascimento: Date;
  idade: number;
  nome_ong_pertece: string;
  data_associacao: Date;
  cidade: string;
  estado: string;
  profissao_ocupacao: string;
  tipo: string;
  origem: string;
  idade_data_nascimento: string;
  cidade_estado: string;
};

export type PartnerRequest = {
  id: number;
  numero_contato: string;
  nome: string;
  email: string;
  data_nascimento: dayjs.Dayjs | null;
  nome_ong_pertece: string;
  data_associacao: dayjs.Dayjs | null;
  cidade: string;
  estado: string;
  profissao_ocupacao: string;
  tipo: string;
  origem: string;
};

export const formatIdadeDataNascimento = (partner: Partner): string => {
  const dataNascimento = new Date(partner.data_nascimento);
  const dataFormatada = dataNascimento.toLocaleDateString("pt-BR");
  return `${partner.idade} anos | ${dataFormatada}`;
};

export const formatCidadeEstado = (partner: Partner): string => {
  return `${partner.cidade}/${partner.estado}`;
};

export type PartnerReponse = {
  partners: Partner[];
  row_count: number
};

export type PartnerFilter = {
  id: number;
  numero_contato: string;
  nome: string;
  email: string;
  data_nascimento_inicio: dayjs.Dayjs | null;  // Alterado para Dayjs
  data_nascimento_fim: dayjs.Dayjs | null;     // Alterado para Dayjs
  nome_ong_pertece: string;
  data_associacao_inicio: dayjs.Dayjs | null;   // Alterado para Dayjs
  data_associacao_fim: dayjs.Dayjs | null;      // Alterado para Dayjs
  cidade: string;
  estado: string;
  profissao_ocupacao: string;
  tipo: string;
  origem: string;
};

export type SearchPartnerFilter = {
  partnerFilter: PartnerFilter;
  page: number;
  limit: number;
};

export type City = {
  id: number;
  nome: string
}

// ufData.ts
export type UF = {
  UFId: number;
  code: string;
  name: string;
};

export const UFs: UF[] = [
  { UFId: 12, code: 'AC', name: 'Acre' },
  { UFId: 27, code: 'AL', name: 'Alagoas' },
  { UFId: 13, code: 'AM', name: 'Amazonas' },
  { UFId: 16, code: 'AP', name: 'Amapá' },
  { UFId: 29, code: 'BA', name: 'Bahia' },
  { UFId: 23, code: 'CE', name: 'Ceará' },
  { UFId: 53, code: 'DF', name: 'Distrito Federal' },
  { UFId: 32, code: 'ES', name: 'Espírito Santo' },
  { UFId: 52, code: 'GO', name: 'Goiás' },
  { UFId: 21, code: 'MA', name: 'Maranhão' },
  { UFId: 31, code: 'MG', name: 'Minas Gerais' },
  { UFId: 50, code: 'MS', name: 'Mato Grosso do Sul' },
  { UFId: 51, code: 'MT', name: 'Mato Grosso' },
  { UFId: 15, code: 'PA', name: 'Pará' },
  { UFId: 25, code: 'PB', name: 'Paraíba' },
  { UFId: 26, code: 'PE', name: 'Pernambuco' },
  { UFId: 22, code: 'PI', name: 'Piauí' },
  { UFId: 41, code: 'PR', name: 'Paraná' },
  { UFId: 33, code: 'RJ', name: 'Rio de Janeiro' },
  { UFId: 24, code: 'RN', name: 'Rio Grande do Norte' },
  { UFId: 11, code: 'RO', name: 'Rondônia' },
  { UFId: 14, code: 'RR', name: 'Roraima' },
  { UFId: 43, code: 'RS', name: 'Rio Grande do Sul' },
  { UFId: 42, code: 'SC', name: 'Santa Catarina' },
  { UFId: 28, code: 'SE', name: 'Sergipe' },
  { UFId: 35, code: 'SP', name: 'São Paulo' },
  { UFId: 17, code: 'TO', name: 'Tocantins' },
];
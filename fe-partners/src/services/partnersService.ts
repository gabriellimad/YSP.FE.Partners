/* eslint-disable @typescript-eslint/no-unused-vars */
import { useApiL } from './api'; // Hook que retorna AxiosInstance
import { getAuthToken } from './authService';
import { PartnerReponse, PartnerRequest, SearchPartnerFilter } from '../types/types';

export const usePartnerService = () => {
  const api = useApiL();

  const buildHeader = async () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAuthToken()}`,
  });

  const getPartners = async () => {
    const response = await api.get('/', { headers: await buildHeader() });
    return response.data;
  };

  const getPartnerById = async (id: number) => {
    const response = await api.get(`/${id}`, { headers: await buildHeader() });
    return response.data;
  };

  const getPartnersByParams = async (params: SearchPartnerFilter): Promise<PartnerReponse> => {
    const response = await api.post('/getByParams', params, { headers: await buildHeader() });
    return response.data;
  };

  const createPartner = async (data: PartnerRequest) => {
    const response = await api.post('/', data, { headers: await buildHeader() });
    return response.data;
  };

  const updatePartner = async (id: number, data: PartnerRequest) => {
    const response = await api.put(`/${id}`, data, { headers: await buildHeader() });
    return response.data;
  };

  const getStates = async () => {
    const response = await api.get('/getStates', { headers: await buildHeader() });
    return response.data;
  };

  const exportPartners = async (params: SearchPartnerFilter) => {
    const response = await api.post('/exportPartnersToExcel', params, {
      headers: await buildHeader(),
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'parceiros.xlsx');
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    return true;
  };

  const getCities = async (uFId: number) => {
    const response = await api.get(`/getCities/${uFId}`, { headers: await buildHeader() });
    return response.data;
  };

  return {
    getPartners,
    getPartnerById,
    getPartnersByParams,
    createPartner,
    updatePartner,
    getStates,
    exportPartners,
    getCities,
  };
};

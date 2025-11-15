import React, { createContext, useState, useContext } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

interface LoadingContextType {
  showLoading: () => void;
  hideLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loadingCount, setLoadingCount] = useState(0);

  const showLoading = () => setLoadingCount((count) => count + 1);
  const hideLoading = () => setLoadingCount((count) => Math.max(count - 1, 0));

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading }}>
      {children}
      <Backdrop
        open={loadingCount > 0}
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 9999,
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </LoadingContext.Provider>
  );
};

export const useLoading = (): LoadingContextType => {
  const ctx = useContext(LoadingContext);
  if (!ctx) throw new Error("useLoading deve ser usado dentro de LoadingProvider");
  return ctx;
};
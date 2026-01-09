"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

interface PhotoModeContextType {
  isPhotoModeActive: boolean;
  isCapturing: boolean;
  activatePhotoMode: () => void;
  deactivatePhotoMode: () => void;
  captureTarget: HTMLElement | null;
  setCaptureTarget: (element: HTMLElement | null) => void;
  setIsCapturing: (value: boolean) => void;
}

const PhotoModeContext = createContext<PhotoModeContextType | null>(null);

export function usePhotoModeContext() {
  const context = useContext(PhotoModeContext);
  if (!context) {
    throw new Error("usePhotoModeContext must be used within PhotoModeProvider");
  }
  return context;
}

interface PhotoModeProviderProps {
  children: ReactNode;
}

export function PhotoModeProvider({ children }: PhotoModeProviderProps) {
  const [isPhotoModeActive, setIsPhotoModeActive] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [captureTarget, setCaptureTarget] = useState<HTMLElement | null>(null);

  const activatePhotoMode = useCallback(() => {
    setIsPhotoModeActive(true);
  }, []);

  const deactivatePhotoMode = useCallback(() => {
    setIsPhotoModeActive(false);
    setCaptureTarget(null);
  }, []);

  return (
    <PhotoModeContext.Provider
      value={{
        isPhotoModeActive,
        isCapturing,
        activatePhotoMode,
        deactivatePhotoMode,
        captureTarget,
        setCaptureTarget,
        setIsCapturing,
      }}
    >
      {children}
    </PhotoModeContext.Provider>
  );
}

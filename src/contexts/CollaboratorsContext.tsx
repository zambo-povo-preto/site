"use client";

import { collaborators as defaultCollaborators } from "@/data/collaborators";
import type { Collaborator } from "@/types/collaborator";
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const STORAGE_KEY = "zambo_admin_collaborators";

interface CollaboratorsContextType {
  collaborators: Collaborator[];
  loading: boolean;
  addCollaborator: (collaborator: Omit<Collaborator, "id">) => Collaborator;
  updateCollaborator: (id: string, collaborator: Partial<Collaborator>) => void;
  deleteCollaborator: (id: string) => void;
  getCollaborator: (id: string) => Collaborator | undefined;
  resetToDefaults: () => void;
}

const CollaboratorsContext = createContext<CollaboratorsContextType | null>(
  null,
);

export function CollaboratorsProvider({ children }: { children: ReactNode }) {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState(true);

  // Inicializa do localStorage ou usa dados padrão
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCollaborators(JSON.parse(stored));
      } else {
        setCollaborators(defaultCollaborators);
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(defaultCollaborators),
        );
      }
    } catch {
      setCollaborators(defaultCollaborators);
    } finally {
      setLoading(false);
    }
  }, []);

  // Salva no localStorage quando colaboradores mudarem
  const persist = (items: Collaborator[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignora erro de cota de storage
    }
  };

  const addCollaborator = useCallback(
    (collaborator: Omit<Collaborator, "id">): Collaborator => {
      const slug = collaborator.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

      const id = `${slug || "colaborador"}-${Date.now().toString(36)}`;
      const newCollaborator: Collaborator = {
        ...collaborator,
        id,
      };

      setCollaborators((prev) => {
        const next = [newCollaborator, ...prev];
        persist(next);
        return next;
      });

      return newCollaborator;
    },
    [],
  );

  const updateCollaborator = useCallback(
    (id: string, patch: Partial<Collaborator>) => {
      setCollaborators((prev) => {
        const next = prev.map((item) =>
          item.id === id ? { ...item, ...patch } : item,
        );
        persist(next);
        return next;
      });
    },
    [],
  );

  const deleteCollaborator = useCallback((id: string) => {
    setCollaborators((prev) => {
      const next = prev.filter((item) => item.id !== id);
      persist(next);
      return next;
    });
  }, []);

  const getCollaborator = useCallback(
    (id: string) => {
      return collaborators.find((c) => c.id === id);
    },
    [collaborators],
  );

  const resetToDefaults = useCallback(() => {
    setCollaborators(defaultCollaborators);
    persist(defaultCollaborators);
  }, []);

  return (
    <CollaboratorsContext.Provider
      value={{
        collaborators,
        loading,
        addCollaborator,
        updateCollaborator,
        deleteCollaborator,
        getCollaborator,
        resetToDefaults,
      }}
    >
      {children}
    </CollaboratorsContext.Provider>
  );
}

export function useCollaborators() {
  const context = useContext(CollaboratorsContext);
  if (!context) {
    throw new Error(
      "useCollaborators must be used within a CollaboratorsProvider",
    );
  }
  return context;
}


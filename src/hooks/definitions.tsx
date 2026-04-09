import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';

interface DefinitionsProviderParams {
  children: JSX.Element;
}

interface Description {
  [prop: string]: string | boolean;
}

interface UpdateDefinitionParams {
  name: string;
  value: string | number;
  description: string;
}

interface ContextDefinitions {
  definitions: Description;
  descriptions: Description;
  loading: boolean;
  updateDefinition(params: UpdateDefinitionParams): void;
}

const DefinitionsContext = createContext({} as ContextDefinitions);

const DefinitionsProvider = ({ children }: DefinitionsProviderParams) => {
  const [data, setData] = useState({
    appearance_loadImage: 'always',
    appearance_dimensionCaracter: '14px',
    appearance_dimensionCaracterArticle: 'default',
    appearance_letterType: 'default',
    appearance_darkMode: 'true',
    box_imageOrientation: 'left',
    box_theme: 'materialCompact',
    general_recent: true,
    general_notifications: '12',
    general_exit: false,
    general_active: true,
    general_fullscreen: false,
    general_adverts: true,
    general_acceleration: false,
    general_mobile: true,
    cache_clearInterval: '72',
    cache_publicity: 'random'
  });

  const [dataDescription, setDataDescription] = useState({
    appearance_loadImage: 'Sempre',
    appearance_dimensionCaracter: 'Predefinido',
    appearance_dimensionCaracterArticle: 'Predefinido',
    appearance_letterType: 'Predefinida',
    appearance_darkMode: 'Não',
    box_imageOrientation: 'Direita',
    box_theme: 'Material',
    general_recent: '',
    general_notifications: '12 Horas',
    general_exit: '',
    general_active: '',
    general_fullscreen: '',
    general_adverts: '',
    general_acceleration: '',
    general_mobile: '',
    cache_clearInterval: 'A cada três dias',
    cache_publicity: 'Mistura'
  });

  const [loading, _setLoading] = useState(true);

  const updateDefinition = useCallback(
    async ({ name, value, description }: { name: string; value: string; description: string }) => {
      setData({
        ...data,
        [name]: value
      });

      setDataDescription({
        ...dataDescription,
        [name]: description
      });
    },
    [data]
  );

  return (
    <DefinitionsContext.Provider
      value={{
        definitions: data,
        descriptions: dataDescription,
        loading,
        updateDefinition,
      }}
    >
      {children}
    </DefinitionsContext.Provider>
  );
};

function useDefinitions() {
  const context = useContext(DefinitionsContext);

  if (!context) {
    throw new Error('useDefinitions must be used within an DefinitionsProvider');
  }

  return context;
}

export { DefinitionsProvider, useDefinitions };
import React from "react";

const defaultValues = {
  state: { value: "Valor 1", type: "Tipo 1", active: "está ativo" },
  setState: () => {},
};
const MyContext = React.createContext(defaultValues);

const MyContextProvider = ({ children }) => {
  const [state, setState] = React.useState(defaultValues.state);
  const setValue = (newValue) => setState({ ...state, value: newValue });
  return (
    <MyContext.Provider value={{ state, setValue }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContextProvider };
export default MyContext;

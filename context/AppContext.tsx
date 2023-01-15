import {
  createContext,
  useContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { ProductType } from "../types";

type contextType = {
  allProducts: ProductType[];
  setAllProducts: Dispatch<SetStateAction<ProductType[]>>;
};

const Context = createContext<contextType>({} as contextType);

export function useAllProducts() {
  return useContext(Context);
}

type Props = {
  children: ReactNode;
};

export function ContextProvider({ children }: Props) {
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const value = {
    allProducts,
    setAllProducts,
  };

  return (
    <>
      <Context.Provider value={value}>{children}</Context.Provider>
    </>
  );
}

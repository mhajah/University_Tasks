import { useContext } from "react";
import { ProductsContext } from "./ProductsProvider";

export default function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within an ProductsContext");
  }
  return context;
}

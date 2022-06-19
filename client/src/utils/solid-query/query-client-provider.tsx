import type { QueryClient } from "react-query/types";
import { createContext, ParentComponent, useContext } from "solid-js";

export const QueryClientContext = createContext<QueryClient>();

type Props = {
  client: QueryClient;
};

export const QueryClientProvider: ParentComponent<Props> = (props) => {
  if (!props.client) {
    throw new Error("No query client provided");
  }

  return (
    <QueryClientContext.Provider value={props.client}>
      {props.children}
    </QueryClientContext.Provider>
  );
};

export const useQueryClient = () => useContext(QueryClientContext);

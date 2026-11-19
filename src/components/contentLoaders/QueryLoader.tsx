import ErrorFrame from "./ErrorFrame";
import LoadingFrame from "./LoadingFrame";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

export default function QueryLoader<T>({
  queryOptions,
  renderOnSuccess,
  renderOnLoading = () => <LoadingFrame />,
  renderOnError = (error) => <ErrorFrame error={error} />,
}: {
  queryOptions: UseQueryOptions<T>;
  renderOnSuccess: (data: T) => Array<React.JSX.Element> | React.JSX.Element;
  renderOnLoading?: () => React.JSX.Element;
  renderOnError?: (error: Error) => React.JSX.Element;
}) {
  const { data, status, error } = useQuery(queryOptions);

  return (
    <>
      {status == "pending" && renderOnLoading()}
      {status == "error" && renderOnError(error)}
      {status == "success" && renderOnSuccess(data)}
    </>
  );
}

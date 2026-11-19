import { useEffect, useState } from "react";
import ErrorFrame from "./ErrorFrame";
import LoadingFrame from "./LoadingFrame";

export default function Loader<T>({
  fetcher,
  renderOnSuccess,
  renderOnLoading = () => <LoadingFrame />,
  renderOnError = (error) => <ErrorFrame error={error} />,
}: {
  fetcher: () => Promise<T>;
  renderOnSuccess: (data: T) => Array<React.JSX.Element> | React.JSX.Element;
  renderOnLoading?: () => React.JSX.Element;
  renderOnError?: (error: Error) => React.JSX.Element;
}) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error>();
  const [status, setStatus] = useState<"PENDING" | "SUCCESS" | "ERROR">(
    "PENDING",
  );

  useEffect(() => {
    fetcher()
      .then((response) => {
        setData(response);
        setStatus("SUCCESS");
      })
      .catch((error) => {
        setError(error);
        setStatus("ERROR");
      });
  }, [fetcher]);

  return (
    <>
      {status == "PENDING" && renderOnLoading()}
      {status == "ERROR" && renderOnError(error!)}
      {status == "SUCCESS" && renderOnSuccess(data!)}
    </>
  );
}

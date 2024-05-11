import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getInfo } from "./utils/supabaseFuntions";

function App() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getInfo();
      setData(result || []); // Provide a default value of an empty array if result is null
    }

    fetchData();
  }, []);
  return (
    <>
      <title data-testid="title">Hello Jest</title>
      {data &&
        data.map((article: any) => (
          <div key={article.id}>
            <h1>{article.author}</h1>
            <p>{article.contents}</p>
          </div>
        ))}
    </>
  );
}

export default App;

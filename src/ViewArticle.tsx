// import { useEffect, useState } from "react";
// import { getInfo } from "./utils/supabaseFuntions";

// export const ViewArticle = () => {
//   const [data, setData] = useState<any[]>([]);

//   useEffect(() => {
//     async function fetchData() {
//       const result = await getInfo();
//       setData(result || []); // Provide a default value of an empty array if result is null
//     }

//     fetchData();
//   }, []);
//   return (
//     <div>
//       <title data-testid="title">Hello Jest</title>

//       {data &&
//         data.map((article: any) => (
//           <div key={article.id}>
//             <h1>{article.title}</h1>
//             <p>{article.content}</p>
//           </div>
//         ))}
//     </div>
//   );
// };

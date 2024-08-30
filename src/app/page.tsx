"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [queries, setQueries] = useState<any>([]);
  const [mutations, setMutations] = useState<any>([]);

  useEffect(() => {
    async function fetchSchema() {
      const response = await fetch("http://localhost:8007/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: `
                    {
                        __schema {
                            queryType {
                                fields {
                                    name
                                }
                            }
                            mutationType {
                                fields {
                                    name
                                }
                            }
                        }
                    }
                `,
        }),
      });
      const result = await response.json();
      setQueries(result.data.__schema.queryType.fields);
      setMutations(result.data.__schema.mutationType.fields);
    }

    fetchSchema();
  }, []);

  console.log(queries);
  console.log(mutations);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>GraphQL Postman</h1>
        <h2>Queries</h2>
        <ul>
          {queries.map((query) => (
            <li key={query.name}>{query.name}</li>
          ))}
        </ul>
        <h2>Mutations</h2>
        <ul>
          {mutations.map((mutation) => (
            <li key={mutation.name}>{mutation.name}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}

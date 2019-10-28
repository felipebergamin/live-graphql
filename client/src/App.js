import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import "./App.css";

import Comment from "./components/Comment";
import Form from "./components/Form";

const GET_COMMENTS = gql`
  query {
    comments {
      id
      name
      content
    }
  }
`;

export default function App() {
  const { loading, error, data, refetch } = useQuery(GET_COMMENTS);

  if (error) return "Pô, deu ruim demais.";

  function handleAddComment() {
    refetch();
  }

  return (
    <>
      <h1>RocketComments</h1>
      <Form onAddComment={handleAddComment} />
      {loading ? (
        "Carregando..."
      ) : (
        <section className="comments">
          {data.comments.map(({ id, name, content }) => (
            <Comment key={id} name={name} description={content} />
          ))}
        </section>
      )}
    </>
  );
}

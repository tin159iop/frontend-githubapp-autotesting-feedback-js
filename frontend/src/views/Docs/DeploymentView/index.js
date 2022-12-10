import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Container } from "@mui/material";
import Page from "components/Page";
import Content from "./Content.md";
/* eslint-disable */
import docsCSS from "css/docs.css";

const DeploymentView = () => {
  let [content, setContent] = useState("");

  useEffect(() => {
    fetch(Content)
      .then((res) => res.text())
      .then((text) => {
        setContent(text);
      });
  }, []);

  console.log(content);

  return (
    <Page title="Kiki Docs: Deployment">
      <Container maxWidth="md">
        <ReactMarkdown children={content} />
      </Container>
    </Page>
  );
};

export default DeploymentView;

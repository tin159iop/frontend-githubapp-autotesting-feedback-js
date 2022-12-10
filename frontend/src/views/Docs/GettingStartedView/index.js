import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Container, Box } from "@mui/material";
import Page from "components/Page";
import Content from "./Content.md";
/* eslint-disable */
import docsCSS from "css/docs.css";

const GettingStartedView = () => {
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
    <Page title="Kiki Docs: Getting Started">
      <Container maxWidth="md">
        <Box sx={{ color: (theme) => theme.palette.text.primary }}>
          <ReactMarkdown children={content} />
        </Box>
      </Container>
    </Page>
  );
};

export default GettingStartedView;

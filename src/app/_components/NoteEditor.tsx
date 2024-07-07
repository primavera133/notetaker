import { useState } from "react";

import { Box, Button, FormControl, Heading, Input } from "@chakra-ui/react";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import CodeMirror from "@uiw/react-codemirror";

export const NoteEditor = ({
  onSave,
}: {
  onSave: (note: { title: string; content: string }) => void;
}) => {
  const [code, setCode] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  return (
    <Box my={4}>
      <Heading as="h2" size="md">
        Add note
      </Heading>
      <FormControl
        as="form"
        onSubmit={(e) => {
          console.log("1111");
          e.preventDefault();
          onSave({
            title,
            content: code,
          });
          setCode("");
          setTitle("");
        }}
      >
        <Input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <CodeMirror
          value={code}
          width="500px"
          height="30vh"
          minWidth="100%"
          minHeight="30vh"
          extensions={[
            markdown({ base: markdownLanguage, codeLanguages: languages }),
          ]}
          onChange={(value) => setCode(value)}
        />
        <Box mt={2}>
          <Button
            type="submit"
            disabled={title.trim().length === 0 || code.trim().length === 0}
          >
            Save
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
};

import { DeleteIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";
import { type RouterOutputs } from "~/trpc/react";

type Note = RouterOutputs["note"]["getAll"][0];

export const NoteCard = ({
  note,
  onDelete,
}: {
  note: Note;
  onDelete: () => void;
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const newTheme = {
    p: (props: React.PropsWithChildren<unknown>) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return <Text mb={2}>{props.children}</Text>;
    },
  };

  return (
    <Card>
      <CardHeader>
        <Heading as="h3" size="md">
          <Flex direction="row" justifyContent={"space-between"}>
            <Text onClick={() => setIsExpanded(!isExpanded)}>{note.title}</Text>

            <IconButton
              aria-label="delete"
              icon={<DeleteIcon />}
              onClick={onDelete}
            >
              Delete
            </IconButton>
          </Flex>
        </Heading>
      </CardHeader>
      {isExpanded && (
        <CardBody mt={0} pt={0}>
          <article>
            <ReactMarkdown components={ChakraUIRenderer(newTheme)} skipHtml>
              {note.content}
            </ReactMarkdown>
          </article>
        </CardBody>
      )}
    </Card>
  );
};

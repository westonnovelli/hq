import React from "react";
import useSWR from "swr";
import fetcher from "../util/fetcher";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  CircularProgress,
  List,
  ListIcon,
  ListItem,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { CheckCircleIcon, StarIcon } from "@chakra-ui/icons";

const Starships: React.FC = () => {
  const { data, error, isLoading } = useSWR(
    "https://swapi.tech/api/starships?name=tie",
    fetcher
  );

  if (isLoading) return <CircularProgress isIndeterminate color="green.300" />;

  const starships = data?.result ?? [];

  return (
    <Accordion>
      {starships.map((ship, i) => {
        const id = ship?._id ?? i;
        const properties = ship?.properties ?? {};
        const name = properties?.name ?? "Unknown name";
        return (
          <AccordionItem key={id}>
            <h2>
              <AccordionButton>
                <Box
                  flex="1"
                  textAlign="left"
                  display="flex"
                  alignItems="center"
                  gap="8px"
                >
                  {name}
                  <Badge colorScheme="green">Starship</Badge>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Box display="flex" justifyContent="space-between" width="100%">
                <Box>
                  <List spacing={3}>
                    <ListItem display="flex" alignItems="center">
                      <ListIcon as={CheckCircleIcon} color="green.500" />
                      {properties.manufacturer}
                    </ListItem>
                    <ListItem display="flex" alignItems="center">
                      <ListIcon as={StarIcon} color="green.500" />
                      {properties.model}
                    </ListItem>
                  </List>
                </Box>
                <Box>
                  <Stat>
                    <StatLabel>Speed</StatLabel>
                    <StatNumber>800</StatNumber>
                    <StatHelpText>
                      0 - {properties?.max_atmosphering_speed ?? 100}
                    </StatHelpText>
                  </Stat>
                </Box>
              </Box>
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default Starships;

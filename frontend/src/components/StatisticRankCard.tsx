import React from "react";
import { Box, Heading, Text, Image, Grid, GridItem } from "@chakra-ui/react";
import firstPlaceMedalImage from "../assets/first-place-medal.png";
import secondPlaceMedalImage from "../assets/second-place-medal.png";
import thirdPlaceMedalImage from "../assets/third-place-medal.png";

export type StatEntry = {
  name: string;
  value: number;
};

type TopThreeStatProps = {
  entries: StatEntry[];
};

export const TopThreeStat: React.FC<TopThreeStatProps> = ({ entries }) => {
  const medals = [
    <Image
      src={firstPlaceMedalImage}
      alt="firstPlaceMedal"
      boxSize="1.5em"
      display="inline"
    />,
    <Image
      src={secondPlaceMedalImage}
      alt="secondPlaceMedal"
      boxSize="1.5em"
      display="inline"
    />,
    <Image
      src={thirdPlaceMedalImage}
      alt="thirdPlaceMedal"
      boxSize="1.5em"
      display="inline"
    />,
  ];

  return (
    <Grid templateColumns="repeat(3, 1fr)" textAlign="center" gap={0}>
      {/* Row 1: Medals */}
      {entries.map((_, index) => (
        <GridItem key={`medal-${index}`}>
          <Text fontSize="3xl">{medals[index]}</Text>
        </GridItem>
      ))}
      {/* Row 2: Names */}
      {entries.map((entry, index) => (
        <GridItem key={`name-${index}`}>
          <Text fontWeight="bold">{entry.name}</Text>
        </GridItem>
      ))}
      {/* Row 3: Values */}
      {entries.map((entry, index) => (
        <GridItem key={`value-${index}`}>
          <Text>{entry.value}</Text>
        </GridItem>
      ))}
    </Grid>
  );
};

type StatisticCardProps = {
  title: string;
  subtitle: string;
  funText: string;
  topThree: StatEntry[];
};

export const StatisticRankCard: React.FC<StatisticCardProps> = ({
  title,
  subtitle,
  funText,
  topThree,
}) => {
  return (
    <Box borderWidth="1px" p={4} borderRadius="md" shadow="md" width="100%">
      <Heading size="md" mb={2}>
        {title}
      </Heading>
      <Text fontSize="sm" mb={1}>
        {subtitle}
      </Text>
      <Text fontSize="sm" mb={4} color="gray.500">
        {funText}
      </Text>
      <TopThreeStat entries={topThree} />
    </Box>
  );
};

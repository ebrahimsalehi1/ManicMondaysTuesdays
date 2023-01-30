import { Box, Typography } from "@mui/material";
import React from "react";

interface CircleProps {
  text: string;
  radius: number;
  width?: number | string | undefined;
  height?: number | string | undefined;
  onClick: () => void;
}

const Circle: React.FC<CircleProps> = ({
  text,
  radius,
  width,
  height,
  onClick,
}) => {
  const [state, setState] = React.useState<boolean>(false);

  return (
    <div
      onClick={() => {
        setState(!state);
        onClick();
      }}
    >
      <Box
        sx={{
          width: width ? width : "90%",
          height: height ? height : "90%",
          margin: 1,
          backgroundColor: state ? "yellow" : "silver",
          borderRadius: `${radius}%`,
          direction: "column",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          border: "1px solid black",
        }}
      >
        <Typography sx={{ color: "primary.dark" }} variant="h5">
          {text}
        </Typography>
      </Box>
    </div>
  );
};

export default Circle;

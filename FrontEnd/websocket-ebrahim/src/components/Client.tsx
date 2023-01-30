import React from "react";
import { Grid, Typography } from "@mui/material";
import Circle from "./Circle";
import { useSearchParams } from "react-router-dom";
import db from "../data/sampledata.json";

interface ClientProps {
  socket: any;
  //   setSocket: any;
  stateAll: any;
  setStateAll: any;
}

const Client: React.FC<ClientProps> = ({ socket,stateAll,setStateAll }) => {
  const [topArray, setTopArray] = React.useState<number[]>([]);
  const [bottomArray, setBottomArray] = React.useState<number[]>([]);

  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    if (!searchParams.get("numberOfChairs")) return;
    const numberOfChairs = Number(searchParams.get("numberOfChairs"));

    console.log("starting");

    const leftSize = Math.floor(numberOfChairs / 2);
    const rightSize = numberOfChairs - leftSize;

    setTopArray([...Array(leftSize)].map((item, index) => index + 1));
    setBottomArray(
      [...Array(rightSize)].map((item, index) => index + 1 + leftSize)
    );
  }, [searchParams]);

  React.useEffect(() => {
    socket.on("receive_message", (data: any) => {
      console.log(data);
    });
  }, [socket]);

  return (
    <Grid spacing={1} container>
      <Grid
        item
        container
        xs={12}
        direction="row"
        justifyContent={"space-between"}
        alignItems="center"
      >
        {topArray.map((item) => (
          <Circle
            key={item}
            text={String(item)}
            radius={50}
            width={50}
            height={50}
            onClick={() => {
              socket.emit("send_message", {
                clientName: searchParams.get("clientName") as string,
                lightNumber: item,
                imageUrl: db.data.find(
                  (item) => item.name === String(searchParams.get("clientName"))
                )?.url,
                test: "topArray",
              });
            }}
          />
        ))}
      </Grid>

      <Grid
        container
        item
        xs={12}
        justifyContent="center"
        alignContent={"center"}
      >
        {/* <Circle
          text={searchParams.get("clientName") as string}
          height={100}
          radius={2}
          onClick={() => {
            socket.emit("send_message", {
              test: "clientName",
            });
          }}
        /> */}
        <Typography
          sx={{
            position: "absolute",
            top: "70%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          variant="h3"
        >
          {searchParams.get("clientName") as string}
        </Typography>
        <img
          style={{ width: 200, height: 300 }}
          src={
            db.data.find(
              (item) => item.name === String(searchParams.get("clientName"))
            )?.url
          }
          alt={searchParams.get("clientName") as string}
        />
      </Grid>

      <Grid
        item
        container
        xs={12}
        direction="row"
        justifyContent={"space-between"}
        alignItems="center"
      >
        {bottomArray.map((item) => (
          <Circle
            key={item}
            text={String(item)}
            radius={50}
            width={50}
            height={50}
            onClick={() => {
              socket.emit("send_message", {
                clientName: searchParams.get("clientName") as string,
                lightNumber: item,
                imageUrl: db.data.find(
                  (item) => item.name === String(searchParams.get("clientName"))
                )?.url,

                test: "bottomArray",
              });
            }}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default Client;

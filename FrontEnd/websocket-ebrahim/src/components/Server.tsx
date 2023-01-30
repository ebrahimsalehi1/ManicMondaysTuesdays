import React from "react";
// import socket from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { Box, Grid, Switch, Typography } from "@mui/material";

interface MessagInfo {
  clientName: string;
  imageUrl: string;
  lights: number[];
}

interface ServerProps {
  socket: any;
  stateAll: any;
  setStateAll: any;
}

var client: Client | null = null;

const Server: React.FC<ServerProps> = ({ socket, stateAll, setStateAll }) => {
  const [clientList, setClientList] = React.useState<MessagInfo[]>([]);

  // React.useEffect(() => {
  //   if(!stateAll)
  // },[stateAll])

  React.useEffect(() => {
    // socket.on("receive_message_back", (data: any) => {
    //   console.log("receive_message_back", data);
    // });

    socket.on("receive_message", (data: any) => {
      const list = [...clientList];

      if (!list.find((item) => item.clientName === data.clientName)) {
        list.push({
          clientName: data.clientName,
          lights: [],
          imageUrl: data.imageUrl,
        });
      }

      const index = list.findIndex(
        (item) => item.clientName === data.clientName
      );
      if (!list[index].lights) list[index].lights = [];

      if (
        list[index].lights &&
        !list[index].lights.find((item) => item === data.lightNumber)
      ) {
        list[index].lights.push(data.lightNumber);
        setClientList(list);
      }
      console.log(list[index]);
    });
  }, [clientList, socket]);

  const registerUser = () => {
    client = new Client({
      brokerURL: "http://localhost:8080/ws",
      connectHeaders: {
        login: "user",
        passcode: "123",
      },
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = (frame) => {
      console.log("onConnect", frame);
    };
    client.onStompError = (frame) => {
      console.log("onError");
    };
    client.activate();
  };

  const sendMessage = () => {
    client &&
      client.publish({ destination: "/topic/general", body: "Hello world" });

    // There is an option to skip content length header
    client &&
      client.publish({
        destination: "/topic/general",
        body: "Hello world",
        skipContentLengthHeader: true,
      });

    // Additional headers
    client &&
      client.publish({
        destination: "/topic/general",
        body: "Hello world",
        headers: { priority: "9" },
      });
  };

  const diactivate = () => {
    client && client.deactivate();
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant={"h4"} sx={{ textAlign: "center" }}>
          Server
        </Typography>
      </Grid>
      <Grid container item xs={12}>
        {clientList.map((item, index) => (
          <Grid item xs={6} md={3}>
            <Box
              key={index}
              sx={{
                border: "1px solid black",
                margin: "8px",
                width: 200,
                height: 400,
              }}
            >
              <Typography>{item.clientName}</Typography>
              {JSON.stringify(item.lights)}
              {/* {item.lights &&
              item.lights.map((itemLight) => <div>{itemLight}</div>)} */}

              <img
                style={{ width: 200, height: 300 }}
                src={item.imageUrl}
                alt={item.clientName}
              />

              <Switch checked={stateAll}
                onChange={(event) => {
                  // const obj = {
                  //   clientName: item.clientName,
                  //   isTurnOn: event.target.checked,
                  // };
                  // socket.emit("send_message", obj);

                  // console.log(obj);
                  setStateAll(event.target.checked);
                }}
              ></Switch>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Server;

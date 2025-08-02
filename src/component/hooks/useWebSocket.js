import { useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export default function useWebSocket(onMessage) {
  useEffect(() => {
    const socket = new SockJS("https://uat.credithaat.in/ws");

    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("✅ WebSocket connected");
        client.subscribe("/topic/callbacks", (message) => {
          const data = JSON.parse(message.body);

          console.log("📩 Received callback:", data);

          try {
            const content = JSON.parse(data.content); // now parse the content
            const api = data.api;
            const status = content.status;

            console.log("📌 API:", api);
            console.log("📌 Status:", status);

            if (onMessage) {
              onMessage({ api, status, content, data }); // Pass structured info
            }
          } catch (e) {
            console.error("❌ Error parsing callback content", e);
          }
        });
      },
      onStompError: (frame) => {
        console.error("❌ STOMP error", frame);
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [onMessage]);
}

// import { useEffect } from "react";
// import { Client } from "@stomp/stompjs";
// import SockJS from "sockjs-client";

// export default function useWebSocket(onMessage) {
//   useEffect(() => {
//     const socket = new SockJS("https://uat.credithaat.in/ws");

//     const client = new Client({
//       webSocketFactory: () => socket,
//       reconnectDelay: 5000,
//       onConnect: () => {
//         console.log("✅ WebSocket connected");
//         client.subscribe("/topic/callbacks", (message) => {
//           const data = JSON.parse(message.body);
//           console.log("📩 Received callback:", data);

//           if (onMessage) {
//             onMessage(data); // ✅ This will run your custom logic
//           }
//         });
//       },
//       onStompError: (frame) => {
//         console.error("❌ STOMP error", frame);
//       },
//     });

//     client.activate();

//     return () => {
//       client.deactivate();
//     };
//   }, [onMessage]);
// }

import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export default function useWebSocket(onMessage) {
  const clientRef = useRef(null);

  const connect = () => {
    // const socket = new SockJS("https://uat.getrysa.com/ws");

    const socket = new SockJS("https://los.arysefin.com/ws");

    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      heartbeatIncoming: 20000,
      heartbeatOutgoing: 20000,
      debug: (msg) => console.debug("[STOMP]", msg),

      onConnect: () => {
        console.log("✅ WebSocket connected");
        client.subscribe("/topic/callbacks", (message) => {
          try {
            const data = JSON.parse(message.body);
            const content = JSON.parse(data.content || "{}");
            const api = data.api;
            const status = content.status;

            if (onMessage) onMessage({ api, status, content, data });
          } catch (e) {
            console.error("❌ Error parsing callback:", e);
          }
        });
      },

      onWebSocketClose: (evt) => {
        console.warn("⚠️ WebSocket closed unexpectedly:", evt);
      },

      onStompError: (frame) => {
        console.error("❌ STOMP error", frame);
      },
    });

    client.activate();
    clientRef.current = client;
  };

  const disconnect = () => {
    if (clientRef.current) {
      console.log("🛑 Deactivating WebSocket");
      clientRef.current.deactivate();
      clientRef.current = null;
    }
  };

  useEffect(() => {
    connect();

    // Reconnect when browser/tab comes back online or becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" || navigator.onLine) {
        console.log("🔄 Reconnecting WebSocket after visibility change");
        disconnect();
        connect();
      }
    };

    const handleOnline = () => {
      console.log("🔄 Reconnecting WebSocket after online event");
      disconnect();
      connect();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("online", handleOnline);

    return () => {
      disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("online", handleOnline);
    };
  }, [onMessage]);
}

// import { useEffect, useRef } from "react";
// import { Client } from "@stomp/stompjs";
// import SockJS from "sockjs-client";

// export default function useWebSocket(onMessage) {
//   const clientRef = useRef(null);

//   useEffect(() => {
//     const socket = new SockJS("https://uat.getrysa.com/ws");

//     const client = new Client({
//       webSocketFactory: () => socket,
//       reconnectDelay: 5000, // try to reconnect every 5s
//       heartbeatIncoming: 20000, // expect server heartbeat every 20s
//       heartbeatOutgoing: 20000, // send client heartbeat every 20s
//       debug: (msg) => console.debug("[STOMP]", msg),

//       onConnect: () => {
//         console.log("✅ WebSocket connected");
//         client.subscribe("/topic/callbacks", (message) => {
//           try {
//             const data = JSON.parse(message.body);
//             const content = JSON.parse(data.content || "{}");
//             const api = data.api;
//             const status = content.status;

//             if (onMessage) onMessage({ api, status, content, data });
//           } catch (e) {
//             console.error("❌ Error parsing callback:", e);
//           }
//         });
//       },

//       onWebSocketClose: (evt) => {
//         console.warn("⚠️ WebSocket closed unexpectedly:", evt);
//       },

//       onStompError: (frame) => {
//         console.error("❌ STOMP error", frame);
//       },
//     });

//     client.activate();
//     clientRef.current = client;

//     return () => {
//       console.log("🛑 Deactivating WebSocket");
//       client.deactivate();
//     };
//   }, [onMessage]);
// }

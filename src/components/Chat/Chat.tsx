import { enableMocking } from "@/test/mocks/browser";
import { useEffect } from "react";

const Chat = (): JSX.Element => {
  const getData = async () => {
    fetch(window.location.origin + "/fake-api/posts")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log("Response--->", json);

        const $app = document.getElementById("app");
        if ($app) {
          $app.textContent = JSON.stringify(json, null, 4);
        }
      });
  };

  useEffect(() => {
    // Check if you are in development mode
    if (process.env.NODE_ENV === "development") {
      // Start the MSW Service Worker when the component mounts
      enableMocking().then(() => {
        console.log("Service Worker started only for this component");
        getData();
      });
    }
  }, []);

  return (
    <>
      <h1>chat </h1>
    </>
  );
};

export default Chat;

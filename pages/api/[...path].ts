import {
  IncomingMessage,
  ServerResponse,
} from 'http';

import httpProxy from "http-proxy";


const API_URL = process.env.NEXT_PUBLIC_SERVER_URL; // The actual URL of your API

const proxy = httpProxy.createProxyServer();
// Make sure that we don't parse JSON bodies on this route:
export const config = {
  api: {
    bodyParser: false,
    externalReslover: true,
  },
};

const Proxy = (req: IncomingMessage, res: ServerResponse) => {
  proxy.web(req, res, { target: API_URL, changeOrigin: true });
};

export default Proxy;

export function jsonMiddelware(req, res, next) {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", () => {
    try {
      req.body = JSON.parse(data);
      next();
    } catch (error) {
      console.log(error);
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end(
        JSON.stringify({
          error: `no se pudo leer la peticion como json: ${error}`,
        })
      );
    }
  });
}

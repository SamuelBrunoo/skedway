import { Request, Response, Router } from "express"


const routes = Router()

routes.get("sam.wasm", (req: Request, res: Response) => {
  res.sendFile("/sam.wasm")
})


export default routes
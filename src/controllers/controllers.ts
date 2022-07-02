import { Application } from "express";
import { controls } from "./controls";
import { middleware } from "./middleware";

export const controllers = async (app: Application) => {

  middleware(app)

  const controllers = Object.values(controls)

  for (const controller of controllers) {
    controller(app)
  }
}

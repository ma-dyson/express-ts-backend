import { NextFunction, Request, Response, Router } from "express";
import pokedex from "../db/pokedex.json";

const router = Router();

/* GET All Pokemon */
router.get("/", function (req: Request, res: Response, next: NextFunction): void {
  res.json(pokedex);
});

/* GET Pokemon by Id. */
router.get("/:id", function (req: Request, res: Response, next: NextFunction): void {
  const id = Number(req.params.id);

  if (isNaN(id)){
    res.status(400).json({ error: "Invalid ID" });
    return;
  }

  const pokemon = pokedex.find(p => p.id === id);

  if (!pokemon){
    res.status(404).json({ error: "Not found" });
    return;
  }

  res.status(200).json(pokemon);
  return;
});

/* GET Pokemon by English Name */
router.get("/name/:name", function (req: Request, res: Response, next: NextFunction): void {
  const name = String(req.params.name).toLowerCase();
  const pokemon = pokedex.find(p => p.name.english.toLowerCase() === name);

  if (!pokemon){
    res.status(404).json({ error: "Not found" });
    return;
  }

  res.status(200).json(pokemon);
  return;
});

/* GET Pokemon by Type */
router.get("/type/:type", function (req: Request, res: Response, next: NextFunction): void {
  const validTypes = ["normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dark", "dragon", "steel", "fairy"];

  const type = String(req.params.type).toLowerCase();
  const isValidType = validTypes.includes(type);

  if (!isValidType){
    res.status(400).json({ error: "Bad Request" });
    return;
  }

  const pokeMatch = pokedex.filter(p => p.type.some(t => t.toLowerCase() === type));

  res.status(200).json(pokeMatch);
  return;
});

/* GET Pokemon by HP */
router.get("/hp", function (req: Request, res: Response, next: NextFunction): void {
  // TODO: Implement this route. See swagger docs for details, by visiting http://localhost:3000/api-docs
  res.status(501).json({ message: "Not Implemented" });
  return;
});

export default router;

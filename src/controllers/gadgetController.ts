import { Request, Response } from 'express';
import * as gadgetService from '../services/gadgetService';


// get gadgets -->
export const getGadgets = async (req: Request, res: Response) => {

  const status = req.query.status as string
  const gadgets = await gadgetService.getGadgets(status);
  res.json(gadgets);

};

// create gadget -->
export const createGadget = async (req: Request, res: Response) => {

  const gadget = await gadgetService.createGadget();
  res.status(201).json(gadget);

};


// update gadget -->
export const updateGadget = async (req: Request, res: Response) => {

  const id = req.params.id;
  const gadget = await gadgetService.updateGadget(id, req.body);
  res.json(gadget);

};


// --> delete gadget
export const deleteGadget = async (req: Request, res: Response) => {

  const id = req.params.id;
  const gadget = await gadgetService.decommissionGadget(id);
  res.json(gadget);
};


// self destruct -->
export const selfDestruct = async (req: Request, res: Response) => {

  const result = await gadgetService.triggerSelfDestruct();
  res.json(result);

};
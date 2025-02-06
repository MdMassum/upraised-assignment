import { Request, Response } from 'express';
import * as gadgetService from '../services/gadgetService';


// get gadgets -->
export const getGadgets = async (req: Request, res: Response) => {

  const status:any = req.query.status as string

  if(status !== "Available" && status !== "Deployed" && status !== "Destroyed" && status !== "Decommissioned" && status != undefined){
    res.status(402).json("Status can only be Available, Deployed, Destroyed or Decommissioned")
    return;
  }

  const gadgets = await gadgetService.getGadgets(status);
  res.status(200).json(gadgets);

};

// create gadget -->
export const createGadget = async (req: Request, res: Response) => {

  const gadget = await gadgetService.createGadget();
  res.status(201).json(gadget);

};


// update gadget -->
export const updateGadget = async (req: Request, res: Response) => {

  const id = req.params.id;
  const {status} = req.body;

   if(status !== "Available" && status !== "Deployed" && status !== "Destroyed" && status !== "Decommissioned" && status != undefined){
    
    res.status(402).json("Status can only be Available, Deployed, Destroyed or Decommissioned")
    return;
  }

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
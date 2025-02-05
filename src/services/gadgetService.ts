import prisma from '../prisma';

interface Gadget{
  
    id:String,
    name:String,
    status:  "Available" | "Deployed" | "Destroyed" | "Decommissioned",
    decommissionedAt?:any
}

// For Generating random codename (e.g., "The Phoenix")
const generateCodename = () => {

  const adjectives = ['Silent', 'Golden', 'Iron', 'Shadow', 'Crimson'];
  const nouns = ['Phoenix', 'Eagle', 'Wolf', 'Storm', 'Viper'];

  return `The ${adjectives[Math.floor(Math.random() * adjectives.length)]} ${
    nouns[Math.floor(Math.random() * nouns.length)]
  }`;

};

// get gadgets service
export const getGadgets = async (status?: string) => {

  const gadgets = await prisma.gadget.findMany({
    where: status ? { status } : undefined,
  });

  return gadgets.map((gadget:Gadget) => ({
    ...gadget,
    missionSuccessProbability: Math.floor(Math.random() * 100),
  }));
};

// creating gadget service
export const createGadget = async () => {

  return prisma.gadget.create({
    data: {
      name: generateCodename(),
    },
  });

};

// update gadget service
export const updateGadget = async (id: string, data: Partial<Gadget>) => {

  return prisma.gadget.update({
    where: { id },
    data,
  });

};

export const decommissionGadget = async (id: string) => {

  return prisma.gadget.update({
    where: { id },
    data: {
      status: 'Decommissioned',
      decommissionedAt: new Date(),
    },
  });

};

export const triggerSelfDestruct = () => {
  return { 
    confirmationCode: Math.random().toString(36).slice(2, 8).toUpperCase()
    };
};
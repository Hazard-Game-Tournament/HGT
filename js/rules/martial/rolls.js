import { martialWeightedIndex } from "./random.js";

export function martialMasteryRollFor(weights){
  return martialWeightedIndex(weights)+1;
}

export function martialClanDomainCountFor(weights){
  return martialWeightedIndex(weights)+1;
}

import { effect } from "../../helpers.js";

export const POWER_EFFECTS_ENERGY = {
  "Lumière": effect("Produit et manipule une énergie lumineuse.", ["attaque", "éblouissement", "illumination"], []),
  "Ténèbres": effect("Manipule énergie obscure et ombres.", ["attaque", "dissimulation", "gêne visuelle"], ["Pas d’intangibilité ou contrôle mental automatique."]),
  "Magnétisme": effect("Exerce des forces magnétiques sur les matériaux sensibles.", ["attraction", "répulsion", "déplacement"], []),
  "Son": effect("Manipule les vibrations sonores.", ["ondes", "perturbation auditive", "impacts vibratoires"], []),
  "Explosion": effect("Produit des explosions.", ["souffle", "chaleur", "zone"], ["Conséquences majeures résolues par le moteur."])
};

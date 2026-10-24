const weighted=(label,weight=1)=>({
  label,
  weight
});

function weightedOptions(
  options,
  applyBoosts
){
  const score=Object.fromEntries(
    options.map(x=>[x,1])
  );

  const boost=(xs,m=1.5)=>
    xs.forEach(x=>{
      if(score[x]!=null)
        score[x]*=m;
    });

  applyBoosts(boost);

  return options.map(
    x=>weighted(x,score[x])
  );
}

export function vaeloriaJobOptionsFor(
  jobs,
  {
    culture='',
    birthRegion='',
    archParts=[]
  }={}
){
  const c=culture||'';
  const r=birthRegion||'';
  const a=(archParts||[]).join(' / ');

  return weightedOptions(
    jobs||[],
    boost=>{
      // Culture/région = influence principale.
      if(
        r==='Nexara' ||
        /Nexus|Technopolit|techno/i.test(c)
      ){
        boost([
          'Ingénieur / Mécanicien',
          'Scientifique',
          'Pilote'
        ],3);
      }

      if(
        /Forteresses|Hautes-cimes|Forgienne|Minière/i
          .test(c)
      ){
        boost([
          'Forgeron',
          'Mineur',
          'Garde'
        ],2);
      }

      if(
        /Maritime|Navigatrice|Insulaire|Littorale|Côtière/i
          .test(c)
      ){
        boost([
          'Marin / Pirate',
          'Marchand',
          'Explorateur'
        ],2);
      }

      if(
        /Sylvaine|Clairières|Jungle|Forestière|Boréale/i
          .test(c)
      ){
        boost([
          'Chasseur',
          'Agriculteur',
          'Médecin / Guérisseur',
          'Explorateur'
        ],2);
      }

      if(
        /Savante|Cristalline|Spirituelle|Contemplative/i
          .test(c)
      ){
        boost([
          'Enseignant / Érudit',
          'Alchimiste',
          'Prêtre / Religieux'
        ],2);
      }

      if(
        /Urbaine|Marchande|Cosmopolite/i.test(c)
      ){
        boost([
          'Marchand',
          'Artiste',
          'Noble / Diplomate',
          'Policier / Enquêteur'
        ],2);
      }

      if(
        /Martiale|Frontière|Nomade|Clans des steppes/i
          .test(c)
      ){
        boost([
          'Soldat',
          'Mercenaire',
          'Chasseur',
          'Garde'
        ],2);
      }

      // Archétype = influence secondaire.
      if(/Guerrier|Tank|Paladin/i.test(a))
        boost([
          'Soldat',
          'Garde',
          'Mercenaire'
        ],1.5);

      if(/Assassin|Voleur/i.test(a))
        boost([
          'Assassin',
          'Espion',
          'Voleur'
        ],1.5);

      if(/Mage|Sorcier|Invocateur/i.test(a))
        boost([
          'Alchimiste',
          'Enseignant / Érudit',
          'Prêtre / Religieux'
        ],1.5);

      if(/Tireur|Slayer/i.test(a))
        boost([
          'Chasseur',
          'Chasseur de primes',
          'Mercenaire'
        ],1.5);
    }
  );
}

export function vaeloriaHistoryOptionsFor(
  histories,
  {
    lineage={},
    birthRegion='',
    culture='',
    race=''
  }={}
){
  const L=lineage||{};
  const r=birthRegion||'';
  const c=culture||'';
  const raceNow=race||'';

  return weightedOptions(
    histories||[],
    boost=>{
      // Influence volontairement légère.
      if(
        r==='Nexara' ||
        /Nexus|Technopolit|techno/i.test(c) ||
        /Cyborg|Artificiel|N\.E\.X\.U\.S/i
          .test(raceNow)
      ){
        boost([
          'Expérience scientifique',
          'Créé artificiellement',
          'Artefact découvert'
        ],1.5);
      }

      if(
        /Martiale|Clans des steppes|Frontière/i
          .test(c)
      ){
        boost([
          'Vétéran de guerre',
          'Formé depuis l’enfance',
          'Disciple d’un maître'
        ],1.5);
      }

      if(
        /Nomade|Itinérante|Voyageuse|Navigatrice/i
          .test(c)
      ){
        boost([
          'Exilé',
          'Autodidacte',
          'Rescapé d’un autre monde'
        ],1.5);
      }

      if(
        /Spirituelle|Haute-céleste/i.test(c) ||
        L.divineRank
      ){
        boost([
          'Béni',
          'Élu par une prophétie',
          'Pacte mystérieux'
        ],1.5);
      }

      if(
        /Squelette|Liche|Vampire/i
          .test(raceNow)
      ){
        boost([
          'Revenu d’entre les morts',
          'Maudit',
          'Pacte mystérieux'
        ],1.5);
      }
    }
  );
}

export function vaeloriaExtraOptionsFor(
  extras,
  {
    activeArchs=[],
    birthRegion='',
    culture='',
    race='',
    archParts=[]
  }={}
){
  const martial=
    (activeArchs||[])
      .includes('Artiste martial');

  // Règle originale :
  // Artiste martial => pas de Deuxième pouvoir.
  // Autres => pas de Maîtrise du Chi avancée.
  const allowed=martial
    ? (extras||[])
        .filter(x=>x!=='Deuxième pouvoir')
    : (extras||[])
        .filter(
          x=>x!=='Maîtrise du Chi avancée'
        );

  const r=birthRegion||'';
  const c=culture||'';
  const raceNow=race||'';
  const a=(archParts||[]).join(' / ');

  return weightedOptions(
    allowed,
    boost=>{
      if(
        r==='Nexara' ||
        /Nexus|Technopolit|techno/i.test(c) ||
        /Cyborg|Artificiel|N\.E\.X\.U\.S/i
          .test(raceNow)
      ){
        boost([
          'Compagnon artificiel',
          'Armure spéciale',
          'Artefact'
        ]);
      }

      if(
        /Nomade|Navigatrice|Itinérante|Rurale|Frontière/i
          .test(c)
      ){
        boost([
          'Monture',
          'Familier'
        ]);
      }

      if(
        /Spirituelle|Haute-céleste|Contemplative/i
          .test(c)
      ){
        boost([
          'Bénédiction',
          'Objet béni',
          'Lien mystique'
        ]);
      }

      if(/Mage|Sorcier|Invocateur/i.test(a))
        boost([
          'Deuxième pouvoir',
          'Artefact',
          'Lien mystique'
        ]);

      if(
        /Guerrier|Berserker|Slayer|Tireur/i
          .test(a)
      ){
        boost([
          'Deuxième arme',
          'Technique secrète',
          'Armure spéciale'
        ]);
      }
    }
  );
}

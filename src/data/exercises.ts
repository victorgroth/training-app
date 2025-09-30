export const muscleGroups = {
  Bröst: [
    "Bänkpress",
    "Hantelpress",
    "Push-ups",
    "Lutande bänkpress",
    "Kabelcross",
    "Dips",
    "Bröstpressmaskin",
    "Flyes"
  ],
  Axlar: [
    "Militärpress",
    "Hantellyft åt sidan",
    "Arnoldpress",
    "Framåtlutande hantellyft",
    "Shrugs",
    "Face pulls",
    "Stående rodd",
    "Hantellyft framåt"
  ],
  Biceps: [
    "Bicepscurl",
    "Hammercurl",
    "Koncentrationscurl",
    "Scottcurl",
    "21s curls",
    "Zottman curls",
    "Predikatorcurl",
    "Kabelcurl"
  ],
  Triceps: [
    "Tricepsextension",
    "Fransk press",
    "Triceps pushdown",
    "Kickbacks",
    "Close-grip bänkpress",
    "Dips",
    "Skullcrushers",
    "Triceps overhead extension"
  ],
  Rygg: [
    "Marklyft",
    "Chins",
    "Skivstångsrodd",
    "Latsdrag",
    "T-bar rodd",
    "Hantelrodd",
    "Good mornings",
    "Ryggresningar"
  ],
  Mage: [
    "Sit-ups",
    "Plankan",
    "Benspark uppåt",
    "Russian twist",
    "Hängande benlyft",
    "Mountain climbers",
    "Cable crunch",
    "Bicycle crunches"
  ],
  Ben: [
    "Knäböj",
    "Utfall",
    "Benpress",
    "Benspark",
    "Lårcurl",
    "Hip thrust",
    "Vadpress",
    "Frontböj"
  ]
};

export type MuscleGroup = keyof typeof muscleGroups;
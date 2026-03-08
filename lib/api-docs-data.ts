export interface Endpoint {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  path: string
  summary: string
  description: string
  parameters?: Parameter[]
  requestBody?: RequestBody
  responses: Response[]
  example?: {
    request?: string
    response: string
  }
}

export interface Parameter {
  name: string
  in: "path" | "query" | "header"
  required: boolean
  type: string
  description: string
}

export interface RequestBody {
  contentType: string
  schema: Record<string, unknown>
  example: string
}

export interface Response {
  status: number
  description: string
  example?: string
}

export interface ApiSection {
  id: string
  title: string
  titleJp: string
  description: string
  endpoints: Endpoint[]
}

export const BASE_URL = "https://api.jujutsukaisenapi.site/api/v1"

export const apiSections: ApiSection[] = [
  {
    id: "characters",
    title: "Characters",
    titleJp: "キャラクター",
    description: "Access information about all characters — sorcerers, cursed spirits, and more. Supports pagination, filtering, and expanded relational data.",
    endpoints: [
      {
        method: "GET",
        path: "/api/v1/characters",
        summary: "List all characters",
        description: "Returns a paginated list of all characters.",
        parameters: [
          { name: "per_page", in: "query", required: false, type: "integer", description: "Items per page (default: 20, max: 100)" },
          { name: "page", in: "query", required: false, type: "integer", description: "Page number (default: 1)" },
        ],
        responses: [
          { status: 200, description: "Paginated list of characters" },
        ],
        example: {
          response: `{
  "current_page": 1,
  "data": [
    {
      "id": 1,
      "name": "Yuji Itadori",
      "alias": ["Divergent Fist", "Tiger Estoc"],
      "speciesId": 1,
      "birthday": "March 20",
      "height": "173 cm",
      "age": "15",
      "gender": 1,
      "occupationId": [1],
      "affiliationId": [1],
      "animeDebut": "Episode 1",
      "mangaDebut": "Chapter 1",
      "cursedTechniquesIds": [1],
      "gradeId": 4,
      "domainExpansionId": null,
      "battlesId": [1, 2, 3],
      "cursedToolId": [],
      "status": 1,
      "relatives": [],
      "image": "/Media/Characters/1.webp"
    }
  ],
  "first_page_url": "https://api.jujutsukaisenapi.site/api/v1/characters?page=1",
  "from": 1,
  "last_page": 13,
  "last_page_url": "https://api.jujutsukaisenapi.site/api/v1/characters?page=13",
  "next_page_url": "https://api.jujutsukaisenapi.site/api/v1/characters?page=2",
  "path": "https://api.jujutsukaisenapi.site/api/v1/characters",
  "per_page": 20,
  "prev_page_url": null,
  "to": 20,
  "total": 242
}`,
        },
      },
      {
        method: "GET",
        path: "/api/v1/characters/{id}",
        summary: "Get character by ID",
        description: "Returns a single character by numeric ID.",
        parameters: [
          { name: "id", in: "path", required: true, type: "integer", description: "Character ID" },
        ],
        responses: [
          { status: 200, description: "Character object" },
          { status: 404, description: "Character not found" },
        ],
        example: {
          response: `{
  "id": 1,
  "name": "Yuji Itadori",
  "alias": ["Divergent Fist", "Tiger Estoc"],
  "speciesId": 1,
  "birthday": "March 20",
  "height": "173 cm",
  "age": "15",
  "gender": 1,
  "occupationId": [1],
  "affiliationId": [1],
  "animeDebut": "Episode 1",
  "mangaDebut": "Chapter 1",
  "cursedTechniquesIds": [1],
  "gradeId": 4,
  "domainExpansionId": null,
  "battlesId": [1, 2, 3],
  "cursedToolId": [],
  "status": 1,
  "relatives": [],
  "image": "/Media/Characters/1.webp"
}`,
        },
      },
      {
        method: "GET",
        path: "/api/v1/characters/search",
        summary: "Search characters by name",
        description: "Full-text search on character names (case-insensitive, partial match).",
        parameters: [
          { name: "q", in: "query", required: true, type: "string", description: "Search term" },
        ],
        responses: [
          { status: 200, description: "List of matching characters" },
        ],
        example: {
          response: `{
  "data": [
    {
      "id": 1,
      "name": "Yuji Itadori",
      "gradeId": 4,
      "speciesId": 1,
      "status": 1,
      "image": "/Media/Characters/1.webp"
    }
  ]
}`,
        },
      },
      {
        method: "GET",
        path: "/api/v1/characters/with-domain-expansion",
        summary: "Characters with domain expansion",
        description: "Returns all characters that have a domain expansion (domainExpansionId is not null).",
        responses: [
          { status: 200, description: "List of characters with a domain expansion" },
        ],
        example: {
          response: `{
  "data": [
    {
      "id": 2,
      "name": "Satoru Gojo",
      "domainExpansionId": 1,
      "gradeId": 8,
      "image": "/Media/Characters/2.webp"
    }
  ]
}`,
        },
      },
      {
        method: "GET",
        path: "/api/v1/characters/filter/gender/{gender}",
        summary: "Filter by gender",
        description: "Filter characters by gender ID. 1 = Male, 2 = Female, 3 = Genderless.",
        parameters: [
          { name: "gender", in: "path", required: true, type: "integer", description: "Gender ID (1, 2, or 3)" },
        ],
        responses: [
          { status: 200, description: "Filtered list of characters" },
        ],
        example: { response: `{ "data": [ { "id": 1, "name": "Yuji Itadori", "gender": 1 } ] }` },
      },
      {
        method: "GET",
        path: "/api/v1/characters/filter/status/{status}",
        summary: "Filter by status",
        description: "Filter characters by status ID. 1 = Alive, 2 = Dead, 3 = Unknown.",
        parameters: [
          { name: "status", in: "path", required: true, type: "integer", description: "Status ID (1, 2, or 3)" },
        ],
        responses: [
          { status: 200, description: "Filtered list of characters" },
        ],
        example: { response: `{ "data": [ { "id": 1, "name": "Yuji Itadori", "status": 1 } ] }` },
      },
      {
        method: "GET",
        path: "/api/v1/characters/filter/species/{speciesId}",
        summary: "Filter by species",
        description: "Filter characters by species ID. 1=Human, 2=Cursed Spirit, 3=Shikigami, 4=Cursed Womb, 5=Cursed Corpse, 6=Transfigured Human, 7=Incarnate Body, 8=Vengeful Spirit, 9=Immortal.",
        parameters: [
          { name: "speciesId", in: "path", required: true, type: "integer", description: "Species ID" },
        ],
        responses: [
          { status: 200, description: "Filtered list of characters" },
        ],
        example: { response: `{ "data": [ { "id": 1, "name": "Yuji Itadori", "speciesId": 1 } ] }` },
      },
      {
        method: "GET",
        path: "/api/v1/characters/filter/grade/{gradeId}",
        summary: "Filter by grade",
        description: "Filter characters by jujutsu grade ID. 1=Grade 4, 2=Grade 3, 3=Semi-Grade 2, 4=Grade 2, 5=Semi-Grade 1, 6=Grade 1, 7=Semi-Special Grade, 8=Special Grade.",
        parameters: [
          { name: "gradeId", in: "path", required: true, type: "integer", description: "Grade ID (1–8)" },
        ],
        responses: [
          { status: 200, description: "Filtered list of characters" },
        ],
        example: { response: `{ "data": [ { "id": 2, "name": "Satoru Gojo", "gradeId": 8 } ] }` },
      },
      {
        method: "GET",
        path: "/api/v1/characters/filter/affiliation/{affiliationId}",
        summary: "Filter by affiliation",
        description: "Filter characters that belong to a given affiliation ID.",
        parameters: [
          { name: "affiliationId", in: "path", required: true, type: "integer", description: "Affiliation ID" },
        ],
        responses: [
          { status: 200, description: "Filtered list of characters" },
        ],
        example: { response: `{ "data": [ { "id": 1, "name": "Yuji Itadori", "affiliationId": [1] } ] }` },
      },
      {
        method: "GET",
        path: "/api/v1/characters/filter/occupation/{occupationId}",
        summary: "Filter by occupation",
        description: "Filter characters by occupation ID.",
        parameters: [
          { name: "occupationId", in: "path", required: true, type: "integer", description: "Occupation ID" },
        ],
        responses: [
          { status: 200, description: "Filtered list of characters" },
        ],
        example: { response: `{ "data": [ { "id": 1, "name": "Yuji Itadori", "occupationId": [1] } ] }` },
      },
      {
        method: "GET",
        path: "/api/v1/characters/filter/anime-debut/{episode}",
        summary: "Filter by anime debut",
        description: "Filter characters by their anime debut episode string (e.g. Episode 1).",
        parameters: [
          { name: "episode", in: "path", required: true, type: "string", description: "Episode string, e.g. Episode 1" },
        ],
        responses: [
          { status: 200, description: "Filtered list of characters" },
        ],
        example: { response: `{ "data": [ { "id": 1, "name": "Yuji Itadori", "animeDebut": "Episode 1" } ] }` },
      },
      {
        method: "GET",
        path: "/api/v1/characters/filter/manga-debut/{chapter}",
        summary: "Filter by manga debut",
        description: "Filter characters by their manga debut chapter string (e.g. Chapter 1).",
        parameters: [
          { name: "chapter", in: "path", required: true, type: "string", description: "Chapter string, e.g. Chapter 1" },
        ],
        responses: [
          { status: 200, description: "Filtered list of characters" },
        ],
        example: { response: `{ "data": [ { "id": 1, "name": "Yuji Itadori", "mangaDebut": "Chapter 1" } ] }` },
      },
      {
        method: "GET",
        path: "/api/v1/characters/{id}/species",
        summary: "Get character with species expanded",
        description: "Returns the character with their species object expanded.",
        parameters: [
          { name: "id", in: "path", required: true, type: "integer", description: "Character ID" },
        ],
        responses: [
          { status: 200, description: "Character with species data" },
          { status: 404, description: "Character not found" },
        ],
        example: {
          response: `{
  "id": 1,
  "name": "Yuji Itadori",
  "species": {
    "id": 1,
    "name": "Human"
  }
}`,
        },
      },
      {
        method: "GET",
        path: "/api/v1/characters/{id}/affiliations",
        summary: "Get character with affiliations expanded",
        description: "Returns the character with their full affiliation objects expanded.",
        parameters: [
          { name: "id", in: "path", required: true, type: "integer", description: "Character ID" },
        ],
        responses: [
          { status: 200, description: "Character with affiliation data" },
          { status: 404, description: "Character not found" },
        ],
        example: {
          response: `{
  "id": 1,
  "name": "Yuji Itadori",
  "affiliations": [
    {
      "id": 1,
      "affiliation_name": "Tokyo Jujutsu High",
      "description": "...",
      "image": "/Media/Affiliations/Tokyo_Jujutsu_High.webp"
    }
  ]
}`,
        },
      },
      {
        method: "GET",
        path: "/api/v1/characters/{id}/techniques",
        summary: "Get character with techniques expanded",
        description: "Returns the character with their full cursed technique objects expanded.",
        parameters: [
          { name: "id", in: "path", required: true, type: "integer", description: "Character ID" },
        ],
        responses: [
          { status: 200, description: "Character with cursed techniques data" },
          { status: 404, description: "Character not found" },
        ],
        example: {
          response: `{
  "id": 1,
  "name": "Yuji Itadori",
  "cursedTechniques": [
    {
      "id": 1,
      "technique_name": "Divergent Fist",
      "type": 1,
      "range": 1
    }
  ]
}`,
        },
      },
      {
        method: "GET",
        path: "/api/v1/characters/{id}/battles",
        summary: "Get character with battles expanded",
        description: "Returns the character with all battles they participated in expanded.",
        parameters: [
          { name: "id", in: "path", required: true, type: "integer", description: "Character ID" },
        ],
        responses: [
          { status: 200, description: "Character with battles data" },
          { status: 404, description: "Character not found" },
        ],
        example: {
          response: `{
  "id": 1,
  "name": "Yuji Itadori",
  "battles": [
    {
      "id": 1,
      "event": "Yuji vs Junpei",
      "arc": "Cursed Child Arc",
      "result": "..."
    }
  ]
}`,
        },
      },
      {
        method: "GET",
        path: "/api/v1/characters/{id}/full-profile",
        summary: "Get character full profile",
        description: "Returns the character with all relational data fully expanded: species, affiliations, techniques, battles, domain expansion, and tools.",
        parameters: [
          { name: "id", in: "path", required: true, type: "integer", description: "Character ID" },
        ],
        responses: [
          { status: 200, description: "Fully expanded character profile" },
          { status: 404, description: "Character not found" },
        ],
        example: {
          response: `{
  "id": 1,
  "name": "Yuji Itadori",
  "species": { "id": 1, "name": "Human" },
  "affiliations": [ { "id": 1, "affiliation_name": "Tokyo Jujutsu High" } ],
  "cursedTechniques": [ { "id": 1, "technique_name": "Divergent Fist" } ],
  "domainExpansion": null,
  "cursedTools": [],
  "battles": [ { "id": 1, "event": "Yuji vs Junpei" } ]
}`,
        },
      },
      {
        method: "GET",
        path: "/api/v1/characters/{id}/stats",
        summary: "Get character stats",
        description: "Returns a compact stats object for the character.",
        parameters: [
          { name: "id", in: "path", required: true, type: "integer", description: "Character ID" },
        ],
        responses: [
          { status: 200, description: "Character stats object" },
          { status: 404, description: "Character not found" },
        ],
        example: {
          response: `{
  "id": 1,
  "name": "Yuji Itadori",
  "gradeId": 4,
  "status": 1,
  "speciesId": 1,
  "gender": 1,
  "totalBattles": 3,
  "hasDomainExpansion": false
}`,
        },
      },
    ],
  },
  {
    id: "affiliations",
    title: "Affiliations",
    titleJp: "所属",
    description: "Organizations and schools that characters belong to, such as Jujutsu High and the Zenin clan.",
    endpoints: [
      {
        method: "GET",
        path: "/api/v1/affiliations",
        summary: "List all affiliations",
        description: "Returns all affiliations.",
        responses: [
          { status: 200, description: "List of affiliations" },
        ],
        example: {
          response: `[
  {
    "id": 1,
    "affiliation_name": "Tokyo Jujutsu High",
    "description": "Tokyo Prefectural Jujutsu High School, one of the two main training institutions for jujutsu sorcerers.",
    "image": "/Media/Affiliations/Tokyo_Jujutsu_High.webp"
  },
  {
    "id": 2,
    "affiliation_name": "Kyoto Jujutsu High",
    "description": "The Kyoto sister school to Tokyo Jujutsu High.",
    "image": "/Media/Affiliations/Kyoto_Jujutsu_High.webp"
  }
]`,
        },
      },
      {
        method: "GET",
        path: "/api/v1/affiliations/{id}",
        summary: "Get affiliation by ID",
        description: "Returns a single affiliation by ID.",
        parameters: [
          { name: "id", in: "path", required: true, type: "integer", description: "Affiliation ID" },
        ],
        responses: [
          { status: 200, description: "Affiliation object" },
          { status: 404, description: "Affiliation not found" },
        ],
        example: {
          response: `{
  "id": 1,
  "affiliation_name": "Tokyo Jujutsu High",
  "description": "Tokyo Prefectural Jujutsu High School, one of the two main training institutions for jujutsu sorcerers.",
  "image": "/Media/Affiliations/Tokyo_Jujutsu_High.webp"
}`,
        },
      },
    ],
  },
  {
    id: "cursed-techniques",
    title: "Cursed Techniques",
    titleJp: "呪術",
    description: "All cursed techniques documented in the series. Supports filtering by type and range, and keyword search.",
    endpoints: [
      {
        method: "GET",
        path: "/api/v1/cursed-techniques",
        summary: "List cursed techniques",
        description: "Returns a paginated list of cursed techniques. Supports filtering via query parameters.",
        parameters: [
          { name: "per_page", in: "query", required: false, type: "integer", description: "Items per page (max 100)" },
          { name: "search", in: "query", required: false, type: "string", description: "Search in technique_name and description" },
          { name: "type", in: "query", required: false, type: "integer", description: "Filter by technique type ID" },
          { name: "range", in: "query", required: false, type: "integer", description: "Filter by range ID" },
        ],
        responses: [
          { status: 200, description: "Paginated list of cursed techniques" },
        ],
        example: {
          response: `{
  "current_page": 1,
  "data": [
    {
      "id": 1,
      "technique_name": "Divergent Fist",
      "description": "A technique that sends a delayed shockwave of cursed energy into the target after impact.",
      "type": 1,
      "range": 1,
      "users": [1],
      "image": "/Media/CursedTechniques/1.webp"
    },
    {
      "id": 2,
      "technique_name": "Limitless",
      "description": "Brings the concept of infinity into reality, manipulating space at an atomic level.",
      "type": 7,
      "range": 4,
      "users": [2],
      "image": "/Media/CursedTechniques/2.webp"
    }
  ],
  "total": 80,
  "per_page": 20,
  "last_page": 4
}`,
        },
      },
      {
        method: "GET",
        path: "/api/v1/cursed-techniques/{id}",
        summary: "Get cursed technique by ID",
        description: "Returns a single technique by ID.",
        parameters: [
          { name: "id", in: "path", required: true, type: "integer", description: "Technique ID" },
        ],
        responses: [
          { status: 200, description: "Cursed technique object" },
          { status: 404, description: "Cursed technique not found" },
        ],
        example: {
          response: `{
  "id": 2,
  "technique_name": "Limitless",
  "description": "Brings the concept of infinity into reality, manipulating space at an atomic level.",
  "type": 7,
  "range": 4,
  "users": [2],
  "image": "/Media/CursedTechniques/2.webp"
}`,
        },
      },
      {
        method: "GET",
        path: "/api/v1/cursed-techniques/filter/type/{type}",
        summary: "Filter by technique type",
        description: "Filter techniques by type ID. 1=Innate Technique, 2=Extension Technique, 3=Cursed Spirit, 4=Barrier Techniques, 5=Anti-Domain Technique, 6=Shikigami Control, 7=Inherited Techniques, 8=Shikigami Ability, 9=Taijutsu, 10=Restriction, 11=Reverse Technique, 12=New Shadow Style Technique, 13=Cursed Spirit Ability.",
        parameters: [
          { name: "type", in: "path", required: true, type: "integer", description: "Technique type ID (1–13)" },
        ],
        responses: [
          { status: 200, description: "Filtered list of techniques" },
        ],
        example: {
          response: `{
  "data": [
    {
      "id": 2,
      "technique_name": "Limitless",
      "type": 7,
      "range": 4,
      "users": [2]
    }
  ]
}`,
        },
      },
    ],
  },
  {
    id: "cursed-tools",
    title: "Cursed Tools",
    titleJp: "呪具",
    description: "Weapons and tools imbued with cursed energy, used by sorcerers in battle.",
    endpoints: [
      {
        method: "GET",
        path: "/api/v1/cursed-tools",
        summary: "List all cursed tools",
        description: "Returns all cursed tools.",
        responses: [
          { status: 200, description: "List of cursed tools" },
        ],
        example: {
          response: `[
  {
    "id": 1,
    "name": "Playful Cloud",
    "type": "Special Grade",
    "owners": [3],
    "description": "A special grade cursed tool consisting of three sections connected by chains.",
    "image": "/Media/CursedTools/1.webp"
  },
  {
    "id": 2,
    "name": "Inverted Spear of Heaven",
    "type": "Special Grade",
    "owners": [4],
    "description": "Nullifies any cursed technique it touches.",
    "image": "/Media/CursedTools/2.webp"
  }
]`,
        },
      },
      {
        method: "GET",
        path: "/api/v1/cursed-tools/{id}",
        summary: "Get cursed tool by ID",
        description: "Returns a single tool by ID.",
        parameters: [
          { name: "id", in: "path", required: true, type: "integer", description: "Tool ID" },
        ],
        responses: [
          { status: 200, description: "Cursed tool object" },
          { status: 404, description: "Cursed tool not found" },
        ],
        example: {
          response: `{
  "id": 1,
  "name": "Playful Cloud",
  "type": "Special Grade",
  "owners": [3],
  "description": "A special grade cursed tool consisting of three sections connected by chains.",
  "image": "/Media/CursedTools/1.webp"
}`,
        },
      },
      {
        method: "GET",
        path: "/api/v1/cursed-tools/filter/type/{type}",
        summary: "Filter by type",
        description: "Filter tools by type string (e.g. Special Grade, Grade 1).",
        parameters: [
          { name: "type", in: "path", required: true, type: "string", description: "Tool type string" },
        ],
        responses: [
          { status: 200, description: "Filtered list of cursed tools" },
        ],
        example: {
          response: `[
  { "id": 1, "name": "Playful Cloud", "type": "Special Grade" }
]`,
        },
      },
    ],
  },
  {
    id: "domain-expansions",
    title: "Domain Expansions",
    titleJp: "領域展開",
    description: "The ultimate technique of jujutsu sorcery — manifesting one's inner world to guarantee technique hits.",
    endpoints: [
      {
        method: "GET",
        path: "/api/v1/domain-expansions",
        summary: "List all domain expansions",
        description: "Returns all domain expansions.",
        responses: [
          { status: 200, description: "List of domain expansions" },
        ],
        example: {
          response: `[
  {
    "id": 1,
    "name": "Unlimited Void",
    "user": 2,
    "range": "Infinite",
    "Type": "Binding Vow",
    "description": "Floods the target with infinite information, rendering them unable to act.",
    "image": "/Media/DomainExpansions/1.webp"
  },
  {
    "id": 2,
    "name": "Malevolent Shrine",
    "user": 10,
    "range": "200m radius",
    "Type": "Open Domain",
    "description": "A divine technique manifesting a Buddhist shrine that continuously slashes everything within range.",
    "image": "/Media/DomainExpansions/2.webp"
  }
]`,
        },
      },
      {
        method: "GET",
        path: "/api/v1/domain-expansions/{id}",
        summary: "Get domain expansion by ID",
        description: "Returns a single domain expansion by ID.",
        parameters: [
          { name: "id", in: "path", required: true, type: "integer", description: "Domain expansion ID" },
        ],
        responses: [
          { status: 200, description: "Domain expansion object" },
          { status: 404, description: "Domain expansion not found" },
        ],
        example: {
          response: `{
  "id": 1,
  "name": "Unlimited Void",
  "user": 2,
  "range": "Infinite",
  "Type": "Binding Vow",
  "description": "Floods the target with infinite information, rendering them unable to act.",
  "image": "/Media/DomainExpansions/1.webp"
}`,
        },
      },
      {
        method: "GET",
        path: "/api/v1/domain-expansions/user/{userId}",
        summary: "Get domain expansions by user",
        description: "Returns all domain expansions belonging to the character with the given userId.",
        parameters: [
          { name: "userId", in: "path", required: true, type: "integer", description: "Character ID" },
        ],
        responses: [
          { status: 200, description: "List of domain expansions for the character" },
        ],
        example: {
          response: `[
  {
    "id": 1,
    "name": "Unlimited Void",
    "user": 2,
    "range": "Infinite",
    "Type": "Binding Vow",
    "description": "Floods the target with infinite information.",
    "image": "/Media/DomainExpansions/1.webp"
  }
]`,
        },
      },
    ],
  },
  {
    id: "battles",
    title: "Battles",
    titleJp: "戦闘",
    description: "Records of battles and confrontations throughout the series, organized by arc.",
    endpoints: [
      {
        method: "GET",
        path: "/api/v1/battles",
        summary: "List all battles",
        description: "Returns a paginated list of battles. Supports filtering.",
        parameters: [
          { name: "per_page", in: "query", required: false, type: "integer", description: "Items per page (max 100)" },
          { name: "search", in: "query", required: false, type: "string", description: "Search in event and result fields" },
          { name: "arc", in: "query", required: false, type: "string", description: "Filter by arc name" },
        ],
        responses: [
          { status: 200, description: "Paginated list of battles" },
        ],
        example: {
          response: `{
  "current_page": 1,
  "data": [
    {
      "id": 1,
      "event": "Yuji vs Junpei",
      "result": "Sukuna takes control of Yuji's body and fatally wounds Junpei.",
      "arc": "Cursed Child Arc",
      "date": null,
      "location": "Satozakura High School",
      "location_data": 5,
      "participants": [1, 12],
      "nonDirectParticipants": [],
      "image": "/Media/Battles/1.webp"
    }
  ],
  "total": 95,
  "per_page": 20
}`,
        },
      },
      {
        method: "GET",
        path: "/api/v1/battles/{id}",
        summary: "Get battle by ID",
        description: "Returns a single battle by ID.",
        parameters: [
          { name: "id", in: "path", required: true, type: "integer", description: "Battle ID" },
        ],
        responses: [
          { status: 200, description: "Battle object" },
          { status: 404, description: "Battle not found" },
        ],
        example: {
          response: `{
  "id": 1,
  "event": "Yuji vs Junpei",
  "result": "Sukuna takes control of Yuji's body and fatally wounds Junpei.",
  "arc": "Cursed Child Arc",
  "date": null,
  "location": "Satozakura High School",
  "location_data": 5,
  "participants": [1, 12],
  "nonDirectParticipants": [],
  "image": "/Media/Battles/1.webp"
}`,
        },
      },
      {
        method: "GET",
        path: "/api/v1/battles/filter/arc/{arc}",
        summary: "Filter by arc",
        description: "Filter battles by arc name string.",
        parameters: [
          { name: "arc", in: "path", required: true, type: "string", description: "Arc name string" },
        ],
        responses: [
          { status: 200, description: "Battles from the specified arc" },
        ],
        example: {
          response: `{
  "data": [
    {
      "id": 1,
      "event": "Yuji vs Junpei",
      "arc": "Cursed Child Arc"
    }
  ]
}`,
        },
      },
    ],
  },
  {
    id: "locations",
    title: "Locations",
    titleJp: "場所",
    description: "Places where events in the story take place, from schools to cursed domains.",
    endpoints: [
      {
        method: "GET",
        path: "/api/v1/locations",
        summary: "List all locations",
        description: "Returns all locations.",
        responses: [
          { status: 200, description: "List of locations" },
        ],
        example: {
          response: `[
  {
    "id": 1,
    "location_name": "Tokyo Prefectural Jujutsu High School",
    "located_in": "Tokyo, Japan",
    "description": "The main school for jujutsu sorcerers in eastern Japan.",
    "events": [1, 5],
    "image": "/Media/Locations/1.webp"
  }
]`,
        },
      },
      {
        method: "GET",
        path: "/api/v1/locations/{id}",
        summary: "Get location by ID",
        description: "Returns a single location by ID.",
        parameters: [
          { name: "id", in: "path", required: true, type: "integer", description: "Location ID" },
        ],
        responses: [
          { status: 200, description: "Location object" },
          { status: 404, description: "Location not found" },
        ],
        example: {
          response: `{
  "id": 1,
  "location_name": "Tokyo Prefectural Jujutsu High School",
  "located_in": "Tokyo, Japan",
  "description": "The main school for jujutsu sorcerers in eastern Japan.",
  "events": [1, 5],
  "image": "/Media/Locations/1.webp"
}`,
        },
      },
      {
        method: "GET",
        path: "/api/v1/locations/search",
        summary: "Search locations",
        description: "Search locations by location_name or located_in (partial, case-insensitive).",
        parameters: [
          { name: "q", in: "query", required: true, type: "string", description: "Search term" },
        ],
        responses: [
          { status: 200, description: "Matching locations" },
        ],
        example: {
          response: `[
  {
    "id": 1,
    "location_name": "Tokyo Prefectural Jujutsu High School",
    "located_in": "Tokyo, Japan"
  }
]`,
        },
      },
    ],
  },
  {
    id: "arcs",
    title: "Arcs",
    titleJp: "アーク",
    description: "Story arcs covering the major events in the Jujutsu Kaisen manga and anime.",
    endpoints: [
      {
        method: "GET",
        path: "/api/v1/arcs",
        summary: "List all arcs",
        description: "Returns all story arcs.",
        responses: [
          { status: 200, description: "List of arcs" },
        ],
        example: {
          response: `[
  {
    "id": 1,
    "name": "Cursed Child Arc",
    "manga": "Chapters 1–8",
    "anime": ["Season 1", "Episodes 1–5"],
    "image": "/Media/ArcsCovers/1.webp"
  },
  {
    "id": 2,
    "name": "Cursed Training Arc",
    "manga": "Chapters 9–20",
    "anime": ["Season 1", "Episodes 6–13"],
    "image": "/Media/ArcsCovers/2.webp"
  }
]`,
        },
      },
      {
        method: "GET",
        path: "/api/v1/arcs/{id}",
        summary: "Get arc by ID",
        description: "Returns a single arc by ID.",
        parameters: [
          { name: "id", in: "path", required: true, type: "integer", description: "Arc ID" },
        ],
        responses: [
          { status: 200, description: "Arc object" },
          { status: 404, description: "Arc not found" },
        ],
        example: {
          response: `{
  "id": 1,
  "name": "Cursed Child Arc",
  "manga": "Chapters 1–8",
  "anime": ["Season 1", "Episodes 1–5"],
  "image": "/Media/ArcsCovers/1.webp"
}`,
        },
      },
    ],
  },
  {
    id: "anime-episodes",
    title: "Anime Episodes",
    titleJp: "アニメ",
    description: "All anime episodes from every season, with air dates, themes, and adapted chapters.",
    endpoints: [
      {
        method: "GET",
        path: "/api/v1/anime-episodes",
        summary: "List anime episodes",
        description: "Returns a paginated list of anime episodes.",
        parameters: [
          { name: "per_page", in: "query", required: false, type: "integer", description: "Items per page (default: 20, max: 100)" },
          { name: "page", in: "query", required: false, type: "integer", description: "Page number (default: 1)" },
        ],
        responses: [
          { status: 200, description: "Paginated list of episodes" },
        ],
        example: {
          response: `{
  "current_page": 1,
  "data": [
    {
      "id": 1,
      "episode_number": "1",
      "arc": 1,
      "season": "Season 1",
      "title": "Ryomen Sukuna",
      "mangachapters_adapted": "Chapters 1-3",
      "air_date": "2020-10-03",
      "opening_theme": "Kaikai Kitan",
      "ending_theme": "lost in paradise",
      "image": "/Media/AnimeEpisodes/1.webp"
    }
  ],
  "total": 61,
  "per_page": 20
}`,
        },
      },
      {
        method: "GET",
        path: "/api/v1/anime-episodes/{id}",
        summary: "Get episode by ID",
        description: "Returns a single episode by ID.",
        parameters: [
          { name: "id", in: "path", required: true, type: "integer", description: "Episode ID" },
        ],
        responses: [
          { status: 200, description: "Episode object" },
          { status: 404, description: "Episode not found" },
        ],
        example: {
          response: `{
  "id": 1,
  "episode_number": "1",
  "arc": 1,
  "season": "Season 1",
  "title": "Ryomen Sukuna",
  "mangachapters_adapted": "Chapters 1-3",
  "air_date": "2020-10-03",
  "opening_theme": "Kaikai Kitan",
  "ending_theme": "lost in paradise",
  "image": "/Media/AnimeEpisodes/1.webp"
}`,
        },
      },
      {
        method: "GET",
        path: "/api/v1/anime-episodes/filter/season/{season}",
        summary: "Filter by season",
        description: "Filter episodes by season string (e.g. Season 1).",
        parameters: [
          { name: "season", in: "path", required: true, type: "string", description: "Season string, e.g. Season 1" },
        ],
        responses: [
          { status: 200, description: "Episodes from the specified season" },
        ],
        example: {
          response: `{
  "data": [
    { "id": 1, "episode_number": "1", "season": "Season 1", "title": "Ryomen Sukuna" }
  ]
}`,
        },
      },
      {
        method: "GET",
        path: "/api/v1/anime-episodes/filter/arc/{arcId}",
        summary: "Filter by arc",
        description: "Filter episodes that belong to the given arc ID.",
        parameters: [
          { name: "arcId", in: "path", required: true, type: "integer", description: "Arc ID" },
        ],
        responses: [
          { status: 200, description: "Episodes from the specified arc" },
        ],
        example: {
          response: `{
  "data": [
    { "id": 1, "episode_number": "1", "arc": 1, "title": "Ryomen Sukuna" }
  ]
}`,
        },
      },
    ],
  },
  {
    id: "manga-volumes",
    title: "Manga Volumes",
    titleJp: "漫画巻",
    description: "All tankōbon volumes with release dates, chapters covered, and cover characters.",
    endpoints: [
      {
        method: "GET",
        path: "/api/v1/manga-volumes",
        summary: "List manga volumes",
        description: "Returns all manga volumes.",
        responses: [
          { status: 200, description: "List of manga volumes" },
        ],
        example: {
          response: `[
  {
    "id": 1,
    "volume_number": "1",
    "volume_name": "Ryomen Sukuna",
    "release_date": "2018-12-04",
    "pages": 192,
    "chapters": "Chapters 1-8",
    "cover_character": "Yuji Itadori",
    "image": "/Media/MangaVolumes/1.webp"
  },
  {
    "id": 2,
    "volume_number": "2",
    "volume_name": "To You, Someday",
    "release_date": "2019-03-04",
    "pages": 192,
    "chapters": "Chapters 9-17",
    "cover_character": "Megumi Fushiguro",
    "image": "/Media/MangaVolumes/2.webp"
  }
]`,
        },
      },
      {
        method: "GET",
        path: "/api/v1/manga-volumes/{id}",
        summary: "Get manga volume by ID",
        description: "Returns a single volume by ID.",
        parameters: [
          { name: "id", in: "path", required: true, type: "integer", description: "Volume ID" },
        ],
        responses: [
          { status: 200, description: "Manga volume object" },
          { status: 404, description: "Manga volume not found" },
        ],
        example: {
          response: `{
  "id": 1,
  "volume_number": "1",
  "volume_name": "Ryomen Sukuna",
  "release_date": "2018-12-04",
  "pages": 192,
  "chapters": "Chapters 1-8",
  "cover_character": "Yuji Itadori",
  "image": "/Media/MangaVolumes/1.webp"
}`,
        },
      },
    ],
  },
  {
    id: "species",
    title: "Species",
    titleJp: "種族",
    description: "Species types referenced by characters. 1=Human, 2=Cursed Spirit, 3=Shikigami, 4=Cursed Womb, 5=Cursed Corpse, 6=Transfigured Human, 7=Incarnate Body, 8=Vengeful Spirit, 9=Immortal.",
    endpoints: [
      {
        method: "GET",
        path: "/api/v1/species",
        summary: "List all species",
        description: "Returns all species entries.",
        responses: [
          { status: 200, description: "List of species" },
        ],
        example: {
          response: `[
  { "id": 1, "name": "Human" },
  { "id": 2, "name": "Cursed Spirit" },
  { "id": 3, "name": "Shikigami" },
  { "id": 4, "name": "Cursed Womb" },
  { "id": 5, "name": "Cursed Corpse" },
  { "id": 6, "name": "Transfigured Human" },
  { "id": 7, "name": "Incarnate Body" },
  { "id": 8, "name": "Vengeful Spirit" },
  { "id": 9, "name": "Immortal" }
]`,
        },
      },
      {
        method: "GET",
        path: "/api/v1/species/{id}",
        summary: "Get species by ID",
        description: "Returns a single species by ID.",
        parameters: [
          { name: "id", in: "path", required: true, type: "integer", description: "Species ID" },
        ],
        responses: [
          { status: 200, description: "Species object" },
          { status: 404, description: "Species not found" },
        ],
        example: { response: `{ "id": 1, "name": "Human" }` },
      },
    ],
  },
  {
    id: "occupations",
    title: "Occupations",
    titleJp: "職業",
    description: "Occupation roles that characters hold, such as Student, Sorcerer, or Curse User.",
    endpoints: [
      {
        method: "GET",
        path: "/api/v1/occupations",
        summary: "List all occupations",
        description: "Returns all occupations.",
        responses: [
          { status: 200, description: "List of occupations" },
        ],
        example: {
          response: `[
  { "id": 1, "name": "Student" },
  { "id": 2, "name": "Sorcerer" },
  { "id": 3, "name": "Curse User" },
  { "id": 4, "name": "Teacher" }
]`,
        },
      },
      {
        method: "GET",
        path: "/api/v1/occupations/{id}",
        summary: "Get occupation by ID",
        description: "Returns a single occupation by ID.",
        parameters: [
          { name: "id", in: "path", required: true, type: "integer", description: "Occupation ID" },
        ],
        responses: [
          { status: 200, description: "Occupation object" },
          { status: 404, description: "Occupation not found" },
        ],
        example: { response: `{ "id": 1, "name": "Student" }` },
      },
    ],
  },
]

export const methodColors: Record<string, { bg: string; text: string; border: string }> = {
  GET: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30" },
  POST: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30" },
  PUT: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30" },
  DELETE: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/30" },
  PATCH: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/30" },
}
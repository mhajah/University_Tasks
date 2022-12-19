enum Endpoints {
    ELIXIRS = "Elixirs",
    SPELLS = "Spells",
    HOUSES = "Houses",
    INGREDIENTS = "Ingredients",
    WIZARDS = "Wizards"
};

enum Objects {
    ELIXIRS = 0,
    SPELLS = 1,
    HOUSES = 2,
    INGREDIENTS = 3,
    WIZARDS = 4
};

const difficulty = ["Uknown", "Advanced", "Moderate", "Begginer", "OrdinaryWizardingLevel", "OneOfAKind"] as const;
const typeOfSpell = [
    'None',
    'Charm',
    'Conjuration',
    'Spell',
    'Transfiguration',
    'HealingSpell',
    'DarkCharm',
    'Jinx',
    'Curse',
    'MagicalTransportation',
    'Hex',
    'CounterSpell',
    'DarkArts',
    'CounterJinx',
    'CounterCharm',
    'Untransfiguration',
    'BindingMagicalContract',
    'Vanishment'
] as const;

type elixirs = {
    name: string,
    effect: string,
    sideEffects: string,
    characteristics: string,
    time: string,
    difficulty: typeof difficulty[],
    ingredients: string,
    inventors: string,
    manufacturer: string
}

type spells = {
    name: string, 
    type: typeof typeOfSpell[], 
    incantation: string,
    effect: string,
    canBeVerbal: boolean,
    light: string,
    creator: string
}

let elixirs: elixirs[];
let spells: spells[];

class FetchError extends Error {
    constructor(response: number | string) {
        if (typeof response === "number") {
            super(`Error code: ${response}`);
        } else {
            super(response);
        }
    }
}

const fetchData = async <T>(endpoint: Endpoints): Promise<T[]> => {
    try {
        const response = await fetch(
            `https://wizard-world-api.herokuapp.com/${endpoint}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.ok === false) {
            throw new FetchError(response.status);
        }

        return response.json() as Promise<T[]>;
    } catch (e) {
        if (e instanceof TypeError && e.message.includes("NetworkError")) {
            throw new FetchError(e.message);
        }

        throw e;
    }
};

const getElixirs = async () => {
    const data = await fetchData<elixirs>(Endpoints.ELIXIRS);

    return data.filter(
        ({ name, effect }) => name?.length > 0 && effect?.length > 0
    );
};

const getSpells = async () => {
    const data = await fetchData<spells>(Endpoints.SPELLS);

    return data.filter(
        ({ name, incantation }) => name?.length > 0 && incantation?.length > 0
    );
};

const getRandomNumber = (maxNumber: number) => Math.floor(Math.random() * maxNumber);

const getThreeOptions = <T extends (elixirs | spells)>(objects: T[]) => {
    const set = new Set<number>();

    while (set.size < 3) {
        set.add(getRandomNumber(objects.length));
    }

    const [first, second, third] = set;

    return {
        option1: objects[first],
        option2: objects[second],
        option3: objects[third],
    };
};

type options = {
    question: string,
    answer: string
}

const generateGame = (options: options[], questionFunction: Function) => {
    const valid = getRandomNumber(3);

    console.log(`Cheatmode: Valid option is option ${valid + 1}`);

    document.getElementById("question")!.innerText = questionFunction(
        options[valid].question
    );

    document.getElementById("option1")!.innerText = options[0].answer;
    document.getElementById("option2")!.innerText = options[1].answer;
    document.getElementById("option3")!.innerText = options[2].answer;

    document.getElementById("options")!.addEventListener("click", (e) => {
        const target = e.target as HTMLInputElement;

        if (target.tagName !== "BUTTON") return;

        if (Number(target.dataset.option) === valid) {
            document.getElementById("response")!.innerText = "Good!";
            round();
            return;
        }

        document.getElementById("response")!.innerText = "Wrong!";
    });
};

const round = () => {
    const game = getRandomNumber(2);

    const optionsElement = `
      <div id="options">
        <button id="option1" data-option="0"></button>
        <button id="option2" data-option="1"></button>
        <button id="option3" data-option="2"></button>
      </div>
    `;

    document.getElementById("game")!.innerHTML = optionsElement;

    if (game === Objects.ELIXIRS) {
        const { option1, option2, option3 } = getThreeOptions(elixirs);

        const options = [option1, option2, option3].map((option) => ({
            question: option.name,
            answer: option.effect,
        }));

        generateGame(options, (question: string) => `Elixir ${question} has effect:`);
    }

    if (game === Objects.SPELLS) {
        const { option1, option2, option3 } = getThreeOptions(spells);

        const options = [option1, option2, option3].map((option) => ({
            question: option.name,
            answer: option.incantation,
        }));

        generateGame(options, (question: string) => `Spell ${question} has incantation:`);
    }
};

const game = async () => {
    try {
        [elixirs, spells] = await Promise.all([getElixirs(), getSpells()]);

        round();
    } catch (e) {
        document.getElementById("game")!.innerHTML = "";
        document.getElementById("question")!.innerHTML = "";

        if (e instanceof FetchError) {
            document.getElementById("response")!.innerText =
                "Problem with the connection. Try refreshing the page.";
            return;
        }

        //document.getElementById("response")!.innerText = e.message;
    }
};

function isSpell(s: spells | elixirs): s is spells {
    return 'incantation' in s;
}

function isElixir(e: spells | elixirs): e is elixirs {
    return 'ingredients' in e;
}

const check = (object: elixirs | spells) => {
    if (isSpell(object)) {
        console.log(object.incantation)
    }

    if (isElixir(object)) {
        console.log(object.ingredients)
    }
}

game();
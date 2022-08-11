const firstNames = [
    'trevor',
    'tom',
    'jordan',
    'fredo',
    'ella',
    'milo',
    'adan',
    'sophie',
    'grace',
    'millie',
    'mio',
    'sophia',
    'carmy',
    'rosie',
    'aria',
    'evie',
    'josie',
    'lucy',
    'mia',
    'eilidh',
    'ellie',
    'lip',
    'orla',
    'jaime',
    'harper',
    'maya',
    'willow',
    'genghis',
    'leo',
    'sofia',
    'mila',
    'isabella',
    'ronnie',
    'hannah',
    'skye',
    'lacieniga',
    'molly',
    'hallie',
    'jennifer',
    'penny',
    'eva',
    'esme',
    'anna',
    'ariana',
    'roxie',
    'callie',
    'zara',
    'layla',
    'emma',
    'robyn',
    'chloe',
    'jack',
    'noah',
    'leo',
    'oliver',
    'harris',
    'finlay',
    'lewis',
    'james',
    'rory',
    'alexander',
    'brodie',
    'alfie',
    'can',
    'cody',
    'archie',
    'lucas',
    'mason',
    'finn',
    'thomas',
    'freddie',
    'max',
    'dimitry',
    'harry',
    'jacob',
    'nevil',
    'luca',
    'oscar',
    'jude',
    'william',
    'caleb',
    'roman',
    'cameron',
    'jaxon',
    'adam',
    'terry',
    'jake',
    'rose',
    'hannah',
    'ethan',
    'harrison',
    'luke',
    'arthur',
    'muhammad',
    'jamie',
    'liam',
    'reuben',
    'arlo',
    'grayson',
    'hunter',
    'kai',
    'aaron'
];
const lastNames = [
    'elsher',
    'solace',
    'levine',
    'thatcher',
    'raven',
    'vargas',
    'james',
    'johnson',
    'cromwell',
    'ashley',
    'davis',
    'west',
    'langley',
    'daughtler',
    'madison',
    'marley',
    'ellis',
    'hope',
    'cassidy',
    'lopez',
    'jenkins',
    'poverly',
    'mckenna',
    'gonzales',
    'keller',
    'collymore',
    'stoll',
    'miller',
    'adler',
    'huxley',
    'ledger',
    'hayes',
    'ford',
    'finnegan',
    'beckett',
    'gatlin',
    'dick',
    'zimmerman',
    'jacobs',
    'wilson',
    'heffernan',
    'gray',
    'curran',
    'crassus',
    'anderson',
    'adams',
    'gay',
    'hendrix',
    'lennon',
    'casper'
];
const emails = [
    '@gmail.com',
    '@yahoo.com',
    '@hotmail.com',
    '@outlook.com',
    '@live.com',
    '@icloud.com',
    '@aol.com',
    '@firstlookappraisals.com',
    '@industria.com'
];

const thoughts = [
    ' hates when you drop your ice cream!',
    ' never went to see the live action Lion King.',
    ' wonders what its like to be a billionairre.',
    ' reada a book twice a day',
    " doesn't like to waste their time, or anyone else's time!",
    ' was catfished when they met their online date at the club!',
    ' has a pet cricket named Jimmy.',
    ' wants to be a web developer'
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomUser = () => {
    const fName = getRandomArrItem(firstNames);
    const lName = getRandomArrItem(lastNames);
    const uName = `${fName}.${lName}`
    const email = `${uName}${getRandomArrItem(emails)}`;
    return { uName, email };
}

const getRandomThoughts = (user) => {
    const rand = Math.floor(Math.random() * 3);
    let result = [];
    for(let i=0; i<rand; i++){
        const end = getRandomArrItem(thoughts);
        const name = getRandomArrItem(firstNames);
        result.push(
            {
                thoughtText: `${name}${end}`,
                username: `${user.username}`,
                email: `${user.email}`
            }
        )
    }
    return result;
}

module.exports = { getRandomUser, getRandomThoughts };
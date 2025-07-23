import { TimelineStage } from '../types';

export const sampleData: TimelineStage[] = [
    {
        id: 'stage-1',
        title: 'The Beginning',
        year: "2005-2022",
        description: 'Where it all started...',
        isUnlocked: true,
        requiresAllChaptersRead: true,
        stories: [
            {
                id: 'story-1',
                title: 'The Boy Who Chased the Sun',
                author: 'Eleanor Blackwood',
                description: 'A boy’s laughter drowns in war’s ink, until love teaches him to read the dark.',
                cover: 'https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/16616d12-f9f4-47eb-b668-0f3819001cc5/Picsart_22-05-17_00-52-25-337.jpg?format=1000w',
                isUnlocked: true,
                unlockOrder: 1,
                chapters: [
                    {
                        id: 'ch-1-1',
                        title: 'The Unbroken Song',
                        content: `# The Unbroken Song

The boy knew only one truth: the world was kind.

While mothers clutched their children tighter at the sound of marching boots, he marveled at the soldiers’ shiny buttons. When the harvest failed, he licked his fingers after sharing his last crust of bread, grinning as if it were a feast. "Tomorrow will be better," he’d declare, and because he believed it, others almost did too.

*Almost.*

People called him "sun-eyed" — not for his brightness, but because he stared at life unblinking, never seeing the cracks.

"How?" asked the old weaver, her hands gnarled from years of labor. "How do you not see?"
"See what?" the boy replied, spinning in the dust, arms wide as if to hug the sky.

The weaver said nothing. She knew: joy this pure was either a miracle or a wound waiting to be salted.

But the boy danced on, his laughter a shield against the dark.

Until the day the shield cracked.`,
                        isRead: false,
                    }
                    
                ]
            }
        ]
    },
    {
        id: 'stage-2',
        title: 'The Turning Point',
        year: "24-02-2022",
        description: 'When everything changed...',
        isUnlocked: false,
        requiresAllChaptersRead: true,
        stories: [
            {
                id: 'story-2',
                title: 'The Boy Who Chased the Sun',
                author: 'Eleanor Blackwood',
                description: 'A boy’s laughter drowns in war’s ink, until love teaches him to read the dark.',
                cover: 'https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/3ff28187-7600-46dc-ace8-e1dc5651586c/5-of-cups.jpg?format=1000w',
                isUnlocked: true,
                unlockOrder: 2,
                chapters: [
                    {
                        id: 'ch-2-1',
                        title: 'The Unbroken Song',
                        content: `# The Unbroken Song

The boy knew only one truth: the world was kind.

While mothers clutched their children tighter at the sound of marching boots, he marveled at the soldiers’ shiny buttons. When the harvest failed, he licked his fingers after sharing his last crust of bread, grinning as if it were a feast. "Tomorrow will be better," he’d declare, and because he believed it, others almost did too.

*Almost.*

People called him "sun-eyed" — not for his brightness, but because he stared at life unblinking, never seeing the cracks.

"How?" asked the old weaver, her hands gnarled from years of labor. "How do you not see?"
"See what?" the boy replied, spinning in the dust, arms wide as if to hug the sky.

The weaver said nothing. She knew: joy this pure was either a miracle or a wound waiting to be salted.

But the boy danced on, his laughter a shield against the dark.

Until the day the shield cracked.`,
                        isRead: true,
                    },
                    {
                        id: 'ch-2-2',
                        title: 'The Note That Stole Laughter',
                        content: `# The Note That Stole Laughter

The war drums began, and the boy watched his world fracture.

He found the note caught in the brambles by the riverbank — just three words on sun-bleached paper:

"I love you."

The signature was painfully familiar. He knew this message was addressed to him.

Around him, the village transformed. His friends traded fishing poles for rifles, their grins stretching too wide. The blacksmith's hammer rang with a new, urgent rhythm. At night, his father whispered numbers — how many bushels of wheat the army would take, how many sons their family owed.

"You should be proud," his mother said.
"I just want everyone to be happy," he murmured.
"Then stand with us!"

But he couldn't.

Because he'd seen the butcher's face when he packed his cleavers for the front — not fury, but fear. Heard the way Old Man's cough went untreated after the doctors left. The war wasn't making them strong; it was making them pretend they weren't breaking.

The note stayed in his pocket, folded small as a wound. Some days he took it out, tracing the letters until his fingers grew numb.

On the morning of the first battle, when the church bells rang for blood, he walked east instead of west—toward the rising sun, away from the smoke. In his satchel: a harmonica he'd never learned to play properly and the note, now soft as a bruise from handling.

The road ahead was empty. Behind him, cheers rose like flames.

And though he couldn't laugh anymore, his hands stayed clean.`,
                        isRead: false,
                    }
                ]
            },
            
            
        ]
    },
    {
        id: 'stage-3',
        title: 'The Light That Never Fades',
        year: "26-06-2024",
        description: 'A light within yet to be reignited...',
        isUnlocked: false,
        requiresAllChaptersRead: true,
        stories: [
            {
                id: 'story-3',
                title: 'Where His Shadow Fell, the World Was Lighter',
                author: 'Isabella Rodriguez',
                description: 'A man gives joy like breath—effortless, endless, until the wind changes.',
                cover: 'https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/df1cae60-a1f2-4726-8f60-5f463d6e5f3e/thefool.jpg?format=1000w',
                isUnlocked: false,
                unlockOrder: 3,
                chapters: [
                    {
                        id: 'ch-3-1',
                        title: 'The man who walked with laughter',
                        content: `# The man who walked with laughter

The world is heavy. Hearts grow weary, shoulders bend beneath invisible burdens. Men toil, women weep, and children forget how to laugh.

But not where *he* walks.

They call him the Joy-Bringer, though he claims no title. Where others see shadows, he finds light. A beggar’s bowl is not half-empty, but half-full—and then, by his hand, overflowing. A widow’s tears are met not with pity, but with stories of her husband’s laughter, until her sorrow cracks like ice in spring.

Kings wage wars, merchants hoard gold, and philosophers debate meaning—yet none hold what he carries. For joy is not given, not earned, but kindled, a spark passed from soul to soul.

Some say he is a fool. Others whisper he is something older, something divine. He only smiles. "Joy is not mine," he says. "I merely remind the world it exists."

And so he walks on, leaving behind not footprints, but echoes—of laughter where there was silence, of light where there was none.

The world is heavy. But he is not.
`,
                        isRead: false,
                    }
                ]
            }
        ]
    },
    {
        id: 'stage-4',
        title: 'A Light, Reignited Once More',
        year: "14-12-2024",
        description: 'A light, once extinguished, is reignited once again...',
        isUnlocked: false,
        requiresAllChaptersRead: true,
        stories: [
            {
                id: 'story-4',
                title: 'The man who fled in circles',
                author: 'Eleanor Blackwood',
                description: 'A man dissembles himself, piece by piece, until a note whispers his true name.',
                cover: 'https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/d910d2fd-7fd0-44c1-8a01-fb0741e63226/8-of-swords.jpg?format=1000w',
                isUnlocked: false,
                unlockOrder: 4,
                chapters: [
                    {
                        id: 'ch-4-1',
                        title: 'The art of unbelonging',
                        content: `# The art of unbelonging
He built his disappearance brick by brick.

The war never reached his doorstep—not the real one, with its uniformed men and barking loudspeakers—but another kind of siege was always coming. He saw it in the way shopkeepers' eyes lingered too long on his hands, in the way the wind carried voices that fell silent when he passed. They were measuring him for a coffin he wouldn't fit.

So he became a draft dodger of the self.

He sanded down his vowels until no accent could catch on them. Learned to laugh in the new way—sharp at the front of the mouth, like a door slamming shut. When they asked "Where are you from?" he'd shrug and say "Here" in a tone that made the word mean nothing at all.

His handsbetrayed him most. Still moved to bless himself the old way when passing churches. Still shaped the air when telling stories he no longer allowed himself to speak. Eventually, he took to wearing gloves—not the thick working kind, but thin leather ones that made his gestures look borrowed.`,
                        isRead: false,
                    }
                ]
            },
            {
                id: 'story-5',
                title: 'The Boy Who Chased the Sun',
                author: 'Eleanor Blackwood',
                description: 'A boy’s laughter drowns in war’s ink, until love teaches him to read the dark.',
                cover: 'https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/3ff28187-7600-46dc-ace8-e1dc5651586c/5-of-cups.jpg?format=1000w',
                isUnlocked: false,
                unlockOrder: 5,
                chapters: [
                    {
                        id: 'ch-5-1',
                        title: 'The Unbroken Song',
                        content: `# The Unbroken Song

The boy knew only one truth: the world was kind.

While mothers clutched their children tighter at the sound of marching boots, he marveled at the soldiers’ shiny buttons. When the harvest failed, he licked his fingers after sharing his last crust of bread, grinning as if it were a feast. "Tomorrow will be better," he’d declare, and because he believed it, others almost did too.

*Almost.*

People called him "sun-eyed" — not for his brightness, but because he stared at life unblinking, never seeing the cracks.

"How?" asked the old weaver, her hands gnarled from years of labor. "How do you not see?"
"See what?" the boy replied, spinning in the dust, arms wide as if to hug the sky.

The weaver said nothing. She knew: joy this pure was either a miracle or a wound waiting to be salted.

But the boy danced on, his laughter a shield against the dark.

Until the day the shield cracked.`,
                        isRead: true,
                    },
                    {
                        id: 'ch-5-2',
                        title: 'The Note That Stole Laughter',
                        content: `# The Note That Stole Laughter

The war drums began, and the boy watched his world fracture.

He found the note caught in the brambles by the riverbank — just three words on sun-bleached paper:

"I love you."

The signature was painfully familiar. He knew this message was addressed to him.

Around him, the village transformed. His friends traded fishing poles for rifles, their grins stretching too wide. The blacksmith's hammer rang with a new, urgent rhythm. At night, his father whispered numbers — how many bushels of wheat the army would take, how many sons their family owed.

"You should be proud," his mother said.
"I just want everyone to be happy," he murmured.
"Then stand with us!"

But he couldn't.

Because he'd seen the butcher's face when he packed his cleavers for the front — not fury, but fear. Heard the way Old Man's cough went untreated after the doctors left. The war wasn't making them strong; it was making them pretend they weren't breaking.

The note stayed in his pocket, folded small as a wound. Some days he took it out, tracing the letters until his fingers grew numb.

On the morning of the first battle, when the church bells rang for blood, he walked east instead of west—toward the rising sun, away from the smoke. In his satchel: a harmonica he'd never learned to play properly and the note, now soft as a bruise from handling.

The road ahead was empty. Behind him, cheers rose like flames.

And though he couldn't laugh anymore, his hands stayed clean.`,
                        isRead: true,
                    },
                    {
                        id: 'ch-5-3',
                        title: 'The Collision of Wandering Stars',
                        content: `# The Collision of Wandering Stars 

The boy who carried fire met the man who drank shadows.

They circled each other like twin comets — one trailing embers, the other swallowing light. The boy tilted his head, fascinated by the way the man’s silhouette seemed to blur at the edges, as if even the sun hesitated to define him. The man kept his gloves on, but the boy saw how his fingers twitched when laughter bubbled too close, like a prisoner remembering the taste of air.

The marketplace became their stage. The boy juggled stolen pears, his movements a bright blasphemy against the drab stalls. The man watched from behind a column, his stillness a negative image of the boy’s chaos. When their eyes met, it was not recognition that passed between them, but the quiet understanding of two languages no one else spoke:

> You are not what you pretend to be.

> Neither are you.

At dusk, they found themselves at the same broken fountain. The boy tossed a coin in—not for wishes, but to hear the plink of metal on dry stone. The man retrieved it, polished it against his sleeve, and handed it back without a word. A transaction. A test.

The coin sat between them, gleaming dully.

The boy grinned, all teeth.

The man exhaled, all smoke.

Somewhere, a war raged. Somewhere else, a love letter moldered in a drawer. Here, in this square where the statues had forgotten their own faces, two liars weighed the balance of their fictions.

Night fell. Neither moved.

The performance had found its audience at last.`,
                        isRead: false,
                    }
                ]
            },
            
            
        
        ]
    },
    {
        id: 'stage-5',
        title: 'The Light That Keeps Burning',
        year: "02-02-2025",
        description: 'A light, once extinguished, is reignited once again, but this time, it is not alone...',
        isUnlocked: false,
        requiresAllChaptersRead: true,
        stories: [
            {
                id: 'story-6',
                title: 'The Man Who Swallowed the Sun',
                author: 'Eleanor Blackwood',
                description: 'A man blazes so bright, he forgets fire needs fuel—and darkness needs no pardon.',
                cover: 'https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/7060a105-bf22-4375-b581-347a63667b2d/Knight_Wands_reversed.jpg?format=2500w',
                isUnlocked: false,
                unlockOrder: 6,
                chapters: [
                    {
                        id: 'ch-6-1',
                        title: 'The Symphony of Never-Ending Light',
                        content: `# The Symphony of Never-Ending Light
He spoke in exclamation marks, laughed in crescendos, and even his silences were just rests between movements. 

The world called him luminous—as if he were not a man but a lantern someone had forgotten to extinguish, burning through its oil with reckless generosity.

His words were not shields, not like the others. They were bridges, flung recklessly across chasms others feared to name. When conversations faltered, he fed them with his own ribs, snapping them into kindling to keep the fire going. "Listen—" he’d say, and the pause afterward would be so full, so unbearable, that someone always rushed to fill it.

The dark hated him.

It licked at his edges when he slept, when he blinked too long, when the rare stillness caught him mid-gesture. He’d wake gasping, already talking before his eyes opened, as if sound alone could stitch the night back into something safe.

### The Voice

A live wire, buzzing with stories that weren’t his. He collected them like fireflies in a jar—the widow’s grief, the child’s secret, the drunkard’s confession—and set them alight in his throat so no one else had to carry them.

### The Silence 

His nemesis. His white whale. It waited in the corners of rooms, in the space between heartbeats, and he fought it with jokes, with songs, with "Did you know—?" and "Remember when—?" until the air itself grew tired.
`,
                        isRead: false,
                    }
                ]
            },
        ]
    },
    {
        id: 'stage-6',
        title: 'The Light That Keeps Burning, but this time, it is not alone',
        year: "27-06-2025",
        description: 'A light, once extinguished, is reignited once again, but this time, it is not the only light...',
        isUnlocked: false,
        requiresAllChaptersRead: true,
        stories: [
            {
                id: 'story-7',
                title: 'The Boy Who Chased the Sun',
                author: 'Eleanor Blackwood',
                description: 'A boy’s laughter drowns in war’s ink, until love teaches him to read the dark.',
                cover: 'https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/3ff28187-7600-46dc-ace8-e1dc5651586c/5-of-cups.jpg?format=1000w',
                isUnlocked: false,
                unlockOrder: 7,
                chapters: [
                        {
                            id: 'ch-7-1',
                            title: 'The Unbroken Song',
                            content: `# The Unbroken Song
    
    The boy knew only one truth: the world was kind.
    
    While mothers clutched their children tighter at the sound of marching boots, he marveled at the soldiers’ shiny buttons. When the harvest failed, he licked his fingers after sharing his last crust of bread, grinning as if it were a feast. "Tomorrow will be better," he’d declare, and because he believed it, others almost did too.
    
    *Almost.*
    
    People called him "sun-eyed" — not for his brightness, but because he stared at life unblinking, never seeing the cracks.
    
    "How?" asked the old weaver, her hands gnarled from years of labor. "How do you not see?"
    "See what?" the boy replied, spinning in the dust, arms wide as if to hug the sky.
    
    The weaver said nothing. She knew: joy this pure was either a miracle or a wound waiting to be salted.
    
    But the boy danced on, his laughter a shield against the dark.
    
    Until the day the shield cracked.`,
                            isRead: true,
                        },
                        {
                            id: 'ch-7-2',
                            title: 'The Note That Stole Laughter',
                            content: `# The Note That Stole Laughter
    
    The war drums began, and the boy watched his world fracture.
    
    He found the note caught in the brambles by the riverbank — just three words on sun-bleached paper:
    
    "I love you."
    
    The signature was painfully familiar. He knew this message was addressed to him.
    
    Around him, the village transformed. His friends traded fishing poles for rifles, their grins stretching too wide. The blacksmith's hammer rang with a new, urgent rhythm. At night, his father whispered numbers — how many bushels of wheat the army would take, how many sons their family owed.
    
    "You should be proud," his mother said.
    "I just want everyone to be happy," he murmured.
    "Then stand with us!"
    
    But he couldn't.
    
    Because he'd seen the butcher's face when he packed his cleavers for the front — not fury, but fear. Heard the way Old Man's cough went untreated after the doctors left. The war wasn't making them strong; it was making them pretend they weren't breaking.
    
    The note stayed in his pocket, folded small as a wound. Some days he took it out, tracing the letters until his fingers grew numb.
    
    On the morning of the first battle, when the church bells rang for blood, he walked east instead of west—toward the rising sun, away from the smoke. In his satchel: a harmonica he'd never learned to play properly and the note, now soft as a bruise from handling.
    
    The road ahead was empty. Behind him, cheers rose like flames.
    
    And though he couldn't laugh anymore, his hands stayed clean.`,
                            isRead: true,
                        },
                        {
                            id: 'ch-7-3',
                            title: 'The Collision of Wandering Stars',
                            content: `# The Collision of Wandering Stars 
    
    The boy who carried fire met the man who drank shadows.
    
    They circled each other like twin comets — one trailing embers, the other swallowing light. The boy tilted his head, fascinated by the way the man’s silhouette seemed to blur at the edges, as if even the sun hesitated to define him. The man kept his gloves on, but the boy saw how his fingers twitched when laughter bubbled too close, like a prisoner remembering the taste of air.
    
    The marketplace became their stage. The boy juggled stolen pears, his movements a bright blasphemy against the drab stalls. The man watched from behind a column, his stillness a negative image of the boy’s chaos. When their eyes met, it was not recognition that passed between them, but the quiet understanding of two languages no one else spoke:
    
    > You are not what you pretend to be.
    > Neither are you.
    
    At dusk, they found themselves at the same broken fountain. The boy tossed a coin in—not for wishes, but to hear the plink of metal on dry stone. The man retrieved it, polished it against his sleeve, and handed it back without a word. A transaction. A test.
    
    The coin sat between them, gleaming dully.
    
    The boy grinned, all teeth.
    The man exhaled, all smoke.
    
    Somewhere, a war raged. Somewhere else, a love letter moldered in a drawer. Here, in this square where the statues had forgotten their own faces, two liars weighed the balance of their fictions.
    
    Night fell. Neither moved.
    
    The performance had found its audience at last.`,
                            isRead: true,
                        },
                    {
                        id: 'ch-7-4',
                        title: 'The Gravity of Two Falling Stars',
                        content: `# The Gravity of Two Falling Stars
At first, they orbited—careful, measured, testing the pull between them.

The boy’s laughter became a language the man learned to parse, not in words but in vibrations: the bright staccato of joy, the low hum of contentment, the quiet, flickering notes of something tender and unspoken. The man’s silence, once a fortress, became a garden the boy wandered, tracing the paths of his withheld words like vines climbing a trellis.

They met in the in-between places: the alley behind the theater where the posters peeled like shedding skin, the bench at the train station where the timetables lied about destinations, the rooftop where the city lights blurred into a false constellation. The boy taught the man how to press his palms to the earth and feel its pulse; the man showed the boy how to hold his breath until the world went quiet, until all that remained was the thrum of his own heart.

One evening, as the sky bruised purple at the edges, the man peeled off his gloves, finger by finger.
The boy watched, breath caught like a leaf in a current, as the man’s bare hands hovered between them — raw, unguarded, trembling with the weight of their own honesty.
The boy reached out, his fingertips brushing the man’s knuckles, and in that touch, they spoke:

> I know you.\n
 
> I know you know.

The world did not stop. The war did not cease. The ache of living did not vanish.

But for the first time, the boy’s fire did not burn to fill the silence, and the man’s shadows did not stretch to swallow the light.
They met in the middle, where the flames turned to gold and the dark softened to blue, and there, they built a promise — not with words, but with the quiet certainty of two trees grafting their roots beneath the soil.

Forever was a fiction. They knew this.

But that night, beneath a sky that had long forgotten how to witness miracles, they pressed their foreheads together and whispered it anyway.`,
                        isRead: false,
                    }
                ]
            },
            {
                id: 'story-8',
                title: 'His shadow, the spotlight',
                author: 'Eleanor Blackwood',
                description: 'A performer tends his dying props, rehearsing a love scene no one will attend.',
                cover: 'https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/2adb63b1-c418-4f17-9e3c-dc8c56636bf3/7-of-cups.jpg?format=1000w',
                isUnlocked: false,
                unlockOrder: 8,
                chapters: [
                    {
                        id: 'ch-8-1',
                        title: 'The Streetlight Sonata',
                        content: `# The Streetlight Sonata
He moved through the city like a traveling revival of some forgotten opera—all sweeping gestures and dramatic pauses that turned sidewalk cracks into stage marks. 
The war was a rumor written in someone else's alphabet, but here, where the shop awnings flapped like tired curtains, he performed as if the whole district were his velvet-boxed auditorium.

His morning began with the slow unfurling of gloves—always white, always spotless—each finger extended like the opening note of an overture. By noon he'd collected a chorus of street urchins who trailed behind him, mimicking his grand bows to lampposts and his conspiratorial whispers to storefront mannequins. The children didn't laugh so much as gape, their mouths perfect O's of proscenium arches.

When rain fell, his umbrella opened with the dramatic flourish of a parachute silk, and suddenly the wet pavement became his spotlight. He'd leap over puddles with the precision of a danseur, spinning his umbrella so droplets arced like diamond strings. Passersby found themselves smiling without meaning to, their own walks home suddenly feeling pedestrian in both senses.

By evening he held court at the fountain, producing playing cards from the mouths of pigeons and making cigarette smoke curl into perfect treble clefs. The night crowd sighed on cue, their collective exhale the wind section to his one-man symphony. Even the moon seemed to hang brighter when he tipped his hat to it, as if acknowledging a follow spot operated by gods.

Tomorrow, like any good matinee, the performance would begin again. The war might rage beyond the hills, the world might fray at its edges—but here, under these streetlights, the show was eternal.

No one thought to question why his gloves never stained. Why his shoes never scuffed. Why his laughter never once, not for a single fractured second, rang less than perfect.

The mask, after all, was the man.

The man was the mask.

And the greatest performance is one where the audience never thinks to ask what's underneath.
`,
                        isRead: false,
                    },
                    {
                        id: 'ch-8-2',
                        title: 'Glass Box Sololiquy',
                        content: `# Glass Box Sololiquy
The curtain fell the moment he locked his door.

His rented room was not a dressing room but a confessional booth where no god listened. The mirror, his sole audience, reflected back a stranger—a man still wearing the greasepaint grin like a poorly stitched scar. He peeled it off slowly tonight, wincing as the adhesive took pieces of him with it.

On the windowsill, the dried rose stood in its glass coffin. He'd found it three months ago outside the theater, its stem snapped mid-descent from some romantic gesture gone unclaimed. Every evening since, he'd turned it slightly toward the fading light, as if directing a reluctant actor toward its mark.

"Take your cue," he whispered.

The rose said nothing. It had forgotten how to play alive.

### The Backstage of His Mind
#### Act I: The Love Scene (Never Staged)
He rehearsed confessions to the rose's bent head. "I—" too sharp. "You—" too direct. The words curled up and died in his throat, becoming yet another joke he'd tell tomorrow to louder laughter.

#### Act II: The Tragic Reveal
In the blackout between streetlamp flickers, he pressed a fresh petal between his palms—a fossil in the making. The real performance was in the careful way he never let his fingertips tremble.

#### Act III: The Last Night of the Petals
The rose's remaining petals grew more perfect as they brittled. He'd trained them well. No audience would guess how long they'd been dead.`,
                        isRead: false,
                    }
                ]
            },
            {
                id: 'story-9',
                title: 'The Constellation of Maybe',
                author: 'Eleanor Blackwood',
                description: 'A lover walks the knife’s edge between what if and even so, counting his heartbeats like prayers',
                cover: 'https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/ff53f175-b9c1-4a97-b204-f818bbbe3cf9/Picsart_22-05-17_00-45-59-771.jpg?format=2500w',
                isUnlocked: false,
                unlockOrder: 9,
                chapters: [
                    {
                        id: 'ch-9-1',
                        title: 'The Language of Almost',
                        content: `# The Language of Almost
He walked toward love like an astronomer mapping stars—not with the blind faith of a worshipper, but with the quiet determination of one who trusts the sky even when clouds obscure it.

The possibility lived in his ribs like a second heartbeat. What if. What if. What if. Not the desperate chant of a beggar, but the steady metronome of a man who had learned to move through doubt without letting it move him.

He knew the equations:

Distance x Time = Either Or
Silence + Averted Eyes = Perhaps Not
But then—
A Shared Umbrella in Sudden Rain = The Universe Tilting

The fear was real. It curled at the edges of his coffee cup in the mornings, pooled in the hollow of his pillow at night. But it was not the director of this story, merely a passenger.

When she laughed, the sound was not a verdict but a weather pattern—something that happened to the air between them, not to him alone. When she was silent, it was not rejection but the necessary pause between movements in a symphony still being composed.

He did not armor himself against the no that might come. Instead, he practiced the art of tender observation: the way her fingers hesitated near the sugar bowl, how her shadow crossed his on the pavement like a temporary bridge. These were not guarantees, only evidence that love—like light—exists whether we witness it or not.

The path did not waver. His feet knew their way.

And if someday she turned to him and said "This isn't—", he would nod, and the sky would still be there. The stars would still be there.

But for now, he walked.
`,
                        isRead: false,
                    }
                ]
            },    
        ]
    },
    {
        id: 'stage-7',
        title: 'The Light That Keeps Burning, forever',
        year: "28-06-2025 - forever",
        description: 'A light, once extinguished, is reignited once again, but this time, it is not the only light, and it never fades',
        isUnlocked: false,
        requiresAllChaptersRead: true,
        stories: [
            {
                id: 'story-10',
                title: 'The Boy Who Chased the Sun',
                author: 'Eleanor Blackwood',
                description: 'A boy’s laughter drowns in war’s ink, until love teaches him to read the dark.',
                cover: 'https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/9e205b70-7c17-4c3f-84ec-3b47ce333d63/Picsart_22-05-17_00-50-42-638.jpg?format=1000w',
                isUnlocked: false,
                unlockOrder: 10,
                chapters: [
                    {
                        id: 'ch-10-1',
                        title: 'The Unbroken Song',
                        content: `# The Unbroken Song

The boy knew only one truth: the world was kind.

While mothers clutched their children tighter at the sound of marching boots, he marveled at the soldiers’ shiny buttons. When the harvest failed, he licked his fingers after sharing his last crust of bread, grinning as if it were a feast. "Tomorrow will be better," he’d declare, and because he believed it, others almost did too.

*Almost.*

People called him "sun-eyed" — not for his brightness, but because he stared at life unblinking, never seeing the cracks.

"How?" asked the old weaver, her hands gnarled from years of labor. "How do you not see?"
"See what?" the boy replied, spinning in the dust, arms wide as if to hug the sky.

The weaver said nothing. She knew: joy this pure was either a miracle or a wound waiting to be salted.

But the boy danced on, his laughter a shield against the dark.

Until the day the shield cracked.`,
                        isRead: true,
                    },
                    {
                        id: 'ch-10-2',
                        title: 'The Note That Stole Laughter',
                        content: `# The Note That Stole Laughter

The war drums began, and the boy watched his world fracture.

He found the note caught in the brambles by the riverbank — just three words on sun-bleached paper:

"I love you."

The signature was painfully familiar. He knew this message was addressed to him.

Around him, the village transformed. His friends traded fishing poles for rifles, their grins stretching too wide. The blacksmith's hammer rang with a new, urgent rhythm. At night, his father whispered numbers — how many bushels of wheat the army would take, how many sons their family owed.

"You should be proud," his mother said.
"I just want everyone to be happy," he murmured.
"Then stand with us!"

But he couldn't.

Because he'd seen the butcher's face when he packed his cleavers for the front — not fury, but fear. Heard the way Old Man's cough went untreated after the doctors left. The war wasn't making them strong; it was making them pretend they weren't breaking.

The note stayed in his pocket, folded small as a wound. Some days he took it out, tracing the letters until his fingers grew numb.

On the morning of the first battle, when the church bells rang for blood, he walked east instead of west—toward the rising sun, away from the smoke. In his satchel: a harmonica he'd never learned to play properly and the note, now soft as a bruise from handling.

The road ahead was empty. Behind him, cheers rose like flames.

And though he couldn't laugh anymore, his hands stayed clean.`,
                        isRead: true,
                    },
                    {
                        id: 'ch-10-3',
                        title: 'The Collision of Wandering Stars',
                        content: `# The Collision of Wandering Stars 

The boy who carried fire met the man who drank shadows.

They circled each other like twin comets — one trailing embers, the other swallowing light. The boy tilted his head, fascinated by the way the man’s silhouette seemed to blur at the edges, as if even the sun hesitated to define him. The man kept his gloves on, but the boy saw how his fingers twitched when laughter bubbled too close, like a prisoner remembering the taste of air.

The marketplace became their stage. The boy juggled stolen pears, his movements a bright blasphemy against the drab stalls. The man watched from behind a column, his stillness a negative image of the boy’s chaos. When their eyes met, it was not recognition that passed between them, but the quiet understanding of two languages no one else spoke:

> You are not what you pretend to be.
> Neither are you.

At dusk, they found themselves at the same broken fountain. The boy tossed a coin in—not for wishes, but to hear the plink of metal on dry stone. The man retrieved it, polished it against his sleeve, and handed it back without a word. A transaction. A test.

The coin sat between them, gleaming dully.

The boy grinned, all teeth.
The man exhaled, all smoke.

Somewhere, a war raged. Somewhere else, a love letter moldered in a drawer. Here, in this square where the statues had forgotten their own faces, two liars weighed the balance of their fictions.

Night fell. Neither moved.

The performance had found its audience at last.`,
                        isRead: true,
                    },
                {
                    id: 'ch-10-4',
                    title: 'The Gravity of Two Falling Stars',
                    content: `# The Gravity of Two Falling Stars
                    At first, they orbited—careful, measured, testing the pull between them.

The boy’s laughter became a language the man learned to parse, not in words but in vibrations: the bright staccato of joy, the low hum of contentment, the quiet, flickering notes of something tender and unspoken. The man’s silence, once a fortress, became a garden the boy wandered, tracing the paths of his withheld words like vines climbing a trellis.

They met in the in-between places: the alley behind the theater where the posters peeled like shedding skin, the bench at the train station where the timetables lied about destinations, the rooftop where the city lights blurred into a false constellation. The boy taught the man how to press his palms to the earth and feel its pulse; the man showed the boy how to hold his breath until the world went quiet, until all that remained was the thrum of his own heart.

One evening, as the sky bruised purple at the edges, the man peeled off his gloves, finger by finger.
The boy watched, breath caught like a leaf in a current, as the man’s bare hands hovered between them — raw, unguarded, trembling with the weight of their own honesty.
The boy reached out, his fingertips brushing the man’s knuckles, and in that touch, they spoke:

> I know you.\n

> I know you know.

The world did not stop. The war did not cease. The ache of living did not vanish.

But for the first time, the boy’s fire did not burn to fill the silence, and the man’s shadows did not stretch to swallow the light.
They met in the middle, where the flames turned to gold and the dark softened to blue, and there, they built a promise — not with words, but with the quiet certainty of two trees grafting their roots beneath the soil.

Forever was a fiction. They knew this.

But that night, beneath a sky that had long forgotten how to witness miracles, they pressed their foreheads together and whispered it anyway.`,
                    isRead: true,
                },
                    {
                        id: 'ch-10-5',
                        title: 'And the Sky Was Not a Ceiling',
                        content: `# And the Sky Was Not a Ceiling
The path was not a road but a pulse — a vein of light threading through the dark.

The boy walked, and the others walked with him.

The one who had once swallowed his own shadow, now let it stretch long behind him—no longer a stain, but a companion. The one whose hands had only ever held props, now carried a real rose, its thorns drawing blood he no longer pretended not to feel. The man who had swallowed the sun walked beside them, his radiance no longer a performance but a quiet, steady burning, like a lantern that had finally learned to sustain its own flame. The one lighting everyone's way remained unwavering in his resolve to shine bright so that no one would get lost.

They were not healed. They were not whole. But they were no longer afraid of their own fractures.

The war still raged beyond the hills. The world still turned its hungry face toward destruction. But here, in this moment that stretched like dawn, they moved as one organism — a single creature with many hearts, each beating in imperfect rhythm.

The one who once lost his light looked down at his hands. They were no longer shaking.

When he laughed now, it was not to fill the silence, but because joy had grown too large to contain. When he loved, it was not with the desperation of a man seeking proof of his own existence, but with the easy certainty of tides meeting shore.

The road ahead was not clear. It never would be.

But for the first time, the uncertainty was not a abyss—it was sky.

And so they walked.

Somewhere ahead, the road softened into light.`,
                        isRead: false,
                    }
                ]
            },
            
            
            
            
        ]
    }
    

    
].map(stage => ({
    ...stage,
    stories: stage.stories.map((story, idx) => ({
        ...story,
        isUnlocked: idx === 0
    }))
}));
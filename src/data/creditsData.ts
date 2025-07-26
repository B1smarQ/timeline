// Credits configuration for the ending screen
export interface CreditEntry {
    role: string; // The role/position (e.g., "Director", "Lead Developer")
    name: string; // The name of the person/entity
    image?: string; // Optional image URL or path (relative to public folder)
    delay?: number; // Custom delay for this credit (in seconds) - overrides automatic timing
}

// Instructions for customizing credits:
// 1. Edit the creditsData array below to add/remove/modify credits
// 2. Add images to the public/images/credits/ folder
// 3. Update image paths in the entries (e.g., "/images/credits/your-photo.jpg")
// 4. Adjust timing in creditsConfig if needed
// 5. The format follows "Name as Role" pattern in the display

export const creditsData: CreditEntry[] = [
    {
        role: "Flame Bearer",
        name: "B1smarQ",
        image: "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/9e205b70-7c17-4c3f-84ec-3b47ce333d63/Picsart_22-05-17_00-50-42-638.jpg?format=1000w",
        delay: 0
    },
    {
        role: "Shadow Eater",
        name: "AlexLakk",
        image: "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/d910d2fd-7fd0-44c1-8a01-fb0741e63226/8-of-swords.jpg?format=1000w",
        delay: 3
    },
    {
        role: "Star Prince",
        name: "Yuzuru Aerikusu",
        image: "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/2b09c678-696c-4173-b700-c367151a0654/6-of-cups.jpg?format=1000w",
        delay: 6
    },
    {
        role: "The Mime",
        name: "Strov_VB",
        image: "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/2adb63b1-c418-4f17-9e3c-dc8c56636bf3/7-of-cups.jpg?format=1000w",
        delay: 9
    },
    {
        role: "Joy-Bringer",
        name: "FuzzyFang",
        image: "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/df1cae60-a1f2-4726-8f60-5f463d6e5f3e/thefool.jpg?format=1000w",
        delay: 12
    },
    {
        role: "Sun-Swallower",
        name: "Lanz_PolyPacifist",
        image: "https://images.squarespace-cdn.com/content/v1/6282048f3ddae806d695b4b8/7060a105-bf22-4375-b581-347a63667b2d/Knight_Wands_reversed.jpg?format=2500w",
        delay: 15
    }

];

// Configuration for credits timing
export const creditsConfig = {
    panelDuration: 2.5, // How long each panel stays visible
    fadeInDuration: 0.8, // Fade in animation duration
    fadeOutDuration: 0.8, // Fade out animation duration
    totalDuration: 18, // Total credits duration in seconds
    restartDelay: 3 // Delay before showing restart options
};
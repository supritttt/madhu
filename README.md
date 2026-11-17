# A Little World Called Madhu

A playful, retro-inspired little website made with React and Vite. It includes a 13-photo scrapbook, a looping background music player, a happy-thought jar, a date-idea generator, a cursor-following mascot with pop-up messages, and a name-gated secret letter.

## Run it on your computer

1. Install [Node.js](https://nodejs.org/) (the current LTS version is recommended).
2. Open a terminal in this folder.
3. Install the project packages:

   ```sh
   npm install
   ```

4. Start the local website:

   ```sh
   npm run dev
   ```

5. Open the local address printed in the terminal (usually `http://localhost:5173`).

To make a production build, run `npm run build`. To preview that build locally, run `npm run preview`.

## Personalize it

- The 13 JPEG photos in the `public` folder are used in the scrapbook and hero card. Scroll to the scrapbook to watch the photos deal smoothly out from Pookie's 13-card stack into a responsive collage.
- The supplied “Lovely” MP3 is the site's single background track. Tap the floating player, the cassette, or **play our song** to start it; it loops while you browse. Browsers require a tap before audio can play.
- Pookie hides the letter. Tap the mascot five times in a row to find it, then enter **Rohan** or **Suprit** (capitalization does not matter) to reveal the letter.
- On desktop, Pookie follows the mouse, looks toward the pointer, and smiles when you hover or tap it. It pauses under the pointer so it is easy to click; on touch screens it stays in the corner.
- Pick a note from the happy-thought jar, or tap Pookie for a sweet pop-up while exploring.
- Use the date generator for a low-key activity idea; tap again to get a different suggestion.
- Easter eggs: click the footer flower or top-left wordmark five times; tap Pookie five times to discover the hidden letter; type **madhu** anywhere outside a text field; or enter the classic Konami Code for a color-party surprise.

The interface respects reduced-motion preferences and can be used with a keyboard. The custom heart cursor is a visual touch; standard browser controls remain available.

# Audio Files for "As I've Written"

This directory contains the audio files for the interactive storytelling experience.

## Mood-Based Ambient System

The audio system uses **mood-based ambient tracks** that play continuously across all scenes within the same mood. Audio only changes when the story mood changes, not when transitioning between scenes (welcome → timeline → reading → ending).

## Required Files

### Ambient Sounds (4 files)
Place these in `public/sounds/ambient/`:

### Ending Music (1 file)
Place this in `public/sounds/music/`:

**Primary naming (recommended):**
- `ending.mp3` - Special music theme for ending/credits scene

**Alternative naming (the system will try these automatically):**
- `credits.mp3` - Alternative ending music
- `finale.mp3` - Alternative ending music
- `ambient/ending.mp3` - Fallback location
- `ambient/credits.mp3` - Fallback location

**Primary naming (recommended):**
- `mysterious.mp3` - For mysterious mood across all scenes
- `melancholic.mp3` - For melancholic mood across all scenes  
- `hopeful.mp3` - For hopeful mood across all scenes
- `dramatic.mp3` - For dramatic mood across all scenes

**Alternative naming (the system will try these automatically):**
- `ambient-mysterious.mp3`, `mysterious-ambient.mp3`
- `ambient-melancholic.mp3`, `melancholic-ambient.mp3`
- `ambient-hopeful.mp3`, `hopeful-ambient.mp3`
- `ambient-dramatic.mp3`, `dramatic-ambient.mp3`

**Fallback to existing files:**
- `timeline-mysterious.mp3`, `welcome-mysterious.mp3`, etc.

### UI Sound Effects (8 files - optional)
Place these in `public/sounds/ui/`:

- `click.mp3` - Button clicks and general interactions
- `hover.mp3` - Hover effects on interactive elements
- `success.mp3` - Completion sounds, achievements
- `unlock.mp3` - Stage/story unlocking
- `page-turn.mp3` - Navigation between chapters/stories
- `typewriter.mp3` - Typewriter text animation
- `whoosh.mp3` - Smooth transitions and movements
- `chime.mp3` - Welcome screen, notifications

## Audio Specifications

- **Format**: MP3 (recommended) or OGG
- **Quality**: 128-192 kbps
- **Ambient file**: 5-15 minutes long, seamlessly looping
- **UI files**: 0.1-2 seconds long
- **Volume**: Normalized to -12dB to -18dB

## Benefits of Mood-Based Audio

1. **Scene Continuity**: Audio continues smoothly during scene transitions within the same mood
2. **Emotional Consistency**: Each mood has its own atmospheric track
3. **Smart Switching**: Only changes audio when story mood actually changes
4. **Immersive Experience**: Maintains emotional atmosphere throughout each mood phase

## Current Setup

If you already have multiple ambient files (like `timeline-mysterious.mp3`, `welcome-hopeful.mp3`, etc.), you can:

1. **Rename files by mood**:
   - Rename `timeline-mysterious.mp3` → `mysterious.mp3`
   - Rename `welcome-hopeful.mp3` → `hopeful.mp3`
   - etc.

2. **Keep existing files** - the system will automatically use them as fallbacks

3. **Create new mood-specific files** designed for longer playback across multiple scenes

## Testing

Use the "Test Mood Files" button in the audio controls to check which mood-based files are accessible.

## Deployment Notes

The audio system automatically handles different deployment environments:

- **Local development**: Files served from `http://localhost:5173/sounds/ambient/`
- **GitHub Pages**: Files served from `https://b1smarq.github.io/timeline/sounds/ambient/`

The system uses Vite's `import.meta.env.BASE_URL` to automatically construct the correct paths for your deployment environment.

## How It Works

1. **Default mood** is "mysterious" for all scenes and chapters
2. **Chapter-specific moods** can be set in the chapter data (optional)
3. **Audio loads** the corresponding mood file (`mysterious.mp3`, `hopeful.mp3`, etc.)
4. **Scene transitions** don't interrupt audio within the same mood
5. **Mood changes** (when reading different chapters) trigger smooth audio switching
6. **Ending scene** switches to special ending music instead of mood-based ambient
7. **Audio loops** seamlessly within each mood and for ending music

## Chapter Mood Examples

```typescript
// Chapter with hopeful mood
{
    id: 'ch-1-1',
    title: 'The Unbroken Song',
    mood: 'hopeful',  // Will play hopeful.mp3
    content: '...'
}

// Chapter with melancholic mood  
{
    id: 'ch-2-2',
    title: 'The Note That Stole Laughter',
    mood: 'melancholic',  // Will play melancholic.mp3
    content: '...'
}

// Chapter without mood (uses default)
{
    id: 'ch-3-1',
    title: 'The man who walked with laughter',
    // No mood specified - uses 'mysterious' by default
    content: '...'
}
```
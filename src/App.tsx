import React from 'react';
import { Timeline } from './components/Timeline';
import { StoryModal } from './components/StoryModal';
import { ChapterReader } from './components/ChapterReader';
import { FontSizeControls } from './components/FontSizeControls';
import { useAppStore } from './store';

function App() {
    const { selectedStory, selectedChapter } = useAppStore();

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <header className="fixed top-0 right-0 z-50 p-4">
                <FontSizeControls />
            </header>

            <main className="pt-16 bg-gray-900">
                <Timeline />
            </main>

            {selectedStory && !selectedChapter && (
                <StoryModal />
            )}

            {selectedChapter && (
                <ChapterReader />
            )}
        </div>
    );
}

export default App;
import { Timeline } from './components/Timeline';
import { StoryModal } from './components/StoryModal';
import { ChapterReader } from './components/ChapterReader';
import { FontSizeControls } from './components/FontSizeControls';
import { useAppStore } from './store';
import { WelcomeModal } from './components/WelcomeModal';

function App() {
    const { selectedStory, selectedChapter, showWelcome, setShowWelcome } = useAppStore();

    const handleCloseWelcome = () => {
        setShowWelcome(false);
    };

    return (
        <div className="min-h-screen text-white relative overflow-x-hidden">
            <WelcomeModal show={showWelcome} onClose={handleCloseWelcome} />
            {!showWelcome && (
                <>
                    {/* Shooting stars overlay */}
                    <div className="shooting-stars">
                        <div className="shooting-star" />
                        <div className="shooting-star" />
                        <div className="shooting-star" />
                        <div className="shooting-star" />
                        <div className="shooting-star" />
                    </div>
                    <header className="fixed top-0 right-0 z-50 p-4">
                        <FontSizeControls />
                    </header>
                    <main className="pt-16 max-w-6xl mx-auto px-4 relative z-10">
                        <div className="rounded-2xl border border-violet-700/40 ring-2 ring-indigo-500/20 bg-black/30 backdrop-blur-md shadow-2xl glow-element p-4 md:p-8">
                            <h1 className="text-4xl font-bold mb-8 text-center glow-text tracking-widest select-none">As I've Written</h1>
                            <Timeline />
                        </div>
                    </main>
                    {selectedStory && !selectedChapter && (
                        <StoryModal />
                    )}
                    {selectedChapter && (
                        <ChapterReader />
                    )}
                </>
            )}
        </div>
    );
}

export default App;
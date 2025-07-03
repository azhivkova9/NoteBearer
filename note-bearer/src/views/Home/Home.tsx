import { useContext } from "react"
import { AppContext } from "../../store/app-context"

export default function Home() {
    const { userData } = useContext(AppContext);

    return (
        <div className="flex flex-col transform-3d bg-transparent rounded-r-lg h-screen w-full shadow-lg p-4 text-lg text-center">
            { userData ? (
                <>
                    <h1 className="text-2xl font-bold mb-4">Welcome to Note Bearer</h1>
                    <p className="text-gray-700">Your personal note-taking app.</p>
                </>
            ) : (
                <div className="flex items-center justify-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
                </div>
            )}
        </div>
    )
}

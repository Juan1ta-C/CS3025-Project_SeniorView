
import { HelpCircle } from "lucide-react";


export default function Messages({ onNavigate, onLogout }) {
    const messages = [
        {
            id: 1,
            sender: "Melissa Smith",
            preview: `Hello ${userName}, I wanted to contact you regarding some...`,
            timestamp: "5 hours ago",
            unread: false,

        },
        {
            id: 2,
            sender: "Jane Doe",
            preview: `Hi ${userName}, I wanted to contact you regarding some knitting...`,
            timestamp: "10 hours ago",
            unread: true,

        },

        {
            id: 3,
            sender: "Paige Bueckers",
            preview: `Hey ${userName}, I wanted to contact you regarding some cooking...`,
            timestamp: "23 hours ago",
            unread: true,

        },

        {
            id: 4,
            sender: "Sarah Strong",
            preview: `Hi ${userName}, I wanted to contact you regarding some needlepoint...`,
            timestamp: "14 hours ago",
            unread: true,

        },

        {
            id: 5,
            sender: "Azzi Fudd",
            preview: `Hello ${userName}, I wanted to contact you regarding some baking using cottage cheese...`,
            timestamp: "18 hours ago",
            unread: true,

        }
    ];

    const handleNeedHelp = () => {
        console.log("Requesting help...");
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-white flex">
            <div className="w-52 bg-gradient-to-br from-cyan-400 via-cyan-300 to-cyan-200 flex flex-col">
                <div className="p-6">
                    <div className="flex flex-col items-center">
                        <img src="src/Image.png"></img>
                    </div>
                </div>

                <div className="flex-1 flex flex-col px-4 py-8 space-y-4">
                    <button onClick={() => onNavigate('bulletin')} className="bg-white/90 hover:bg-white text-gray-900 font-semibold py-4 px-6 rounded-3xl text-left transition-all shadow-md hover:shadow-lg">
                    BULLETIN BOARD
                    </button>

                    <div className="relative">
                        <button onClick={() => onNavigate('messaging')} className="w-full bg-white text-gray-900 font-semibold py-4 px-6 rounded-3xl text-left shadow-lg">
                        MESSAGES
                        </button>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                    </div>

                    <button onClick={() => onNavigate('account')} className="bg-white/90 hover:bg-white text-gray-900 font-semibold py-4 px-6 rounded-3xl text-left transition-all shadow-md hover:shadow-lg">
                    ACCOUNT
                    </button>
                </div>

                <div className="p-4">
                    <button onClick={handleNeedHelp} className="w-full flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-gray-900 font-medium py-3 px-4 rounded-full transition-all shadow-md hover:shadow-lg">
                        <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white">
                            <HelpCircle className="w-4 h-4"/>
                        </div>
                        <span className="text-sm">Need help?</span>
                    </button>
                </div>

                <div className="p-4"></div>

            </div>
        </div>







    )



}
import {Link} from "react-router-dom";

export default function NotFound() {
    return (
        <div className="relative overflow-hidden bg-black text-white h-screen">
            <div className="flex flex-col justify-center gap-10 place-items-center h-full z-10 relative">
                <div className=" px-3 py-2 rounded-none border-2 border-green-400 transition-colors bg-white">
                    <h1 className="text-6xl md:text-6xl font-bold animate-pulse uppercase text-green-400 hover:text-green-300">Lost signal</h1>
                </div>
                <Link to={'/'}
                      className="text-green-400 hover:text-green-300 px-3 py-2 rounded-none border-2 border-green-400 hover:bg-green-900 transition-colors">Go back
                </Link>
            </div>
            <div
                className="absolute inset-[-200%] opacity-25 z-0"
                style={{
                    backgroundImage: "url('/noise.png')",
                    animation: 'shift 0.2s linear infinite both',
                }}
            ></div>
            <style>
                {`
          @keyframes shift {
            0% {
              transform: translateX(10%) translateY(10%);
            }
            100% {
              transform: translateX(-10%) translateY(-10%);
            }
          }
        `}
            </style>
        </div>
    );
}

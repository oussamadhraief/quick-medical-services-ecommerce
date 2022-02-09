

export default function LoadingAnimation(props){
    return (
        <div className={props.bgOpacity ? "loadingAnimation absolute top-0 left-0 w-full h-full bg-white z-50 flex justify-center items-center" : "loadingAnimation absolute top-0 left-0 w-full h-full bg-[rgba(255,255,255,0.7)] z-50 flex justify-center items-center"}>
                {/* <span className="border-4 border-l-gray-700 border-t-zinc-300 border-r-zinc-300 animate-spin border-b-zinc-300 w-8 h-8 rounded-full"></span> */}
                <span className="w-2 h-2 bg-zinc-600 rounded-full mx-2"></span>
                <span className="w-2 h-2 bg-gray-800 rounded-full mx-1"></span>
                <span className="w-2 h-2 bg-yellow-500 rounded-full mx-2"></span>
        </div>
    )
}
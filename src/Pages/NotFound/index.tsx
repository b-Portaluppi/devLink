import { RiEmotionUnhappyLine } from "react-icons/ri";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";
export function NotFound() {
    return (
        <div className="flex justify-center w-screen h-screen pt-6 gap-4">
            <div className="">
                <Link to="/"><FaArrowLeft  className="text-4xl text-blue-500" /></Link>
            </div>

            <div className="flex flex-col items-center pt-11">
                <RiEmotionUnhappyLine className="text-4xl text-blue-500 mb-1"/>
                <h2 className="text-2xl text-white font-medium">Não foi possivel encotrar essa página</h2>
            </div>
        </div>
    )
}
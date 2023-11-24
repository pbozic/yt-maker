// next simple component
// import Link from "next/link";
import { HomeIcon, DocumentIcon, FilmIcon } from "@heroicons/react/24/outline";
import Link from "next/link";


export default function Test() {
    return (
        <nav className="flex width-auto flex-col text-primary border-r-slate-100 border-r bg-white">
            <ul className="sidebar flex flex-col">
                
                <li className="p-4">
                    <Link href="/dashboard" >
                        <div className="flex items-center">
                            <HomeIcon className="w-4 h-4 mr-2" />
                            <span>
                                Dashboard
                            </span>
                        </div>
                       
                    </Link>
                </li>
                <li className="p-4">
                    <Link href="/dashboard/files" >
                        <div className="flex items-center">
                            <DocumentIcon className="w-4 h-4 mr-2" />
                            <span>
                                Files
                            </span>
                        </div>
                       
                    </Link>
                </li>
                <li className="p-4">
                    <Link href="/dashboard/video-generate" >
                        <div className="flex items-center">
                            <FilmIcon className="w-4 h-4 mr-2" />
                            <span>
                                Generate
                            </span>
                        </div>
                       
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
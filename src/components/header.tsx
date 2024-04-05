import { NavLink } from "./nav-link";

export function Header() {
    return (
        <div className="flex items-center gap-5 py-2">

            <img src="src\image\nlwImage.svg" alt="Logo NLW" />

            <nav className="flex items-center gap-5">
                <NavLink title="events" href="/eventos">Eventos</NavLink>  {/* className="font-medium text-sm text-zinc-300" */}
                <NavLink href="/participantes">Participantes</NavLink>
            </nav>
        </div>
    )
}
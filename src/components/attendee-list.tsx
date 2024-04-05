import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontalIcon } from "lucide-react"
import dayjs from "dayjs"
import "dayjs/locale/pt-br"
import relativeTime from "dayjs/plugin/relativeTime"
import { IconButton } from "./icon-button"
import { Table } from "./table/table"
import { TableHeader } from "./table/table-header"
import { TableCell } from "./table/table-cell"
import { TableRow } from "./table/table-row"
import { ChangeEvent, useState } from "react"
import { attendees } from "../data/attendees"

dayjs.extend(relativeTime)
dayjs.locale("pt-br")

export function AttendeeList(){
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)

    const totalPages = Math.ceil(attendees.length / 10)

    function OnSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value)
    }

    function goToPreviousPage(){
        setPage(page - 1)
    }
    
    function goToFirstPage(){
        setPage(1)
    }

    function goToLastPage(){
        setPage(totalPages)
    }

    function goToNextPage(){
        setPage(page + 1)
    }

    


    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center">
                <h1 className="text-2xl font-bold">Participantes</h1>
            <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg text-sm flex items-center gap-3">
                <img src="src\image\minilupa.svg" alt="Mini icone de lupa" />
                <input onChange={OnSearchInputChanged} className="bg-transparent flex-1 outline-none h-auto border-0 p-0 text-sm" placeholder="Buscar participante..." type="text" />
                </div>
                {search}
            </div>

                <Table>
                    <thead>
                        <tr className="border-b border-white/10">
                            <TableHeader style={{width: 48}}>
                                <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10 checked:bg-orange-400" /></TableHeader>
                            <TableHeader>Código</TableHeader>
                            <TableHeader>Participante</TableHeader>
                            <TableHeader>Data da inscrição</TableHeader>
                            <TableHeader>Data do check-in</TableHeader>
                            <TableHeader style={{width: 64}}></TableHeader>
                        </tr>
                    </thead>    
                    <tbody>
                        {attendees.slice((page - 1) * 10, page * 10 ).map((attendee) => {
                            return (
                                <TableRow key={attendee.id}>
                            <TableCell>
                                <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10 checked:bg-orange-400" /></TableCell>
                            <TableCell>{attendee.id}</TableCell>
                            <TableCell>
                                <div className="flex flex-col gap-1">
                                    <span className="font-semibold text-white">{attendee.name}</span>
                                    <span>{attendee.email}</span>
                                </div>
                            </TableCell>
                            <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
                            <TableCell>{dayjs().to(attendee.checkedInAt)}</TableCell>
                            <TableCell>
                                <IconButton transparent>
                                    <MoreHorizontalIcon className="size-4"></MoreHorizontalIcon>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                            )
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <TableCell className="py-3 px-4 text-sm text-zinc-300" colSpan={3}>
                                Mostrando 10 de {attendees.length} itens
                            </TableCell>
                            <TableCell className="py-3 px-4 text-sm text-zinc-300 text-right" colSpan={3}>
                                <div className="inline-flex items-center gap-8">
                                    <span>Página {page} de {totalPages}</span>
                                    <div className="flex gap-1.5">
                                       <IconButton onClick={goToFirstPage} disabled={page === 1}>
                                        <ChevronsLeft className="size-4"></ChevronsLeft>
                                        </IconButton>
                                       <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                                            <ChevronLeft className="size-4"></ChevronLeft>
                                        </IconButton>
                                       <IconButton onClick={goToNextPage} disabled={page === totalPages}>
                                            <ChevronRight className="size-4"></ChevronRight>
                                        </IconButton>
                                       <IconButton onClick={goToLastPage} disabled={page === totalPages}>
                                            <ChevronsRight className="size-4"></ChevronsRight>
                                        </IconButton>
                                    </div>
                                </div>
                            </TableCell>
                        </tr>
                    </tfoot>
                </Table>
        </div>
    )

}
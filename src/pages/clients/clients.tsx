import {useAppSelector} from "@shared/lib";
import {selectAllClients} from "@entities/client";
import {ClientTable} from "@widgets/clientTable";

export function ClientsPage() {
  const clients = useAppSelector(selectAllClients)

  return (
    <div>
      <ClientTable data={clients} />
    </div>
  )
}
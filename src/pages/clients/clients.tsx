import {useAppSelector} from "@shared/lib";
import {selectAllClients} from "@entities/client";
import {ClientTable} from "@widgets/clientTable";
import {usePageCrumbs} from "@features/usePageCrumbs";

export function ClientsPage() {
  usePageCrumbs("Клиенты");
  const clients = useAppSelector(selectAllClients)

  return (
    <div className="ml-4 mr-4">
      <ClientTable data={clients} />
    </div>
  )
}
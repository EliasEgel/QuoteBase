import { createFileRoute } from '@tanstack/react-router'
import QuotePage from '../../components/quote/QuotePage';

export const Route = createFileRoute('/quote/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const {id}=Route.useParams(); 
  return <div className="text-center"><QuotePage id={id}/></div>
}

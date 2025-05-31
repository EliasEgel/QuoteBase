import { createFileRoute } from '@tanstack/react-router'
import QuotePage from '../../components/quote/QuotePage';

export const Route = createFileRoute('/quote/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const {id}=Route.useParams(); 
  return <div><QuotePage id={id}/></div>
}

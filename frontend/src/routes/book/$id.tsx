import { createFileRoute } from '@tanstack/react-router'
import BookPage from '../../components/book/BookPage'

export const Route = createFileRoute('/book/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const {id}=Route.useParams(); 

  return <div><BookPage id={id}/></div>
}

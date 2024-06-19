import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  //   CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export const CardTable = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="flex-1 grid gap-2">
          <CardTitle>Cards</CardTitle>
          {/* <CardDescription>
          Manage your products and view their sales performance.
        </CardDescription> */}
        </div>
        <Button asChild variant="outline" size="sm" className="gap-2">
          <Link href="#">
            <Plus className="w-4" />
            新規追加
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead className="hidden md:table-cell">
                Total Sales
              </TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                Laser Lemonade Machine
              </TableCell>
              <TableCell className="hidden md:table-cell">$499.99</TableCell>
              <TableCell className="hidden md:table-cell">25</TableCell>
              <TableCell className="hidden md:table-cell">
                2023-07-12 10:42 AM
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                Laser Lemonade Machine
              </TableCell>
              <TableCell className="hidden md:table-cell">$499.99</TableCell>
              <TableCell className="hidden md:table-cell">25</TableCell>
              <TableCell className="hidden md:table-cell">
                2023-07-12 10:42 AM
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                Laser Lemonade Machine
              </TableCell>
              <TableCell className="hidden md:table-cell">$499.99</TableCell>
              <TableCell className="hidden md:table-cell">25</TableCell>
              <TableCell className="hidden md:table-cell">
                2023-07-12 10:42 AM
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

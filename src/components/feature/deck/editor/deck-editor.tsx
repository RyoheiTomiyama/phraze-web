import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { PlusCircle } from 'lucide-react'
import { CardEdit } from './card-edit'

type DeckEditorProps = {
  className?: string
}

export const DeckEditor = ({ className }: DeckEditorProps) => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className={cn('rounded-lg border bg-white', className)}
    >
      <ResizablePanel defaultSize={30} minSize={10}>
        <Card className="flex flex-col border-none h-full">
          <CardHeader>
            <CardTitle>Cards</CardTitle>
          </CardHeader>
          <CardContent className="flex-auto overflow-hidden pb-0">
            <ScrollArea className="-mx-6 h-full">
              <div>
                <div className="px-6 py-2 cursor-pointer hover:bg-muted">
                  <span className=" line-clamp-1 text-muted-foreground">
                    list hoge hoge fuga fuga hige line-clamp-1 line-clamp-1
                  </span>
                </div>
                <div className="px-6 py-2 cursor-pointer hover:bg-muted">
                  <span className=" line-clamp-1 text-muted-foreground">
                    list hoge hoge fuga fuga hige line-clamp-1 line-clamp-1
                  </span>
                </div>
                <div className="px-6 py-2 cursor-pointer hover:bg-muted">
                  <span className=" line-clamp-1 text-muted-foreground">
                    list hoge hoge fuga fuga hige line-clamp-1 line-clamp-1
                  </span>
                </div>
                <div className="px-6 py-2 cursor-pointer hover:bg-muted">
                  <span className=" line-clamp-1 text-muted-foreground">
                    list hoge hoge fuga fuga hige line-clamp-1 line-clamp-1
                  </span>
                </div>
                <div className="px-6 py-2 cursor-pointer hover:bg-muted">
                  <span className=" line-clamp-1 text-muted-foreground">
                    list hoge hoge fuga fuga hige line-clamp-1 line-clamp-1
                  </span>
                </div>
                <div className="px-6 py-2 cursor-pointer hover:bg-muted">
                  <span className=" line-clamp-1 text-muted-foreground">
                    list hoge hoge fuga fuga hige line-clamp-1 line-clamp-1
                  </span>
                </div>
                <div className="px-6 py-2 cursor-pointer hover:bg-muted">
                  <span className=" line-clamp-1 text-muted-foreground">
                    list hoge hoge fuga fuga hige line-clamp-1 line-clamp-1
                  </span>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="border-t flex justify-center py-4">
            <Button variant="ghost" size="sm" className="gap-2">
              <PlusCircle className="h-3.5 w-3.5" />
              Add Card
            </Button>
          </CardFooter>
        </Card>
      </ResizablePanel>
      <ResizableHandle className="hidden sm:flex" />
      <ResizablePanel defaultSize={70} minSize={50} className="hidden sm:block">
        <CardEdit />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
import { useMemo, useState, type KeyboardEvent } from "react"
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  Pagination,
  Progress,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@labring/sealos-ui"
import {
  Activity,
  AppWindow,
  Bell,
  CheckCircle2,
  CircleDollarSign,
  Cloud,
  Copy,
  Cpu,
  Database,
  ExternalLink,
  Filter,
  Gauge,
  HardDrive,
  KeyRound,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Server,
  ShieldCheck,
  SlidersHorizontal,
  Users,
} from "lucide-react"

type WorkspaceStatus = "Running" | "Degraded" | "Pending"
type StatusFilter = WorkspaceStatus | "All"
type RegionFilter = "All Regions" | "hangzhou-a" | "singapore-b"

type Workspace = {
  id: string
  name: string
  namespace: string
  owner: string
  status: WorkspaceStatus
  region: Exclude<RegionFilter, "All Regions">
  apps: number
  cpu: number
  memory: number
  storage: number
  cost: string
  updated: string
  channel: string
  plan: string
}

const statusFilters: StatusFilter[] = ["All", "Running", "Degraded", "Pending"]
const regionFilters: RegionFilter[] = [
  "All Regions",
  "hangzhou-a",
  "singapore-b",
]

const workspaces: Workspace[] = [
  {
    id: "ws-platform",
    name: "platform-prod",
    namespace: "ns-platform-prod",
    owner: "Alex Chen",
    status: "Running",
    region: "hangzhou-a",
    apps: 18,
    cpu: 64,
    memory: 71,
    storage: 42,
    cost: "$428.17",
    updated: "2m ago",
    channel: "stable",
    plan: "Team",
  },
  {
    id: "ws-observe",
    name: "observability",
    namespace: "ns-observe",
    owner: "Mina Park",
    status: "Running",
    region: "singapore-b",
    apps: 11,
    cpu: 38,
    memory: 46,
    storage: 58,
    cost: "$219.04",
    updated: "8m ago",
    channel: "stable",
    plan: "Team",
  },
  {
    id: "ws-ai",
    name: "ai-runtime",
    namespace: "ns-ai-runtime",
    owner: "Noah Liu",
    status: "Degraded",
    region: "hangzhou-a",
    apps: 7,
    cpu: 82,
    memory: 76,
    storage: 63,
    cost: "$612.88",
    updated: "13m ago",
    channel: "canary",
    plan: "Enterprise",
  },
  {
    id: "ws-staging",
    name: "staging",
    namespace: "ns-staging",
    owner: "Iris Wang",
    status: "Pending",
    region: "singapore-b",
    apps: 5,
    cpu: 24,
    memory: 31,
    storage: 22,
    cost: "$89.42",
    updated: "31m ago",
    channel: "beta",
    plan: "Team",
  },
  {
    id: "ws-registry",
    name: "registry-lab",
    namespace: "ns-registry-lab",
    owner: "Owen He",
    status: "Running",
    region: "hangzhou-a",
    apps: 9,
    cpu: 51,
    memory: 49,
    storage: 74,
    cost: "$174.63",
    updated: "1h ago",
    channel: "stable",
    plan: "Starter",
  },
]

const recentEvents = [
  {
    time: "11:42",
    title: "Quota updated",
    detail: "CPU limit changed to 96 Core",
  },
  {
    time: "11:24",
    title: "Access key rotated",
    detail: "sealos-admin-key refreshed",
  },
  {
    time: "10:58",
    title: "Image sync completed",
    detail: "registry-lab/api:v1.7.2",
  },
]

const runtimeMix = [
  { label: "DevBox", value: 42, icon: AppWindow },
  { label: "Database", value: 28, icon: Database },
  { label: "Gateway", value: 18, icon: Server },
  { label: "Job", value: 12, icon: Activity },
]

const statusStyles: Record<
  WorkspaceStatus,
  { dot: string; label: string; badge: string }
> = {
  Running: {
    dot: "bg-[#12B76A]",
    label: "text-[#039855]",
    badge: "border-[#D1FADF] bg-[#EDFBF3] text-[#027A48]",
  },
  Degraded: {
    dot: "bg-[#F79009]",
    label: "text-[#B54708]",
    badge: "border-[#FEDF89] bg-[#FFFAEB] text-[#B54708]",
  },
  Pending: {
    dot: "bg-[#219BF4]",
    label: "text-[#0884DD]",
    badge: "border-[#B9E6FE] bg-[#EFF8FF] text-[#026AA2]",
  },
}

function SealosAdminPanel() {
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All")
  const [regionFilter, setRegionFilter] = useState<RegionFilter>("All Regions")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedId, setSelectedId] = useState(workspaces[0].id)

  const filteredWorkspaces = useMemo(() => {
    const search = query.trim().toLowerCase()

    return workspaces.filter((workspace) => {
      const matchesSearch =
        !search ||
        workspace.name.toLowerCase().includes(search) ||
        workspace.namespace.toLowerCase().includes(search) ||
        workspace.owner.toLowerCase().includes(search)
      const matchesStatus =
        statusFilter === "All" || workspace.status === statusFilter
      const matchesRegion =
        regionFilter === "All Regions" || workspace.region === regionFilter

      return matchesSearch && matchesStatus && matchesRegion
    })
  }, [query, regionFilter, statusFilter])

  const selectedWorkspace =
    workspaces.find((workspace) => workspace.id === selectedId) ?? workspaces[0]

  const handleRowKeyDown = (
    event: KeyboardEvent<HTMLTableRowElement>,
    id: string
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      setSelectedId(id)
    }
  }

  return (
    <main className="h-svh overflow-y-auto bg-[#FAFAFA] text-[#111824]">
      <div className="gap-5 px-5 py-5 md:px-8 lg:px-10 mx-auto flex min-h-full w-full max-w-[1480px] flex-col">
        <Card className="gap-4 rounded-2xl bg-white px-4 py-4 md:flex-row md:items-center md:justify-between md:px-5 flex flex-col border-[#E8EBF0] shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
          <div className="min-w-0 gap-3 flex items-center">
            <div className="size-10 rounded-xl flex shrink-0 items-center justify-center border border-[#DFE2EA] bg-[#F7F8FA] text-[#0884DD]">
              <Cloud className="size-5" />
            </div>
            <div className="min-w-0">
              <div className="gap-2 flex items-center">
                <h1 className="text-xl font-semibold truncate text-[#111824]">
                  Sealos Admin
                </h1>
                <Badge
                  className="border-[#D1FADF] bg-[#EDFBF3] text-[#027A48]"
                  variant="outline"
                >
                  <span className="size-1.5 rounded-full bg-[#12B76A]" />
                  Live
                </Badge>
              </div>
              <p className="mt-1 text-sm truncate text-[#667085]">
                Cluster operations / Workspace control
              </p>
            </div>
          </div>

          <div className="gap-2 flex flex-wrap items-center">
            <Button asChild className="h-9" variant="outline">
              <a href="/#/">Showcase</a>
            </Button>
            <Button className="h-9" variant="outline">
              <RefreshCw className="size-4" />
              Refresh
            </Button>
            <Button className="h-9 text-white bg-[#111824] hover:bg-[#111824]/90">
              <Plus className="size-4" />
              New Workspace
            </Button>
            <Separator className="h-8 md:block hidden" orientation="vertical" />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  aria-label="Notifications"
                  className="h-9 w-9"
                  size="icon"
                  variant="outline"
                >
                  <Bell className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Notifications</TooltipContent>
            </Tooltip>
            <Avatar className="size-9 border border-[#E8EBF0]">
              <AvatarFallback className="text-sm font-medium bg-[#F7F8FA] text-[#485264]">
                AC
              </AvatarFallback>
            </Avatar>
          </div>
        </Card>

        <section className="gap-5 lg:grid-cols-[1fr_360px] grid items-start">
          <Card className="min-w-0 rounded-2xl bg-white overflow-hidden border-[#E8EBF0] shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <CardHeader className="gap-4 rounded-t-2xl bg-white !px-4 !py-4 md:!px-5 !flex !flex-col border-b border-[#E8EBF0]">
              <div className="gap-3 xl:flex-row xl:items-center xl:justify-between flex flex-col">
                <div>
                  <CardTitle className="text-base font-semibold text-[#111824]">
                    Workspaces
                  </CardTitle>
                  <CardDescription className="mt-1 text-sm text-[#667085]">
                    {filteredWorkspaces.length} active resources
                  </CardDescription>
                </div>
                <div className="gap-2 sm:flex-row sm:items-center flex flex-col">
                  <Input
                    className="h-9 bg-white sm:w-[280px] w-full border-[#DFE2EA]"
                    icon={<Search className="size-4 text-[#8A95A7]" />}
                    placeholder="Search workspace, namespace, owner"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                  <Select
                    value={regionFilter}
                    onValueChange={(value) =>
                      setRegionFilter(value as RegionFilter)
                    }
                  >
                    <SelectTrigger
                      className="h-9 bg-white sm:w-[156px] w-full border-[#DFE2EA]"
                      size="sm"
                    >
                      <Filter className="size-4 text-[#111824]" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {regionFilters.map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        aria-label="Table settings"
                        className="h-9 w-9"
                        size="icon"
                        variant="outline"
                      >
                        <SlidersHorizontal className="size-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Table settings</TooltipContent>
                  </Tooltip>
                </div>
              </div>

              <ButtonGroup className="flex-wrap">
                {statusFilters.map((status) => {
                  const isActive = statusFilter === status

                  return (
                    <Button
                      className={
                        isActive
                          ? "h-8 text-white border-[#111824] bg-[#111824] hover:bg-[#111824]/90"
                          : "h-8 bg-white border-[#E4E4E7] text-[#485264] hover:bg-[#F7F8FA]"
                      }
                      key={status}
                      type="button"
                      variant={isActive ? "default" : "outline"}
                      onClick={() => setStatusFilter(status)}
                    >
                      {status}
                    </Button>
                  )
                })}
              </ButtonGroup>
            </CardHeader>

            <CardContent className="p-0 lg:[&>div]:overflow-hidden">
              <Table className="table-fixed">
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[184px]">Workspace</TableHead>
                    <TableHead className="w-[104px]">Status</TableHead>
                    <TableHead className="w-[96px]">Region</TableHead>
                    <TableHead className="w-[58px]">Apps</TableHead>
                    <TableHead className="w-[108px]">CPU</TableHead>
                    <TableHead className="w-[108px]">Memory</TableHead>
                    <TableHead className="w-[78px]">Cost</TableHead>
                    <TableHead className="w-[72px]">Updated</TableHead>
                    <TableHead className="w-10 text-right"> </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredWorkspaces.map((workspace) => {
                    const isSelected = workspace.id === selectedWorkspace.id

                    return (
                      <TableRow
                        aria-pressed={isSelected}
                        className={[
                          "cursor-pointer outline-none focus-visible:bg-[#F7F8FA]",
                          isSelected ? "bg-[#F7F8FA]" : "",
                        ].join(" ")}
                        key={workspace.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelectedId(workspace.id)}
                        onKeyDown={(event) =>
                          handleRowKeyDown(event, workspace.id)
                        }
                      >
                        <TableCell>
                          <div className="min-w-0 gap-3 flex items-center">
                            <div className="size-9 rounded-lg flex shrink-0 items-center justify-center border border-[#E8EBF0] bg-[#FBFBFC] text-[#485264]">
                              <Users className="size-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="font-medium truncate text-[#111824]">
                                {workspace.name}
                              </div>
                              <div className="text-xs truncate text-[#8A95A7]">
                                {workspace.namespace}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={workspace.status} />
                        </TableCell>
                        <TableCell className="text-[#485264]">
                          {workspace.region}
                        </TableCell>
                        <TableCell>
                          <div className="gap-2 flex items-center text-[#485264]">
                            <AppWindow className="size-4 text-[#8A95A7]" />
                            {workspace.apps}
                          </div>
                        </TableCell>
                        <TableCell>
                          <MetricBar
                            label={`${workspace.cpu}%`}
                            value={workspace.cpu}
                          />
                        </TableCell>
                        <TableCell>
                          <MetricBar
                            label={`${workspace.memory}%`}
                            tone="green"
                            value={workspace.memory}
                          />
                        </TableCell>
                        <TableCell className="font-medium text-[#111824]">
                          {workspace.cost}
                        </TableCell>
                        <TableCell className="text-[#667085]">
                          {workspace.updated}
                        </TableCell>
                        <TableCell
                          className="text-right"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <RowActions />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>

            {filteredWorkspaces.length === 0 && (
              <div className="gap-3 px-6 flex min-h-[240px] flex-col items-center justify-center border-t border-[#F1F1F3] text-center">
                <div className="size-11 rounded-xl flex items-center justify-center border border-[#E8EBF0] bg-[#FBFBFC] text-[#667085]">
                  <Search className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#111824]">
                    No workspace found
                  </p>
                  <p className="mt-1 text-sm text-[#667085]">
                    Try another status or region.
                  </p>
                </div>
              </div>
            )}

            <CardFooter className="gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between md:px-5 flex flex-col border-t border-[#E8EBF0]">
              <p className="text-sm text-[#667085]">Page {currentPage} of 4</p>
              <Pagination
                currentPage={currentPage}
                totalPages={4}
                onPageChange={setCurrentPage}
              />
            </CardFooter>
          </Card>

          <Card className="rounded-2xl bg-white overflow-hidden border-[#E8EBF0] shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <CardHeader className="rounded-t-2xl bg-white !px-5 !py-4 border-b border-[#E8EBF0]">
              <div className="min-w-0">
                <p className="text-xs font-medium text-[#8A95A7] uppercase">
                  Selected Workspace
                </p>
                <CardTitle className="mt-1 text-lg font-semibold truncate text-[#111824]">
                  {selectedWorkspace.name}
                </CardTitle>
                <CardDescription className="mt-1 text-sm truncate text-[#667085]">
                  {selectedWorkspace.namespace}
                </CardDescription>
              </div>
              <CardAction>
                <StatusBadge status={selectedWorkspace.status} compact />
              </CardAction>
            </CardHeader>

            <CardContent className="p-0">
              <Tabs className="gap-0" defaultValue="overview">
                <div className="px-5 pt-4">
                  <TabsList className="h-9 w-full bg-[#F7F8FA]" variant="ghost">
                    <TabsTrigger variant="ghost" value="overview">
                      Overview
                    </TabsTrigger>
                    <TabsTrigger variant="ghost" value="usage">
                      Usage
                    </TabsTrigger>
                    <TabsTrigger variant="ghost" value="events">
                      Events
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent className="space-y-5 px-5 py-5" value="overview">
                  <section className="gap-3 grid grid-cols-2">
                    <MiniStat
                      icon={AppWindow}
                      label="Apps"
                      value={selectedWorkspace.apps.toString()}
                    />
                    <MiniStat
                      icon={CircleDollarSign}
                      label="Cost"
                      value={selectedWorkspace.cost}
                    />
                    <MiniStat
                      icon={ShieldCheck}
                      label="Plan"
                      value={selectedWorkspace.plan}
                    />
                    <MiniStat
                      icon={KeyRound}
                      label="Channel"
                      value={selectedWorkspace.channel}
                    />
                  </section>

                  <Separator />

                  <section className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-[#111824]">
                        Runtime Mix
                      </h3>
                      <Badge
                        className="border-[#E8EBF0] bg-[#FBFBFC] text-[#485264]"
                        variant="outline"
                      >
                        {selectedWorkspace.apps} total
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      {runtimeMix.map((item) => (
                        <RuntimeRow
                          icon={item.icon}
                          key={item.label}
                          label={item.label}
                          value={Math.round(
                            (item.value / 100) * selectedWorkspace.apps
                          )}
                        />
                      ))}
                    </div>
                  </section>
                </TabsContent>

                <TabsContent className="space-y-4 px-5 py-5" value="usage">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-[#111824]">
                      Quota Usage
                    </h3>
                    <Button className="h-8 px-2" variant="outline">
                      Edit
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <MetricLine
                      icon={Cpu}
                      label="CPU"
                      value={selectedWorkspace.cpu}
                    />
                    <MetricLine
                      icon={Gauge}
                      label="Memory"
                      tone="green"
                      value={selectedWorkspace.memory}
                    />
                    <MetricLine
                      icon={HardDrive}
                      label="Storage"
                      tone="blue"
                      value={selectedWorkspace.storage}
                    />
                  </div>
                </TabsContent>

                <TabsContent className="px-5 py-5" value="events">
                  <ScrollArea className="pr-3 h-[236px]">
                    <div className="space-y-3">
                      {recentEvents.map((event) => (
                        <div
                          className="gap-3 grid grid-cols-[42px_1fr]"
                          key={`${event.time}-${event.title}`}
                        >
                          <time className="text-xs text-[#8A95A7]">
                            {event.time}
                          </time>
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate text-[#111824]">
                              {event.title}
                            </p>
                            <p className="mt-0.5 text-xs truncate text-[#667085]">
                              {event.detail}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  )
}

function StatusBadge({
  status,
  compact = false,
}: {
  status: WorkspaceStatus
  compact?: boolean
}) {
  const styles = statusStyles[status]

  return (
    <span
      className={[
        "gap-2 rounded-md px-2 py-1 text-xs font-medium inline-flex items-center border",
        compact ? "px-2" : "",
        styles.badge,
      ].join(" ")}
    >
      <span className={["size-1.5 rounded-full", styles.dot].join(" ")} />
      <span className={styles.label}>{status}</span>
    </span>
  )
}

function MetricBar({
  label,
  value,
  tone = "blue",
}: {
  label: string
  value: number
  tone?: "blue" | "green"
}) {
  const indicatorColor =
    tone === "green"
      ? "[&_[data-slot=progress-indicator]]:bg-[#12B76A]"
      : "[&_[data-slot=progress-indicator]]:bg-[#219BF4]"

  return (
    <div className="gap-2 flex min-w-[72px] items-center">
      <Progress
        className={["h-1.5 min-w-0 flex-1 bg-[#EEF2F6]", indicatorColor].join(
          " "
        )}
        value={value}
      />
      <span className="w-9 text-xs font-medium text-right text-[#485264]">
        {label}
      </span>
    </div>
  )
}

function MetricLine({
  icon: Icon,
  label,
  value,
  tone = "black",
}: {
  icon: typeof Cpu
  label: string
  value: number
  tone?: "black" | "blue" | "green"
}) {
  const indicatorColor =
    tone === "blue"
      ? "[&_[data-slot=progress-indicator]]:bg-[#219BF4]"
      : tone === "green"
        ? "[&_[data-slot=progress-indicator]]:bg-[#12B76A]"
        : "[&_[data-slot=progress-indicator]]:bg-[#111824]"

  return (
    <div className="space-y-2">
      <div className="gap-2 flex items-center justify-between">
        <div className="gap-2 text-sm flex items-center text-[#485264]">
          <Icon className="size-4 text-[#8A95A7]" />
          {label}
        </div>
        <span className="text-sm font-medium text-[#111824]">{value}%</span>
      </div>
      <Progress
        className={["h-2 bg-[#EEF2F6]", indicatorColor].join(" ")}
        value={value}
      />
    </div>
  )
}

function MiniStat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof AppWindow
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl p-3 border border-[#E8EBF0] bg-[#FBFBFC]">
      <div className="gap-2 text-xs flex items-center text-[#667085]">
        <Icon className="size-3.5 text-[#8A95A7]" />
        {label}
      </div>
      <div className="mt-2 text-sm font-semibold truncate text-[#111824]">
        {value}
      </div>
    </div>
  )
}

function RuntimeRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof AppWindow
  label: string
  value: number
}) {
  return (
    <div className="gap-3 rounded-lg bg-white px-3 py-2 flex items-center justify-between border border-[#E8EBF0]">
      <div className="min-w-0 gap-2 flex items-center">
        <div className="size-7 rounded-md flex shrink-0 items-center justify-center bg-[#F7F8FA] text-[#667085]">
          <Icon className="size-3.5" />
        </div>
        <span className="text-sm truncate text-[#485264]">{label}</span>
      </div>
      <span className="text-sm font-medium text-[#111824]">{value}</span>
    </div>
  )
}

function RowActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="Workspace actions"
          className="h-8 w-8"
          size="icon"
          variant="ghost"
        >
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>
          <ExternalLink className="size-4" />
          Open console
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Copy className="size-4" />
          Copy namespace
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <CheckCircle2 className="size-4" />
          Run health check
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { SealosAdminPanel }

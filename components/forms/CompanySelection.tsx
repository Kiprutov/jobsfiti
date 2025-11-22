"use client"

import { useState, useEffect } from "react"
import { Check, ChevronsUpDown, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Company, CompanyFormData } from "@/lib/types/company"
import { getCompanies, createCompany } from "@/lib/services/companiesService"
import { useToast } from "@/hooks/use-toast"

interface CompanySelectionProps {
    value?: string
    onChange: (companyId: string) => void
}

export function CompanySelection({ value, onChange }: CompanySelectionProps) {
    const [open, setOpen] = useState(false)
    const [companies, setCompanies] = useState<Company[]>([])
    const [loading, setLoading] = useState(false)
    const [isCreating, setIsCreating] = useState(false)
    const [newCompanyOpen, setNewCompanyOpen] = useState(false)
    const { toast } = useToast()

    // New Company Form State
    const [newCompanyName, setNewCompanyName] = useState("")
    const [newCompanyWebsite, setNewCompanyWebsite] = useState("")
    const [newCompanyLogo, setNewCompanyLogo] = useState("")

    useEffect(() => {
        loadCompanies()
    }, [])

    const loadCompanies = async () => {
        setLoading(true)
        try {
            const data = await getCompanies()
            setCompanies(data)
        } catch (error) {
            console.error("Failed to load companies", error)
        } finally {
            setLoading(false)
        }
    }

    const handleCreateCompany = async () => {
        if (!newCompanyName.trim()) return

        setIsCreating(true)
        try {
            const newCompany = await createCompany({
                name: newCompanyName,
                website: newCompanyWebsite,
                logoUrl: newCompanyLogo,
            })

            setCompanies((prev) => [...prev, newCompany])
            onChange(newCompany.id)
            setNewCompanyOpen(false)
            setOpen(false)
            setNewCompanyName("")
            setNewCompanyWebsite("")
            setNewCompanyLogo("")

            toast({
                title: "Company Created",
                description: `${newCompany.name} has been created successfully.`,
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to create company.",
                variant: "destructive",
            })
        } finally {
            setIsCreating(false)
        }
    }

    const selectedCompany = companies.find((c) => c.id === value)

    return (
        <div className="flex items-center gap-2">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                    >
                        {value
                            ? companies.find((company) => company.id === value)?.name
                            : "Select company..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0">
                    <Command>
                        <CommandInput placeholder="Search company..." />
                        <CommandList>
                            <CommandEmpty>
                                <div className="p-2 text-center">
                                    <p className="text-sm text-muted-foreground mb-2">No company found.</p>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setOpen(false)
                                            setNewCompanyOpen(true)
                                        }}
                                    >
                                        <Plus className="mr-2 h-4 w-4" />
                                        Create New Company
                                    </Button>
                                </div>
                            </CommandEmpty>
                            <CommandGroup>
                                {companies.map((company) => (
                                    <CommandItem
                                        key={company.id}
                                        value={company.name}
                                        onSelect={() => {
                                            onChange(company.id === value ? "" : company.id)
                                            setOpen(false)
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === company.id ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {company.name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            <Dialog open={newCompanyOpen} onOpenChange={setNewCompanyOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Company</DialogTitle>
                        <DialogDescription>
                            Add a new company to the database.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Company Name *</Label>
                            <Input
                                id="name"
                                value={newCompanyName}
                                onChange={(e) => setNewCompanyName(e.target.value)}
                                placeholder="Acme Inc."
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="website">Website</Label>
                            <Input
                                id="website"
                                value={newCompanyWebsite}
                                onChange={(e) => setNewCompanyWebsite(e.target.value)}
                                placeholder="https://acme.com"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="logo">Logo URL</Label>
                            <Input
                                id="logo"
                                value={newCompanyLogo}
                                onChange={(e) => setNewCompanyLogo(e.target.value)}
                                placeholder="https://acme.com/logo.png"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setNewCompanyOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleCreateCompany} disabled={isCreating || !newCompanyName}>
                            {isCreating ? "Creating..." : "Create Company"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

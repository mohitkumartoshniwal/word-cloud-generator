import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";

export type Frequency = {
  word: string;
  frequency: number;
  isVisible: boolean;
};

export const columns: ColumnDef<Frequency>[] = [
  {
    id: "select",
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        // checked={row.original.isVisible}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "word",
    header: "Word",
  },
  {
    accessorKey: "frequency",
    header: "Frequency",
  },
];

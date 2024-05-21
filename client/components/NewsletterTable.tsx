import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Newsletter } from "@/models/Newsletter";

const NewsletterTable = ({
  newsletters,
}: {
  newsletters: Array<Newsletter>;
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Título</TableHead>
          <TableHead>Descripción</TableHead>
          <TableHead>
            <span className="sr-only">Acciones</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {newsletters?.map((newsletter) => (
          <TableRow key={newsletter.id}>
            <TableCell className="font-medium">{newsletter.name}</TableCell>
            <TableCell className="font-medium">
              {newsletter.description}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default NewsletterTable;

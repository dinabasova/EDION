"use client";

import { useEffect, useMemo, useState } from "react";
import { ContactRequest } from "@prisma/client";
import * as XLSX from "xlsx";

type SortField = "createdAt" | "name" | "email" | "type";
type SortDirection = "asc" | "desc";
type TypeFilter = "all" | "trial" | "consultation";
type StatusFilter = "all" | "new" | "done";

export default function AdminPage() {
  const [data, setData] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch CTA submissions
  useEffect(() => {
    const token = localStorage.getItem("edionaz_token");

    fetch("/api/admin/cta", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((res: ContactRequest[]) => setData(res))
      .finally(() => setLoading(false));
  }, []);

  // Filter + Search + Sort
  const visibleData = useMemo(() => {
    let list = [...data];

    // filter by type (trial/consultation)
    if (typeFilter !== "all") {
      list = list.filter((i) => i.type === typeFilter.toUpperCase());
    }

    // filter by status (new/done)
    if (statusFilter !== "all") {
      list = list.filter((i) => i.status === statusFilter.toUpperCase());
    }

    // search
    if (searchTerm.trim().length > 0) {
      const term = searchTerm.toLowerCase();

      list = list.filter((i) => {
        const message = i.message ?? "";
        return (
          i.name.toLowerCase().includes(term) ||
          i.email.toLowerCase().includes(term) ||
          i.phone.toLowerCase().includes(term) ||
          i.type.toLowerCase().includes(term) ||
          message.toLowerCase().includes(term)
        );
      });
    }

    // sorting
    list.sort((a, b) => {
      let aVal: string | number | Date = "";
      let bVal: string | number | Date = "";

      switch (sortField) {
        case "createdAt":
          aVal = new Date(a.createdAt).getTime();
          bVal = new Date(b.createdAt).getTime();
          break;
        case "name":
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
          break;
        case "email":
          aVal = a.email.toLowerCase();
          bVal = b.email.toLowerCase();
          break;
        case "type":
          aVal = a.type.toLowerCase();
          bVal = b.type.toLowerCase();
          break;
      }

      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return list;
  }, [data, sortField, sortDirection, typeFilter, statusFilter, searchTerm]);

  // sort toggle
  function toggleSort(field: SortField) {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  }

  // delete submission
  async function handleDelete(id: string) {
    const confirmed = window.confirm("Are you sure you want to delete this record?");
    if (!confirmed) return;

    const token = localStorage.getItem("edionaz_token");

    const res = await fetch(`/api/admin/cta/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      alert("An error occurred while deleting.");
      return;
    }

    setData((prev) => prev.filter((item) => item.id !== id));
  }

  // mark as done
  async function handleMarkDone(id: string) {
    const token = localStorage.getItem("edionaz_token");

    const res = await fetch(`/api/admin/cta/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: "DONE" }),
    });

    if (!res.ok) {
      alert("An error occurred while updating status.");
      return;
    }

    const updated: ContactRequest = await res.json();

    setData((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
  }

  // export to Excel
  function handleExcelExport() {
    const rows = visibleData.map((i) => ({
      Name: i.name,
      Phone: i.phone,
      Email: i.email,
      Type: i.type === "TRIAL" ? "Trial lesson" : "Consultation",
      Status: i.status === "DONE" ? "Done" : "New",
      Message: i.message ?? "",
      Date: new Date(i.createdAt).toLocaleString("en-US"),
    }));

    const sheet = XLSX.utils.json_to_sheet(rows);
    const book = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, sheet, "Submissions");

    XLSX.writeFile(book, "edionaz_cta_submissions.xlsx");
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-semibold text-[#860021] mb-6">
        CTA Form Submissions
      </h1>

      {/* controls */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* type filter */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as TypeFilter)}
          className="border px-3 py-1 rounded-full text-sm"
        >
          <option value="all">All (type)</option>
          <option value="trial">Trial lesson</option>
          <option value="consultation">Consultation</option>
        </select>

        {/* status filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
          className="border px-3 py-1 rounded-full text-sm"
        >
          <option value="all">All (status)</option>
          <option value="new">New</option>
          <option value="done">Done</option>
        </select>

        {/* search */}
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-1 rounded-full text-sm"
        />

        {/* export */}
        <button
          onClick={handleExcelExport}
          className="rounded-full bg-[#3b3c55] text-white px-4 py-1 text-sm"
        >
          Export to Excel
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {!loading && visibleData.length === 0 && <p>No submissions found.</p>}

      {!loading && visibleData.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg text-sm">
            <thead className="bg-gray-100">
              <tr>
                <SortableHeader
                  label="Name"
                  field="name"
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={toggleSort}
                />
                <th className="p-3 text-left">Phone</th>
                <SortableHeader
                  label="Email"
                  field="email"
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={toggleSort}
                />
                <SortableHeader
                  label="Type"
                  field="type"
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={toggleSort}
                />
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Message</th>
                <SortableHeader
                  label="Date"
                  field="createdAt"
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={toggleSort}
                />
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {visibleData.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.phone}</td>
                  <td className="p-3">{item.email}</td>
                  <td className="p-3">
                    {item.type === "TRIAL" ? "Trial lesson" : "Consultation"}
                  </td>
                  <td className="p-3">
                    {item.status === "DONE" ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-xs">
                        Done
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-yellow-50 text-yellow-700 text-xs">
                        New
                      </span>
                    )}
                  </td>
                  <td className="p-3">{item.message}</td>
                  <td className="p-3">
                    {new Date(item.createdAt).toLocaleString("en-US")}
                  </td>
                  <td className="p-3 space-x-2">
                    {item.status !== "DONE" && (
                      <button
                        onClick={() => handleMarkDone(item.id)}
                        className="text-xs text-green-700 hover:underline"
                      >
                        Mark as done
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

interface SortableHeaderProps {
  label: string;
  field: SortField;
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

function SortableHeader({
  label,
  field,
  sortField,
  sortDirection,
  onSort,
}: SortableHeaderProps) {
  const active = sortField === field;
  const arrow = active ? (sortDirection === "asc" ? "↑" : "↓") : "↕";

  return (
    <th
      className="p-3 text-left cursor-pointer select-none"
      onClick={() => onSort(field)}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        <span className="text-xs text-gray-500">{arrow}</span>
      </span>
    </th>
  );
}

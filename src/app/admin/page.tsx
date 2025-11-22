"use client";

import { useEffect, useState } from "react";
import { ContactRequest } from "@prisma/client";


export default function AdminPage() {
  const [data, setData] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("edionaz_token");

    fetch("/api/admin/cta", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-semibold text-[#860021] mb-6">
        CTA Form Submissions
      </h1>

      {loading && <p>Loading...</p>}

      {!loading && data.length === 0 && (
        <p>No submissions yet.</p>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Message</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.phone}</td>
                <td className="p-3">{item.email}</td>
                <td className="p-3">
                  {item.type === "trial"
                    ? "Sınaq dərsi"
                    : "Konsultasiya"}
                </td>
                <td className="p-3">{item.message}</td>
                <td className="p-3">
                  {new Date(item.createdAt).toLocaleString("az-AZ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

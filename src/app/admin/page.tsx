"use client";

import { useEffect, useState, useMemo } from "react";
import { format } from "date-fns";
import { ro } from "date-fns/locale";
import {
  Trash2,
  CheckCircle,
  AlertCircle,
  Calendar,
  Clock,
  User,
  Phone,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Appointment = {
  id: number;
  start: string;
  end: string;
  name: string;
  phone: string;
  species: string;
  reason: string;
  status: string;
  createdAt: string;
};

export default function AdminPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/appointments");
      const data = await res.json();
      if (data.appointments) {
        setAppointments(data.appointments);
      } else {
        setError("Eroare la încărcarea datelor.");
      }
    } catch (e) {
      setError("Eroare de conexiune.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleStatusUpdate = async (id: number, status: string) => {
    try {
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        fetchAppointments();
      }
    } catch (e) {
      console.error("Failed to update status", e);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchAppointments();
      }
    } catch (e) {
      console.error("Failed to delete", e);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-emerald-500/90 hover:bg-emerald-600 text-white">
            Confirmat
          </Badge>
        );
      case "cancelled":
        return <Badge variant="destructive">Anulat</Badge>;
      default:
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
            În așteptare
          </Badge>
        );
    }
  };

  // Small stats for dashboard feel
  const stats = useMemo(() => {
    const total = appointments.length;
    const confirmed = appointments.filter((a) => a.status === "confirmed").length;
    const pending = appointments.filter(
      (a) => a.status !== "confirmed" && a.status !== "cancelled"
    ).length;
    const cancelled = appointments.filter((a) => a.status === "cancelled").length;
    return { total, confirmed, pending, cancelled };
  }, [appointments]);

  // Sort by start date ascending
  const sortedAppointments = useMemo(
    () =>
      [...appointments].sort(
        (a, b) =>
          new Date(a.start).getTime() - new Date(b.start).getTime()
      ),
    [appointments]
  );

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-emerald-600 border-t-transparent" />
          <p className="text-sm text-slate-500">
            Se încarcă programările...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/70 pt-30">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">
              Panou Administrare
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Gestionează programările clinicii într-un singur loc.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded-full bg-white border border-slate-200 px-4 py-2 text-xs text-slate-500 shadow-sm">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>Astăzi:</span>
              <span className="font-medium text-slate-700">
                {format(new Date(), "d MMMM yyyy", { locale: ro })}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="flex items-center gap-2 border-emerald-600/40 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
                asChild
              >
                <a href="/admin/blog/create">
                  + Blog Nou
                </a>
              </Button>

              <Button
                onClick={fetchAppointments}
                variant="outline"
                className="flex items-center gap-2 border-slate-200 text-slate-700 hover:bg-slate-50"
                title="Actualizează lista"
              >
                <Clock className="w-4 h-4" />
              </Button>

              <Button
                onClick={async () => {
                  await fetch("/api/auth/logout", { method: "POST" });
                  window.location.href = "/login";
                }}
                variant="destructive"
                className="bg-rose-600 hover:bg-rose-700 text-white"
              >
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-100 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 mt-0.5" />
            <div>
              <p className="text-sm font-medium">A apărut o eroare</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Stats cards */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm flex flex-col gap-1">
            <span className="text-xs uppercase tracking-wide text-slate-400">
              Total Programări
            </span>
            <span className="text-2xl font-semibold text-slate-900">
              {stats.total}
            </span>
          </div>
          <div className="bg-white rounded-xl border border-emerald-100 p-4 shadow-sm flex flex-col gap-1">
            <span className="text-xs uppercase tracking-wide text-emerald-700/80">
              Confirmate
            </span>
            <span className="text-2xl font-semibold text-emerald-700">
              {stats.confirmed}
            </span>
          </div>
          <div className="bg-white rounded-xl border border-amber-100 p-4 shadow-sm flex flex-col gap-1">
            <span className="text-xs uppercase tracking-wide text-amber-700/90">
              În așteptare
            </span>
            <span className="text-2xl font-semibold text-amber-700">
              {stats.pending}
            </span>
          </div>
          <div className="bg-white rounded-xl border border-rose-100 p-4 shadow-sm flex flex-col gap-1">
            <span className="text-xs uppercase tracking-wide text-rose-700/90">
              Anulate
            </span>
            <span className="text-2xl font-semibold text-rose-700">
              {stats.cancelled}
            </span>
          </div>
        </section>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableCaption className="text-xs text-slate-500">
                Lista completă a programărilor. Click pe iconițe pentru a
                confirma sau șterge.
              </TableCaption>
              <TableHeader>
                <TableRow className="bg-slate-50/80 hover:bg-slate-50/80 sticky top-0 z-10">
                  <TableHead className="w-[220px] text-slate-600 text-xs uppercase tracking-wide">
                    Data & Ora
                  </TableHead>
                  <TableHead className="text-slate-600 text-xs uppercase tracking-wide">
                    Pacient
                  </TableHead>
                  <TableHead className="text-slate-600 text-xs uppercase tracking-wide">
                    Proprietar
                  </TableHead>
                  <TableHead className="text-slate-600 text-xs uppercase tracking-wide">
                    Detalii
                  </TableHead>
                  <TableHead className="text-slate-600 text-xs uppercase tracking-wide">
                    Status
                  </TableHead>
                  <TableHead className="text-right text-slate-600 text-xs uppercase tracking-wide">
                    Acțiuni
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedAppointments.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-32 text-center text-slate-500"
                    >
                      Nu există programări înregistrate.
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedAppointments.map((apt) => {
                    const rowTone =
                      apt.status === "confirmed"
                        ? "bg-emerald-50/40"
                        : apt.status === "cancelled"
                        ? "bg-rose-50/40"
                        : "";

                    return (
                      <TableRow
                        key={apt.id}
                        className={`${rowTone} hover:bg-slate-50 transition-colors`}
                      >
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 font-medium text-slate-900">
                              <Calendar className="w-4 h-4 text-slate-400" />
                              {format(new Date(apt.start), "d MMM yyyy", {
                                locale: ro,
                              })}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <Clock className="w-3 h-3" />
                              {format(new Date(apt.start), "HH:mm")} –{" "}
                              {format(new Date(apt.end), "HH:mm")}
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="font-medium capitalize text-slate-900">
                            {apt.species}
                          </div>
                          <div
                            className="text-xs text-slate-500 truncate max-w-[220px]"
                            title={apt.reason}
                          >
                            {apt.reason || "-"}
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                              <User className="w-3 h-3 text-slate-400" />
                              {apt.name}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <Phone className="w-3 h-3" />
                              {apt.phone}
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <span className="text-xs text-slate-400">
                            Creat:{" "}
                            {format(
                              new Date(apt.createdAt),
                              "dd/MM HH:mm"
                            )}
                          </span>
                        </TableCell>

                        <TableCell>{getStatusBadge(apt.status)}</TableCell>

                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {apt.status !== "confirmed" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 border-emerald-200"
                                onClick={() =>
                                  handleStatusUpdate(apt.id, "confirmed")
                                }
                                title="Confirmă"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                            )}

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0 text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200"
                                  title="Șterge"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Ești sigur?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Această acțiune nu poate fi anulată.
                                    Programarea va fi ștearsă permanent din baza
                                    de date.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>
                                    Anulează
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(apt.id)}
                                    className="bg-rose-600 hover:bg-rose-700 text-white"
                                  >
                                    Șterge
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

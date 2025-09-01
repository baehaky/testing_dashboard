import { defineStore } from "pinia";
import { supabase } from "@/lib/supabase";

export const useProjectStore = defineStore("projects", {
  state: () => ({
    items: [],
    loading: false,
    error: "",
    channel: null,

    // sebelumnya sudah ada
    totalProject: 0,
    totalCumulative: 0,
    avgCumulative: 0,
    totalProjectDone: 0,
    totalCumulativeDone: 0,
    avgCumulativeDone: 0,

    // tambahan untuk summary tahunan
    totalProjectYear: 0,
    totalDone: 0,
    totalOngoing: 0,
    percentDone: 0,
    percentOngoing: 0,
  }),
  actions: {
    // ✅ ambil summary tahunan (seperti di card yang kamu tunjuk)
    async countSummary(year) {
      this.loading = true;
      this.error = "";

      try {
        // total project tahun ini
        let { data: allProjects, error: allError } = await supabase
          .from("Project")
          .select("project_id, status_project")
          .filter("start_project", "gte", `${year}-01-01`)
          .filter("start_project", "lte", `${year}-12-31`);

        if (allError) throw allError;

        this.totalProjectYear = allProjects.length;

        // hitung selesai & berjalan
        this.totalDone = allProjects.filter(
          (p) => p.status_project === "Selesai"
        ).length;

        this.totalOngoing = allProjects.filter(
          (p) => p.status_project === "Berjalan"
        ).length;

        // hitung persentase
        this.percentDone =
          this.totalProjectYear > 0
            ? Math.round((this.totalDone / this.totalProjectYear) * 100)
            : 0;

        this.percentOngoing =
          this.totalProjectYear > 0
            ? Math.round((this.totalOngoing / this.totalProjectYear) * 100)
            : 0;
      } catch (e) {
        this.error = e.message;
      } finally {
        this.loading = false;
      }
    },

    // ✅ sisanya tetap seperti punyamu
    async fetchProjectsWithProgress() {
      this.loading = true;
      this.error = "";
      try {
        const { data: projects, error: projectError } = await supabase
          .from("Project")
          .select("*");

        if (projectError) throw projectError;

        const projectsWithProgress = await Promise.all(
          projects.map(async (p) => {
            const { data: progress, error: progressError } = await supabase
              .from("Progress_mingguan")
              .select("tanggal, volume_progress")
              .eq("project_id", p.project_id)
              .order("tanggal", { ascending: true });

            if (progressError) throw progressError;

            const start = new Date(p.start_project);
            const end = new Date(p.end_project);
            const days = Math.max(
              1,
              Math.ceil((end - start) / (1000 * 60 * 60 * 24))
            );

            const target = [];
            for (let i = 0; i <= days; i++) {
              const currentDate = new Date(start);
              currentDate.setDate(start.getDate() + i);
              target.push({
                x: currentDate.toISOString().split("T")[0],
                y: Math.min(
                  p.total_progress ?? 100,
                  (i / days) * (p.total_progress ?? 100)
                ),
              });
            }

            return {
              ...p,
              progress: progress.map((pr) => ({
                x: new Date(pr.tanggal).toISOString().split("T")[0],
                y: pr.volume_progress,
              })),
              target,
            };
          })
        );

        this.items = projectsWithProgress;
      } catch (e) {
        this.error = e.message;
      } finally {
        this.loading = false;
      }
    },

    async create(project) {
      this.error = "";
      try {
        const { data, error } = await supabase
          .from("Project")
          .insert([project])
          .select()
          .single();
        if (error) throw error;
        this.items.unshift(data);
        return data;
      } catch (e) {
        this.error = e.message;
        throw e;
      }
    },

    async update(project_id, payload) {
      this.error = "";
      try {
        const { data, error } = await supabase
          .from("Project")
          .update(payload)
          .eq("project_id", project_id)
          .select()
          .single();

        if (error) throw error;

        const index = this.items.findIndex((p) => p.project_id === project_id);
        if (index !== -1) {
          this.items[index] = { ...this.items[index], ...data };
        }

        return data;
      } catch (e) {
        this.error = e.message;
        return null;
      }
    },

    async delete(project_id) {
      this.error = "";
      try {
        let { error } = await supabase
          .from("Progress_mingguan")
          .delete()
          .eq("project_id", project_id);
        if (error) throw error;

        ({ error } = await supabase
          .from("Pekerjaan")
          .delete()
          .eq("project_id", project_id));
        if (error) throw error;

        ({ error } = await supabase
          .from("Project")
          .delete()
          .eq("project_id", project_id));
        if (error) throw error;

        this.items = this.items.filter((p) => p.project_id !== project_id);

        return true;
      } catch (e) {
        this.error = e.message;
        return false;
      }
    },

    async countProjects() {
      this.loading = true;
      this.error = "";
      try {
        const { data, error } = await supabase
          .from("Project")
          .select("cumulative_progress");

        if (error) throw error;

        if (data && data.length > 0) {
          this.totalProject = data.length;
          this.totalCumulative = data.reduce(
            (sum, p) => sum + (p.cumulative_progress || 0),
            0
          );
          this.avgCumulative = this.totalCumulative / this.totalProject;
        } else {
          this.totalProject = 0;
          this.totalCumulative = 0;
          this.avgCumulative = 0;
        }
      } catch (e) {
        this.error = e.message;
        console.error("Count error:", e);
      } finally {
        this.loading = false;
      }
    },

    async countProjectsDone() {
      this.loading = true;
      this.error = "";
      try {
        const { data, error } = await supabase
          .from("Project")
          .select("cumulative_progress")
          .eq("status_project", "Selesai");

        if (error) throw error;

        if (data && data.length > 0) {
          this.totalProjectDone = data.length;
          this.totalCumulativeDone = data.reduce(
            (sum, p) => sum + (p.cumulative_progress || 0),
            0
          );
          this.avgCumulativeDone =
            this.totalCumulativeDone / this.totalProjectDone;
        } else {
          this.totalProjectDone = 0;
          this.totalCumulativeDone = 0;
          this.avgCumulativeDone = 0;
        }
      } catch (e) {
        this.error = e.message;
        console.error("Count error:", e);
      } finally {
        this.loading = false;
      }
    },
  },
});

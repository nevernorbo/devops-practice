import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import {
    Registry,
    Counter,
    Histogram,
    collectDefaultMetrics,
} from "prom-client";

export const registry = new Registry();

// https://vite.dev/config/
export default defineConfig({
    // plugins: [react()],
    plugins: [
        react(),
        {
            name: "configure-metrics-endpoint",
            configureServer(server) {
                server.middlewares.use("/metrics", async (_req, res) => {
                    res.setHeader("Content-Type", registry.contentType);
                    res.end(await registry.metrics());
                });
            },
        },
    ],
});

// Enable default metrics collection
collectDefaultMetrics({ register: registry });

// Counter for Redux actions
export const reduxActionCounter = new Counter({
    name: "redux_actions_total",
    help: "Total number of Redux actions dispatched",
    labelNames: ["action_type"],
    registers: [registry],
});

// Counter for page views
export const pageViewCounter = new Counter({
    name: "page_views_total",
    help: "Total number of page views",
    registers: [registry],
});

// Histogram for component render time
export const componentRenderTime = new Histogram({
    name: "component_render_duration_seconds",
    help: "Time taken for component renders",
    labelNames: ["component"],
    buckets: [0.1, 0.5, 1, 2, 5],
    registers: [registry],
});

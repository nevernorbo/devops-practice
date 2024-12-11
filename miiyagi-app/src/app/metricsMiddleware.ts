import { Middleware } from "@reduxjs/toolkit";
import { Counter } from "prom-client";
import { registry } from "../../vite.config";

const reduxActionCounter = new Counter({
    name: "redux_actions_total",
    help: "Total number of Redux actions dispatched",
    labelNames: ["action_type"],
    registers: [registry],
});

export const metricsMiddleware: Middleware = () => (next) => (action: any) => {
    reduxActionCounter.inc({ action_type: action.type });
    return next(action);
};

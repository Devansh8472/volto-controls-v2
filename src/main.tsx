import { Component, type ErrorInfo, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

type ErrorBoundaryState = {
	hasError: boolean;
};

class AppErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
	state: ErrorBoundaryState = { hasError: false };

	static getDerivedStateFromError(): ErrorBoundaryState {
		return { hasError: true };
	}

	componentDidCatch(error: Error, info: ErrorInfo) {
		console.error("Application render error:", error, info);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="min-h-screen bg-[#0A1628] text-white flex items-center justify-center p-6 text-center">
					<div>
						<h1 className="text-2xl font-bold mb-3">Unable to load the website</h1>
						<p className="text-white/70 mb-5">Please refresh the page. If the issue persists, redeploy the latest build artifact.</p>
						<button
							type="button"
							onClick={() => window.location.reload()}
							className="px-5 py-2.5 rounded-full bg-[#1565C0] hover:bg-[#1976D2] text-white font-semibold"
						>
							Reload Page
						</button>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error("Root element #root not found.");
}

const showGlobalFallback = (reason: string) => {
	if (!rootElement) return;
	rootElement.innerHTML = `
		<div style="min-height:100vh;background:#0A1628;color:#fff;display:flex;align-items:center;justify-content:center;padding:24px;text-align:center;font-family:DM Sans,sans-serif;">
			<div>
				<h1 style="font-size:28px;margin:0 0 12px 0;">Website failed to initialize</h1>
				<p style="margin:0 0 18px 0;opacity:.75;max-width:680px;">${reason}</p>
				<button onclick="window.location.reload()" style="padding:10px 18px;border-radius:9999px;border:none;background:#1565C0;color:#fff;font-weight:600;cursor:pointer;">Reload Page</button>
			</div>
		</div>
	`;
};

window.addEventListener("error", (event) => {
	if (event.error) {
		console.error("Global runtime error:", event.error);
		showGlobalFallback("A runtime error occurred while loading the application.");
	}
});

window.addEventListener("unhandledrejection", (event) => {
	console.error("Unhandled promise rejection:", event.reason);
	showGlobalFallback("An unexpected script error occurred while loading the application.");
});

createRoot(rootElement).render(
	<AppErrorBoundary>
		<App />
	</AppErrorBoundary>,
);
